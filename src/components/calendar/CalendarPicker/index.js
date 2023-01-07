import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { makeStyles } from './makeStyles';
import { Utils } from './Utils';
import HeaderControls from './HeaderControls';
import Weekdays from './Weekdays';
import DaysGridView from './DaysGridView';
// import MonthSelector from './MonthSelector';
// import YearSelector from './YearSelector';
import YearMonthSelector from './YearMonthSelector';
import Scroller from './Scroller';
// import moment from 'moment';
import momentSeoulTZ from '../../../logic/momentSeoul/momentSeoulTZ';
// import test from './test';

export default class CalendarPicker extends Component {
  constructor(props) {
    super(props);
    this.numMonthsScroll = 60; // 5 years
    this.state = {
      currentMonth: null,
      currentYear: null,
      currentView: 'days',
      // 얘가 moment 가 아니고 걍 day 로 만들어야겠다
      // selectedStartDate: props.selectedStartDate && momentSeoulTZ(props.selectedStartDate),
      selectedStartDate: props.selectedStartDate && momentSeoulTZ(props.selectedStartDate).date(),
      // 얜 필요없어
      selectedEndDate: props.selectedEndDate && momentSeoulTZ(props.selectedEndDate),
      minDate: props.minDate && momentSeoulTZ(props.minDate),
      maxDate: props.maxDate && momentSeoulTZ(props.maxDate),
      styles: {},
      ...this.updateScaledStyles(props),
      ...this.updateMonthYear(props.initialDate),
      // disabledDates 쓸데 있나?
      ...this.updateDisabledDates(props.disabledDates),
      ...this.updateMinMaxRanges(props.minRangeDuration, props.maxRangeDuration),
      ...this.createMonths(props, {}),
    };
    this.state.renderMonthParams = this.createMonthProps(this.state);
  }

  static defaultProps = {
    initialDate: momentSeoulTZ(),
    scaleFactor: 375,
    scrollable: false,
    onDateChange: () => {
      console.log('onDateChange() not provided');
    },
    enableDateChange: true,
    headingLevel: 1,
    sundayColor: '#FFFFFF',
    customDatesStyles: [],
    previousTitle: 'Previous',
    nextTitle: 'Next',
    selectMonthTitle: 'Select Month in ',
    selectYearTitle: 'Select Year',
    horizontal: true,
    selectedDayStyle : null,
    selectedRangeStartStyle: null,
    selectedRangeEndStyle: null,
    selectedRangeStyle: null,
  };

  componentDidUpdate(prevProps) {
    let doStateUpdate = false;

    let newStyles = {};
    if (
      prevProps.width !== this.props.width ||
      prevProps.height !== this.props.height
    ) {
      newStyles = this.updateScaledStyles(this.props);
      doStateUpdate = true;
    }

    let newMonthYear = {};
    if (!momentSeoulTZ(prevProps.initialDate).isSame(this.props.initialDate, 'day')) {
      newMonthYear = this.updateMonthYear(this.props.initialDate);
      doStateUpdate = true;
    }

    let selectedDateRanges = {};
    // const { selectedStartDate, selectedEndDate } = this.props;
    // if (selectedStartDate !== prevProps.selectedStartDate ||
    //     selectedEndDate !== prevProps.selectedEndDate
    // ) {
    //   selectedDateRanges = {
    //     selectedStartDate: selectedStartDate && momentSeoulTZ(selectedStartDate),
    //     selectedEndDate: selectedEndDate && momentSeoulTZ(selectedEndDate)
    //   };
    //   doStateUpdate = true;
    // }

    let disabledDates = {};
    if (prevProps.disabledDates !== this.props.disabledDates) {
      disabledDates = this.updateDisabledDates(this.props.disabledDates);
      doStateUpdate = true;
    }

    let rangeDurations = {};
    if (prevProps.minRangeDuration !== this.props.minRangeDuration ||
        prevProps.maxRangeDuration !== this.props.maxRangeDuration
    ) {
      const {minRangeDuration, maxRangeDuration} = this.props;
      rangeDurations = this.updateMinMaxRanges(minRangeDuration, maxRangeDuration);
      doStateUpdate = true;
    }

    let minMaxDates = {};
    if (prevProps.minDate !== this.props.minDate ||
        prevProps.minDate !== this.props.minDate
    ) {
      minMaxDates.minDate = this.props.minDate && momentSeoulTZ(this.props.minDate);
      minMaxDates.maxDate = this.props.maxDate && momentSeoulTZ(this.props.maxDate);
      doStateUpdate = true;
    }

    if (prevProps.customDatesStyles !== this.props.customDatesStyles) {
      // Update renderMonthParams on customDatesStyles change
      doStateUpdate = true;
    }

    if (doStateUpdate) {
      const newState = {
        ...newStyles,
        ...newMonthYear,
        ...selectedDateRanges,
        ...disabledDates,
        ...rangeDurations,
        ...minMaxDates,
      };
      let renderMonthParams = {};
      const _state = {...this.state, ...newState};
      renderMonthParams = this.createMonthProps(_state);
      this.setState({...newState, renderMonthParams});
    }
  }

  updateScaledStyles = props => {
    const {
      scaleFactor,
      selectedDayColor,
      selectedDayTextColor,
      todayBackgroundColor,
      width,
      height,
      dayShape
    } = props;

    // The styles in makeStyles are intially scaled to this width
    const containerWidth = width ? width : Dimensions.get('window').width;
    const containerHeight = height ? height : Dimensions.get('window').height;
    return {
      styles: makeStyles({
        containerWidth,
        containerHeight,
        scaleFactor,
        selectedDayColor,
        selectedDayTextColor,
        todayBackgroundColor,
        dayShape
      })
    };
  }

  updateMonthYear = (initialDate = this.props.initialDate, updateState) => {
    const newState = {
      currentMonth: parseInt(momentSeoulTZ(initialDate).month()),
      currentYear: parseInt(momentSeoulTZ(initialDate).year())
    };
    if (updateState) {
      this.setState(newState);
    }
    return newState;
  }

  updateDisabledDates = (_disabledDates = []) => {
    let disabledDates = [];
    if (_disabledDates) {
      if (Array.isArray(_disabledDates)) {
        // Convert input date into timestamp
        _disabledDates.map(date => {
          let thisDate = momentSeoulTZ(date);
          thisDate.set({ hour: 12, minute: 0, second: 0, millisecond: 0 });
          disabledDates.push(thisDate.valueOf());
        });
      }
      else if (_disabledDates instanceof Function) {
        disabledDates = _disabledDates;
      }
    }
    return { disabledDates };
  }

  updateMinMaxRanges = (_minRangeDuration, _maxRangeDuration) => {
    let minRangeDuration = [];
    let maxRangeDuration = [];

    if (_minRangeDuration) {
      if (Array.isArray(_minRangeDuration)) {
        _minRangeDuration.map(mrd => {
          let thisDate = momentSeoulTZ(mrd.date);
          thisDate.set({ hour: 12, minute: 0, second: 0, millisecond: 0 });
          minRangeDuration.push({
            date: thisDate.valueOf(),
            minDuration: mrd.minDuration
          });
        });
      } else {
        minRangeDuration = _minRangeDuration;
      }
    }

    if (_maxRangeDuration) {
      if (Array.isArray(_maxRangeDuration)) {
        _maxRangeDuration.map(mrd => {
          let thisDate = momentSeoulTZ(mrd.date);
          thisDate.set({ hour: 12, minute: 0, second: 0, millisecond: 0 });
          maxRangeDuration.push({
            date: thisDate.valueOf(),
            maxDuration: mrd.maxDuration
          });
        });
      } else {
        maxRangeDuration = _maxRangeDuration;
      }
    }
    return {minRangeDuration, maxRangeDuration};
  }

  handleOnPressDay = ({year, month, day}) => {
    // const {
    //   selectedStartDate: prevSelectedStartDate,
    //   // selectedEndDate: prevSelectedEndDate,
    // } = this.state;

    const {
      // allowRangeSelection,
      // allowBackwardRangeSelect,
      enableDateChange,
      onDateChange,
    } = this.props;

    if (!enableDateChange) {
      return;
    }

    // console.log("year")
    // console.log(year)
    // console.log("month")
    // console.log(month)
    // console.log("day")
    // console.log(day)
    // const date = momentSeoulTZ({ year, month, day, hour: 12 });
    // const date = momentSeoulTZ({ year, month, date:day, hour: 12 });

    // console.log("date.year()")
    // console.log(date.year())
    // console.log("date.month()")
    // console.log(date.month())
    // console.log("date.date()")
    // console.log(date.date())
    // console.log("date.day()")
    // console.log(date.day())
    
    // console.log("allowRangeSelection")
    // console.log(allowRangeSelection)
    // console.log("prevSelectedStartDate")
    // console.log(prevSelectedStartDate)
    // console.log("prevSelectedEndDate")
    // console.log(prevSelectedEndDate)

    // if (allowRangeSelection && prevSelectedStartDate && !prevSelectedEndDate) {
    //   if (date.isSameOrAfter(prevSelectedStartDate, 'day')) {
    //     const selectedStartDate = prevSelectedStartDate;
    //     const selectedEndDate = date;
    //     this.setState({
    //       selectedEndDate,
    //       renderMonthParams: this.createMonthProps({...this.state, selectedStartDate, selectedEndDate}),
    //     });
    //     // Sync end date with parent
    //     onDateChange(date, Utils.END_DATE);
    //   }
    //   else if (allowBackwardRangeSelect) { // date is before selectedStartDate
    //     // Flip dates so that start is always before end.
    //     const selectedEndDate = prevSelectedStartDate.clone();
    //     const selectedStartDate = date;
    //     this.setState({
    //       selectedStartDate,
    //       selectedEndDate,
    //       renderMonthParams: this.createMonthProps({...this.state, selectedStartDate, selectedEndDate}),
    //     }, () => {
    //       // Sync both start and end dates with parent *after* state update.
    //       onDateChange(this.state.selectedStartDate, Utils.START_DATE);
    //       onDateChange(this.state.selectedEndDate, Utils.END_DATE);
    //     });
    //   }
    // } else {
      // 
      // const syncEndDate = !!prevSelectedEndDate;
      // const selectedStartDate = date;
      const selectedStartDate = day;
      // const selectedEndDate = null;
      this.setState({
        selectedStartDate,
        // selectedEndDate,
        renderMonthParams: this.createMonthProps({
          ...this.state,
          selectedStartDate,
          // selectedEndDate
        }),
      }, () => {
        // Sync start date with parent *after* state update.
        onDateChange(this.state.selectedStartDate, Utils.START_DATE);
        // if (syncEndDate) {
        //   // sync end date with parent - must be cleared if previously set.
        //   onDateChange(null, Utils.END_DATE);
        // }
      });
    // }
  }

  handleOnPressPrevious = () => {
    const { currentMonth, currentYear } = this.state;
    let previousMonth = currentMonth - 1;
    let year = currentYear;
    // if previousMonth is negative it means the current month is January,
    // so we have to go back to previous year and set the current month to December
    if (previousMonth < 0) {
      previousMonth = 11;
      year--;
    }
    const scrollFinisher = this.props.scrollable && this.scroller.scrollLeft;
    this.handleOnPressFinisher({year, month: previousMonth, scrollFinisher});
  }

  handleOnPressNext = () => {
    const { currentMonth, currentYear } = this.state;
    let nextMonth = currentMonth + 1;
    let year = currentYear;
    // if nextMonth is greater than 11 it means the current month is December,
    // so we have to go forward to the next year and set the current month to January
    if (nextMonth > 11) {
      nextMonth = 0;
      year++;
    }
    const scrollFinisher = this.props.scrollable && this.scroller.scrollRight;
    this.handleOnPressFinisher({year, month: nextMonth, scrollFinisher});
  }

  handleOnPressFinisher = ({year, month, scrollFinisher, extraState}) => {
    if (scrollFinisher) {
      scrollFinisher();
    }
    else {
      const currentMonth = parseInt(month);
      const currentYear = parseInt(year);
      const renderMonthParams = extraState || {
        renderMonthParams: {...this.state.renderMonthParams, month, year}
      };
      this.setState({ currentMonth, currentYear, ...renderMonthParams });
    }
    const currentMonthYear = momentSeoulTZ({year, month, hour: 12});
    this.props.onMonthChange && this.props.onMonthChange(currentMonthYear);
  }

  // handleOnPressYear = () => {
  //   this.setState({
  //     currentView: 'years'
  //   });
  // }

  // handleOnPressMonth = () => {
  //   this.setState({
  //     currentView: 'months'
  //   });
  // }
  handleOnPressYearMonth = () => {
    this.setState({
      currentView: 'selectDate'
    });
  }

  handleOnSelectYearMonth = ({year, month}) => {
    const currentYear = year;
    const currentMonth = month;
    const scrollableState = this.props.scrollable ? {
      ...this.createMonths(this.props, {currentYear, currentMonth}),
    } : {};

    // console.log("year : "+ year)
    // console.log("month : "+ month)

    const extraState = {
      renderMonthParams: {...this.state.renderMonthParams, month, year},
      currentView: 'days',
      ...scrollableState,
    };

    this.handleOnPressFinisher({year, month, extraState});
  }


  handleOnCancel = () => {
    this.setState({
      currentView: 'days',
    });
  }

  resetSelections = () => {
    this.setState({
      selectedStartDate: null,
      selectedEndDate: null
    });
  }

  createMonthProps = state => {
    return {
      onPressDay: this.handleOnPressDay,
      month: state.currentMonth,
      year: state.currentYear,
      styles: state.styles,
      disabledDates: state.disabledDates,
      minDate: state.minDate,
      maxDate: state.maxDate,
      minRangeDuration: state.minRangeDuration,
      maxRangeDuration: state.maxRangeDuration,
      selectedStartDate: state.selectedStartDate,
      selectedEndDate: state.selectedEndDate,
      enableDateChange: this.props.enableDateChange,
      firstDay: this.props.startFromMonday ? 1 : this.props.firstDay,
      allowRangeSelection: this.props.allowRangeSelection,
      allowBackwardRangeSelect: this.props.allowBackwardRangeSelect,
      showDayStragglers: this.props.showDayStragglers,
      disabledDatesTextStyle: this.props.disabledDatesTextStyle,
      textStyle: this.props.textStyle,
      todayTextStyle: this.props.todayTextStyle,
      selectedDayTextStyle: this.props.selectedDayTextStyle,
      selectedRangeStartTextStyle: this.props.selectedRangeStartTextStyle,
      selectedRangeEndTextStyle: this.props.selectedRangeEndTextStyle,
      selectedDayStyle: this.props.selectedDayStyle,
      selectedDisabledDatesTextStyle: this.props.selectedDisabledDatesTextStyle,
      selectedRangeStartStyle: this.props.selectedRangeStartStyle,
      selectedRangeStyle: this.props.selectedRangeStyle,
      selectedRangeEndStyle: this.props.selectedRangeEndStyle,
      customDatesStyles: this.props.customDatesStyles,

      // 추가. props 에서 dateParamsObject 받아서 넘겨줌
      dateParamsObject: this.props.dateParamsObject,
    };
  }

  // createMonths = (props, {currentMonth, currentYear}) => {
  //   if (!props.scrollable) {
  //     return [];
  //   }

  //   const {
  //     initialDate,
  //     minDate,
  //     maxDate,
  //     restrictMonthNavigation,
  //   } = props;

  //   console.log("createMonths initialDate")
  //   console.log(initialDate)
  //   console.log("createMonths currentMonth")
  //   console.log(currentMonth)

  //   let monthsList = [];
  //   let numMonths = this.numMonthsScroll;
  //   let initialScrollerIndex = 0;

  //   // Center start month in scroller.  Visible month is either the initialDate
  //   // prop, or the current month & year that has been selected.
  //   let _initialDate = Number.isInteger(currentMonth) && Number.isInteger(currentYear) &&
  //       momentSeoulTZ({ year: currentYear, month: currentMonth, hour: 12 });
  //   _initialDate = _initialDate || initialDate;
  //   let firstScrollerMonth = _initialDate.clone().subtract(numMonths/2, 'months');
    
  //   if (minDate && restrictMonthNavigation && firstScrollerMonth.isBefore(minDate, 'month')) {
  //     firstScrollerMonth = momentSeoulTZ(minDate);
  //   }

  //   for (let i = 0; i < numMonths; i++) {
  //     let month = firstScrollerMonth.clone().add(i, 'months');
  //     if (maxDate && restrictMonthNavigation && month.isAfter(maxDate, 'month')) {
  //       break;
  //     }
  //     if (month.isSame(_initialDate, 'month')) {
  //       initialScrollerIndex = i;
  //     }
  //     monthsList.push(month);
  //   }

  //   return {
  //     monthsList,
  //     initialScrollerIndex,
  //   };
  // }

  // 얘 변경
  // recyclerList 에 그려질 총 갯수가 60개 넘으면 하나가 나가리뜸. 그래서 60개 이하로 바꿔주는거. + props 에 restrictMonthNavigation 꼭 넣어야함!!
  createMonths = (props, {currentMonth, currentYear}) => {
    if (!props.scrollable) {
      return [];
    }

    const {
      initialDate,
      minDate,
      maxDate,
      restrictMonthNavigation,
    } = props;

    // 여기서 minDate 랑 maxDate 로 계산해서 나온 값을 가지고 아래에 넣어. 5년 이상인 경우 이하인 경우
    // 그냥 갯수가 있었던 거 같은데. 아 근데 갯수는 안되겠다
    const maxDateMoment = momentSeoulTZ(maxDate);
    const minDateMoment = momentSeoulTZ(minDate);
    const maxDateYear = maxDateMoment.year();
    const minDateYear = minDateMoment.year();

    const yearRange = maxDateYear - minDateYear;

    let minYearMonth;
    let maxYearMonth;

    const typeCheck = Number.isInteger(currentMonth) && Number.isInteger(currentYear);
    // 위로 올림
    // Center start month in scroller.  Visible month is either the initialDate
    // prop, or the current month & year that has been selected.
    let _initialDate = typeCheck && momentSeoulTZ({ year: currentYear, month: currentMonth, hour: 12 });

    _initialDate = _initialDate || initialDate;

    if(!typeCheck){
      // 밑에서 currentYear currentMonth 써서 타입체크 먼저 함
      minYearMonth = maxDateMoment.subtract(59, 'month');
      maxYearMonth = maxDate;
    } else if(yearRange > 4) {
      const yearRangeForMinDate = currentYear - minDateYear;
      const yearRangeForMaxDate = maxDateYear - currentYear;
      if(yearRangeForMinDate > yearRangeForMaxDate) {
        // if(yearRangeForMaxDate > 4) {
        if(yearRangeForMaxDate > 2) {
          minYearMonth = _initialDate.clone().subtract(29,"month");
          maxYearMonth = _initialDate.clone().add(29,"month");
        } else {
          // 이러면 60개 될라나?
          minYearMonth = maxDateMoment.subtract(59, 'month');
          maxYearMonth = maxDate;
        }
      } else {
        // if(yearRangeForMinDate > 4) {
        if(yearRangeForMinDate > 2) {
          minYearMonth = _initialDate.clone().subtract(29,"month");
          maxYearMonth = _initialDate.clone().add(29,"month");
        } else {
          minYearMonth = minDate;
          maxYearMonth = minDateMoment.add(59, 'month');
        }
      }
    } else {
      minYearMonth = minDate;
      maxYearMonth = maxDate;
    }

    let monthsList = [];
    let numMonths = this.numMonthsScroll;
    let initialScrollerIndex = 0;

    // _initialDate 위로 올림

    let firstScrollerMonth = _initialDate.clone().subtract(numMonths/2, 'months');

    // minDate > minYearMonth, maxDate > maxYearMonth 로 변경
    
    if (restrictMonthNavigation && firstScrollerMonth.isBefore(minYearMonth, 'month')) {
      firstScrollerMonth = momentSeoulTZ(minYearMonth);
    }

    for (let i = 0; i < numMonths; i++) {
      let month = firstScrollerMonth.clone().add(i, 'months');
      if (restrictMonthNavigation && month.isAfter(maxYearMonth, 'month')) {
        break;
      }
      if (month.isSame(_initialDate, 'month')) {
        initialScrollerIndex = i;
      }
      monthsList.push(month);
    }

    return {
      monthsList,
      initialScrollerIndex,
    };
  }

  renderMonth(props) {
    return (
      <DaysGridView {...props} />
    );
  }

  render() {
    const {
      currentView,
      currentMonth,
      currentYear,
      minDate,
      maxDate,
      styles,
      monthsList,
      renderMonthParams,
      initialScrollerIndex,
    } = this.state;

    const {
      startFromMonday,
      firstDay,
      initialDate,
      weekdays,
      months,
      previousComponent,
      nextComponent,
      previousTitle,
      nextTitle,
      previousTitleStyle,
      nextTitleStyle,
      monthTitleStyle,
      yearTitleStyle,
      textStyle,
      restrictMonthNavigation,
      headingLevel,
      dayLabelsWrapper,
      customDayHeaderStyles,
      selectMonthTitle,
      selectYearTitle,
      monthYearHeaderWrapperStyle,
      headerWrapperStyle,
      onMonthChange,
      scrollable,
      horizontal,

      // dateParamsObject,
    } = this.props;

    let content;

    if(currentView === "days") {
      content = (
        <View styles={styles.calendar}>
          <HeaderControls
            styles={styles}
            currentMonth={currentMonth}
            currentYear={currentYear}
            initialDate={momentSeoulTZ(initialDate)}
            onPressPrevious={this.handleOnPressPrevious}
            onPressNext={this.handleOnPressNext}
            // onPressMonth={this.handleOnPressMonth}
            // onPressYear={this.handleOnPressYear}
            onPressYearMonth={this.handleOnPressYearMonth}

            months={months}
            previousComponent={previousComponent}
            nextComponent={nextComponent}
            previousTitle={previousTitle}
            nextTitle={nextTitle}
            previousTitleStyle={previousTitleStyle}
            nextTitleStyle={nextTitleStyle}
            monthTitleStyle={monthTitleStyle}
            yearTitleStyle={yearTitleStyle}
            textStyle={textStyle}
            restrictMonthNavigation={restrictMonthNavigation}
            minDate={minDate}
            maxDate={maxDate}
            headingLevel={headingLevel}
            monthYearHeaderWrapperStyle={monthYearHeaderWrapperStyle}
            headerWrapperStyle={headerWrapperStyle}
          />
          <Weekdays
            styles={styles}
            firstDay={startFromMonday ? 1 : firstDay}
            currentMonth={currentMonth}
            currentYear={currentYear}
            weekdays={weekdays}
            textStyle={textStyle}
            dayLabelsWrapper={dayLabelsWrapper}
            customDayHeaderStyles={customDayHeaderStyles}
          />
          { scrollable ?
            <Scroller
              ref={scroller => this.scroller = scroller}
              data={monthsList}
              renderMonth={this.renderMonth}
              renderMonthParams={renderMonthParams}
              maxSimultaneousMonths={this.numMonthsScroll}
              initialRenderIndex={initialScrollerIndex}
              minDate={minDate}
              maxDate={maxDate}
              restrictMonthNavigation={restrictMonthNavigation}
              updateMonthYear={this.updateMonthYear}
              onMonthChange={onMonthChange}
              horizontal={horizontal}
            />
            :
            this.renderMonth(renderMonthParams)
          }
        </View>
      );
    } else {
      content = (
        <YearMonthSelector
          styles={styles}
          textStyle={textStyle}
          title={selectYearTitle}
          currentYear={currentYear}
          minDate={minDate}
          maxDate={maxDate}
          headingLevel={headingLevel}

          onSelectYear={this.handleOnSelectYearMonth}
          onCancel={this.handleOnCancel}

          currentMonth={currentMonth}
          initialDate={momentSeoulTZ(initialDate)}
          restrictNavigation={restrictMonthNavigation}
          previousComponent={previousComponent}
          nextComponent={nextComponent}
          previousTitle={previousTitle}
          nextTitle={nextTitle}
          previousTitleStyle={previousTitleStyle}
          nextTitleStyle={nextTitleStyle}
        />
      );
    }
    
    return content;
  }
}
