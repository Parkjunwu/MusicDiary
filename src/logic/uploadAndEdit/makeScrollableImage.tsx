import { Pressable } from "react-native";
import AnySizeDragSortableView from "../../components/upload/AnySizeDragSortableView";
import RealHeightImageWithDeleteBtn from "../../components/upload/RealHeightImageWithDeleteBtn";
import { FileInfo } from "../../types/upload/fileType";

type makeScrollableImageProps = {
  setFileAddingPosition: React.Dispatch<React.SetStateAction<{
    fileIndex: number;
    insertFront: boolean;
  }>>,
  sortableViewRef: React.RefObject<AnySizeDragSortableView>,
  imageWidth: number,
  deletePhoto: (index: number) => void,
  files: FileInfo[],
};

const makeScrollableImage = ({
  setFileAddingPosition,
  sortableViewRef,
  imageWidth,
  deletePhoto,
}: makeScrollableImageProps) => {

  console.log("MakeScrollableImage")

  // 얘는 useCallback 쓰나 안쓰나 똑같이 작동. 근데 당연히 똑같지 새꺄 선언인데 선언을 똑같은걸 가져오는 거여
  const renderItem = (file: any, index: number) => {
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
      />
    </Pressable>
  )};

  return renderItem;
};

export default makeScrollableImage;