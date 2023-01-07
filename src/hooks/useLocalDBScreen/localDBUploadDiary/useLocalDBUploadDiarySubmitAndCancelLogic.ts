import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types";
import { useCallback } from "react";
import { Alert } from "react-native";
import getToday from "../../../logic/upload/getToday";
import { createRealmDiary } from "../../../realm";
import { LOCAL_DB_TEMPORARY_UPLOAD_DIARY } from "../../../temporaryDiary/constant";
import { UploadDiaryTabStackParamsList } from "../../../types/navigation/homeNavStackParamsList";

type useLocalDBUploadDiarySubmitAndCancelLogicType = {
  title: string;
  body: string;
  youtubeIdRef: React.MutableRefObject<string | null>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setBody: React.Dispatch<React.SetStateAction<string>>;
};

type LocalDBUploadDiaryProps = NativeStackNavigationProp<UploadDiaryTabStackParamsList,"UploadDiary">;

const useLocalDBUploadDiarySubmitAndCancelLogic = ({
  title,
  body,
  youtubeIdRef,
  setTitle,
  setBody,
}:useLocalDBUploadDiarySubmitAndCancelLogicType) => {

  const navigation = useNavigation<LocalDBUploadDiaryProps>();

  const onPressSubmit = async () => {
    if(title === "") return Alert.alert("제목을 입력해 주세요.");
    if(body === "") return Alert.alert("내용을 입력해 주세요.");

    await createRealmDiary({
      title,
      body,
      youtubeId: youtubeIdRef.current,
      dateTime: +getToday(),
    });
    
    await AsyncStorage.removeItem(LOCAL_DB_TEMPORARY_UPLOAD_DIARY);

    Alert.alert("오늘의 일기가 작성되었습니다.");
    // 홈 화면으로 이동
    // navigation.navigate("TodayDiary",{
    //   // 다이어리 캐시 넣어줄애 + 타입에도 작성
    // });
    navigation.navigate("TodayDiary");
  };

  const onPressCancel = useCallback(
    () => {
      const goBack = () => navigation.goBack();
      // BackHandler state 못받아서 setState 씀
      setTitle(prevTitle=>{
        setBody(prevBody=>{
          
          const isSomethingWrite = prevTitle !== "" || prevBody !== "" || Boolean(youtubeIdRef.current);
          
          // 실제 로직
          if(isSomethingWrite) {
            Alert.alert("일기 작성을 취소하시겠습니까?",undefined,[
              {
                text:"취소하고 뒤로가기",
                onPress:()=>{
                  goBack();
                  const temporaryData = {
                    title: prevTitle,
                    body: prevBody,
                    youtubeId: youtubeIdRef.current,
                  };
                  AsyncStorage.setItem(LOCAL_DB_TEMPORARY_UPLOAD_DIARY,JSON.stringify(temporaryData));
                },
                style:"destructive"
              },
              {
                text:"계속 작성",
              }]
            );
          } else {
            goBack();
          }
          // 실제 로직 여기까지

          return prevBody;
        });
        return prevTitle;
      });
      
      return true; // BackHandler 위한 애
    },
    // [youtubeIdRef.current]
    []
  );

  return {
    onPressSubmit,
    onPressCancel,
  }
};

export default useLocalDBUploadDiarySubmitAndCancelLogic;