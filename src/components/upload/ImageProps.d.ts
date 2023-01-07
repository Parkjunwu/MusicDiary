import { ImageStyle } from "react-native"
import { FileInfo } from "../../types/upload/fileType"

export type ImageWithRealHeightProps = {
  file: FileInfo,
  fileWidth: number,
  imageStyle?: ImageStyle,
  setFiles?: React.Dispatch<React.SetStateAction<FileInfo[]>>,
  setBody?: React.Dispatch<React.SetStateAction<string[]>>,
  index: number,
};

export type RealHeightImageWithDeleteBtnProps = {
  // onPressDeletePhoto: () => void,
  deletePhoto: (index: number) => void
  // index: number
} & ImageWithRealHeightProps;

