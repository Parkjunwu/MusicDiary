import { useWindowDimensions } from "react-native";
import { useSafeAreaFrame, useSafeAreaInsets } from "react-native-safe-area-context";
import { getDefaultHeaderHeight } from '@react-navigation/elements';
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useMemo } from "react";

const useBottomTabGetHeaderHeightAndInnerLayout = () => {
  const frame = useSafeAreaFrame();
  const insets = useSafeAreaInsets();

  // navigation headerHeight
  const headerHeight = getDefaultHeaderHeight(frame, false, insets.top);

  const { height : wholeScreenHeight } = useWindowDimensions();
  
  // currentHeight 는 android 만 
  // const statusBarHeight = StatusBar.currentHeight ?? 0;
  // console.log("statusBarHeight : "+ statusBarHeight)

  // material TabBar Height 못구해서 걍 넣음. 48 이 맞길래 걍 넣음
  // const materialTabBarHeight = 48;
  const tabBarHeight = useBottomTabBarHeight();

  // // 헤더, 탭 제외한 스크린 크기
  // const totalHeaderHeight = headerHeight + statusBarHeight;

  // const innerLayoutHeight = wholeScreenHeight - tabBarHeight - totalHeaderHeight;

  // return {
  //   headerHeight: totalHeaderHeight,
  //   innerLayoutHeight,
  // };
  const returnResult = () => {
    console.log("returnResult")
    // 헤더, 탭 제외한 스크린 크기
    // const totalHeaderHeight = headerHeight + statusBarHeight;

    // const innerLayoutHeight = wholeScreenHeight - tabBarHeight - totalHeaderHeight;
    const innerLayoutHeight = wholeScreenHeight - tabBarHeight - headerHeight;

    return {
      // headerHeight: totalHeaderHeight,
      headerHeight,
      innerLayoutHeight,
    };
  };

  const result = useMemo(()=>returnResult(),[]);

  return result;
};

export default useBottomTabGetHeaderHeightAndInnerLayout;