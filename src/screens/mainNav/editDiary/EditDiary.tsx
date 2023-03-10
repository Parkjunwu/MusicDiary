import React, { useRef, useState } from "react";
import { View } from "react-native";
import { FileInfo } from "../../../types/upload/fileType";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
// import { MyDiaryListTabStackParamsList, NotificationTabStackParamsList } from "../../../types/navigation/homeNavStackParamsList";
import { MyDiaryListTabStackParamsList } from "../../../types/navigation/homeNavStackParamsList";
import TitleInput from "../../../components/upload/TitleInput";
import BodyInput from "../../../components/upload/BodyInput";
import useEditDiaryMutation from "../../../hooks/editDiary/useEditDiaryMutation";
import useBackgroundColorAndTextColor from "../../../hooks/useBackgroundColorAndTextColor";
import usePlaceHolderColor from "../../../hooks/usePlaceHolderColor";
import AnySizeDragSortableView from "../../../components/upload/AnySizeDragSortableView";
import useIfGetPlusFilesThenAddToNowFilesAndSetBodyAndAddingPosition from "../../../hooks/uploadAndEdit/useIfGetPlusFilesThenSetFilesAndBodyAndFileAddingPosition";
import useDeletePhoto from "../../../hooks/uploadAndEdit/useDeletePhoto";
import useMakeTitleSubmitBtnAndCancelBtnOnHeader from "../../../hooks/uploadAndEdit/useMakeTitleSubmitBtnAndCancelBtnOnHeader";
import useMakeScrollableImage from "../../../hooks/uploadAndEdit/useMakeScrollableImage";
import useSetYoutubeStateNeedRoute from "../../../hooks/uploadDiary/useSetYoutubeStateNeedRoute";
import MusicState from "../../../components/youtubeRelated/uploadOrEdit/MusicState";
import useGetFontFamily from "../../../hooks/useGetFontFamily";
import MusicPlayer from "../../../components/youtubeRelated/uploadOrEdit/MusicPlayer";
import useMakeAndroidBackHandler from "../../../hooks/useLocalDBScreen/useMakeAndroidBackHandler";
import useEditDiaryCancelLogic from "../../../hooks/editDiary/useEditDiaryCancelLogic";
import useEditDiaryStoreTemporaryWhenGoToBackground from "../../../hooks/editDiary/useEditDiaryStoreTemporaryWhenGoToBackground";
import useGetWidthDealWithBigScreenNeedImageHorizontalEmptySpaceBase20 from "../../../hooks/forDealWithBigScreen/useGetWidthDealWithBigScreenNeedImageHorizontalEmptySpaceBase20";
import UploadHorizontalEmptyLayoutForBigScreenNeedScreenWidth from "../../../components/upload/UploadHorizontalEmptyLayoutForBigScreenNeedScreenWidth";
// import { getYoutubeMeta } from "react-native-youtube-iframe";

// type EditDiaryProps = NativeStackScreenProps<MyDiaryListTabStackParamsList|NotificationTabStackParamsList,"EditDiary">;
type EditDiaryProps = NativeStackScreenProps<MyDiaryListTabStackParamsList,"EditDiary">;

// UI ??? UploadDiary, ????????? EditDiary ??? ?????? ??????

const EditDiary = ({navigation,route}:EditDiaryProps) => {

  // ?????? ???????????? route ??????????????? state ??? ?????????
  const routeParams = route.params;
  const diaryId = useRef(routeParams.diaryId).current;
  // ?????? ????????? ?? [] ??????
  const prevFiles = useRef(routeParams.fileInfoArr ?? []).current;
  const prevBody = useRef(routeParams.body).current;
  const prevTitle = useRef(routeParams.title).current;

  const prevYoutubeId = useRef(routeParams.youtubeId).current;

  console.log("routeParams  : "+ JSON.stringify(routeParams))

  const [title,setTitle] = useState(routeParams.title ?? "");

  const [body,setBody] = useState(routeParams.body ?? [""]);

  // const [nowChangingFileIndex,setNowChangingFileIndex] = useState(0);
  
  const [files,setFiles] = useState<FileInfo[]>(routeParams.fileInfoArr ?? []);

  const [fileAddingPosition,setFileAddingPosition] = useState<{fileIndex:number,insertFront:boolean}>({
    fileIndex:0,
    insertFront:true,
  });

  useIfGetPlusFilesThenAddToNowFilesAndSetBodyAndAddingPosition({
    route,
    fileAddingPosition,
    setFiles,
    setFileAddingPosition,
    setBody,
  });


  // music ?????? ????????? ??????
  const {
    youtubeTitle,
    youtubeIdRef,
    deleteMusic,
  } = useSetYoutubeStateNeedRoute(route);

  // route ??? youtubeId prevYoutubeId useRef ??????
  // useEffect > route ??? youtubeId ??? ??????. ????????? title ??????.
  // const [youtubeTitle,setYoutubeTitle] = useState<string|undefined>();
  // const youtubeIdRef = useRef<string|undefined| null>(routeParams.youtubeId);

  // // ?????? ?????? ??????????????? useCallback ?????? ????????? ???????
  // const deleteMusic = () => {
  //   youtubeIdRef.current = undefined;
  //   setYoutubeTitle(undefined);
  // };

  // // ?????? ????????? ???????????? ?????? useCallback ????????? ???????
  // const getYoutubeTitle = (videoId:string) => getYoutubeMeta(videoId)
  //   .then(data=>{
  //     setYoutubeTitle(data.title);
  //   });

  // useEffect(()=>{
  //   const prevYoutubeId = routeParams.youtubeId;
  //   if(prevYoutubeId) {
  //     getYoutubeTitle(prevYoutubeId);
  //   }
  // },[]);

  // useEffect(()=>{
  //   const youtubeVideoId = route.params?.youtubeId;
  //   const youtubeVideoTitle = route.params?.youtubeTitle;
  //   if(youtubeIdRef) {
  //     youtubeIdRef.current = youtubeVideoId;
  //     setYoutubeTitle(youtubeVideoTitle);
  //   }
  // },[route]);
  // // prevYoutubeId ??? youtubeIdRef ??????????????? getChangeStatus ??? ?????? mutation ?????? ????????????. mutation ??? deleteYoutubeMusic ??? ?????? ????????????.



  const getChangeStatus = () => {
    // ?????? ???????????? ??????. ?????? ????????? ?????? ???????????? ????????? ??????.
    const isFileChanged = JSON.stringify(files) !== JSON.stringify(prevFiles);
    const isTitleChanged = title !== prevTitle;
    const isBodyChanged = JSON.stringify(body) !== JSON.stringify(prevBody);
    const isYoutubeChanged = prevYoutubeId !== youtubeIdRef.current;
    // console.log("prevYoutubeId : "+ prevYoutubeId)
    // console.log("youtubeIdRef.current : "+ youtubeIdRef.current)
    
    // const isNothingChanged = !isFileChanged && !isTitleChanged && !isBodyChanged;
    const isNothingChanged = !isFileChanged && !isTitleChanged && !isBodyChanged && !isYoutubeChanged;

    return {
      isFileChanged,
      isTitleChanged,
      isBodyChanged,
      isYoutubeChanged,
      isNothingChanged,
    };
  };

  // mutation
  const { loading, onPressEdit } = useEditDiaryMutation({
    files,
    title,
    body,
    diaryId,
    prevFiles,
    // youtubeId: youtubeIdRef.current ?? null,
    youtubeId: youtubeIdRef.current,
    getChangeStatus,
  });


  // useEffect(()=>{
  //   // const isSomethingWrite = files.length !== 0 || !(body.length === 1 && body[0] === "") || title !== "";
  //   // !youtubeIdRef.current ??????. null undefined ???????????????. "" ??? ????????? ????????????
  //   const isSomethingWrite = files.length !== 0 || !(body.length === 1 && body[0] === "") || title !== "" || !youtubeIdRef.current;
  //   const { isNothingChanged } = getChangeStatus();

  //   navigation.setOptions({
  //     headerRight:({tintColor})=>(
  //       loading ? 
  //         <EditBtnText>????????????..</EditBtnText>
  //       :
  //         <TouchableOpacity onPress={onPressEdit}>
  //           <EditBtnText>??????</EditBtnText>
  //         </TouchableOpacity>
  //     ),
  //     headerLeft:({tintColor}) => <UploadGoBackBtn
  //       tintColor={tintColor+""}
  //       whichComponent="EditDiary"
  //       alertCheck={isSomethingWrite && !isNothingChanged}
  //     />
  //   });
  // },[body,files,title,loading]);

  // const onPressCancel = () => {

  //   const goBack = () => navigation.goBack();

  //   const {
  //     isNothingChanged,
  //   } = getChangeStatus();
  //   if(isNothingChanged) {
    
  //     Alert.alert(
  //       "?????? ????????? ?????????????????????????",
  //       "?????? ???????????? ????????? ?????? ???????????????.",
  //       [
  //         {
  //           text:"???????????? ????????????",
  //           onPress:()=>goBack(),
  //           style:"destructive"
  //         },
  //         {
  //           text:"?????? ??????",
  //         }
  //       ]  
  //     )
  //   } else {
  //     goBack();
  //   }
  //   return true;
  // };
  const onPressCancel = useEditDiaryCancelLogic({
    getChangeStatus,
  });
  
  useMakeAndroidBackHandler({
    onPressCancel,
    dependency: getChangeStatus().isNothingChanged,
  });

  // useEffect(() => {
  //   const subscription = AppState.addEventListener("change", nextAppState => {
  //     if(nextAppState === "background") {
  //       setFiles(prevFile=>{
  //         setTitle(prevTitle=>{
  //           setBody(prevBody=>{

  //               const isFileChanged = JSON.stringify(files) !== JSON.stringify(prevFiles);
  //               const isTitleChanged = title !== prevTitle;
  //               const isBodyChanged = JSON.stringify(body) !== JSON.stringify(prevBody);
  //               const isYoutubeChanged = prevYoutubeId !== youtubeIdRef.current;
                
  //               const isSomethingChanged = isFileChanged || isTitleChanged || isBodyChanged || isYoutubeChanged;

  //               if(isSomethingChanged){
  //                 const temporaryData = {
  //                   id: diaryId,
  //                   title: prevTitle,
  //                   body: prevBody,
  //                   youtubeId: youtubeIdRef.current,
  //                   files: prevFile,
  //                   prevFiles,
  //                   prevBody,
  //                   prevTitle,
  //                   prevYoutubeId,
  //                 };
  //                 AsyncStorage.setItem(LOCAL_DB_TEMPORARY_EDIT_DIARY,JSON.stringify(temporaryData));
  //               }

  //             return prevBody;
  //           });
  //           return prevTitle;
  //         });
  //         return prevFile;
  //       });
  //     }
  //   });

  //   return () => {
  //     subscription.remove();
  //   };
  // }, []);
  // ???????????????
  useEditDiaryStoreTemporaryWhenGoToBackground({
    setFiles,
    setTitle,
    setBody,
    youtubeIdRef,
    diaryId,
    prevFiles,
    prevTitle,
    prevBody,
    prevYoutubeId,
  });

  useMakeTitleSubmitBtnAndCancelBtnOnHeader({
    files,
    body,
    title,
    loading,
    youtubeId: youtubeIdRef.current,
    onPressSubmit: onPressEdit,
    onPressCancel,
    whichComponent: "EditDiary",
    // getChangeStatus,
  });


  const deletePhoto = useDeletePhoto({
    setBody,
    setFiles,
  });

  
  // const { width:windowWidth } = useWindowDimensions();

  const padding = 10;

  // const paddingLeftAndRight = padding * 2;

  // const imageWidth = windowWidth - paddingLeftAndRight;
  const {imageWidth} = useGetWidthDealWithBigScreenNeedImageHorizontalEmptySpaceBase20(padding*2);

  const sortableViewRef = useRef<AnySizeDragSortableView>(null);

  const {backgroundColor,textColor} = useBackgroundColorAndTextColor();
  const placeholderTextColor = usePlaceHolderColor();

  const renderItem = useMakeScrollableImage({
    setFileAddingPosition,
    sortableViewRef,
    imageWidth,
    deletePhoto,
    files,
  });

  // 146 = ?????? ?????? padding + MusicState + TitleInput + BodyInput
  const [headerViewHeight,setHeaderViewHeight] = useState(146);

  const fontFamily = useGetFontFamily("Medium");
  
  // ?????? ?????? ????????? props ??? ?????? ??????. ??? ??????
  // ?????? ?????? MusicState ????????? ?????????
  const renderHeaderView = (
    <View
      onLayout={event => setHeaderViewHeight(event.nativeEvent.layout.height + padding)}
    >
      <MusicState
        youtubeId={youtubeIdRef.current}
        youtubeTitle={youtubeTitle}
        deleteMusic={deleteMusic}
        whichComponent="EditDiary"
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

export default EditDiary;


  // SharedStackNav ??? ????????? ????????????????????? ?????? ?????? ?????? ??????.
  // useEffect(()=>{
  //   navigation.setOptions({
  //     headerTitle:({tintColor}) => <PlusPhotoBtn
  //       tintColor={tintColor ?? ""}
  //       from="EditDiary"
  //     />,
  //   });
  // },[]);
