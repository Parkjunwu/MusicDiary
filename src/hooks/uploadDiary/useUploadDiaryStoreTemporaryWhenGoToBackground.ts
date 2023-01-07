import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { AppState } from "react-native";
import { TEMPORARY_UPLOAD_DIARY } from "../../temporaryDiary/constant";
import { FileInfo } from "../../types/upload/fileType";

type useUploadDiaryStoreTemporaryWhenGoToBackgroundProps = {
  setFiles: (value: React.SetStateAction<FileInfo[]>) => void;
  setTitle: (value: React.SetStateAction<string>) => void;
  setBody: (value: React.SetStateAction<string[]>) => void;
  youtubeIdRef: React.MutableRefObject<string | null>;
}

const useUploadDiaryStoreTemporaryWhenGoToBackground = ({
  setFiles,
  setTitle,
  setBody,
  youtubeIdRef,
} :useUploadDiaryStoreTemporaryWhenGoToBackgroundProps) => {
  useEffect(() => {
    const subscription = AppState.addEventListener("change", nextAppState => {
      if(nextAppState === "background") {
        setFiles(prevFile=>{
          setTitle(prevTitle=>{
            setBody(prevBody=>{
              const isSomethingWrite = prevFile.length !== 0 || !(prevBody.length === 1 && prevBody[0] === "") || prevTitle !== "" || Boolean(youtubeIdRef.current);

              if(isSomethingWrite) {
                const temporaryData = {
                  title: prevTitle,
                  body: prevBody,
                  youtubeId: youtubeIdRef.current,
                  files: prevFile,
                };
                AsyncStorage.setItem(TEMPORARY_UPLOAD_DIARY,JSON.stringify(temporaryData));
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

export default useUploadDiaryStoreTemporaryWhenGoToBackground;