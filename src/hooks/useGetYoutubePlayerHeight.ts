import { useMemo } from "react";
import useGetWidthDealWithBigScreenNeedImageHorizontalEmptySpaceBase20 from "./forDealWithBigScreen/useGetWidthDealWithBigScreenNeedImageHorizontalEmptySpaceBase20";

const youtubePlayerWidthHeightRatio = 16/9;

// type useGetYoutubePlayerHeightProps = {
//   paddingHorizontal?: number;
// };

// const useGetYoutubePlayerHeight = ({
//   paddingHorizontal = 0,
// }: useGetYoutubePlayerHeightProps) => { // 이러면 에러뜸
const useGetYoutubePlayerHeight = (totalPaddingHorizontal = 0) => {

  // const { width } = useWindowDimensions();
  const {layoutWidth:width} = useGetWidthDealWithBigScreenNeedImageHorizontalEmptySpaceBase20();

  const youtubePlayerHeight = useMemo(
    () => {
      const youtubePlayerWidth = width - totalPaddingHorizontal;

      return youtubePlayerWidth / youtubePlayerWidthHeightRatio
    },
    [width]
  ); // paddingHorizontal 도 넣어야 하나? 호출 되는 데가 다르면 알아서 계산되지 않을라나?

  return youtubePlayerHeight;
};

export default useGetYoutubePlayerHeight;