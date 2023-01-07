import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { ScrollView } from "react-native";
import TitleInput from "../../components/upload/TitleInput";
import useSetYoutubeStateNeedRoute from "../../hooks/uploadDiary/useSetYoutubeStateNeedRoute";
import useBackgroundColorAndTextColor from "../../hooks/useBackgroundColorAndTextColor";
import usePlaceHolderColor from "../../hooks/usePlaceHolderColor";
import { UploadDiaryTabStackParamsList } from "../../types/navigation/homeNavStackParamsList";
import MusicState from "../../components/youtubeRelated/uploadOrEdit/MusicState";
import BodyInput from "../../components/useLocalDBScreen/localDBUploadDiary/LocalDBBodyInput";
import useLocalDBMakeSubmitBtnAndCancelBtnOnHeader from "../../hooks/useLocalDBScreen/useLocalDBMakeSubmitBtnAndCancelBtnOnHeader";
import useGetFontFamily from "../../hooks/useGetFontFamily";
import useFirstGetAndSetLocalDBTemporaryDiary from "../../hooks/useLocalDBScreen/localDBUploadDiary/useFirstGetAndSetLocalDBTemporaryDiary";
import useLocalDBUploadDiarySubmitAndCancelLogic from "../../hooks/useLocalDBScreen/localDBUploadDiary/useLocalDBUploadDiarySubmitAndCancelLogic";
import useMakeAndroidBackHandler from "../../hooks/useLocalDBScreen/useMakeAndroidBackHandler";
import useLocalDBUploadDiaryStoreLocalDBTemporaryWhenGoToBackground from "../../hooks/useLocalDBScreen/localDBUploadDiary/useLocalDBUploadDiaryStoreLocalDBTemporaryWhenGoToBackground";
import MusicPlayer from "../../components/youtubeRelated/uploadOrEdit/MusicPlayer";
// import useLocalDBUploadMakeSubmitBtnAndCancelBtnOnHeader from "../../hooks/useLocalDBScreen/localDBUploadDiary/useLocalDBUploadMakeSubmitBtnAndCancelBtnOnHeader";

// const SubmitBtnText = styled(FontAppliedBaseTextNeedFontSize)`
//   color: ${colors.blue};
//   /* font-size: 16px; */
//   margin-right: 7px;
// `;

type LocalDBUploadDiaryProps = NativeStackScreenProps<UploadDiaryTabStackParamsList,"UploadDiary">;

// https://github.com/mochixuan/react-native-drag-sort/blob/master/lib/AnySizeDragSortableView.js 보고 라이브러리 만듦.

const LocalDBUploadDiary = ({route}:LocalDBUploadDiaryProps) => {

  const [title,setTitle] = useState("");
  
  const [body,setBody] = useState("");

  // music 위해 추가한 부분
  const {
    youtubeTitle,
    setYoutubeTitle,
    youtubeIdRef,
    deleteMusic,
  } = useSetYoutubeStateNeedRoute(route);

  // useEffect(()=>{
  //   const getAndSetLocalDBTemporaryDiary = async () => {
  //     const localDBTemporaryDiary = await AsyncStorage.getItem(LOCAL_DB_TEMPORARY_UPLOAD_DIARY);
  //     // console.log("localDBTemporaryDiary : " + localDBTemporaryDiary);
  //     if(localDBTemporaryDiary) {
  //       Alert.alert("임시 저장 되어있는 일기를 불러오시겠습니까?",undefined,[
  //         {
  //           text:"불러오기",
  //           onPress:()=>{
  //             const { title, body, youtubeId } = JSON.parse(localDBTemporaryDiary);
  //             if(youtubeId) {
  //               youtubeIdRef.current = youtubeId;
  //               getYoutubeMeta(youtubeId)
  //                 .then(data=>{
  //                   if(data.title){
  //                     youtubeIdRef.current = youtubeId;
  //                     setYoutubeTitle(data.title);
  //                   }
  //                 });
  //             }
  //             setTitle(title);
  //             setBody(body);
  //           },
  //         },
  //         {
  //           text:"아니오",
  //           style:"destructive"
  //         },
  //       ]);
  //     }
  //   };

  //   getAndSetLocalDBTemporaryDiary();
  // },[]);
  useFirstGetAndSetLocalDBTemporaryDiary({
    youtubeIdRef,
    setYoutubeTitle,
    setTitle,
    setBody,
  });

  // const onPressCancel = useCallback(
  //   () => {
  //     const goBack = () => navigation.goBack();
  //     // BackHandler state 못받아서 setState 씀
  //     setTitle(prevTitle=>{
  //       setBody(prevBody=>{
          
  //         const isSomethingWrite = prevTitle !== "" || prevBody !== "" || Boolean(youtubeIdRef.current);
          
  //         // 실제 로직
  //         if(isSomethingWrite) {
  //           Alert.alert("일기 작성을 취소하시겠습니까?",undefined,[
  //             {
  //               text:"취소하고 뒤로가기",
  //               onPress:()=>{
  //                 goBack();
  //                 const temporaryData = {
  //                   title: prevTitle,
  //                   body: prevBody,
  //                   youtubeId: youtubeIdRef.current,
  //                 };
  //                 AsyncStorage.setItem(LOCAL_DB_TEMPORARY_UPLOAD_DIARY,JSON.stringify(temporaryData));
  //               },
  //               style:"destructive"
  //             },
  //             {
  //               text:"계속 작성",
  //             }]
  //           );
  //         } else {
  //           goBack();
  //         }
  //         // 실제 로직 여기까지

  //         return prevBody;
  //       });
  //       return prevTitle;
  //     });
      
  //     return true; // BackHandler 위한 애
  //   },
  //   // [youtubeIdRef.current]
  //   []
  // );

  const { onPressSubmit, onPressCancel } = useLocalDBUploadDiarySubmitAndCancelLogic({
    title,
    body,
    youtubeIdRef,
    setTitle,
    setBody,
  });

  useLocalDBUploadDiaryStoreLocalDBTemporaryWhenGoToBackground({
    setTitle,
    setBody,
    youtubeIdRef,
  });

  // useEffect(() => {
  //   const backHandler = isAndroid ?
  //       BackHandler.addEventListener(
  //         "hardwareBackPress",
  //         onPressCancel
  //       )
  //     :
  //       null;

  //   return () => backHandler?.remove();
  // }, []);
  useMakeAndroidBackHandler({
    onPressCancel,
  });

  // const onPressSubmit = async () => {
  //   if(title === "") return Alert.alert("제목을 입력해 주세요.");
  //   if(body === "") return Alert.alert("내용을 입력해 주세요.");

  //   await createRealmDiary({
  //     title,
  //     body,
  //     youtubeId: youtubeIdRef.current,
  //     dateTime: +getToday(),
  //   });
    
  //   await AsyncStorage.removeItem(LOCAL_DB_TEMPORARY_UPLOAD_DIARY);

  //   Alert.alert("오늘의 일기가 작성되었습니다.");
  //   // 홈 화면으로 이동
  //   // navigation.navigate("TodayDiary",{
  //   //   // 다이어리 캐시 넣어줄애 + 타입에도 작성
  //   // });
  //   navigation.navigate("TodayDiary");
  // };

  // const [loading,setLoading] = useState(false);
  
  // // whichComponent 안받아도 되겠지? 쓰는 곳에선 변경될 일이 없으니
  // const onPressSubmitWithLoading = async() => {
  //   setLoading(true);
  //   await onPressSubmit();
  //   setLoading(false);
  // };

  // useEffect(()=>{
  //   navigation.setOptions({
  //     headerRight:()=>(
  //       loading ? 
  //         <SubmitBtnText fontSize={16}>작성중..</SubmitBtnText>
  //       :
  //         <TouchableOpacity onPress={onPressSubmitWithLoading}>
  //           <SubmitBtnText fontSize={16}>{"작성"}</SubmitBtnText>
  //         </TouchableOpacity>
  //     ),
  //     headerLeft:({tintColor}) => <TouchableOpacity onPress={onPressCancel}>
  //       <Ionicons name={"chevron-back"} size={24} color={tintColor}/>
  //     </TouchableOpacity>
  //   });
  // },[body,title,youtubeIdRef,loading]);

  // useLocalDBUploadMakeSubmitBtnAndCancelBtnOnHeader({
  //   body,
  //   title,
  //   youtubeId: youtubeIdRef.current,
  //   onPressSubmit,
  //   onPressCancel,
  // });

  useLocalDBMakeSubmitBtnAndCancelBtnOnHeader({
    body,
    title,
    youtubeId: youtubeIdRef.current,
    onPressSubmit,
    onPressCancel,
    whichComponent: "LocalDBUploadDiary",
  });


  const { textColor, backgroundColor } = useBackgroundColorAndTextColor();
  const placeholderTextColor = usePlaceHolderColor();

  const fontFamily = useGetFontFamily("Medium");

  return (
    <ScrollView
      // onLayout={event => setHeaderViewHeight(event.nativeEvent.layout.height + padding)}
      style={{
        padding: 10,
        backgroundColor,
      }}
    >
      <MusicState
        youtubeId={youtubeIdRef.current}
        youtubeTitle={youtubeTitle}
        deleteMusic={deleteMusic}
        whichComponent="UploadDiary"
      />
      { youtubeIdRef.current && 
        <MusicPlayer youtubeId={youtubeIdRef.current}/>
      }
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

export default LocalDBUploadDiary;