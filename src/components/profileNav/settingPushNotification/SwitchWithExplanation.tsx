import { View } from "react-native";
import { colors } from "../../../js-assets/color";
import { FontAppliedBaseTextNeedFontSize } from "../../../styled-components/FontAppliedComponents";
import { SwitchWithText } from "./SwitchWithText";

type SwitchWithExplanationProps = {
  explanation: string;
  value: boolean;
  toggleSwitch: ()=>void;
};

const SwitchWithExplanation = ({
  explanation,
  value,
  toggleSwitch,
}: SwitchWithExplanationProps) => (
  <View
    style={{
      flexDirection: "row",
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <FontAppliedBaseTextNeedFontSize>{explanation} </FontAppliedBaseTextNeedFontSize>
    {/* <Switch
      // trackColor={{ false: "#767577", true: "#81b0ff" }}
      // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
      trackColor={{ false: "#767577", true: colors.darkYellow }}
      thumbColor={isEnabled ? colors.yellow : "#f4f3f4"}
      ios_backgroundColor="#3e3e3e"
      onValueChange={toggleSwitch}
      value={isEnabled}
    /> */}
    <SwitchWithText
      value={value}
      onValueChange={toggleSwitch}
      // disabled={false}
      activeText={'켬'}
      inActiveText={'끔'}
      circleSize={30}
      barHeight={30}
      circleBorderWidth={3}
      backgroundActive={colors.darkYellow}
      backgroundInactive={'gray'}
      circleActiveColor={colors.yellow}
      circleInActiveColor={'#000000'}
      // circleBorderActiveColor={'white'}
      // circleBorderInactiveColor
      // renderInsideCircle={() => <FontAppliedBaseTextNeedFontSize>켬</FontAppliedBaseTextNeedFontSize>} // custom component to render inside the Switch circle (Text, Image, etc.)
      changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
      innerCircleStyle={{ alignItems: "center", justifyContent: "center" }} // style for inner animated circle for what you (may) be rendering inside the circle
      outerCircleStyle={{}} // style for outer animated circle
      // renderActiveText={false}
      // renderInActiveText={false}
      switchLeftPx={5} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
      switchRightPx={5} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
      switchWidthMultiplier={2} // multiplied by the `circleSize` prop to calculate total width of the Switch
      switchBorderRadius={30} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
    />
  </View>
);

export default SwitchWithExplanation;