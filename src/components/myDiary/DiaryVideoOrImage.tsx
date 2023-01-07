import isImage from "../../logic/isImage";
import DiaryFastImageWithRealHeight from "./DiaryFastImageWithRealHeight";
import DiaryVideoWithScreenTouch from "./DiaryVideoWithScreenTouch";

type DiaryVideoOrImageProps = {
  uri: string;
  fileWidth: number;
  isNowMusicPlaying: boolean;
  setIsNowMusicPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  videoPlayingState: {[key: string]: boolean};
  setVideoPlayingState: React.Dispatch<React.SetStateAction<{[key: string]: boolean}>>;
  isMusicPlayingBeforeVideoPlay: React.MutableRefObject<boolean>;
};

const DiaryVideoOrImage = ({
  uri,
  fileWidth,
  isNowMusicPlaying,
  setIsNowMusicPlaying,
  videoPlayingState,
  setVideoPlayingState,
  isMusicPlayingBeforeVideoPlay,
}:DiaryVideoOrImageProps) => {
  const isFileImage = isImage(uri);
  return (
    isFileImage ? 
      <DiaryFastImageWithRealHeight
        uri={uri}
        fileWidth={fileWidth}
      />
    :
      <DiaryVideoWithScreenTouch
        uri={uri}
        fileWidth={fileWidth}
        isNowMusicPlaying={isNowMusicPlaying}
        setIsNowMusicPlaying={setIsNowMusicPlaying}
        videoPlayingState={videoPlayingState}
        setVideoPlayingState={setVideoPlayingState}
        isMusicPlayingBeforeVideoPlay={isMusicPlayingBeforeVideoPlay}
      />
  );
};

export default DiaryVideoOrImage;