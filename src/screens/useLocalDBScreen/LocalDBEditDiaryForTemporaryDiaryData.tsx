import React, { useRef, useState } from "react";
import { ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { UploadDiaryTabStackParamsList } from "../../types/navigation/homeNavStackParamsList";
import TitleInput from "../../components/upload/TitleInput";
import useBackgroundColorAndTextColor from "../../hooks/useBackgroundColorAndTextColor";
import usePlaceHolderColor from "../../hooks/usePlaceHolderColor";
import useSetYoutubeStateNeedRoute from "../../hooks/uploadDiary/useSetYoutubeStateNeedRoute";
import MusicState from "../../components/youtubeRelated/uploadOrEdit/MusicState";
import BodyInput from "../../components/useLocalDBScreen/localDBUploadDiary/LocalDBBodyInput";
import useLocalDBMakeSubmitBtnAndCancelBtnOnHeader from "../../hooks/useLocalDBScreen/useLocalDBMakeSubmitBtnAndCancelBtnOnHeader";
import useGetFontFamily from "../../hooks/useGetFontFamily";
import useMakeAndroidBackHandler from "../../hooks/useLocalDBScreen/useMakeAndroidBackHandler";
import useLocalDBEditDiarySubmitAndCancelLogic from "../../hooks/useLocalDBScreen/localDBEditDiary/useLocalDBEditDiarySubmitAndCancelLogic";
// import { LOCAL_DB_TEMPORARY_EDIT_DIARY } from "../../temporaryDiary/constant";
import useLocalDBEditDiaryStoreLocalDBTemporaryWhenGoToBackground from "../../hooks/useLocalDBScreen/localDBEditDiary/useLocalDBEditDiaryStoreLocalDBTemporaryWhenGoToBackground";

// type LocalDBEditDiaryProps = NativeStackScreenProps<MyDiaryListTabStackParamsList|NotificationTabStackParamsList,"EditDiary">;
type LocalDBEditDiaryForTemporaryDiaryDataProps = NativeStackScreenProps<UploadDiaryTabStackParamsList,"EditDiaryForTemporaryDiaryData">;

// UI 는 UploadDiary, 로직은 EditDiary 랑 거의 비슷

const LocalDBEditDiaryForTemporaryDiaryData = ({navigation,route}:LocalDBEditDiaryForTemporaryDiaryDataProps) => {

  // 사진 추가되면 route 사라지니까 state 로 넣어줌
  const routeParams = route.params;
  // console.log("routeParams : "+ JSON.stringify(routeParams))
  const diaryId = useRef(routeParams.diaryId).current;
  const prevBody = useRef(routeParams.prevBody).current;
  const prevTitle = useRef(routeParams.prevTitle).current;

  // const prevYoutubeId = useRef(routeParams.prevYoutubeId ?? undefined).current;
  const prevYoutubeId = useRef(routeParams.prevYoutubeId ?? null).current;


  const [title,setTitle] = useState(routeParams.title ?? "");

  const [body,setBody] = useState(routeParams.body ?? "");

  // music 위해 추가한 부분
  const {
    youtubeTitle,
    youtubeIdRef,
    deleteMusic,
  } = useSetYoutubeStateNeedRoute(route);

  const getChangeStatus = () => {
    // 순서 바뀐것도 반영. 사진 부분에 뭐든 변경사항 있는지 확인.
    // const isFileChanged = JSON.stringify(files) !== JSON.stringify(prevFiles);
    const isTitleChanged = title !== prevTitle;
    const isBodyChanged = body !== prevBody;
    const isYoutubeChanged = prevYoutubeId !== youtubeIdRef.current;
    
    // const isNothingChanged = !isFileChanged && !isTitleChanged && !isBodyChanged && !isYoutubeChanged;
    const isNothingChanged = !isTitleChanged && !isBodyChanged && !isYoutubeChanged;

    return {
      // isFileChanged,
      isTitleChanged,
      isBodyChanged,
      isYoutubeChanged,
      isNothingChanged,
    };
  };


  // const onPressSubmit = async () => {
  //   if(title === "") return Alert.alert("제목을 입력해 주세요.");
  //   if(body === "") return Alert.alert("내용을 입력해 주세요.");

  //   const {
  //     isNothingChanged,
  //   } = getChangeStatus();

    
  //   if(isNothingChanged) {
  //     return navigation.goBack();
  //   };

  //   await editRealmDiary({
  //     id: diaryId,
  //     title,
  //     body,
  //     youtubeId: youtubeIdRef.current,
  //     // dateTime,
  //   });

  //   Alert.alert("게시물이 수정되었습니다.");

  //   navigation.goBack();
  // };

  // const onPressCancel = () => {
  //   const goBack = () => navigation.goBack();

  //   const {
  //     isNothingChanged,
  //   } = getChangeStatus();

  //   if(!isNothingChanged) {
  //     Alert.alert(
  //       "일기 수정을 취소하시겠습니까?",
  //       "변경 중이었던 내용은 모두 유실됩니다.",
  //       [
  //         {
  //           text:"취소하고 뒤로가기",
  //           onPress:()=>goBack(),
  //           style:"destructive"
  //         },
  //         {
  //           text:"계속 작성",
  //         },
  //       ]  
  //     );
  //   } else {
  //     goBack();
  //   }

  //   return true; // BackHandler 위한 애
  // };
  const { onPressSubmit, onPressCancel } = useLocalDBEditDiarySubmitAndCancelLogic({
    title,
    body,
    getChangeStatus,
    diaryId,
    youtubeId:youtubeIdRef.current,
  });

  useMakeAndroidBackHandler({
    onPressCancel,
    dependency: getChangeStatus().isNothingChanged,
  });

  useLocalDBEditDiaryStoreLocalDBTemporaryWhenGoToBackground({
    setTitle,
    setBody,
    youtubeIdRef,
    diaryId,
  });

  useLocalDBMakeSubmitBtnAndCancelBtnOnHeader({
    body,
    title,
    youtubeId: youtubeIdRef.current,
    onPressSubmit,
    onPressCancel,
    // whichComponent: "LocalDBEditDiary",
    whichComponent: "LocalDBEditDiaryForTemporaryDiaryData",
    // getChangeStatus,
  });

  const { textColor } = useBackgroundColorAndTextColor();
  const placeholderTextColor = usePlaceHolderColor();

  const fontFamily = useGetFontFamily("Medium");
  
  const { backgroundColor } = useBackgroundColorAndTextColor();

  return (
    <ScrollView
      style={{
        padding: 10,
        backgroundColor,
      }}
    >
      <MusicState
        youtubeId={youtubeIdRef.current}
        youtubeTitle={youtubeTitle}
        deleteMusic={deleteMusic}
        // whichComponent="EditDiary"
        whichComponent="EditDiaryForTemporaryDiaryData"
      />

      <TitleInput
        value={title}
        setValue={setTitle}
      />
      <BodyInput
        value={body}
        setValue={setBody}
        placeholderTextColor={placeholderTextColor}
        textColor={textColor}
        fontFamily={fontFamily}
      />
    </ScrollView>
  );
};

export default LocalDBEditDiaryForTemporaryDiaryData;