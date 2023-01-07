import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import useBackgroundColorAndTextColor from '../../../hooks/useBackgroundColorAndTextColor';
import { colors } from '../../../js-assets/color';
import { FontAppliedBaseTextNeedFontSize } from '../../../styled-components/FontAppliedComponents';
import ScrollPicker from '../ScrollViewPicker';

const BlackText = styled(FontAppliedBaseTextNeedFontSize)`
  color: black;
  border-radius: 5px;
  background-color: ${colors.yellow};
  padding: 10px 20px;
`;

// memo 안써도 될듯. 똑같이 작동하는 듯?

// type YearMonthSelectorProps = {
//   styles,
//   textStyle,
//   title,
//   initialDate,
//   currentMonth,
//   currentYear,
//   minDate,
//   maxDate,
//   restrictNavigation,
//   previousComponent,
//   nextComponent,
//   previousTitle,
//   nextTitle,
//   previousTitleStyle,
//   nextTitleStyle,
//   headingLevel,
//   onSelectYear,
//   onCancel,
// }

const YearMonthSelector = (props) => {
  const {
    styles,
    // textStyle,
    // title,
    // initialDate,
    currentMonth,
    currentYear,
    minDate,
    maxDate,
    // restrictNavigation,
    // previousComponent,
    // nextComponent,
    // previousTitle,
    // nextTitle,
    // previousTitleStyle,
    // nextTitleStyle,
    // headingLevel,
    onSelectYear,
    onCancel,
  } = props;

  // console.log("YearMonthSelector")

  const [selectedYear,setSelectedYear] = useState(currentYear);
  // currentMonth 는 0 부터 시작
  const [selectedMonth,setSelectedMonth] = useState(currentMonth);

  // console.log("currentMonth")
  // console.log(currentMonth)
  // console.log("selectedMonth")
  // console.log(selectedMonth)

  const minYear = minDate ? minDate.year() : 1970;
  const maxYear = maxDate ? maxDate.year() : new Date().getFullYear();
  const maxDateMonth = maxDate ? maxDate.month() : new Date().getMonth();
  const maxMonth = maxDateMonth + 1;

  // console.log("maxMonth")
  // console.log(maxMonth)

  const yearArr: number[] = [];

  for(let i=minYear;i<maxYear+1;i++) {
    yearArr.push(i);
  }

  const monthArr: number[] = [1,2,3,4,5,6,7,8,9,10,11,12];
  const lastYearMonth: number[] = [];

  for(let i = 1; i < maxMonth + 1; i++) {
    lastYearMonth.push(i);
  }

  const currentYearIndex = yearArr.findIndex(year=>year === currentYear);

  const onPressSelectOk = () => {
    // 올해가 5월까지 있는데 다른년에서 7월 했다가 올해 와서 5월로 바뀌면 7월 값에 머물러있음. 그러면 다른 년도로 감.
    const moreThanMaxDate = selectedYear === maxYear && selectedMonth > maxDateMonth;
    const goToMonth = moreThanMaxDate ? maxDateMonth : selectedMonth;
    
    onSelectYear({month: goToMonth ,year: selectedYear});
  };

  const onPressCancel = () => onCancel();

  const {backgroundColor} = useBackgroundColorAndTextColor();

  return (
    <View
      style={styles.calendar}
    >
      <View
        style={{
          flexDirection: "row",
          // flex: 1,
        }}
      >
        <View
          style={{
            flex: 1,
            // marginHorizontal: 40,
            marginLeft: 40,
            marginRight: 30,
            height: 180,
          }}
        >
          <ScrollPicker
            dataSource={yearArr}
            selectedIndex={currentYearIndex}
            renderItem={(data, index) => {
              return (
                <FontAppliedBaseTextNeedFontSize>{data}</FontAppliedBaseTextNeedFontSize>
              )
            }}
            onValueChange={(data, selectedIndex) => {
              console.log("data")
              console.log(data)
              console.log("selectedIndex")
              console.log(selectedIndex)
              setSelectedYear(data)
            }}
            wrapperHeight={180}
            // wrapperWidth={150}
            wrapperColor={backgroundColor}
            itemHeight={50}
            highlightColor='#d8d8d8'
            highlightBorderWidth={2}
          />
        </View>
        <View
          style={{
            flex: 1,
            // marginHorizontal: 40,
            marginLeft: 30,
            marginRight: 40,
            height: 180,
          }}
        >
          <ScrollPicker
            dataSource={selectedYear === maxYear ? lastYearMonth : monthArr}
            selectedIndex={currentMonth}
            renderItem={(data, index) => {
              return (
                <FontAppliedBaseTextNeedFontSize>{data}월</FontAppliedBaseTextNeedFontSize>
              )
            }}
            onValueChange={(data, selectedIndex) => {
              console.log("data")
              console.log(data)
              console.log("selectedIndex")
              console.log(selectedIndex)
              setSelectedMonth(selectedIndex);
            }}
            wrapperHeight={180}
            // wrapperWidth={150}
            wrapperColor={backgroundColor}
            itemHeight={50}
            highlightColor='#d8d8d8'
            highlightBorderWidth={2}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 60,
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: "center",
          }}
          onPress={onPressSelectOk}
        >
          <BlackText>이동</BlackText>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: "center",
          }}
          onPress={onPressCancel}
        >
          <BlackText>취소</BlackText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default YearMonthSelector;