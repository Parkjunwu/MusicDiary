import { RouteProp } from "@react-navigation/core";
import { useEffect } from "react";
import { getYoutubeMeta } from "react-native-youtube-iframe";
import { UploadDiaryTabStackParamsList } from "../../types/navigation/homeNavStackParamsList";

type useIfTemporaryHasYoutubeIdThenSetYoutubeIdAndTitleProps = {
  route: RouteProp<UploadDiaryTabStackParamsList, "EditDiaryForTemporaryDiaryData">
  youtubeIdRef: React.MutableRefObject<string | null>;
  setYoutubeTitle: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const useIfTemporaryHasYoutubeIdThenSetYoutubeIdAndTitle = ({
  route,
  youtubeIdRef,
  setYoutubeTitle,
}: useIfTemporaryHasYoutubeIdThenSetYoutubeIdAndTitleProps) => {

  useEffect(()=>{
    const youtubeId = route.params.youtubeId;
    if(youtubeId) {
      getYoutubeMeta(youtubeId)
        .then(data=>{
          if(data.title){
            youtubeIdRef.current = youtubeId;
            setYoutubeTitle(data.title);
          }
        });
    }
  },[]);

};

export default useIfTemporaryHasYoutubeIdThenSetYoutubeIdAndTitle;