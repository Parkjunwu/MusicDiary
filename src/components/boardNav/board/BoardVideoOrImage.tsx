import isImage from "../../../logic/isImage";
import BoardFastImageWithRealHeight from "./BoardFastImageWithRealHeight";
import BoardVideoWithScreenTouch from "./BoardVideoWithScreenTouch";

type BoardVideoOrImageProps = {
  uri: string;
  fileWidth: number;
}

const BoardVideoOrImage = ({uri,fileWidth}:BoardVideoOrImageProps) => {
  const isFileImage = isImage(uri);
  return (
    isFileImage ? 
      <BoardFastImageWithRealHeight uri={uri} fileWidth={fileWidth} />
    :
      <BoardVideoWithScreenTouch
        uri={uri}
        fileWidth={fileWidth}
      />
  );
};

export default BoardVideoOrImage;