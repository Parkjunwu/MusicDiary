import React from 'react';
import {
  View,
  // Text,
  useColorScheme,
} from 'react-native';
import { FontAppliedBaseTextNeedFontSize } from '../../../styled-components/FontAppliedComponents';

const Weekdays = (props) => {
  const {
    styles,
    // firstDay,
    // currentMonth: month,
    // currentYear: year,
    // weekdays,
    // textStyle,
    // dayLabelsWrapper,
    // customDayHeaderStyles,
  } = props;
  
  console.log("Weekdays")

  const wd = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  
  const darkModeSubscription = useColorScheme();
  const isDarkMode = darkModeSubscription === "dark";
  const textColor = isDarkMode ? "white" : "black";
  
  const customStyle = (day:string) => {
    return day === "Sun" ? {
      color: "tomato",
      fontWeight: "bold",
    } : {
      color: textColor,
    };
  };

  return (
    // <View style={[styles.dayLabelsWrapper, dayLabelsWrapper]}>
    <View style={[styles.dayLabelsWrapper]}>
      { wd.map((day, key) => {
        return (
          <View key={key}>
            {/* <Text style={[styles.dayLabels, textStyle, customStyle(day)]}> */}
            <FontAppliedBaseTextNeedFontSize style={[styles.dayLabels, customStyle(day)]}>
              {day}
            </FontAppliedBaseTextNeedFontSize>
          </View>
        );
      })
      }
    </View>
  );
};

export default React.memo(Weekdays,()=>true);