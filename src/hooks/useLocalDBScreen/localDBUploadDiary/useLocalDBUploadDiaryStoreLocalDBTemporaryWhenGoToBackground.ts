import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { AppState } from "react-native";
import { LOCAL_DB_TEMPORARY_UPLOAD_DIARY } from "../../../temporaryDiary/constant";

type useLocalDBUploadDiaryStoreLocalDBTemporaryWhenGoToBackgroundProps = {
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setBody: React.Dispatch<React.SetStateAction<string>>;
  youtubeIdRef: React.MutableRefObject<string | null>;
}

const useLocalDBUploadDiaryStoreLocalDBTemporaryWhenGoToBackground = ({
  setTitle,
  setBody,
  youtubeIdRef,
}: useLocalDBUploadDiaryStoreLocalDBTemporaryWhenGoToBackgroundProps) => {
  useEffect(() => {
    const subscription = AppState.addEventListener("change", nextAppState => {
      if(nextAppState === "background") {
        setTitle(prevTitle=>{
          setBody(prevBody=>{
            const isSomethingWrite = prevTitle !== "" || prevBody !== "" || Boolean(youtubeIdRef.current);

            if(isSomethingWrite) {
              const temporaryData = {
                title: prevTitle,
                body: prevBody,
                youtubeId: youtubeIdRef.current,
              };
              AsyncStorage.setItem(LOCAL_DB_TEMPORARY_UPLOAD_DIARY,JSON.stringify(temporaryData));
            }

            return prevBody;
          });
          return prevTitle;
        });
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);
};

export default useLocalDBUploadDiaryStoreLocalDBTemporaryWhenGoToBackground;