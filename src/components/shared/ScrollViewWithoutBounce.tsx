import { ScrollView, ViewStyle } from "react-native";
import useBackgroundColorAndTextColor from "../../hooks/useBackgroundColorAndTextColor";

type ScrollViewWithoutBounceType = {
  children: JSX.Element;
  style?: ViewStyle;
};

const ScrollViewWithoutBounce = ({
  children,
  style,
}: ScrollViewWithoutBounceType) => {

  const { backgroundColor } = useBackgroundColorAndTextColor();

  return (
    <ScrollView
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
    </ScrollView>
  );
};

export default ScrollViewWithoutBounce;