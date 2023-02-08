import { useMemo } from "react";
import { useWindowDimensions } from "react-native";

// 패드 대응할라고 넣음. 이미지 너무 커서 화면 작게
// 근데 이미지 넣을 부분의 layout 은 어차피 다 같은게 나을 테니 하나로 고정이 나을라나?
// 일단은 그냥 기본값으로 줌. 변경 가능하고
type widthListType = {
  layoutWidth: number;
  imageWidth: number;
};

type useGetWidthDealWithBigScreenType = (imageHorizontalEmptySpace?:number) => widthListType;

const useGetWidthWithoutMaxWidthDealWithBigScreenNeedImageHorizontalEmptySpaceBase20: useGetWidthDealWithBigScreenType = (imageHorizontalEmptySpace = 20) =>{

  const { width:windowWidth } = useWindowDimensions();

  const widthList = useMemo(
    ()=>getWidthDealWithBigScreen(windowWidth,imageHorizontalEmptySpace),
    [windowWidth,imageHorizontalEmptySpace]
  );

  return widthList;
};

export default useGetWidthWithoutMaxWidthDealWithBigScreenNeedImageHorizontalEmptySpaceBase20;

type getWidthDealWithBigScreenType = (windowWidth:number, imageHorizontalEmptySpace:number) => widthListType;

const getWidthDealWithBigScreen: getWidthDealWithBigScreenType = (windowWidth, imageHorizontalEmptySpace) => ({
  layoutWidth: windowWidth,
  imageWidth: windowWidth - imageHorizontalEmptySpace,
});