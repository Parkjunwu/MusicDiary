import { TouchableOpacity } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MusicPlayAndBtnType } from "../../types/myDiaryDrawerNav/MusicPlayingStateType";

const MusicPlayAndPauseBtn = ({
  color,
  music: youtubeId,
  // isMusicPlaying,
  // setIsNowMusicPlaying,
  diary1MusicPlaying,
  setDiary1MusicPlaying,
  diary2MusicPlaying,
  setDiary2MusicPlaying,
  nowFocusDiary,
}:MusicPlayAndBtnType) => {

  const onPressMusicPlayAndPause = () => {
    // setIsNowMusicPlaying(prev=>!prev);
    nowFocusDiary.current === "MyDiary1" ? setDiary1MusicPlaying(prev=>!prev) : setDiary2MusicPlaying(prev=>!prev); // 추가
  };

  console.log("youtubeId : "+ youtubeId)
  const iconName = () => {
    if(!youtubeId) return "play";
    // return isMusicPlaying ? "pause" : "play";
    const isDiary1Focused = nowFocusDiary.current === "MyDiary1";
    if(isDiary1Focused){
      return diary1MusicPlaying ? "pause" : "play";
    } else {
      return diary2MusicPlaying ? "pause" : "play";
    }
  };

  return (
    <TouchableOpacity
      onPress={onPressMusicPlayAndPause}
      style={{
        opacity: youtubeId ? 1 : 0.3,
      }}
      disabled={!youtubeId}
    >
      <Ionicons name={iconName()} size={30} color={color} />
    </TouchableOpacity>
  );
};

export default MusicPlayAndPauseBtn;