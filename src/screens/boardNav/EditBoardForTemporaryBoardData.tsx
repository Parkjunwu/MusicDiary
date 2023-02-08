import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useRef, useState } from "react";
import { View } from "react-native";
import AnySizeDragSortableView from "../../components/upload/AnySizeDragSortableView";
import BodyInput from "../../components/upload/BodyInput";
import TitleInput from "../../components/upload/TitleInput";
import UploadHorizontalEmptyLayoutForBigScreenNeedScreenWidth from "../../components/upload/UploadHorizontalEmptyLayoutForBigScreenNeedScreenWidth";
import useEditBoardCancelLogic from "../../hooks/board/editBoard/useEditBoardCancelLogic";
import useEditBoardMutation from "../../hooks/board/editBoard/useEditBoardMutation";
import useEditBoardStoreTemporaryWhenGoToBackground from "../../hooks/board/editBoard/useEditBoardStoreTemporaryWhenGoToBackground";
import useGetWidthDealWithBigScreenNeedImageHorizontalEmptySpaceBase20 from "../../hooks/forDealWithBigScreen/useGetWidthDealWithBigScreenNeedImageHorizontalEmptySpaceBase20";
import useDeletePhoto from "../../hooks/uploadAndEdit/useDeletePhoto";
import useIfGetPlusFilesThenAddToNowFilesAndSetBodyAndAddingPosition from "../../hooks/uploadAndEdit/useIfGetPlusFilesThenSetFilesAndBodyAndFileAddingPosition";
import useMakeScrollableImage from "../../hooks/uploadAndEdit/useMakeScrollableImage";
import useMakeTitleSubmitBtnAndCancelBtnOnHeader from "../../hooks/uploadAndEdit/useMakeTitleSubmitBtnAndCancelBtnOnHeader";
import useColorsChangedByDarkMode from "../../hooks/useColorsChangedByDarkMode";
import useGetFontFamily from "../../hooks/useGetFontFamily";
import useMakeAndroidBackHandler from "../../hooks/useLocalDBScreen/useMakeAndroidBackHandler";
import { BoardTabStackParamsList } from "../../types/navigation/homeNavStackParamsList";
import { FileInfo } from "../../types/upload/fileType";

type EditBoardForTemporaryBoardDataProps = NativeStackScreenProps<BoardTabStackParamsList,"EditBoardForTemporaryBoardData">;

// EditBoard 랑 거의 비슷. route params 지정만 다름

// const temporaryData = {
// //  id: diaryId,
//   boardId,
//   title: nowTitle,
//   body: nowBody,
//   files: nowFile,
//   prevFiles,
//   prevTitle,
//   prevBody,
// };

// UI 는 UploadBoard, 로직은 EditPost 랑 거의 비슷
const EditBoardForTemporaryBoardData = ({navigation,route}:EditBoardForTemporaryBoardDataProps) => {
  // 사진 추가되면 route 사라지니까 state 로 넣어줌
  const routeParams = route.params;
  const boardId = useRef(routeParams.boardId).current;
  
  // const prevFiles = useRef(routeParams.fileInfoArr ?? []).current;
  // const prevBody = useRef(routeParams.body).current;
  // const prevTitle = useRef(routeParams.title).current;
  const prevFiles = useRef(routeParams.prevFiles).current;
  const prevBody = useRef(routeParams.prevBody).current;
  const prevTitle = useRef(routeParams.prevTitle).current;

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

  const getChangeStatus = () => {
    // 순서 바뀐것도 반영. 사진 부분에 뭐든 변경사항 있는지 확인.
    const isFileChanged = JSON.stringify(files) !== JSON.stringify(prevFiles);
    const isTitleChanged = title !== prevTitle;
    const isBodyChanged = JSON.stringify(body) !== JSON.stringify(prevBody);
    // console.log("prevYoutubeId : "+ prevYoutubeId)
    // console.log("youtubeIdRef.current : "+ youtubeIdRef.current)
    
    // const isNothingChanged = !isFileChanged && !isTitleChanged && !isBodyChanged;
    const isNothingChanged = !isFileChanged && !isTitleChanged && !isBodyChanged;

    return {
      isFileChanged,
      isTitleChanged,
      isBodyChanged,
      isNothingChanged,
    };
  };

  // mutation
  const { loading, onPressEdit } = useEditBoardMutation({
    files,
    title,
    body,
    boardId,
    prevFiles,
    getChangeStatus,
  });

  const onPressCancel = useEditBoardCancelLogic({
    getChangeStatus,
    whichComponent: "EditBoardForTemporaryBoardData",
  });
  
  useMakeAndroidBackHandler({
    onPressCancel,
    dependency: getChangeStatus().isNothingChanged,
  });

  useEditBoardStoreTemporaryWhenGoToBackground({
    setFiles,
    setTitle,
    setBody,
    boardId,
    prevFiles,
    prevTitle,
    prevBody,
  });

  useMakeTitleSubmitBtnAndCancelBtnOnHeader({
    files,
    body,
    title,
    loading,
    onPressSubmit: onPressEdit,
    onPressCancel,
    whichComponent: "EditBoardForTemporaryBoardData",
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

  const { backgroundColor, textColor, placeholderTextColor } = useColorsChangedByDarkMode();

  const renderItem = useMakeScrollableImage({
    setFileAddingPosition,
    sortableViewRef,
    imageWidth,
    deletePhoto,
    files,
  });

  // 126 = 높이 대충 padding 10 + TitleInput 58 + BodyInput 58
  const [headerViewHeight,setHeaderViewHeight] = useState(126);

  const fontFamily = useGetFontFamily("Medium");
  
  // 얘는 따로 빼기엔 props 가 너무 많음. 걍 냅둠
  // 글고 얘도 MusicState 쓰는게 나을듯
  const renderHeaderView = (
    <View
      onLayout={event => setHeaderViewHeight(event.nativeEvent.layout.height + padding)}
    >
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

export default EditBoardForTemporaryBoardData;
