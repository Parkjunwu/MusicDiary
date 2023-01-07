import { useWindowDimensions, StatusBar, Platform } from "react-native";
import { useSafeAreaFrame, useSafeAreaInsets } from "react-native-safe-area-context";
import { getDefaultHeaderHeight } from '@react-navigation/elements';

const useMaterialTabGetInnerLayoutHeight = () => {
  const frame = useSafeAreaFrame();
  const insets = useSafeAreaInsets();

  // navigation headerHeight
  const headerHeight = getDefaultHeaderHeight(frame, false, insets.top);

  const { height : wholeScreenHeight } = useWindowDimensions();

  const statusBarHeight = Platform.OS === "android" ? StatusBar.currentHeight : 0;

  // material TabBar Height 못구해서 걍 넣음. 48 이 맞길래 걍 넣음
  const materialTabBarHeight = 48;
  
  // 헤더, 탭 제외한 스크린 크기
  const innerLayoutHeight = wholeScreenHeight - materialTabBarHeight - headerHeight - statusBarHeight;

  return innerLayoutHeight;
};

export default useMaterialTabGetInnerLayoutHeight;