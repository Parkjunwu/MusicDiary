import { RouteProp } from "@react-navigation/core";
import { useEffect, useRef, useState } from "react";
import { getYoutubeMeta } from "react-native-youtube-iframe";
import { MyDiaryListTabStackParamsList, UploadDiaryTabStackParamsList } from "../../types/navigation/homeNavStackParamsList";

// props 변경되는걸 받을 수 있을라나?
const useSetYoutubeStateNeedRoute = (
  // route:RouteProp<UploadDiaryTabStackParamsList, "UploadDiary"> | RouteProp<MyDiaryListTabStackParamsList | NotificationTabStackParamsList, "EditDiary">
  route:RouteProp<UploadDiaryTabStackParamsList, "UploadDiary" | "EditDiaryForTemporaryDiaryData"> | RouteProp<MyDiaryListTabStackParamsList, "EditDiary">
) => {
  // music 위해 추가한 부분
  const [youtubeTitle,setYoutubeTitle] = useState<string|undefined>();
  // const youtubeIdRef = useRef<string|undefined>();
  const youtubeIdRef = useRef<string|null>(null);

  const deleteMusic = () => {
    // youtubeIdRef.current = undefined;
    youtubeIdRef.current = null;
    setYoutubeTitle(undefined);
  };

  const routeParams = route.params;
  // const youtubeVideoId = routeParams?.youtubeId ?? undefined;
  const youtubeVideoId = routeParams?.youtubeId ?? null;

  useEffect(()=>{
    // const youtubeVideoId = routeParams?.youtubeId;
    const youtubeVideoTitle = routeParams?.youtubeTitle;
    // if(youtubeIdRef) {
    if(youtubeVideoTitle !== undefined) {
      youtubeIdRef.current = youtubeVideoId;
      setYoutubeTitle(youtubeVideoTitle);
    }
    // }
  },[route]);

  // EditDiary 에서 온 경우
  // 이전에 youtubeVideoId 가 있던 경우 title 받아옴
  useEffect(()=>{
    if(youtubeVideoId) {
      youtubeIdRef.current = youtubeVideoId;
      getYoutubeMeta(youtubeVideoId)
        .then(data=>{
          setYoutubeTitle(data.title);
        });
    }
  },[]);

  return {
    youtubeTitle,
    setYoutubeTitle,
    youtubeIdRef,
    deleteMusic,
  };
};

export default useSetYoutubeStateNeedRoute;