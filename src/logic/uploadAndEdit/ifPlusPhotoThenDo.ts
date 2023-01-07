import { FileInfo } from "../../types/upload/fileType";

// useIfGetPlusFilesThenSetFilesAndBodyAndFileAddingPosition 에 다 때려박음. 좀 별로면 걍 각각 useEffect 넣고 이걸 넣던지 아님 이거 지워 그냥

type combinedFilesThatAddedFilesPutOnInputIndexProps = {
  prevFiles: FileInfo[],
  addedFiles: FileInfo[],
  inputIndex: number,
};
// type fileIndexPlusAddedFileLengthProps = {
//   prevFileAddingPosition: {
//     fileIndex: number;
//     insertFront: boolean;
//   },
//   numberOfAddedFiles: number;
// };
type bodyThatEmptyStringsPutOnAsManyAsAddedFilesProps = {
  prevBody: string[],
  numberOfAddedFiles: number,
  inputPosition: number,
};

// combinedFilesThatAddedFilesPutOnInputIndex
const combinedFilesThatAddedFilesPutOnInputIndex = ({
  prevFiles,
  addedFiles,
  inputIndex,
}: combinedFilesThatAddedFilesPutOnInputIndexProps) => {

  if(prevFiles.length === 0) return [...addedFiles];
  
  const frontFileArr = prevFiles.slice(0,inputIndex);
  const endFileArr = prevFiles.slice(inputIndex,prevFiles.length);

  return [...frontFileArr,...addedFiles,...endFileArr];
};

// 얘는 그냥 쓰는게 더 보기 쉬움.
// const fileIndexPlusAddedFileLength = ({
//   prevFileAddingPosition,
//   numberOfAddedFiles,
// }: fileIndexPlusAddedFileLengthProps) => {

//   const prevFileIndex = prevFileAddingPosition.fileIndex;
//   const addedFileIndex = prevFileIndex + numberOfAddedFiles;
//   const prevInsertFront = prevFileAddingPosition.insertFront;

//   return {
//     fileIndex: addedFileIndex,
//     insertFront: prevInsertFront,
//   };
// }


const bodyThatEmptyStringsPutOnAsManyAsAddedFiles = ({
  prevBody,
  numberOfAddedFiles,
  inputPosition,
}: bodyThatEmptyStringsPutOnAsManyAsAddedFilesProps) => {

  const emptyStringArr = new Array(numberOfAddedFiles).fill("");
  const frontFileArr = prevBody.slice(0,inputPosition);
  const endFileArr = prevBody.slice(inputPosition,prevBody.length);

  return [...frontFileArr,...emptyStringArr,...endFileArr];
};


export {
  combinedFilesThatAddedFilesPutOnInputIndex,
  // fileIndexPlusAddedFileLength,
  bodyThatEmptyStringsPutOnAsManyAsAddedFiles,
};