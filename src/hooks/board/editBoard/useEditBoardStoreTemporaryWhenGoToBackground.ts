import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { AppState } from "react-native";
import { TEMPORARY_EDIT_BOARD } from "../../../temporaryBoard/constant";
import { FileInfo } from "../../../types/upload/fileType";

type useEditBoardStoreTemporaryWhenGoToBackgroundProps = { 
  setFiles: (value: React.SetStateAction<FileInfo[]>) => void;
  setTitle: (value: React.SetStateAction<string>) => void;
  setBody: (value: React.SetStateAction<string[]>) => void;
  boardId: number | undefined;
  prevFiles: FileInfo[];
  prevTitle: string | undefined;
  prevBody: string[] | undefined;
};

// useEditDiaryStoreTemporaryWhenGoToBackground 랑 똑같고 youtube, TEMPORARY_EDIT_BOARD 만 다름

const useEditBoardStoreTemporaryWhenGoToBackground = ({
  setFiles,
  setTitle,
  setBody,
  boardId,
  prevFiles,
  prevTitle,
  prevBody,
}: useEditBoardStoreTemporaryWhenGoToBackgroundProps) => {
  useEffect(() => {
    const subscription = AppState.addEventListener("change", nextAppState => {
      if(nextAppState === "background") {
        setFiles(nowFile=>{
          setTitle(nowTitle=>{
            setBody(nowBody=>{

                const isFileChanged = JSON.stringify(prevFiles) !== JSON.stringify(nowFile);
                const isTitleChanged = prevTitle !== nowTitle;
                const isBodyChanged = JSON.stringify(prevBody) !== JSON.stringify(nowBody);
                
                const isSomethingChanged = isFileChanged || isTitleChanged || isBodyChanged;

                if(isSomethingChanged){
                  const temporaryData = {
                    // id: boardId,
                    boardId,
                    title: nowTitle,
                    body: nowBody,
                    files: nowFile,
                    prevFiles,
                    prevTitle,
                    prevBody,
                  };
                  AsyncStorage.setItem(TEMPORARY_EDIT_BOARD,JSON.stringify(temporaryData));
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

export default useEditBoardStoreTemporaryWhenGoToBackground;