import { useMemo } from "react";
import useGetWidthWithoutMaxWidthDealWithBigScreenNeedImageHorizontalEmptySpaceBase20 from "./useGetWidthWithoutMaxWidthDealWithBigScreenNeedImageHorizontalEmptySpaceBase20";

const youtubePlayerWidthHeightRatio = 16/9;

const useGetYoutubePlayerHeightWithoutMaxWidth = (totalPaddingHorizontal = 0) => {

  const {layoutWidth:width} = useGetWidthWithoutMaxWidthDealWithBigScreenNeedImageHorizontalEmptySpaceBase20();

  const youtubePlayerHeight = useMemo(
    () => {
      const youtubePlayerWidth = width - totalPaddingHorizontal;

      return youtubePlayerWidth / youtubePlayerWidthHeightRatio
    },
    [width]
  ); // paddingHorizontal 도 넣어야 하나? 호출 되는 데가 다르면 알아서 계산되지 않을라나?

  return youtubePlayerHeight;
};

export default useGetYoutubePlayerHeightWithoutMaxWidth;