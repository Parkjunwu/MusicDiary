import { ViewStyle } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import useBackgroundColorAndTextColor from "../../hooks/useBackgroundColorAndTextColor";

type KeyboardAwareScrollViewWithoutBounceType = {
  children: JSX.Element;
  style?: ViewStyle;
};

const KeyboardAwareScrollViewWithoutBounce = ({
  children,
  style,
}: KeyboardAwareScrollViewWithoutBounceType) => {

  const { backgroundColor } = useBackgroundColorAndTextColor();

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      // ios 위아래 더 멀리 안움직이는거
      bounces={false}
      // android 위아래 더 멀리 안움직이는거
      overScrollMode={'never'}
      style={{
        flex: 1,
        backgroundColor,
        ...style,
      }}
    >
      {children}
    </KeyboardAwareScrollView>
  );
};

export default KeyboardAwareScrollViewWithoutBounce;