import { useCallback } from "react";
import { Pressable } from "react-native";
import AnySizeDragSortableView from "../../components/upload/AnySizeDragSortableView";
import RealHeightImageWithDeleteBtn from "../../components/upload/RealHeightImageWithDeleteBtn";
import { FileInfo } from "../../types/upload/fileType";

type useMakeScrollableImageProps = {
  setFileAddingPosition: React.Dispatch<React.SetStateAction<{
    fileIndex: number;
    insertFront: boolean;
  }>>,
  sortableViewRef: React.RefObject<AnySizeDragSortableView>,
  imageWidth: number,
  deletePhoto: (index: number) => void,
  files: FileInfo[],
  setFiles?: React.Dispatch<React.SetStateAction<FileInfo[]>>,
  setBody?: React.Dispatch<React.SetStateAction<string[]>>,
};

const useMakeScrollableImage = ({
  setFileAddingPosition,
  sortableViewRef,
  imageWidth,
  deletePhoto,
  files,
  setFiles, // 불러오기 시 없는 경우를 위해
  setBody, // 불러오기 시 없는 경우를 위해
}: useMakeScrollableImageProps) => {

  console.log("useMakeScrollableImage")

  const renderItem = useCallback(
    (file: any, index: number) => {
      console.log("renderItem")
      return(
      <Pressable
        // 근데 이건 그냥 스크롤 하면서도 눌려서 별로 안좋을 수도? onLongPress 에 넣거나
        onPressIn={()=>{
          setFileAddingPosition({
            fileIndex: index,
            insertFront: false,
          });
        }}
        onLongPress={() => {
          sortableViewRef?.current?.startTouch(file, index)
        }}
        onPressOut={() => {
          sortableViewRef?.current?.onPressOut() // 3、isRequired
        }}
      >
        <RealHeightImageWithDeleteBtn
          file={file}
          fileWidth={imageWidth}
          deletePhoto={deletePhoto}
          index={index}
          setFiles={setFiles} // 불러오기 시 없는 경우를 위해
          setBody={setBody} // 불러오기 시 없는 경우를 위해
        />
      </Pressable>
    )},
    [files]
  );

  return renderItem;
};

export default useMakeScrollableImage;