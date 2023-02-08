import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { AppState } from "react-native";
import { TEMPORARY_UPLOAD_BOARD } from "../../../temporaryBoard/constant";
import { FileInfo } from "../../../types/upload/fileType";

type useUploadBoardStoreTemporaryWhenGoToBackgroundProps = {
  setFiles: (value: React.SetStateAction<FileInfo[]>) => void;
  setTitle: (value: React.SetStateAction<string>) => void;
  setBody: (value: React.SetStateAction<string[]>) => void;
}

const useUploadBoardStoreTemporaryWhenGoToBackground = ({
  setFiles,
  setTitle,
  setBody,
}: useUploadBoardStoreTemporaryWhenGoToBackgroundProps) => {
  useEffect(() => {
    const subscription = AppState.addEventListener("change", nextAppState => {
      if(nextAppState === "background") {
        setFiles(prevFile=>{
          setTitle(prevTitle=>{
            setBody(prevBody=>{
              const isSomethingWrite = prevFile.length !== 0 || !(prevBody.length === 1 && prevBody[0] === "") || prevTitle !== "";

              if(isSomethingWrite) {
                const temporaryData = {
                  title: prevTitle,
                  body: prevBody,
                  files: prevFile,
                };
                AsyncStorage.setItem(TEMPORARY_UPLOAD_BOARD,JSON.stringify(temporaryData));
              }

              return prevBody;
            });
            return prevTitle;
          });
          return prevFile;
        });
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);
};

export default useUploadBoardStoreTemporaryWhenGoToBackground;