import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";
import { Alert } from "react-native";
import { TEMPORARY_EDIT_DIARY } from "../../temporaryDiary/constant";

type useEditDiaryCancelLogicProps = {
  getChangeStatus: () => {
    isFileChanged: boolean;
    isTitleChanged: boolean;
    isBodyChanged: boolean;
    isYoutubeChanged: boolean;
    isNothingChanged: boolean;
  };
};

const useEditDiaryCancelLogic = ({
  getChangeStatus,
}: useEditDiaryCancelLogicProps) => {

  const navigation = useNavigation();

  const onPressCancel = () => {

    const goBack = () => navigation.goBack();

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
              AsyncStorage.removeItem(TEMPORARY_EDIT_DIARY); // 추가함. editDiary 는 나가면 걍 날림.
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

export default useEditDiaryCancelLogic;