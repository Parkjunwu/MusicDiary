import { TouchableOpacity } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NotificationDiaryMusicPlayAndBtnType } from "../../types/myDiaryDrawerNav/MusicPlayingStateType";

const NotificationDiaryMusicPlayAndPauseBtn = ({
  color,
  music: youtubeId,
  isMusicPlaying,
  setIsNowMusicPlaying,
}: NotificationDiaryMusicPlayAndBtnType) => {

  const onPressMusicPlayAndPause = () => setIsNowMusicPlaying(prev=>!prev);

  const iconName = () => {
    if(!youtubeId) return "play";
    return isMusicPlaying ? "pause" : "play";
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

export default NotificationDiaryMusicPlayAndPauseBtn;