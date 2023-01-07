import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { Alert } from "react-native";
import { getYoutubeMeta } from "react-native-youtube-iframe";
import { LOCAL_DB_TEMPORARY_UPLOAD_DIARY } from "../../../temporaryDiary/constant";

type useFirstGetAndSetLocalDBTemporaryDiaryType = {
  youtubeIdRef: React.MutableRefObject<string | null>;
  setYoutubeTitle: React.Dispatch<React.SetStateAction<string | undefined>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setBody: React.Dispatch<React.SetStateAction<string>>;
};

const useFirstGetAndSetLocalDBTemporaryDiary = ({
  youtubeIdRef,
  setYoutubeTitle,
  setTitle,
  setBody,
}: useFirstGetAndSetLocalDBTemporaryDiaryType) => {

  useEffect(()=>{
    const getAndSetLocalDBTemporaryDiary = async () => {
      const localDBTemporaryDiary = await AsyncStorage.getItem(LOCAL_DB_TEMPORARY_UPLOAD_DIARY);
      // console.log("localDBTemporaryDiary : " + localDBTemporaryDiary);
      if(localDBTemporaryDiary) {
        Alert.alert("임시 저장 되어있는 일기를 불러오시겠습니까?",undefined,[
          {
            text:"불러오기",
            onPress:()=>{
              const { title, body, youtubeId } = JSON.parse(localDBTemporaryDiary);
              if(youtubeId) {
                youtubeIdRef.current = youtubeId;
                getYoutubeMeta(youtubeId)
                  .then(data=>{
                    if(data.title){
                      youtubeIdRef.current = youtubeId;
                      setYoutubeTitle(data.title);
                    }
                  });
              }
              setTitle(title);
              setBody(body);
            },
          },
          {
            text:"아니오",
            style:"destructive"
          },
        ]);
      }
    };

    getAndSetLocalDBTemporaryDiary();
  },[]);
};

export default useFirstGetAndSetLocalDBTemporaryDiary;