import React, { useRef, useState } from "react";
import { View } from "react-native";
import { FileInfo } from "../../../types/upload/fileType";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { UploadDiaryTabStackParamsList } from "../../../types/navigation/homeNavStackParamsList";
import TitleInput from "../../../components/upload/TitleInput";
import BodyInput from "../../../components/upload/BodyInput";
import useEditDiaryMutation from "../../../hooks/editDiary/useEditDiaryMutation";
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
import useIfTemporaryHasYoutubeIdThenSetYoutubeIdAndTitle from "../../../hooks/editDiaryForTemporaryDiaryData/useIfTemporaryHasYoutubeIdThenSetYoutubeIdAndTitle";
import useGetWidthDealWithBigScreenNeedImageHorizontalEmptySpaceBase20 from "../../../hooks/forDealWithBigScreen/useGetWidthDealWithBigScreenNeedImageHorizontalEmptySpaceBase20";
import UploadHorizontalEmptyLayoutForBigScreenNeedScreenWidth from "../../../components/upload/UploadHorizontalEmptyLayoutForBigScreenNeedScreenWidth";
import useColorsChangedByDarkMode from "../../../hooks/useColorsChangedByDarkMode";
// import { getYoutubeMeta } from "react-native-youtube-iframe";

// type EditDiaryProps = NativeStackScreenProps<MyDiaryListTabStackParamsList|NotificationTabStackParamsList,"EditDiary">;
type EditDiaryForTemporaryDiaryDataProps = NativeStackScreenProps<UploadDiaryTabStackParamsList,"EditDiaryForTemporaryDiaryData">;

// EditDiary 랑 거의 비슷. route params 지정만 다름

// const temporaryData = {
// //  id: diaryId,
//   diaryId,
//   title: nowTitle,
//   body: nowBody,
//   youtubeId: youtubeIdRef.current,
//   files: nowFile,
//   prevFiles,
//   prevTitle,
//   prevBody,
//   prevYoutubeId,
// };

const EditDiaryForTemporaryDiaryData = ({navigation,route}:EditDiaryForTemporaryDiaryDataProps) => {

  // 사진 추가되면 route 사라지니까 state 로 넣어줌
  const routeParams = route.params;
  const diaryId = useRef(routeParams.diaryId).current;
  
  // const prevFiles = useRef(routeParams.fileInfoArr ?? []).current;
  // const prevBody = useRef(routeParams.body).current;
  // const prevTitle = useRef(routeParams.title).current;
  const prevFiles = useRef(routeParams.prevFiles).current;
  const prevBody = useRef(routeParams.prevBody).current;
  const prevTitle = useRef(routeParams.prevTitle).current;

  const prevYoutubeId = useRef(routeParams.prevYoutubeId).current;

  console.log("routeParams  : "+ JSON.stringify(routeParams))

  // const [title,setTitle] = useState(routeParams.title ?? "");
  // const [body,setBody] = useState(routeParams.body ?? [""]);
  const [title,setTitle] = useState(routeParams.title);
  const [body,setBody] = useState(routeParams.body);

  // const [nowChangingFileIndex,setNowChangingFileIndex] = useState(0);
  
  // const [files,setFiles] = useState<FileInfo[]>(routeParams.fileInfoArr ?? []);
  const [files,setFiles] = useState<FileInfo[]>(routeParams.files);

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


  // music 위해 추가한 부분
  const {
    youtubeTitle,
    setYoutubeTitle,
    youtubeIdRef,
    deleteMusic,
  } = useSetYoutubeStateNeedRoute(route);

  useIfTemporaryHasYoutubeIdThenSetYoutubeIdAndTitle({
    route,
    youtubeIdRef,
    setYoutubeTitle,
  });

  const getChangeStatus = () => {
    // 순서 바뀐것도 반영. 사진 부분에 뭐든 변경사항 있는지 확인.
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

  const onPressCancel = useEditDiaryCancelLogic({
    getChangeStatus,
  });
  
  useMakeAndroidBackHandler({
    onPressCancel,
    dependency: getChangeStatus().isNothingChanged,
  });

  // 확인해야함
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
    // whichComponent: "EditDiary", // EditDiaryForTemporaryDiaryData 들어가야 하는지 확인 필요
    whichComponent: "EditDiaryForTemporaryDiaryData", // EditDiaryForTemporaryDiaryData 들어가야 하는지 확인 필요
  });


  const deletePhoto = useDeletePhoto({
    setBody,
    setFiles,
  });

  
  const padding = 10;

  const {imageWidth} = useGetWidthDealWithBigScreenNeedImageHorizontalEmptySpaceBase20(padding*2);

  const sortableViewRef = useRef<AnySizeDragSortableView>(null);

  const { backgroundColor, textColor, placeholderTextColor } = useColorsChangedByDarkMode();

  const renderItem = useMakeScrollableImage({
    setFileAddingPosition,
    sortableViewRef,
    imageWidth,
    deletePhoto,
    files,
  });

  // 146 = 높이 대충 padding + MusicState + TitleInput + BodyInput
  const [headerViewHeight,setHeaderViewHeight] = useState(146);

  const fontFamily = useGetFontFamily("Medium");
  
  // 얘는 따로 빼기엔 props 가 너무 많음. 걍 냅둠
  // 글고 얘도 MusicState 쓰는게 나을듯
  const renderHeaderView = (
    <View
      onLayout={event => setHeaderViewHeight(event.nativeEvent.layout.height + padding)}
    >
      <MusicState
        youtubeId={youtubeIdRef.current}
        youtubeTitle={youtubeTitle}
        deleteMusic={deleteMusic}
        // whichComponent="EditDiary" // EditDiaryForTemporaryDiaryData 들어가야 하는지 확인 필요
        whichComponent="EditDiaryForTemporaryDiaryData"
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
    </UploadHorizontalEmptyLayoutForBigScreenNeedScreenWidth>
  );
};

export default EditDiaryForTemporaryDiaryData;


  // SharedStackNav 에 넣으면 안받아졌었는데 지금 되서 다시 넣음.
  // useEffect(()=>{
  //   navigation.setOptions({
  //     headerTitle:({tintColor}) => <PlusPhotoBtn
  //       tintColor={tintColor ?? ""}
  //       from="EditDiary"
  //     />,
  //   });
  // },[]);
