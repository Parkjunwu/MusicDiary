import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { isLoggedInVar } from "../../../apollo";
import { BoardTabStackParamsList } from "../../../types/navigation/homeNavStackParamsList";

type GoToSearchBoardBtnProps = {
  tintColor: string;
  navigation: NativeStackNavigationProp<BoardTabStackParamsList, "NewBoardList">;
};

const GoToSearchBoardBtn = ({tintColor,navigation}:GoToSearchBoardBtnProps) => (
  <TouchableOpacity onPress={()=>navigation.navigate("SearchBoard")} style={{...(isLoggedInVar() && { marginLeft:8 })}}>
    <Ionicons name="ios-search" color={tintColor} size={30}/>
  </TouchableOpacity>
);

export default GoToSearchBoardBtn;