/**
 * Calendar Picker Component
 *
 * Copyright 2016 Yahoo Inc.
 * Licensed under the terms of the MIT license. See LICENSE file in the project root for terms.
 */
const DEFAULT_SELECTED_BACKGROUND_COLOR = '#5ce600';
const DEFAULT_SELECTED_TEXT_COLOR = '#000000';
const DEFAULT_TODAY_BACKGROUND_COLOR = '#CCCCCC';

function getBorderRadiusByShape(scaler, dayShape) {
  if (dayShape === 'square') {
    return 0;
  } else {
    return 30*scaler;
  }
}

export function makeStyles(params) {
  const {
    containerWidth,
    containerHeight,
    scaleFactor,
    selectedDayColor,
    selectedDayTextColor,
    todayBackgroundColor,
    dayShape
  } = params;
  const deviceScale = Math.min(containerWidth, containerHeight) / scaleFactor;
  const baseScaler = Math.min(deviceScale,1.7);
  const dotScaler = baseScaler * 0.7; // 추가
  const SELECTED_BG_COLOR = selectedDayColor ? selectedDayColor : DEFAULT_SELECTED_BACKGROUND_COLOR;
  const SELECTED_TEXT_COLOR = selectedDayTextColor ? selectedDayTextColor : DEFAULT_SELECTED_TEXT_COLOR;
  const TODAY_BG_COLOR = todayBackgroundColor ? todayBackgroundColor : DEFAULT_TODAY_BACKGROUND_COLOR;

  // styled component 에 style fontSize 주면 높이가 세팅이 안되서 넘어가는게 짤림.
  // pad 에서 짤려서 lineHeight 추가

  return {
    containerWidth,
    containerHeight,

    calendar: {
      height: 320*baseScaler,
      marginTop: 10*baseScaler
    },

    dayButton: {
      width: 30*baseScaler,
      height: 30*baseScaler,
      borderRadius: getBorderRadiusByShape(baseScaler, dayShape),
      alignSelf: 'center',
      justifyContent: 'center'
    },

    dayLabel: {
      fontSize: 14*baseScaler,
      lineHeight: 14*baseScaler,
      // color: '#000',
      alignSelf: 'center'
    },

    selectedDayLabel: {
      color: SELECTED_TEXT_COLOR,
    },

    dayLabelsWrapper: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderTopWidth: 1,
      paddingTop: 10*baseScaler,
      paddingBottom: 10*baseScaler,
      alignSelf: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.0)',
      borderColor: 'rgba(0,0,0,0.2)'
    },

    daysWrapper: {
      alignSelf: 'center',
      justifyContent: 'center'
    },

    dayLabels: {
      width: 50*baseScaler,
      fontSize: 12*baseScaler,
      lineHeight: 12*baseScaler,
      color: '#000',
      textAlign: 'center'
    },

    selectedDay: {
      width: 30*baseScaler,
      height:30*baseScaler,
      borderRadius: getBorderRadiusByShape(baseScaler, dayShape),
      alignSelf: 'center',
      justifyContent: 'center'
    },

    selectedDayBackground: {
      backgroundColor: SELECTED_BG_COLOR,
    },

    selectedToday: {
      width: 30*baseScaler,
      height:30*baseScaler,
      backgroundColor: TODAY_BG_COLOR,
      borderRadius: getBorderRadiusByShape(baseScaler, dayShape),
      alignSelf: 'center',
      justifyContent: 'center'
    },

    dayWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 50*baseScaler,
      height: 40*baseScaler,
      backgroundColor: 'rgba(0,0,0,0.0)'
    },

    startDayWrapper: {
      width: 50*baseScaler,
      height: 30*baseScaler,
      borderTopLeftRadius: 20*baseScaler,
      borderBottomLeftRadius: 20*baseScaler,
      backgroundColor: SELECTED_BG_COLOR,
      alignSelf: 'center',
      justifyContent: 'center'
    },

    endDayWrapper: {
      width: 50*baseScaler,
      height: 30*baseScaler,
      borderTopRightRadius: 20*baseScaler,
      borderBottomRightRadius: 20*baseScaler,
      backgroundColor: SELECTED_BG_COLOR,
      alignSelf: 'center',
      justifyContent: 'center'
    },

    inRangeDay: {
      width: 50*baseScaler,
      height: 30*baseScaler,
      backgroundColor: SELECTED_BG_COLOR,
      alignSelf: 'center',
      justifyContent: 'center'
    },

    headerWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'space-between',
      width: containerWidth,
      padding: 5*baseScaler,
      paddingBottom: 3*baseScaler,
      marginBottom: 10*baseScaler,
      backgroundColor: 'rgba(0,0,0,0.0)'
    },

    monthYearHeaderWrapper: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 3*baseScaler,
    },

    previousContainer: {
      marginLeft: 10*baseScaler,
    },

    nextContainer: {
      marginRight: 10*baseScaler,
      alignItems: 'flex-end',
    },

    navButtonText: {
      fontSize: 14*baseScaler,
      lineHeight: 14*baseScaler,
    },

    weeks: {
      flexDirection: 'column'
    },

    weekRow: {
      flexDirection: 'row'
    },

    disabledText: {
      fontSize: 14*baseScaler,
      lineHeight: 14*baseScaler,
      // color: '#BBBBBB',
      color: 'rgba(167,167,167,0.7)',
      alignSelf: 'center',
      justifyContent: 'center'
    },

    selectedDisabledText: {
      fontSize: 14*baseScaler,
      lineHeight: 14*baseScaler,
      color: '#DDDDDD',
      alignSelf: 'center',
      justifyContent: 'center'
    },

    monthHeaderMainText: {
      fontSize: 15*baseScaler,
      lineHeight: 15*baseScaler,
      // color: '#000',
      textAlign: 'right',
      marginHorizontal: 3*baseScaler,
    },

    monthButton: {
      width: 30*baseScaler,
      height: 30*baseScaler,
      borderRadius: 30*baseScaler,
      alignSelf: 'center',
      justifyContent: 'center'
    },

    monthsHeaderText: {
      flex: 1,
      fontSize: 16*baseScaler,
      lineHeight: 16*baseScaler,
      color: '#000',
      textAlign: 'center'
    },

    monthContainer: {
      flex: 1,
      alignItems: 'center',
    },

    monthText: {
      fontSize: 14*baseScaler,
      lineHeight: 14*baseScaler,
      color: '#000',
      alignSelf: 'center'
    },

    monthsWrapper: {
      alignSelf: 'center',
      justifyContent: 'center',
      width: containerWidth,
    },

    monthsRow: {
      flexDirection: 'row',
      padding: 20*baseScaler,
    },

    yearHeaderMainText: {
      fontSize: 16*baseScaler,
      lineHeight: 16*baseScaler,
      color: '#000',
      marginHorizontal: 3*baseScaler,
    },

    yearContainer: {
      flex: 1,
      alignItems: 'center',
    },

    yearText: {
      fontSize: 14*baseScaler,
      lineHeight: 14*baseScaler,
      color: '#000',
      alignSelf: 'center'
    },

    yearsHeaderText: {
      fontSize: 16*baseScaler,
      lineHeight: 16*baseScaler,
      color: '#000',
      width: 180*baseScaler,
      textAlign: 'center'
    },

    yearsWrapper: {
      alignSelf: 'center',
      justifyContent: 'center',
      width: containerWidth,
    },

    yearsRow: {
      flexDirection: 'row',
      padding: 20*baseScaler,
    },

    dot: {
      height: 5*dotScaler,
      width: 5*dotScaler,
      borderRadius: 10,
      backgroundColor: "tomato",
    },

  };
}
