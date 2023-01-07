import React from 'react';
import {
  View,
  Text,
  Platform,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import { Utils } from './Utils';
import Controls from './Controls';
import { FontAppliedBaseTextNeedFontSize } from '../../../styled-components/FontAppliedComponents';

const HeaderControls = (props) => {
  const {
    styles,
    currentMonth,
    currentYear,
    onPressNext,
    onPressPrevious,
    // onPressMonth,
    // onPressYear,
    onPressYearMonth,
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
    maxDate,
    minDate,
    headingLevel,
    monthYearHeaderWrapperStyle,
    headerWrapperStyle
  } = props;

  console.log("HeaderControls")

  const MONTHS = months || Utils.MONTHS; // English Month Array
  const monthName = MONTHS[currentMonth];
  const year = currentYear;

  const disablePreviousMonth = restrictMonthNavigation && Utils.isSameMonthAndYear(minDate, currentMonth, currentYear);
  const disableNextMonth = restrictMonthNavigation && Utils.isSameMonthAndYear(maxDate, currentMonth, currentYear);

  const accessibilityProps = { accessibilityRole: 'header' };
  if (Platform.OS === 'web') {
    accessibilityProps['aria-level'] = headingLevel;
  }

  return (
    <View style={[styles.headerWrapper, headerWrapperStyle]}>
      <Controls
        disabled={disablePreviousMonth}
        label={previousTitle}
        component={previousComponent}
        onPressControl={onPressPrevious}
        styles={styles.previousContainer}
        textStyles={[styles.navButtonText, textStyle, previousTitleStyle]}
      />
      <View style={[styles.monthYearHeaderWrapper,monthYearHeaderWrapperStyle]}>
        {/* <TouchableOpacity onPress={onPressMonth}>
          <Text style={[styles.monthHeaderMainText, textStyle, monthTitleStyle]} {...accessibilityProps}>
            { monthName }
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressYear}>
          <Text style={[styles.yearHeaderMainText, textStyle, yearTitleStyle]}>
            { year }
          </Text>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={onPressYearMonth}>
          <FontAppliedBaseTextNeedFontSize style={[styles.monthHeaderMainText, textStyle, monthTitleStyle]} {...accessibilityProps}>
            {/* {`${monthName}  ${year}` } */}
            {`${year}년 ${monthName}` }
          </FontAppliedBaseTextNeedFontSize>
        </TouchableOpacity>

      </View>
      <Controls
        disabled={disableNextMonth}
        label={nextTitle}
        component={nextComponent}
        onPressControl={onPressNext}
        styles={styles.nextContainer}
        textStyles={[styles.navButtonText, textStyle, nextTitleStyle]}
      />
    </View>
  );
}

HeaderControls.propTypes = {
  currentMonth: PropTypes.number,
  currentYear: PropTypes.number,
  onPressNext: PropTypes.func,
  onPressPrevious: PropTypes.func,
  // onPressMonth: PropTypes.func,
  // onPressYear: PropTypes.func,
  onPressYearMonth: PropTypes.func,
};


// export default HeaderControls;
export default React.memo(HeaderControls,(prevProps,nextProps)=>(
  prevProps.currentMonth === nextProps.currentMonth && 
  prevProps.currentYear === nextProps.currentYear
));