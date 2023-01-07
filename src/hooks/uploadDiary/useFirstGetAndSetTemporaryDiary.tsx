import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { Alert } from "react-native";
import { getYoutubeMeta } from "react-native-youtube-iframe";
import { TEMPORARY_UPLOAD_DIARY } from "../../temporaryDiary/constant";
import { FileInfo } from "../../types/upload/fileType";

type useFirstGetAndSetTemporaryDiaryProps = {
  youtubeIdRef: React.MutableRefObject<string | null>;
  setYoutubeTitle: React.Dispatch<React.SetStateAction<string | undefined>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setBody: React.Dispatch<React.SetStateAction<string[]>>;
  setFiles: React.Dispatch<React.SetStateAction<FileInfo[]>>;
};

const useFirstGetAndSetTemporaryDiary = ({
  youtubeIdRef,
  setYoutubeTitle,
  setTitle,
  setBody,
  setFiles,
}: useFirstGetAndSetTemporaryDiaryProps) => {
  useEffect(()=>{
    const getAndSetLocalDBTemporaryDiary = async () => {
      const TemporaryDiary = await AsyncStorage.getItem(TEMPORARY_UPLOAD_DIARY);
      // console.log("TemporaryDiary : " + TemporaryDiary);
      if(TemporaryDiary) {
        Alert.alert("임시 저장 되어있는 일기를 불러오시겠습니까?",undefined,[
          {
            text:"불러오기",
            onPress:()=>{
              const { title, body, youtubeId, files } = JSON.parse(TemporaryDiary);
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
              // const sources = files.map(file=>{
              //   const {uri,...rest} = file;
              //   return {
              //     ...rest,
              //     uri:uri.substring(37,uri.length)
              //   }
              // });
              // const sources = files.map(file=>{
              //   return Image.resolveAssetSource(require(file))
              // });
              setFiles(files);
              // setFiles(sources);
              // 에러나면 ImageWithRealHeight 에서 변경함
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

export default useFirstGetAndSetTemporaryDiary;