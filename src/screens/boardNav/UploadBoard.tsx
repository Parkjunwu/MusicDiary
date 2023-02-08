import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useRef, useState } from "react";
import { BoardTabStackParamsList } from "../../types/navigation/homeNavStackParamsList";
import { FileInfo } from "../../types/upload/fileType";
import useIfGetPlusFilesThenSetFilesAndBodyAndFileAddingPosition from "../../hooks/uploadAndEdit/useIfGetPlusFilesThenSetFilesAndBodyAndFileAddingPosition"
import useDeletePhoto from "../../hooks/uploadAndEdit/useDeletePhoto";
import useGetWidthDealWithBigScreenNeedImageHorizontalEmptySpaceBase20 from "../../hooks/forDealWithBigScreen/useGetWidthDealWithBigScreenNeedImageHorizontalEmptySpaceBase20";
import AnySizeDragSortableView from "../../components/upload/AnySizeDragSortableView";
import useColorsChangedByDarkMode from "../../hooks/useColorsChangedByDarkMode";
import useMakeScrollableImage from "../../hooks/uploadAndEdit/useMakeScrollableImage";
import useGetFontFamily from "../../hooks/useGetFontFamily";
import useMakeTitleSubmitBtnAndCancelBtnOnHeader from "../../hooks/uploadAndEdit/useMakeTitleSubmitBtnAndCancelBtnOnHeader";
import { View } from "react-native";
import UploadHorizontalEmptyLayoutForBigScreenNeedScreenWidth from "../../components/upload/UploadHorizontalEmptyLayoutForBigScreenNeedScreenWidth";
import TitleInput from "../../components/upload/TitleInput";
import BodyInput from "../../components/upload/BodyInput";
import useMakeAndroidBackHandler from "../../hooks/useLocalDBScreen/useMakeAndroidBackHandler";
import useUploadBoardCancelLogic from "../../hooks/board/uploadBoard/useUploadBoardCancelLogic";
import useUploadBoardStoreTemporaryWhenGoToBackground from "../../hooks/board/uploadBoard/useUploadBoardStoreTemporaryWhenGoToBackground";
import useUploadBoardComplete from "../../hooks/board/uploadBoard/useUploadBoardComplete";
import useFirstGetAndSetTemporaryBoard from "../../hooks/board/uploadBoard/useFirstGetAndSetTemporaryBoard";

type UploadBoardProps = NativeStackScreenProps<BoardTabStackParamsList,"UploadBoard">;

const UploadBoard = ({route}: UploadBoardProps) => {

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

  useFirstGetAndSetTemporaryBoard({
    setTitle,
    setBody,
    setFiles,
  });

  const onPressCancel = useUploadBoardCancelLogic({
    setFiles,
    setTitle,
    setBody,
    // youtubeIdRef,
  });

  useMakeAndroidBackHandler({
    onPressCancel,
  });

  useUploadBoardStoreTemporaryWhenGoToBackground({
    setFiles,
    setTitle,
    setBody,
    // youtubeIdRef,
  });

  const { loading, onPressUpload } = useUploadBoardComplete({
    files,
    title,
    body,
    // youtubeIdRef,
  });

  useMakeTitleSubmitBtnAndCancelBtnOnHeader({
    files,
    body,
    title,
    loading,
    // youtubeId: youtubeIdRef.current,
    onPressSubmit: onPressUpload,
    onPressCancel,
    whichComponent: "UploadBoard",
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
    setFiles, // 불러오기 시 없는 경우를 위해
    setBody, // 불러오기 시 없는 경우를 위해
  });

  // 126 = 높이 대충 padding 10 + TitleInput 58 + BodyInput 58
  const [headerViewHeight,setHeaderViewHeight] = useState(126);

  const fontFamily = useGetFontFamily("Medium");

  // 얘는 따로 빼기엔 props 가 너무 많음. 걍 냅둠
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
  
export default UploadBoard;