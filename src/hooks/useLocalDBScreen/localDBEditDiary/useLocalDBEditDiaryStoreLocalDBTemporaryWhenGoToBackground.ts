import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { AppState } from "react-native";
import { LOCAL_DB_TEMPORARY_EDIT_DIARY } from "../../../temporaryDiary/constant";

type useLocalDBEditDiaryStoreLocalDBTemporaryWhenGoToBackgroundProps = {
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setBody: React.Dispatch<React.SetStateAction<string | string[]>>;
  youtubeIdRef: React.MutableRefObject<string | null>;
  diaryId: number | undefined;
  prevBody: string;
  prevTitle: string;
  prevYoutubeId: string | null;
}

const useLocalDBEditDiaryStoreLocalDBTemporaryWhenGoToBackground = ({
  setTitle,
  setBody,
  youtubeIdRef,
  diaryId,
  prevTitle,
  prevBody,
  prevYoutubeId,
}: useLocalDBEditDiaryStoreLocalDBTemporaryWhenGoToBackgroundProps) => {
  useEffect(() => {
    const subscription = AppState.addEventListener("change", nextAppState => {
      if(nextAppState === "background") {
        setTitle(nowTitle=>{
          setBody(nowBody=>{
            const isSomethingWrite = nowTitle !== "" || nowBody !== "" || Boolean(youtubeIdRef.current);

            // console.log("prevTitle : "+ prevTitle)
            // console.log("prevBody : "+ prevBody)
            // console.log("prevYoutubeId : "+ prevYoutubeId)
            // console.log("nowTitle : "+ nowTitle)
            // console.log("nowBody : "+ nowBody)
            // console.log("diaryId : "+ diaryId)
            // console.log("youtubeIdRef.current : "+ youtubeIdRef.current)


            if(isSomethingWrite) {
              const temporaryData = {
                diaryId,
                title: nowTitle,
                body: nowBody,
                youtubeId: youtubeIdRef.current,
                prevTitle,
                prevBody,
                prevYoutubeId,
              };
              AsyncStorage.setItem(LOCAL_DB_TEMPORARY_EDIT_DIARY,JSON.stringify(temporaryData));
            }

            return nowBody;
          });
          return nowTitle;
        });
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);
};

export default useLocalDBEditDiaryStoreLocalDBTemporaryWhenGoToBackground;