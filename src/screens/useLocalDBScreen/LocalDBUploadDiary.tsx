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

// https://github.com/mochixuan/react-native-drag-sort/blob/master/lib/AnySizeDragSortableView.js ?????? ??????????????? ??????.

const LocalDBUploadDiary = ({route}:LocalDBUploadDiaryProps) => {

  const [title,setTitle] = useState("");
  
  const [body,setBody] = useState("");

  // music ?????? ????????? ??????
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
  //       Alert.alert("?????? ?????? ???????????? ????????? ?????????????????????????",undefined,[
  //         {
  //           text:"????????????",
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
  //           text:"?????????",
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
  //     // BackHandler state ???????????? setState ???
  //     setTitle(prevTitle=>{
  //       setBody(prevBody=>{
          
  //         const isSomethingWrite = prevTitle !== "" || prevBody !== "" || Boolean(youtubeIdRef.current);
          
  //         // ?????? ??????
  //         if(isSomethingWrite) {
  //           Alert.alert("?????? ????????? ?????????????????????????",undefined,[
  //             {
  //               text:"???????????? ????????????",
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
  //               text:"?????? ??????",
  //             }]
  //           );
  //         } else {
  //           goBack();
  //         }
  //         // ?????? ?????? ????????????

  //         return prevBody;
  //       });
  //       return prevTitle;
  //     });
      
  //     return true; // BackHandler ?????? ???
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
  //   if(title === "") return Alert.alert("????????? ????????? ?????????.");
  //   if(body === "") return Alert.alert("????????? ????????? ?????????.");

  //   await createRealmDiary({
  //     title,
  //     body,
  //     youtubeId: youtubeIdRef.current,
  //     dateTime: +getToday(),
  //   });
    
  //   await AsyncStorage.removeItem(LOCAL_DB_TEMPORARY_UPLOAD_DIARY);

  //   Alert.alert("????????? ????????? ?????????????????????.");
  //   // ??? ???????????? ??????
  //   // navigation.navigate("TodayDiary",{
  //   //   // ???????????? ?????? ???????????? + ???????????? ??????
  //   // });
  //   navigation.navigate("TodayDiary");
  // };

  // const [loading,setLoading] = useState(false);
  
  // // whichComponent ???????????? ?????????? ?????? ????????? ????????? ?????? ?????????
  // const onPressSubmitWithLoading = async() => {
  //   setLoading(true);
  //   await onPressSubmit();
  //   setLoading(false);
  // };

  // useEffect(()=>{
  //   navigation.setOptions({
  //     headerRight:()=>(
  //       loading ? 
  //         <SubmitBtnText fontSize={16}>?????????..</SubmitBtnText>
  //       :
  //         <TouchableOpacity onPress={onPressSubmitWithLoading}>
  //           <SubmitBtnText fontSize={16}>{"??????"}</SubmitBtnText>
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