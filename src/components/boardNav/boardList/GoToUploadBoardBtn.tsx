// 지금 안씀. 쓸데 없으면 걍 삭제


import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
import { FontAppliedBoldTextNeedFontSize } from "../../../styled-components/FontAppliedComponents";
import { BoardTabStackParamsList } from "../../../types/navigation/homeNavStackParamsList";

type GoToUploadBoardBtnProps = {
  navigation: NativeStackNavigationProp<BoardTabStackParamsList, "NewBoardList">;
};

const GoToUploadBoardBtn = ({navigation}:GoToUploadBoardBtnProps) => (
  <TouchableOpacity onPress={()=>navigation.navigate("UploadBoard")}>
    <FontAppliedBoldTextNeedFontSize>작성</FontAppliedBoldTextNeedFontSize>
  </TouchableOpacity>
);

export default GoToUploadBoardBtn;