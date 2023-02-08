import React, { useMemo } from 'react';
import {
  View,
  // Text,
  TouchableOpacity,
  // Pressable,
  // TouchableHighlight,
} from 'react-native';
// import moment from 'moment';
// import moment from "moment-timezone";
import momentSeoulTZ from '../../../logic/momentSeoul/momentSeoulTZ';
import { FontAppliedBaseTextNeedFontSize } from '../../../styled-components/FontAppliedComponents';
import RenderCustomDay from './RenderCustomDay';

const Day = (props) => {
  const {
    day,
    month,
    year,
    styles,
    customDatesStyles,
    onPressDay,
    selectedStartDate,
    // selectedEndDate,
    // allowRangeSelection,
    // allowBackwardRangeSelect,
    selectedDayStyle: propSelectedDayStyle,
    selectedDisabledDatesTextStyle,
    // selectedRangeStartStyle,
    // selectedRangeStyle,
    // selectedRangeEndStyle,
    textStyle,
    todayTextStyle,
    selectedDayTextStyle: propSelectedDayTextStyle,
    // selectedRangeStartTextStyle,
    // selectedRangeEndTextStyle,
    minDate,
    maxDate,
    disabledDates,
    disabledDatesTextStyle,
    // minRangeDuration,
    // maxRangeDuration,
    enableDateChange,
    dateParamsObject,
  } = props;

  // console.log("month : "+month+" day : "+day)


  // 추가
  const dayParam = dateParamsObject?.[day];


  // const thisDay = momentSeoulTZ({year, month, day, hour: 12 });
  // const today = momentSeoulTZ();

  // let dateOutOfRange;
  let computedSelectedDayStyle = styles.dayButton; // may be overridden depending on state
  let selectedDayTextStyle = {};
  let selectedDayStyle;
  let overrideOutOfRangeTextStyle;
  // let dateIsBeforeMin = false;
  // let dateIsAfterMax = false;
  // let dateIsDisabled = false;
  // let dateRangeLessThanMin = false;
  // let dateRangeGreaterThanMax = false;

  // First let's check if date is out of range
  // Check whether props maxDate / minDate are defined. If not supplied,
  // don't restrict dates.
  // if (maxDate) {
  //   dateIsAfterMax = thisDay.isAfter(maxDate, 'day');
  // }
  // if (minDate) {
  //   dateIsBeforeMin = thisDay.isBefore(minDate, 'day');
  // }

  // if (disabledDates) {
  //   if (Array.isArray(disabledDates) && disabledDates.indexOf(thisDay.valueOf()) >= 0) {
  //     dateIsDisabled = true;
  //   }
  //   else if (disabledDates instanceof Function) {
  //     dateIsDisabled = disabledDates(thisDay);
  //   }
  // }

  // dateOutOfRange = dateIsAfterMax || dateIsBeforeMin || dateIsDisabled || dateRangeLessThanMin || dateRangeGreaterThanMax;

  const {
    thisDay,
    isToday,
    dateOutOfRange,
  } = useMemo(()=>getVariable(maxDate,minDate,disabledDates,year, month, day),[]);
  

  // let isThisDaySameAsSelectedStart = thisDay.isSame(selectedStartDate, 'day');
  let isThisDaySameAsSelectedStart = day === selectedStartDate;
  // let isThisDaySameAsSelectedEnd = thisDay.isSame(selectedEndDate, 'day');
  // let isThisDateInSelectedRange =
  //   selectedStartDate
  //   && selectedEndDate
  //   && thisDay.isBetween(selectedStartDate, selectedEndDate,'day','[]');

  // If date is in range let's apply styles
  // if (!dateOutOfRange || isThisDaySameAsSelectedStart || isThisDaySameAsSelectedEnd || isThisDateInSelectedRange) {
  if (!dateOutOfRange || isThisDaySameAsSelectedStart) {
    // set today's style
    // let isToday = thisDay.isSame(today, 'day');
    if (isToday) {
      computedSelectedDayStyle = styles.selectedToday;
      // todayTextStyle prop overrides selectedDayTextColor (created via makeStyles)
      selectedDayTextStyle = [todayTextStyle || styles.selectedDayLabel, propSelectedDayTextStyle];
    }

    const custom = getCustomDateStyle({customDatesStyles, date: thisDay});

    if (isToday && custom.style) {
      // Custom date style overrides 'today' style. It may be reset below
      // by date selection styling.
      computedSelectedDayStyle = [styles.selectedToday, custom.style];
    }

    // set selected day style
    if (
        // !allowRangeSelection &&
        // 얜 없어도 되는거 같아서 걍 뻄
        // selectedStartDate &&
        isThisDaySameAsSelectedStart)
    {
      computedSelectedDayStyle = styles.selectedDay;
      selectedDayTextStyle = [styles.selectedDayLabel, isToday && todayTextStyle, propSelectedDayTextStyle];
      // selectedDayStyle prop overrides selectedDayColor (created via makeStyles)
      selectedDayStyle = propSelectedDayStyle || styles.selectedDayBackground;
    }


    // 외부 날짜 + 오늘이랑 날은 같은 애. ex) 오늘 10/29 > 9/29 뜨는 애.
    if (dateOutOfRange) { // start or end date selected, and this date outside of range.
      
      // 클릭 못하는 바깥 부분 이랑 같아야 하는거 아닌가?
      return (
        <View style={[styles.dayWrapper, custom.containerStyle]}>
          <View style={[
            custom.style,
            // computedSelectedDayStyle,
            // selectedDayStyle
          ]}>
            <FontAppliedBaseTextNeedFontSize style={[
              styles.dayLabel,
              textStyle,
              styles.disabledText,
              disabledDatesTextStyle,
              // styles.selectedDisabledText,
              selectedDisabledDatesTextStyle,
              overrideOutOfRangeTextStyle
            ]}>
              { day }
            </FontAppliedBaseTextNeedFontSize>
          </View>
        </View>
      );
    } else {
      // 이게 클릭 가능한 부분
      return (
        <View style={[styles.dayWrapper, custom.containerStyle]}>
          <TouchableOpacity
            disabled={!enableDateChange}
            style={[custom.style, computedSelectedDayStyle, selectedDayStyle, ]}
            onPress={() => onPressDay({year, month, day})}
          >
            <RenderCustomDay
              styleArray={[styles.dayLabel, textStyle, custom.textStyle, selectedDayTextStyle]}
              day={day}
              dayParam={dayParam}
              dotStyle={styles.dot}
            />
          </TouchableOpacity>
        </View>
      );
    }
  }
  // 클릭 못하는 바깥 부분
  else {  // dateOutOfRange = true, and no selected start or end date.
    const custom = getCustomDateStyle({customDatesStyles, date: thisDay});
    // Allow customDatesStyles to override disabled dates if allowDisabled set
    if (!custom.allowDisabled) {
      custom.containerStyle = null;
      custom.style = null;
      custom.textStyle = null;
    }
    return (
      <View style={[styles.dayWrapper, custom.containerStyle]}>
        <View style={[styles.dayButton, custom.style]}>
          <FontAppliedBaseTextNeedFontSize style={[textStyle, styles.disabledText, disabledDatesTextStyle, custom.textStyle]}>
            { day }
          </FontAppliedBaseTextNeedFontSize>
        </View>
      </View>
    );
  }
};


const getVariable = (maxDate, minDate, disabledDates, year, month, day) => {

  // console.log("getVariable")

  const thisDay = momentSeoulTZ({year, month, day, hour: 12 });
  const today = momentSeoulTZ();
  const isToday = thisDay.isSame(today, 'day');

  let dateIsBeforeMin = false;
  let dateIsAfterMax = false;
  let dateIsDisabled = false;

  if (maxDate) {
    dateIsAfterMax = thisDay.isAfter(maxDate, 'day');
  }
  if (minDate) {
    dateIsBeforeMin = thisDay.isBefore(minDate, 'day');
  }

  if (disabledDates instanceof Function) {
    dateIsDisabled = disabledDates(thisDay);
  }

  const dateOutOfRange = dateIsAfterMax || dateIsBeforeMin || dateIsDisabled;

  return {
    thisDay,
    isToday,
    dateOutOfRange,
  };
};

const getCustomDateStyle = ({customDatesStyles, date}) => {
  if (Array.isArray(customDatesStyles)) {
    for (let cds of customDatesStyles) {
      if (date.isSame(momentSeoulTZ(cds.date), 'day')) {
        return {...cds};
      }
    }
  }
  else if (customDatesStyles instanceof Function) {
    let cds = customDatesStyles(date) || {};
    return {...cds};
  }
  return {};
};

Day.defaultProps = {
  customDatesStyles: [],
};

// 다크모드도 체크해야함.

export default React.memo(Day,(prevProps,nextProps)=>(
  // dateParamsObject 이 바뀐걸 알라나?, day 도 확인해야하나?
  // true 면 렌더링이 안 되는거임!!!! false 가 되게 만들어야함
  // nextProps.selectedStartDate !== nextProps.day && 
  // prevProps.selectedStartDate !== prevProps.day

  nextProps.selectedStartDate !== nextProps.day && 
  prevProps.selectedStartDate !== prevProps.day &&
  // prevProps.dateParamsObject === nextProps.dateParamsObject
  prevProps.dateParamsObject?.[prevProps.day] === nextProps.dateParamsObject?.[prevProps.day]
));
// export default Day;













// import React from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   // Pressable,
//   // TouchableHighlight,
// } from 'react-native';
// import moment from 'moment';
// import RenderCustomDay from './RenderCustomDay';

// const Day = (props) => {
//   const {
//     day,
//     month,
//     year,
//     styles,
//     customDatesStyles,
//     onPressDay,
//     selectedStartDate,
//     // selectedEndDate,
//     // allowRangeSelection,
//     // allowBackwardRangeSelect,
//     selectedDayStyle: propSelectedDayStyle,
//     selectedDisabledDatesTextStyle,
//     // selectedRangeStartStyle,
//     // selectedRangeStyle,
//     // selectedRangeEndStyle,
//     textStyle,
//     todayTextStyle,
//     selectedDayTextStyle: propSelectedDayTextStyle,
//     // selectedRangeStartTextStyle,
//     // selectedRangeEndTextStyle,
//     minDate,
//     maxDate,
//     disabledDates,
//     disabledDatesTextStyle,
//     // minRangeDuration,
//     // maxRangeDuration,
//     enableDateChange,
//     dateParamsObject,
//   } = props;

//   // console.log("month : "+month+" day : "+day)


//   // 추가
//   const dayParam = dateParamsObject?.[day];

//   // console.log("dateParamsObject?.[day]")
//   // console.log(dateParamsObject?.[day])
//   // console.log("day")
//   // console.log(day)
//   // console.log("dateParamsObject")
//   // console.log(dateParamsObject)

//   // const [isPress,setIsPress] = useState(false);

//   const thisDay = momentSeoulTZ({year, month, day, hour: 12 });
//   const today = momentSeoulTZ();

//   let dateOutOfRange;
//   let computedSelectedDayStyle = styles.dayButton; // may be overridden depending on state
//   let selectedDayTextStyle = {};
//   let selectedDayStyle;
//   let overrideOutOfRangeTextStyle;
//   let dateIsBeforeMin = false;
//   let dateIsAfterMax = false;
//   let dateIsDisabled = false;
//   let dateRangeLessThanMin = false;
//   let dateRangeGreaterThanMax = false;

//   // First let's check if date is out of range
//   // Check whether props maxDate / minDate are defined. If not supplied,
//   // don't restrict dates.
//   if (maxDate) {
//     dateIsAfterMax = thisDay.isAfter(maxDate, 'day');
//   }
//   if (minDate) {
//     dateIsBeforeMin = thisDay.isBefore(minDate, 'day');
//   }

//   if (disabledDates) {
//     if (Array.isArray(disabledDates) && disabledDates.indexOf(thisDay.valueOf()) >= 0) {
//       dateIsDisabled = true;
//     }
//     else if (disabledDates instanceof Function) {
//       dateIsDisabled = disabledDates(thisDay);
//     }
//   }

//   // if (allowRangeSelection && selectedStartDate && !selectedEndDate) {
//   //   let daysDiff = thisDay.diff(selectedStartDate, 'days'); // may be + or -
//   //   daysDiff = allowBackwardRangeSelect ? Math.abs(daysDiff) : daysDiff;

//   //   if (maxRangeDuration) {
//   //     if (Array.isArray(maxRangeDuration)) {
//   //       let maxRangeEntry = maxRangeDuration.find(mrd => selectedStartDate.isSame(mrd.date, 'day') );
//   //       if (maxRangeEntry && daysDiff > maxRangeEntry.maxDuration) {
//   //         dateRangeGreaterThanMax = true;
//   //       }
//   //     } else if(daysDiff > maxRangeDuration) {
//   //       dateRangeGreaterThanMax = true;
//   //     }
//   //   }

//   //   if (minRangeDuration) {
//   //     if (Array.isArray(minRangeDuration)) {
//   //       let minRangeEntry = minRangeDuration.find(mrd => selectedStartDate.isSame(mrd.date, 'day') );
//   //       if (minRangeEntry && daysDiff < minRangeEntry.minDuration) {
//   //         dateRangeLessThanMin = true;
//   //       }
//   //     } else if(daysDiff < minRangeDuration) {
//   //       dateRangeLessThanMin = true;
//   //     }
//   //   }

//   //   if (!allowBackwardRangeSelect && daysDiff < 0) {
//   //     dateRangeLessThanMin = true;
//   //   }
//   // }

//   dateOutOfRange = dateIsAfterMax || dateIsBeforeMin || dateIsDisabled || dateRangeLessThanMin || dateRangeGreaterThanMax;
  

//   // let isThisDaySameAsSelectedStart = thisDay.isSame(selectedStartDate, 'day');
//   let isThisDaySameAsSelectedStart = day === selectedStartDate;
//   // let isThisDaySameAsSelectedEnd = thisDay.isSame(selectedEndDate, 'day');
//   // let isThisDateInSelectedRange =
//   //   selectedStartDate
//   //   && selectedEndDate
//   //   && thisDay.isBetween(selectedStartDate, selectedEndDate,'day','[]');

//   // If date is in range let's apply styles
//   // if (!dateOutOfRange || isThisDaySameAsSelectedStart || isThisDaySameAsSelectedEnd || isThisDateInSelectedRange) {
//   if (!dateOutOfRange || isThisDaySameAsSelectedStart) {
//     // set today's style
//     let isToday = thisDay.isSame(today, 'day');
//     if (isToday) {
//       computedSelectedDayStyle = styles.selectedToday;
//       // todayTextStyle prop overrides selectedDayTextColor (created via makeStyles)
//       selectedDayTextStyle = [todayTextStyle || styles.selectedDayLabel, propSelectedDayTextStyle];
//     }

//     const custom = getCustomDateStyle({customDatesStyles, date: thisDay});

//     if (isToday && custom.style) {
//       // Custom date style overrides 'today' style. It may be reset below
//       // by date selection styling.
//       computedSelectedDayStyle = [styles.selectedToday, custom.style];
//     }

//     // set selected day style
//     if (
//         // !allowRangeSelection &&
//         selectedStartDate &&
//         isThisDaySameAsSelectedStart)
//     {
//       computedSelectedDayStyle = styles.selectedDay;
//       selectedDayTextStyle = [styles.selectedDayLabel, isToday && todayTextStyle, propSelectedDayTextStyle];
//       // selectedDayStyle prop overrides selectedDayColor (created via makeStyles)
//       selectedDayStyle = propSelectedDayStyle || styles.selectedDayBackground;
//     }

//     // // Set selected ranges styles
//     // if (allowRangeSelection) {
//     //   if (selectedStartDate && selectedEndDate) {
//     //     // Apply style for start date
//     //     if (isThisDaySameAsSelectedStart) {
//     //       computedSelectedDayStyle = [styles.startDayWrapper, selectedRangeStyle, selectedRangeStartStyle];
//     //       selectedDayTextStyle = [styles.selectedDayLabel, propSelectedDayTextStyle, selectedRangeStartTextStyle];
//     //     }
//     //     // Apply style for end date
//     //     if (isThisDaySameAsSelectedEnd) {
//     //       computedSelectedDayStyle = [styles.endDayWrapper, selectedRangeStyle, selectedRangeEndStyle];
//     //       selectedDayTextStyle = [styles.selectedDayLabel, propSelectedDayTextStyle, selectedRangeEndTextStyle];
//     //     }
//     //     // Apply style if start date is the same as end date
//     //     if (isThisDaySameAsSelectedEnd &&
//     //         isThisDaySameAsSelectedStart &&
//     //         selectedEndDate.isSame(selectedStartDate, 'day'))
//     //     {
//     //       computedSelectedDayStyle = [styles.selectedDay, styles.selectedDayBackground, selectedRangeStyle];
//     //       selectedDayTextStyle = [styles.selectedDayLabel, propSelectedDayTextStyle, selectedRangeStartTextStyle];
//     //     }
//     //     // Apply style for days inside of range, excluding start & end dates.
//     //     if (thisDay.isBetween(selectedStartDate, selectedEndDate, 'day', '()')) {
//     //       computedSelectedDayStyle = [styles.inRangeDay, selectedRangeStyle];
//     //       selectedDayTextStyle = [styles.selectedDayLabel, propSelectedDayTextStyle];
//     //     }
//     //   }
//     //   // Apply style if start date has been selected but end date has not
//     //   if (selectedStartDate &&
//     //       !selectedEndDate &&
//     //       isThisDaySameAsSelectedStart)
//     //   {
//     //     computedSelectedDayStyle = [styles.startDayWrapper, selectedRangeStyle, selectedRangeStartStyle];
//     //     selectedDayTextStyle = [styles.selectedDayLabel, propSelectedDayTextStyle, selectedRangeStartTextStyle];
//     //     // Override out of range start day text style when minRangeDuration = 1.
//     //     // This allows selected start date's text to be styled by selectedRangeStartTextStyle
//     //     // even when it's below minRangeDuration.
//     //     overrideOutOfRangeTextStyle = selectedRangeStartTextStyle;
//     //   }
//     // }

//     // 외부 날짜 + 오늘이랑 날은 같은 애. ex) 오늘 10/29 > 9/29 뜨는 애.
//     if (dateOutOfRange) { // start or end date selected, and this date outside of range.
//       // console.log("dateIsAfterMax")
//       // console.log(dateIsAfterMax)
//       // console.log("dateIsBeforeMin")
//       // console.log(dateIsBeforeMin)
//       // console.log("dateIsDisabled")
//       // console.log(dateIsDisabled)
//       // console.log("dateRangeLessThanMin")
//       // console.log(dateRangeLessThanMin)
//       // console.log("dateRangeGreaterThanMax")
//       // console.log(dateRangeGreaterThanMax)
      
//       // 클릭 못하는 바깥 부분 이랑 같아야 하는거 아닌가?
//       return (
//         <View style={[styles.dayWrapper, custom.containerStyle]}>
//           <View style={[
//             custom.style,
//             // computedSelectedDayStyle,
//             // selectedDayStyle
//           ]}>
//             <Text style={[
//               styles.dayLabel,
//               textStyle,
//               styles.disabledText,
//               disabledDatesTextStyle,
//               // styles.selectedDisabledText,
//               selectedDisabledDatesTextStyle,
//               overrideOutOfRangeTextStyle
//             ]}>
//               { day }
//             </Text>
//             {/* <RenderCustomDay
//               styleArray={[styles.dayLabel, textStyle,
//                 styles.disabledText, disabledDatesTextStyle,
//                 styles.selectedDisabledText, selectedDisabledDatesTextStyle,
//                 overrideOutOfRangeTextStyle
//               ]}
//               day={day}
//               dayParam={dayParam}
//             /> */}
//           </View>
//         </View>
//       );
//     } else {
//       // 이게 클릭 가능한 부분
//       return (
//         <View style={[styles.dayWrapper, custom.containerStyle]}>
//           <TouchableOpacity
//             disabled={!enableDateChange}
//             style={[custom.style, computedSelectedDayStyle, selectedDayStyle,
//               // {opacity:isPress ? 0.5 : 1}
//             ]}
//             // underlayColor="white"
//             // activeOpacity={0}
//             onPress={() => {
//               onPressDay({year, month, day})
//               // console.log("year")
//               // console.log(year)
//               // console.log("month")
//               // console.log(month)
//               // console.log("day")
//               // console.log(day)
//             } }
//             // onPressIn={()=>setIsPress(true)}
//             // onPressOut={()=>setIsPress(false)}
//           >
//             {/* <Text style={[styles.dayLabel, textStyle, custom.textStyle, selectedDayTextStyle]}>
//               { day }
//             </Text> */}
//             <RenderCustomDay
//               styleArray={[styles.dayLabel, textStyle, custom.textStyle, selectedDayTextStyle]}
//               day={day}
//               dayParam={dayParam}
//             />
//           </TouchableOpacity>
//         </View>
//       );
//     }
//   }
//   // 클릭 못하는 바깥 부분
//   else {  // dateOutOfRange = true, and no selected start or end date.
//     const custom = getCustomDateStyle({customDatesStyles, date: thisDay});
//     // Allow customDatesStyles to override disabled dates if allowDisabled set
//     if (!custom.allowDisabled) {
//       custom.containerStyle = null;
//       custom.style = null;
//       custom.textStyle = null;
//     }
//     return (
//       <View style={[styles.dayWrapper, custom.containerStyle]}>
//         <View style={[styles.dayButton, custom.style]}>
//           <Text style={[textStyle, styles.disabledText, disabledDatesTextStyle, custom.textStyle]}>
//             { day }
//           </Text>
//           {/* <RenderCustomDay
//             styleArray={[textStyle, styles.disabledText, disabledDatesTextStyle, custom.textStyle]}
//             day={day}
//             dayParam={dayParam}
//           /> */}
//         </View>
//       </View>
//     );
//   }
// };

// const getCustomDateStyle = ({customDatesStyles, date}) => {
//   if (Array.isArray(customDatesStyles)) {
//     for (let cds of customDatesStyles) {
//       if (date.isSame(momentSeoulTZ(cds.date), 'day')) {
//         return {...cds};
//       }
//     }
//   }
//   else if (customDatesStyles instanceof Function) {
//     let cds = customDatesStyles(date) || {};
//     return {...cds};
//   }
//   return {};
// };

// Day.defaultProps = {
//   customDatesStyles: [],
// };


// export default React.memo(Day,(prevProps,nextProps)=>(
//   // true 면 렌더링이 안 되는거임!!!! false 가 되게 만들어야함
//   // nextProps.selectedStartDate !== nextProps.day && 
//   // prevProps.selectedStartDate !== prevProps.day

//   nextProps.selectedStartDate !== nextProps.day && 
//   prevProps.selectedStartDate !== prevProps.day &&
//   // prevProps.dateParamsObject === nextProps.dateParamsObject
//   prevProps.dateParamsObject?.[prevProps.day] === nextProps.dateParamsObject?.[prevProps.day]
// ));
// // export default Day;