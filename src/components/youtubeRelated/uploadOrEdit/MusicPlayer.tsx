import { useCallback, useState } from "react";
import styled from "styled-components/native";
import useBackgroundColorAndTextColor from "../../../hooks/useBackgroundColorAndTextColor";
import { FontAppliedBaseTextNeedFontSize } from "../../../styled-components/FontAppliedComponents";
import Ionicons from "react-native-vector-icons/Ionicons"
import BaseYoutubePlayer from "../BaseYoutubePlayer";
import useGetYoutubePlayerHeight from "../../../hooks/useGetYoutubePlayerHeight";

const Container = styled.View`
  margin-top: 3px;
`;
const BtnContainer = styled.View`
  flex-direction: row;
`;
const PlayPressable = styled.TouchableOpacity`
  margin: 0px 5px;
`;
const ShowScreenPressable = styled.TouchableOpacity`

`;
const ShowScreenText = styled(FontAppliedBaseTextNeedFontSize)`

`;

type MusicPlayerProps = {
  youtubeId: string;
};

const MusicPlayer = ({
  youtubeId,
}: MusicPlayerProps) => {

  const [youtubeMusicShow,setYoutubeMusicShow] = useState(false);
  const [play,setPlay] = useState(false);

  const onStateChange = useCallback((state:string) => {
    console.log(state)
    if(state === "playing" || state === "buffering") {
      setPlay(true);
    } else if(state === "paused") {
      setPlay(false);
    } else if (state === "ended") {
      // 자동 반복
      setPlay(false);
      setPlay(true);
    }
  }, []);

  const {textColor} = useBackgroundColorAndTextColor();

  const onPressPlayState = () => setPlay(prev=>!prev);
  const onPressScreenState = () => setYoutubeMusicShow(prev=>!prev);

  const youtubePlayerHeight = useGetYoutubePlayerHeight();

  return (
    <Container>
      {/* <YoutubePlayer */}
      <BaseYoutubePlayer
        height={youtubeMusicShow ? youtubePlayerHeight : 0}
        play={play}
        videoId={youtubeId}
        onChangeState={onStateChange}
      />
      <BtnContainer>
        {!youtubeMusicShow && <PlayPressable onPress={onPressPlayState}>
          <Ionicons name={play ? "pause" : "play"} size={20} color={textColor} />
        </PlayPressable>}
        <ShowScreenPressable onPress={onPressScreenState}>
          <ShowScreenText>
            {youtubeMusicShow ? "[화면 닫기]" : "[화면 보기]"}
          </ShowScreenText>
        </ShowScreenPressable>
      </BtnContainer>
    </Container>
  )
};

export default MusicPlayer;