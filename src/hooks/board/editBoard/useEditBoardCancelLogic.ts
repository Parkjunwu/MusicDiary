import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Alert } from "react-native";
import { TEMPORARY_EDIT_BOARD } from "../../../temporaryBoard/constant";
import { BoardTabStackParamsList } from "../../../types/navigation/homeNavStackParamsList";

type useEditBoardCancelLogicProps = {
  getChangeStatus: () => {
    isFileChanged: boolean;
    isTitleChanged: boolean;
    isBodyChanged: boolean;
    // isYoutubeChanged: boolean;
    isNothingChanged: boolean;
  };
  whichComponent: "EditBoardForTemporaryBoardData" | "EditBoard",
};

// useEditBoardCancelLogic 랑 똑같고 TEMPORARY_EDIT_BOARD 만 다름

const useEditBoardCancelLogic = ({
  getChangeStatus,
  whichComponent,
}: useEditBoardCancelLogicProps) => {

  const navigation = useNavigation<NativeStackNavigationProp<BoardTabStackParamsList>>();

  const onPressCancel = () => {

    // const goBack = () => {
    //   navigation.goBack();
    //   whichComponent === "EditBoardForTemporaryBoardData" && navigation.replace("BoardDrawerNav"); // EditBoardForTemporaryBoardData 는 다른 화면 가서 넣음. goBack 안하면 백헨들러 계속 남아 있어서 넣어야함.
    // };
    const goBack = () => whichComponent === "EditBoardForTemporaryBoardData" ? navigation.replace("BoardDrawerNav") : navigation.goBack();
       // EditBoardForTemporaryBoardData 는 백헨들러 계속 남아 있어서 replace 로 씀

    const {
      isNothingChanged,
    } = getChangeStatus();

    if(isNothingChanged) {
      goBack();
    } else {
      Alert.alert(
        "일기 수정을 취소하시겠습니까?",
        "변경 중이었던 내용은 모두 유실됩니다.",
        [
          {
            text:"취소하고 뒤로가기",
            onPress:()=>{
              goBack();
              AsyncStorage.removeItem(TEMPORARY_EDIT_BOARD); // 추가함. editBoard 는 나가면 걍 날림.
            },
            style:"destructive"
          },
          {
            text:"계속 작성",
          },
        ],
      );
    }

    return true;
  };
  
  return onPressCancel;
};

export default useEditBoardCancelLogic;