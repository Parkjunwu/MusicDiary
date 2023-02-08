import { View } from "react-native";
import BaseMiniMusicSwitchBtn from "./BaseMiniMusicSwitchBtn";

type DiaryMiniMusicSwitchBtnProps = {
  isNowMusicPlaying: boolean,
  setIsNowMusicPlaying: React.Dispatch<React.SetStateAction<boolean>>,
};

const DiaryMiniMusicSwitchBtn = (props:DiaryMiniMusicSwitchBtnProps) => (
  <View
    style={{
      marginRight: 5,
      marginLeft: "auto",
      marginBottom: 10,
    }}
  >
    <BaseMiniMusicSwitchBtn
      {...props}
    />
  </View>
  // <TouchableOpacity
  //   onPress={()=>setIsNowMusicPlaying(prev=>!prev)}
  //   style={{
  //     marginRight: 5,
  //     marginLeft: "auto",
  //     backgroundColor: colors.yellow,
  //     padding: 3,
  //     borderRadius: 30,
  //     marginBottom: 10,
  //     // boxShadow : 5,
  //     // elevation: 2,
  //     // shadowOffset: {
  //     //   width: 50,
  //     //   height: 50,
  //     // },
  //     // shadowColor: "black",
  //     // shadowRadius
  //   }}
  // >
  //   <MaterialCommunityIcons name={isNowMusicPlaying ? "music" : "music-off"} size={18} color={"black"} />
  // </TouchableOpacity>
);

export default DiaryMiniMusicSwitchBtn;