import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Alert } from "react-native";
import { editRealmDiary } from "../../../realm";
import { LOCAL_DB_TEMPORARY_EDIT_DIARY } from "../../../temporaryDiary/constant";
import { MyDiaryListTabStackParamsList } from "../../../types/navigation/homeNavStackParamsList";

type useLocalDBEditDiarySubmitAndCancelLogicProps = {
  diaryId: number | undefined;
  title: string;
  body: string[];
  getChangeStatus: () => {
    isTitleChanged: boolean;
    isBodyChanged: boolean;
    isYoutubeChanged: boolean;
    isNothingChanged: boolean;
  };
  // youtubeIdRef: string | null;
  youtubeId: string | null;
};

type LocalDBEditDiaryProps = NativeStackNavigationProp<MyDiaryListTabStackParamsList,"EditDiary">;

const useLocalDBEditDiarySubmitAndCancelLogic = ({
  title,
  body,
  getChangeStatus,
  diaryId,
  // youtubeIdRef,
  youtubeId,
}: useLocalDBEditDiarySubmitAndCancelLogicProps) => {

  const navigation = useNavigation<LocalDBEditDiaryProps>();

  const onPressSubmit = async () => {
    if(title === "") return Alert.alert("제목을 입력해 주세요.");
    if(body === "") return Alert.alert("내용을 입력해 주세요.");

    const {
      isNothingChanged,
    } = getChangeStatus();

    
    if(isNothingChanged) {
      return navigation.goBack();
    };

    await editRealmDiary({
      id: diaryId,
      title,
      body,
      youtubeId: youtubeId,
      // dateTime,
    });

    await deleteTemporaryDiary();

    Alert.alert("게시물이 수정되었습니다.");

    navigation.goBack();
  };

  const onPressCancel = () => {
    const goBack = () => navigation.goBack();

    const {
      isNothingChanged,
    } = getChangeStatus();

    if(!isNothingChanged) {
      Alert.alert(
        "일기 수정을 취소하시겠습니까?",
        "변경 중이었던 내용은 모두 유실됩니다.",
        [
          {
            text:"취소하고 뒤로가기",
            onPress:()=>{
              goBack();
              deleteTemporaryDiary(); // 추가함. editDiary 는 나가면 걍 날림.
            },
            style:"destructive"
          },
          {
            text:"계속 작성",
          },
        ]  
      );
    } else {
      goBack();
    }

    return true; // BackHandler 위한 애
  };

  return {
    onPressSubmit,
    onPressCancel,
  };
};

export default useLocalDBEditDiarySubmitAndCancelLogic;

const deleteTemporaryDiary = () => AsyncStorage.removeItem(LOCAL_DB_TEMPORARY_EDIT_DIARY);