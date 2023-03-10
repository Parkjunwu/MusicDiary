import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useRef, useState } from "react";
import { View } from "react-native";
import AnySizeDragSortableView from "../../../components/upload/AnySizeDragSortableView";
import BodyInput from "../../../components/upload/BodyInput";
import TitleInput from "../../../components/upload/TitleInput";
import useSetYoutubeStateNeedRoute from "../../../hooks/uploadDiary/useSetYoutubeStateNeedRoute";
import { UploadDiaryTabStackParamsList } from "../../../types/navigation/homeNavStackParamsList";
import { FileInfo } from "../../../types/upload/fileType";
import MusicState from "../../../components/youtubeRelated/uploadOrEdit/MusicState";
import useIfGetPlusFilesThenSetFilesAndBodyAndFileAddingPosition from "../../../hooks/uploadAndEdit/useIfGetPlusFilesThenSetFilesAndBodyAndFileAddingPosition";
import useDeletePhoto from "../../../hooks/uploadAndEdit/useDeletePhoto";
import useMakeTitleSubmitBtnAndCancelBtnOnHeader from "../../../hooks/uploadAndEdit/useMakeTitleSubmitBtnAndCancelBtnOnHeader";
import useMakeScrollableImage from "../../../hooks/uploadAndEdit/useMakeScrollableImage";
import useGetFontFamily from "../../../hooks/useGetFontFamily";
import MusicPlayer from "../../../components/youtubeRelated/uploadOrEdit/MusicPlayer";
import useWriteDiaryComplete from "../../../hooks/uploadDiary/useWriteDiaryComplete";
import useMakeAndroidBackHandler from "../../../hooks/useLocalDBScreen/useMakeAndroidBackHandler";
import useUploadDiaryCancelLogic from "../../../hooks/uploadDiary/useUploadDiaryCancelLogic";
import useFirstGetAndSetTemporaryDiary from "../../../hooks/uploadDiary/useFirstGetAndSetTemporaryDiary";
import useUploadDiaryStoreTemporaryWhenGoToBackground from "../../../hooks/uploadDiary/useUploadDiaryStoreTemporaryWhenGoToBackground";
import UploadHorizontalEmptyLayoutForBigScreenNeedScreenWidth from "../../../components/upload/UploadHorizontalEmptyLayoutForBigScreenNeedScreenWidth";
import useGetWidthDealWithBigScreenNeedImageHorizontalEmptySpaceBase20 from "../../../hooks/forDealWithBigScreen/useGetWidthDealWithBigScreenNeedImageHorizontalEmptySpaceBase20";
import useColorsChangedByDarkMode from "../../../hooks/useColorsChangedByDarkMode";

type UploadDiaryProps = NativeStackScreenProps<UploadDiaryTabStackParamsList,"UploadDiary">;

// https://github.com/mochixuan/react-native-drag-sort/blob/master/lib/AnySizeDragSortableView.js ?????? ??????????????? ??????.

const UploadDiary = ({route}:UploadDiaryProps) => {

  const [title,setTitle] = useState("");
  
  const [body,setBody] = useState([""]);

  const [files,setFiles] = useState<FileInfo[]>([]);

  const [fileAddingPosition,setFileAddingPosition] = useState<{fileIndex:number,insertFront:boolean}>({
    fileIndex:0,
    insertFront:true,
  });

  useIfGetPlusFilesThenSetFilesAndBodyAndFileAddingPosition({
    route,
    fileAddingPosition,
    setFiles,
    setFileAddingPosition,
    setBody,
  });

  // music ?????? ????????? ??????
  const {
    youtubeTitle,
    setYoutubeTitle,
    youtubeIdRef,
    deleteMusic,
  } = useSetYoutubeStateNeedRoute(route);

  // useEffect(()=>{
  //   const getAndSetLocalDBTemporaryDiary = async () => {
  //     const localDBTemporaryDiary = await AsyncStorage.getItem(TEMPORARY_UPLOAD_DIARY);
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
  useFirstGetAndSetTemporaryDiary({
    youtubeIdRef,
    setYoutubeTitle,
    setTitle,
    setBody,
    setFiles,
  });


  // const onPressCancel = useCallback(
  //   () => {
  //     const goBack = () => navigation.goBack();
  //     // BackHandler state ???????????? setState ???
  //     setFiles(prevFile=>{
  //       setTitle(prevTitle=>{
  //         setBody(prevBody=>{
            
  //           const isSomethingWrite = prevFile.length !== 0 || !(prevBody.length === 1 && prevBody[0] === "") || prevTitle !== "" || Boolean(youtubeIdRef.current);
            
  //           // ?????? ??????
  //           if(isSomethingWrite) {
  //             Alert.alert("?????? ????????? ?????????????????????????",undefined,[
  //               {
  //                 text:"???????????? ????????????",
  //                 onPress:()=>{
  //                   goBack();
  //                   const temporaryData = {
  //                     title: prevTitle,
  //                     body: prevBody,
  //                     youtubeId: youtubeIdRef.current,
  //                     files: prevFile,
  //                   };
  //                   AsyncStorage.setItem(TEMPORARY_UPLOAD_DIARY,JSON.stringify(temporaryData));
  //                 },
  //                 style:"destructive"
  //               },
  //               {
  //                 text:"?????? ??????",
  //               }]
  //             );
  //           } else {
  //             goBack();
  //           }
  //           // ?????? ?????? ????????????

  //           return prevBody;
  //         });
  //         return prevTitle;
  //       });
  //       return prevFile;
  //     })
      
  //     return true; // BackHandler ?????? ???
  //   },
  //   // [youtubeIdRef.current]
  //   []
  // );
  const onPressCancel = useUploadDiaryCancelLogic({
    setFiles,
    setTitle,
    setBody,
    youtubeIdRef,
  });

  useMakeAndroidBackHandler({
    onPressCancel,
  });

  useUploadDiaryStoreTemporaryWhenGoToBackground({
    setFiles,
    setTitle,
    setBody,
    youtubeIdRef,
  });

  // mutation
  // const { loading, onPressUpload } = useUploadDiaryMutation({
  //   files,
  //   title,
  //   body,
  //   youtubeIdRef,
  // });
  const { loading, onPressUpload } = useWriteDiaryComplete({
    files,
    title,
    body,
    youtubeIdRef,
  });

  useMakeTitleSubmitBtnAndCancelBtnOnHeader({
    files,
    body,
    title,
    loading,
    youtubeId: youtubeIdRef.current,
    onPressSubmit: onPressUpload,
    onPressCancel,
    whichComponent: "UploadDiary",
  });


  const deletePhoto = useDeletePhoto({
    setBody,
    setFiles,
  });
  

  const padding = 10;

  const {imageWidth} = useGetWidthDealWithBigScreenNeedImageHorizontalEmptySpaceBase20(padding*2);

  const sortableViewRef = useRef<AnySizeDragSortableView>(null);

  const {
    backgroundColor,
    textColor,
    placeholderTextColor,
  } = useColorsChangedByDarkMode();

  const renderItem = useMakeScrollableImage({
    setFileAddingPosition,
    sortableViewRef,
    imageWidth,
    deletePhoto,
    files,
    setFiles, // ???????????? ??? ?????? ????????? ??????
    setBody, // ???????????? ??? ?????? ????????? ??????
  });
  
  // 146 = ?????? ?????? padding + MusicState + TitleInput + BodyInput
  const [headerViewHeight,setHeaderViewHeight] = useState(146);

  const fontFamily = useGetFontFamily("Medium");

  // ?????? ?????? ????????? props ??? ?????? ??????. ??? ??????
  const renderHeaderView = (
    <View
      onLayout={event => setHeaderViewHeight(event.nativeEvent.layout.height + padding)}
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
        value={body[0]}
        setValue={setBody}
        placeholderTextColor={placeholderTextColor}
        textColor={textColor}
        inputIndex={0}
        setFileAddingPosition={setFileAddingPosition}
        fontFamily={fontFamily}
      />
    </View>
  );

  return (
    <UploadHorizontalEmptyLayoutForBigScreenNeedScreenWidth>
      <AnySizeDragSortableView
        ref={sortableViewRef}
        dataSource={files}
        // ?????? ????????? ?????? ?????? ??????.... uuid ??? ??????????
        keyExtractor={(item:FileInfo) => item.uri}
        renderItem={renderItem}
        onDataChange={(data:FileInfo[], callback:()=>void)=> {
          setFiles(data);
          callback();
        }}
        renderHeaderView = {renderHeaderView}
        wrapperStyle={{
          flex: 1,
          padding,
          backgroundColor,
        }}
        body={body}
        placeholderTextColor={placeholderTextColor}
        textColor={textColor}
        setBody={setBody}
        // headerViewHeight={headerViewHeight.current}
        headerViewHeight={headerViewHeight}
        setFileAddingPosition={setFileAddingPosition}
        fontFamily={fontFamily}
        // renderBottomView = {renderBottomView}
        // bottomViewHeight={bottomViewHeight}
        // movedWrapStyle={styles.item_moved}
        // onDragEnd={()=>{
        //     this.setState({
        //         movedKey: null
        //     })
        // }}
      />
    </UploadHorizontalEmptyLayoutForBigScreenNeedScreenWidth>
  );
};

export default UploadDiary;