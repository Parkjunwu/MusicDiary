import { useState } from "react";
import styled from "styled-components/native";
// import useGetYoutubePlayerHeight from "../../../hooks/useGetYoutubePlayerHeight";
import useGetYoutubePlayerHeightWithoutMaxWidth from "../../../hooks/useGetYoutubePlayerHeightWithoutMaxWidth";
import { FontAppliedBaseTextNeedFontSize } from "../../../styled-components/FontAppliedComponents";
import YoutubeComponent from "../../youtubeRelated/YoutubeComponent";

const Container = styled.View<{display:boolean}>`
  margin-top: 6px;
  display: ${props=>props.display ? "flex" : "none"};
`;
const CloseBtn = styled.TouchableOpacity`
  align-items: flex-end;
  margin-right: 10px;
`;
const CloseBtnText = styled(FontAppliedBaseTextNeedFontSize)`

`;

type YoutubeWithCloseBtnProps = {
  videoId: string;
  youtubeShow: boolean;
  setYoutubeShow: React.Dispatch<React.SetStateAction<boolean>>;
};

const YoutubeWithCloseBtn = ({
  videoId,
  youtubeShow,
  setYoutubeShow,
}:YoutubeWithCloseBtnProps) => {

  const [play,setPlay] = useState(false);

  const onPressClose = () => {
    setYoutubeShow(false);
    setPlay(false);
  };

  // const youtubePlayerHeight = useGetYoutubePlayerHeight(20);
  const youtubePlayerHeight = useGetYoutubePlayerHeightWithoutMaxWidth(20);

  return(
    <Container
      display={youtubeShow}
    >
      <YoutubeComponent
        play={play}
        setPlay={setPlay}
        videoId={videoId}
        // videoHeight={youtubeShow ? 210 : 0}
        // videoHeight={210}
        videoHeight={youtubePlayerHeight}
      />
      <CloseBtn onPress={onPressClose}>
        <CloseBtnText>[닫기]</CloseBtnText>
      </CloseBtn>
    </Container>
  )
};

export default YoutubeWithCloseBtn;