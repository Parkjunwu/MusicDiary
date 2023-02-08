import { TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "../../js-assets/color";

type BaseMiniMusicSwitchBtnProps = {
  isNowMusicPlaying: boolean,
  setIsNowMusicPlaying: React.Dispatch<React.SetStateAction<boolean>>,
};

const BaseMiniMusicSwitchBtn = ({
  isNowMusicPlaying,
  setIsNowMusicPlaying,
}:BaseMiniMusicSwitchBtnProps) => (
  <TouchableOpacity
    onPress={()=>setIsNowMusicPlaying(prev=>!prev)}
    style={{
      backgroundColor: colors.yellow,
      borderRadius: 30,
      padding: 3,
    }}
  >
    <MaterialCommunityIcons name={isNowMusicPlaying ? "music" : "music-off"} size={18} color={"black"} />
  </TouchableOpacity>
);

export default BaseMiniMusicSwitchBtn;