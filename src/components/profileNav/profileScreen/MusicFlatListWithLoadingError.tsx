import styled from "styled-components/native";
import { youtubeType } from "../../../recommend/youtubeRecommendByFeeling/youtubeRecommendByFeeling";
import { FontAppliedBaseTextNeedFontSize } from "../../../styled-components/FontAppliedComponents";
import HorizontalMusicFlatList from "./HorizontalMusicFlatList";

const NoDataContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

type MusicFlatListWithLoadingErrorProps = {
  data: string | youtubeType[] | undefined,
  onPressItem: (youtubeId: string) => void,
  loading: boolean,
};

const MusicFlatListWithLoadingError = ({
  data,
  onPressItem,
  loading,
}:MusicFlatListWithLoadingErrorProps) => {

  if(loading) return (
    <NoDataContainer>
      <FontAppliedBaseTextNeedFontSize>로딩 중 입니다..</FontAppliedBaseTextNeedFontSize>
    </NoDataContainer>
  );
  if(typeof data === "string") return (
    <NoDataContainer>
      <FontAppliedBaseTextNeedFontSize>{data}</FontAppliedBaseTextNeedFontSize>
    </NoDataContainer>
  );
  if(data === undefined) return (
    <NoDataContainer>
      <FontAppliedBaseTextNeedFontSize>아직 지정한 음악이 없습니다.</FontAppliedBaseTextNeedFontSize>
    </NoDataContainer>
  );
  return (
    <HorizontalMusicFlatList
      data={data}
      onPressItem={onPressItem}
    />
  )
};

export default MusicFlatListWithLoadingError;