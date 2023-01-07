import { useCallback } from "react";
import { Alert } from "react-native";
import { FileInfo } from "../../types/upload/fileType";


type useDeletePhotoProps = {
  setBody: React.Dispatch<React.SetStateAction<string[]>>;
  setFiles: React.Dispatch<React.SetStateAction<FileInfo[]>>;
};

const useDeletePhoto = ({
  setBody,
  setFiles,
}: useDeletePhotoProps) => {

  console.log("useDeletePhoto");

  const deletePhoto = useCallback(
    (index: number) => {

      console.log("hook deletePhoto");
      
      Alert.alert("해당 파일을 제외 시키시겠습니까?",undefined,[
        {
          text:"제외",
          style:'destructive',
          onPress:()=>{
            setBody(prev=>{
              const newArr = [...prev];
              if(newArr[index+1]){
                newArr[index] += newArr[index+1];
              }
              newArr.splice(index+1,1);
              return newArr;
            });
            setFiles(prev=>{
              const newArr = [...prev];
              newArr.splice(index,1);
              return newArr;
            });
          },
        },
        {
          text:"취소",
        },
      ]);
    },
    []
  );

  return deletePhoto;
};

export default useDeletePhoto;