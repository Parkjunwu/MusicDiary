import { TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import useIsDarkMode from "../../hooks/useIsDarkMode";
import { colors } from "../../js-assets/color";

type DiaryMiniMusicSwitchBtnProps = {
  isNowMusicPlaying: boolean,
  setIsNowMusicPlaying: React.Dispatch<React.SetStateAction<boolean>>,
};

const DiaryMiniMusicSwitchBtn = ({
  isNowMusicPlaying,
  setIsNowMusicPlaying,
}:DiaryMiniMusicSwitchBtnProps) => {

  // const isDarkMode = useIsDarkMode();

  return (
    <TouchableOpacity
      onPress={()=>setIsNowMusicPlaying(prev=>!prev)}
      style={{
        marginRight: 5,
        marginLeft: "auto",
        backgroundColor: colors.yellow,
        padding: 3,
        borderRadius: 30,
        marginBottom: 10,
        // boxShadow : 5,
        // elevation: 2,
        // shadowOffset: {
        //   width: 50,
        //   height: 50,
        // },
        // shadowColor: "black",
        // shadowRadius
      }}
    >
      <MaterialCommunityIcons name={isNowMusicPlaying ? "music" : "music-off"} size={18} color={"black"} />
    </TouchableOpacity>
  )
};

export default DiaryMiniMusicSwitchBtn;