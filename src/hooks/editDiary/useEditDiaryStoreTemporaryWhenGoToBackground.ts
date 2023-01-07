import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { AppState } from "react-native";
import { TEMPORARY_EDIT_DIARY } from "../../temporaryDiary/constant";
import { FileInfo } from "../../types/upload/fileType";

type useEditDiaryStoreTemporaryWhenGoToBackgroundProps = { 
  setFiles: (value: React.SetStateAction<FileInfo[]>) => void;
  setTitle: (value: React.SetStateAction<string>) => void;
  setBody: (value: React.SetStateAction<string[]>) => void;
  youtubeIdRef: React.MutableRefObject<string | null>;
  diaryId: number | undefined,
  prevFiles: FileInfo[],
  prevTitle: string | undefined,
  prevBody: string[] | undefined,
  prevYoutubeId: string | null,
}

const useEditDiaryStoreTemporaryWhenGoToBackground = ({
  setFiles,
  setTitle,
  setBody,
  youtubeIdRef,
  diaryId,
  prevFiles,
  prevTitle,
  prevBody,
  prevYoutubeId,
}: useEditDiaryStoreTemporaryWhenGoToBackgroundProps) => {
  useEffect(() => {
    const subscription = AppState.addEventListener("change", nextAppState => {
      if(nextAppState === "background") {
        setFiles(nowFile=>{
          setTitle(nowTitle=>{
            setBody(nowBody=>{

                const isFileChanged = JSON.stringify(prevFiles) !== JSON.stringify(nowFile);
                const isTitleChanged = prevTitle !== nowTitle;
                const isBodyChanged = JSON.stringify(prevBody) !== JSON.stringify(nowBody);
                const isYoutubeChanged = prevYoutubeId !== youtubeIdRef.current;
                
                const isSomethingChanged = isFileChanged || isTitleChanged || isBodyChanged || isYoutubeChanged;

                if(isSomethingChanged){
                  const temporaryData = {
                    // id: diaryId,
                    diaryId,
                    title: nowTitle,
                    body: nowBody,
                    youtubeId: youtubeIdRef.current,
                    files: nowFile,
                    prevFiles,
                    prevTitle,
                    prevBody,
                    prevYoutubeId,
                  };
                  AsyncStorage.setItem(TEMPORARY_EDIT_DIARY,JSON.stringify(temporaryData));
                }

              return nowBody;
            });
            return nowTitle;
          });
          return nowFile;
        });
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);
};

export default useEditDiaryStoreTemporaryWhenGoToBackground;