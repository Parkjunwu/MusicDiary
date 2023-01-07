import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useRef, useState } from "react";
import { useWindowDimensions, View } from "react-native";
import AnySizeDragSortableView from "../../../components/upload/AnySizeDragSortableView";
import BodyInput from "../../../components/upload/BodyInput";
import TitleInput from "../../../components/upload/TitleInput";
import useSetYoutubeStateNeedRoute from "../../../hooks/uploadDiary/useSetYoutubeStateNeedRoute";
import useBackgroundColorAndTextColor from "../../../hooks/useBackgroundColorAndTextColor";
import usePlaceHolderColor from "../../../hooks/usePlaceHolderColor";
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

type UploadDiaryProps = NativeStackScreenProps<UploadDiaryTabStackParamsList,"UploadDiary">;

// https://github.com/mochixuan/react-native-drag-sort/blob/master/lib/AnySizeDragSortableView.js 보고 라이브러리 만듦.

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

  // music 위해 추가한 부분
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
  //     // BackHandler state 못받아서 setState 씀
  //     setFiles(prevFile=>{
  //       setTitle(prevTitle=>{
  //         setBody(prevBody=>{
            
  //           const isSomethingWrite = prevFile.length !== 0 || !(prevBody.length === 1 && prevBody[0] === "") || prevTitle !== "" || Boolean(youtubeIdRef.current);
            
  //           // 실제 로직
  //           if(isSomethingWrite) {
  //             Alert.alert("일기 작성을 취소하시겠습니까?",undefined,[
  //               {
  //                 text:"취소하고 뒤로가기",
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
  //                 text:"계속 작성",
  //               }]
  //             );
  //           } else {
  //             goBack();
  //           }
  //           // 실제 로직 여기까지

  //           return prevBody;
  //         });
  //         return prevTitle;
  //       });
  //       return prevFile;
  //     })
      
  //     return true; // BackHandler 위한 애
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
  

  const { width:windowWidth } = useWindowDimensions();

  const padding = 10;

  const paddingLeftAndRight = padding * 2;

  const imageWidth = windowWidth - paddingLeftAndRight;

  const sortableViewRef = useRef<AnySizeDragSortableView>(null);

  const {backgroundColor,textColor} = useBackgroundColorAndTextColor();
  const placeholderTextColor = usePlaceHolderColor();

  const renderItem = useMakeScrollableImage({
    setFileAddingPosition,
    sortableViewRef,
    imageWidth,
    deletePhoto,
    files,
    setFiles, // 불러오기 시 없는 경우를 위해
    setBody, // 불러오기 시 없는 경우를 위해
  });
  
  // 146 = 높이 대충 padding + MusicState + TitleInput + BodyInput
  const [headerViewHeight,setHeaderViewHeight] = useState(146);

  const fontFamily = useGetFontFamily("Medium");

  // 얘는 따로 빼기엔 props 가 너무 많음. 걍 냅둠
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
    <AnySizeDragSortableView
      ref={sortableViewRef}
      dataSource={files}
      // 같은 사진을 넣을 수도 있음.... uuid 로 넣을까?
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
  );
};

export default UploadDiary;