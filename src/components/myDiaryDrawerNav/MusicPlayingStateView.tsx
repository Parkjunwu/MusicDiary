import { useEffect, useState } from "react";
import { getYoutubeMeta } from "react-native-youtube-iframe";
import styled from "styled-components/native";
import { MusicPlayingStateType } from "../../types/myDiaryDrawerNav/MusicPlayingStateType";
import MusicPlayAndPauseBtn from "./MusicPlayAndPauseBtn";
import RollingText from "./RollingText";

const Container = styled.View`
  align-items: center;
  /* flex, justify-content 는 CustomNavigator 에서 쓰이는 애. */
  flex: 1;
  justify-content: flex-end;
  margin-top: 5px; /* 추가함. 빼고 CustomDrawerContent 에 넣어도 됨 */
`;

// 나중에 구현
const TemporaryMusicRate = styled.View`
  background-color: ${props=>props.theme.textColor};
  width: 100%;
  height: 2px;
  margin-top: 7px;
  margin-bottom: 5px;
`;

// const MusicPlayingStateView = ({
//   color,
//   music: youtubeId,
//   // isMusicPlaying,
//   // setIsNowMusicPlaying,
//   // youtubeMusicShow,
//   // switchYoutubeMusicShow,
//   diary1MusicPlaying,
//   setDiary1MusicPlaying,
//   diary2MusicPlaying,
//   setDiary2MusicPlaying,
//   nowFocusDiary,
// }:MusicPlayingStateType) => {
const MusicPlayingStateView = (props:MusicPlayingStateType) => {
  
  const youtubeId = props.music;

  const [youtubeTitle,setYoutubeTitle] = useState("");

  const getYoutubeTitle = (videoId:string) => getYoutubeMeta(videoId)
    .then(data=>{
      setYoutubeTitle(data.title);
    });

  useEffect(()=>{
    if(youtubeId){
      getYoutubeTitle(youtubeId);
    } else {
      setYoutubeTitle("지정된 음악이 없습니다.");
    }
  },[youtubeId]);

  console.log("MusicPlayingStateView youtubeId : "+ youtubeId)

  return (
    <Container>
      <MusicPlayAndPauseBtn
        // color={color}
        // music={youtubeId}
        // // isMusicPlaying={isMusicPlaying}
        // // setIsNowMusicPlaying={setIsNowMusicPlaying}
        // diary1MusicPlaying={diary1MusicPlaying}
        // setDiary1MusicPlaying={setDiary1MusicPlaying}
        // diary2MusicPlaying={diary2MusicPlaying}
        // setDiary2MusicPlaying={setDiary2MusicPlaying}
        // nowFocusDiary={nowFocusDiary}
        {...props}
      />
      {/* 노래 state 받아서 몇% 인지 만들어도 됨 */}
      <TemporaryMusicRate/>

      <RollingText>
        {youtubeTitle}
      </RollingText>

    </Container>
  );
};

export default MusicPlayingStateView;