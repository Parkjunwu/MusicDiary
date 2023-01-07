import { RouteProp } from "@react-navigation/core";
import { useEffect } from "react";
import { MyDiaryListTabStackParamsList, UploadDiaryTabStackParamsList } from "../../types/navigation/homeNavStackParamsList";
import { FileInfo } from "../../types/upload/fileType";

type combinedFilesThatAddedFilesPutOnInputIndexProps = {
  prevFiles: FileInfo[];
  addedFiles: FileInfo[];
  inputIndex: number;
};

type bodyThatEmptyStringsPutOnAsManyAsAddedFilesProps = {
  prevBody: string[];
  numberOfAddedFiles: number;
  inputPosition: number;
};

type fileAddingPositionType = {
  fileIndex: number;
  insertFront: boolean;
};

type hookProps = {
  // route: RouteProp<UploadDiaryTabStackParamsList, "UploadDiary"> | RouteProp<MyDiaryListTabStackParamsList | NotificationTabStackParamsList, "EditDiary">;
  route: RouteProp<UploadDiaryTabStackParamsList, "UploadDiary" | "EditDiaryForTemporaryDiaryData"> | RouteProp<MyDiaryListTabStackParamsList, "EditDiary">;
  fileAddingPosition: fileAddingPositionType;
  setFiles: React.Dispatch<React.SetStateAction<FileInfo[]>>;
  setFileAddingPosition: React.Dispatch<React.SetStateAction<fileAddingPositionType>>;
  setBody: React.Dispatch<React.SetStateAction<string[]>>;
}


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



// 이건 너무 props 많이 받아서 별로일듯.

const useIfGetPlusFilesThenAddToNowFilesAndSetBodyAndAddingPosition = ({
  route,
  fileAddingPosition,
  setFiles,
  setFileAddingPosition,
  setBody,
}: hookProps) => {
  useEffect(()=>{
    // const addedFiles: FileInfo[] | undefined = route.params?.file;
    const addedFiles: FileInfo[] | undefined = route.params?.plusFiles;
    // console.log("addedFiles");
    // console.log(addedFiles);
    if(addedFiles) {
      const fileIndex = fileAddingPosition.fileIndex;
      const insertFront = fileAddingPosition.insertFront;

      const numberOfAddedFiles = addedFiles.length;

      setFiles(prevFiles=>{
        const inputIndex = insertFront ? fileIndex : fileIndex + 1;
        return combinedFilesThatAddedFilesPutOnInputIndex({
          prevFiles,
          addedFiles,
          inputIndex,
        });
      });
      // 추가한애 다음으로 다시 설정.
      setFileAddingPosition(prev=>({
        fileIndex: prev.fileIndex + numberOfAddedFiles,
        insertFront: prev.insertFront,
      }));
      setBody(prevBody=>{
        return bodyThatEmptyStringsPutOnAsManyAsAddedFiles({
          prevBody,
          numberOfAddedFiles,
          inputPosition: fileIndex + 1,
        })
      });
    }
  },[route]);
};

export default useIfGetPlusFilesThenAddToNowFilesAndSetBodyAndAddingPosition;


// // 이건 안나눠 놓은거. 나눈거는 upload 랑 edit 이 다르게 쓸 수도 있고 params 너무 많아서 걍 각각 쓸라고 햇는데 걍 안나눈게 나을라나?
// const useIfGetPlusFilesThenAddToNowFilesAndSetBodyAndAddingPosition = ({
//   route,
//   fileAddingPosition,
//   setFiles,
//   setFileAddingPosition,
//   setBody,
// }: hookProps) => {
//   useEffect(()=>{
//     // 여기도 route.params.files 에서 file 로 바꿈
//     const addedFiles:FileInfo[] | undefined = route.params?.file;
//     console.log("route.params.files");
//     console.log(addedFiles);
//     if(addedFiles) {
//       const fileIndex = fileAddingPosition.fileIndex;
//       const insertFront = fileAddingPosition.insertFront;
//       setFiles(prev=>{
//         if(prev.length === 0) return [...addedFiles];
//         // 맞나?
//         const inputFilesIndex = insertFront ? fileIndex : fileIndex + 1;
//         const frontFileArr = prev.slice(0,inputFilesIndex);
//         const endFileArr = prev.slice(inputFilesIndex,prev.length);
//         return [...frontFileArr,...addedFiles,...endFileArr];
//       });
//       setFileAddingPosition(prev=>({
//         fileIndex: prev.fileIndex + addedFiles.length,
//         insertFront: prev.insertFront,
//       }));
//       // TextInput 들도 다 바꿔
//       setBody(prev=>{
//         const inputEmptyStringIndex = fileIndex + 1;
//         const frontFileArr = prev.slice(0,inputEmptyStringIndex);
//         const endFileArr = prev.slice(inputEmptyStringIndex,prev.length);
//         const emptyStringArr = new Array(addedFiles.length).fill("");
//         return [...frontFileArr,...emptyStringArr,...endFileArr];
//       });
//     }
//     // 위치 안쓰고 그냥 마지막에 넣는 경우. 아님 upload 에만 쓰거나
//     // if(addedFiles) {
//     //   setFiles(prev=>{
//     //     if(prev.length === 0) return [...addedFiles];
//     //     return [...prev,...addedFiles];
//     //   });
//     //   setBody(prev=>{
//     //     const emptyStringArr = new Array(addedFiles.length).fill("");
//     //     return [...prev,...emptyStringArr];
//     //   });
//     // }
//   },[route]);
// };