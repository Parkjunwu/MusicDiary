import { useCallback } from "react";
// import YoutubeIframe from "react-native-youtube-iframe";
import BaseYoutubePlayer from "./BaseYoutubePlayer";

type YoutubeComponentProps = {
  videoId: string;
  play: boolean;
  setPlay: React.Dispatch<React.SetStateAction<boolean>>;
  videoHeight?: number;
}

const YoutubeComponent = ({
  videoId,
  play,
  setPlay,
  videoHeight = 240,
}:YoutubeComponentProps) => {

  // const [play,setPlay] = useState(false);

  const onChangeState = useCallback((state:string) => {
    // console.log(state)
    if(state === "playing" || state === "buffering") {
      setPlay(true);
    } else if(state === "paused") {
      setPlay(false);
    } else if (state === "ended") {
      setPlay(false);
    }
  }, []);

  // return <YoutubeIframe
  return <BaseYoutubePlayer
    height={videoHeight}
    videoId={videoId}
    play={play}
    onChangeState={onChangeState}
  />
};

export default YoutubeComponent;