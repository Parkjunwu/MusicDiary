import { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';
import Video, { OnLoadData } from 'react-native-video';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import VideoIconWithDarkMode from '../video/VideoIconWithDarkMode';
// 안드로이드 빌드 안되서 react-native-video-cache 삭제
// import convertToProxyURL from 'react-native-video-cache';
// import { logoUriVar } from '../../apollo';
import { logoUri } from '../../localImage/preloadLocalImageAndSetReactiveVar';

const TouchContainer = styled.Pressable`
  position: relative;
`;

type DiaryVideoWithScreenTouchType = {
  // isVideoPlayingPost:boolean;
  uri: string;
  // index:number;
  // onScreenIndex:number;
  // onPressVideo: Function | null;
  fileWidth: number;
  isNowMusicPlaying: boolean;
  setIsNowMusicPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  videoPlayingState: {[key: string]: boolean};
  setVideoPlayingState: React.Dispatch<React.SetStateAction<{[key: string]: boolean}>>;
  isMusicPlayingBeforeVideoPlay: React.MutableRefObject<boolean>;
};

// 타입 없어서 걍 내가 넣음
// const AnimatedVideoIcon = Animated.createAnimatedComponent(VideoIconWithDarkMode);
const AnimatedVideoView = Animated.View;
const AnimatedPauseAndPlayIcon = Animated.View;

const DiaryVideoWithScreenTouch = ({
  uri,
  fileWidth,
  isNowMusicPlaying,
  setIsNowMusicPlaying,
  videoPlayingState,
  setVideoPlayingState,
  isMusicPlayingBeforeVideoPlay,
}:DiaryVideoWithScreenTouchType) => {

  // const [paused,setPaused] = useState(true);
  const paused = !videoPlayingState[uri];

  const [fileHeight,setImageHeight] = useState(fileWidth);

  const onLoadVideo = ({naturalSize: { height,width }}:OnLoadData) => {
    // 걍 비디오 아이콘 보이게 80 뺏는데 
    const resizedHeight = (fileWidth) / width * height;
    setImageHeight(resizedHeight);
  };

  // const onProgress = (data: OnProgressData) => console.log(data)

  const pauseAndPlayIconOpacity = useRef(new Animated.Value(0)).current;

  const videoViewOpacity = pauseAndPlayIconOpacity.interpolate({
    inputRange:[0,0.7,1],
    outputRange:[1,1,0.7],
  });

  const videoIconOpacity = useRef(new Animated.Value(1)).current;

  // 얘는 useEffect 에 넣어야 맞게 작동
  useEffect(()=>{
    if(paused) {
      videoIconOpacity.setValue(1);
    } else {
      Animated.timing(videoIconOpacity,{
        toValue: 0,
        useNativeDriver:true,
        duration: 300,
        delay: 200,
      }).start();
    }
  },[paused])

  const runOpacityAnimation = () => {
    pauseAndPlayIconOpacity.setValue(1);
    Animated.timing(pauseAndPlayIconOpacity,{
      toValue:0,
      useNativeDriver:true,
      duration: 500,
    }).start();
  };

  const onPress = () => {
    runOpacityAnimation();
    // setPaused(prev=> !prev);
    if(isNowMusicPlaying) {
      // isMusicPlayingBeforeVideoPlay.current = true;
      // setVideoPlayingState(prev=>{
      //   const newObj = {...prev};
      //   newObj[uri] = true;
      //   return newObj;
      // });
      // setIsNowMusicPlaying(false);
      setThisVideoPlayingToTrueAndMusicOffAndPrevMusicStateToFalse({
        uri,
        setVideoPlayingState,
        setIsNowMusicPlaying,
        isMusicPlayingBeforeVideoPlay,
      })
    } else {
      const isThisVideoPlaying = videoPlayingState[uri];
      if(isThisVideoPlaying) {
        // setVideoPlayingState(prev=>{
        //   const newObj = {...prev};
        //   newObj[uri] = false;
        //   return newObj;
        // });
        // if(isMusicPlayingBeforeVideoPlay.current) {
        //   setIsNowMusicPlaying(true);
        //   isMusicPlayingBeforeVideoPlay.current = false;
        // }
        // // setIsNowMusicPlaying(isMusicPlayingBeforeVideoPlay.current);
        // // isMusicPlayingBeforeVideoPlay.current = false;
        setThisVideoPlayingToFalseAndPrevMusicStateToTrue({
          uri,
          setVideoPlayingState,
          setIsNowMusicPlaying,
          isMusicPlayingBeforeVideoPlay,
        });
      } else {
        // setVideoPlayingState(prev=>{
        //   const newObj: {[key: string]: boolean} = {};
        //   for (const key in prev) {;
        //     newObj[key] = false;
        //   }
        //   newObj[uri] = true;
        //   return newObj;
        // });
        setNowVideoPlayingIsThisVideo({
          uri,
          setVideoPlayingState,
        });
      }
    }
  };
  
  const onEndVideo = () => {
    // setPaused(true);
    setThisVideoPlayingToFalseAndPrevMusicStateToTrue({
      uri,
      setVideoPlayingState,
      setIsNowMusicPlaying,
      isMusicPlayingBeforeVideoPlay,
    });
  };

  return (
    <TouchContainer onPress={onPress} >
      {/* android 는 이래 쓰면 안되서 걍 Animated.View 에 넣음 */}
      {/* <AnimatedVideoIcon iconSize={25} top="2%" left="3%" style={{
        opacity: videoIconOpacity,
      }} /> */}
      <Animated.View style={{
        opacity: videoIconOpacity,
        zIndex: 1,
      }}>
        <VideoIconWithDarkMode iconSize={25} top={10} left="3%" />
      </Animated.View>
      <AnimatedVideoView
        style={{
          opacity: videoViewOpacity,
          flex: 1,
        }}
      >
        <Video
          // 안드로이드 빌드 안되서 react-native-video-cache 삭제
          // source={{ uri: convertToProxyURL(uri) }}
          source={{ uri }}
          // source={{
          //   uri:"https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
          // }}
          // source={{
          //   uri:"https://music-diary-upload.s3.ap-northeast-2.amazonaws.com/music/music-hls/music.m3u8",
          // }}
          
          // source={require("../../../../../MusicDiary관련/convert-hls-file/video-hls/.m3u8")}
          onLoad={onLoadVideo}
          // onProgress={onProgress}
          style={{
            width: fileWidth,
            height: fileHeight,
          }}
          repeat={ true }
          paused={ paused }
          resizeMode="contain"
          onEnd={ onEndVideo }
          // 로딩중일때. 이미지밖에 안됨
          // fileHeight === 0 일때 loading 컴포넌트 이런 식으로 하면 얘의 onLoad 가 안되서 이래함.
          // poster={logoUriVar()}
          poster={logoUri}
        />
      </AnimatedVideoView>
      <AnimatedPauseAndPlayIcon
        style={{
          opacity: pauseAndPlayIconOpacity,
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ionicons name={paused ? "ios-pause" : "ios-play"} size={70} color="white" />
      </AnimatedPauseAndPlayIcon>
    </TouchContainer>
  )
};

export default DiaryVideoWithScreenTouch;


const setThisVideoPlayingToTrueAndMusicOffAndPrevMusicStateToFalse = ({
  uri,
  setVideoPlayingState,
  setIsNowMusicPlaying,
  isMusicPlayingBeforeVideoPlay,
}: elseSetProps) => {
  // setVideoPlayingState(prev=>{
  //   const newObj = {...prev};
  //   newObj[uri] = true;
  //   return newObj;
  // });
  setVideoPlayingState(getPrevStateAndOnlyUriChange({uri,to:true}));
  setIsNowMusicPlaying(false);
  isMusicPlayingBeforeVideoPlay.current = true;
};

const setThisVideoPlayingToFalseAndPrevMusicStateToTrue = ({
  uri,
  setVideoPlayingState,
  setIsNowMusicPlaying,
  isMusicPlayingBeforeVideoPlay,
}: elseSetProps) => {
  // setVideoPlayingState(prev=>{
  //   const newObj = {...prev};
  //   newObj[uri] = false;
  //   return newObj;
  // });
  setVideoPlayingState(getPrevStateAndOnlyUriChange({uri,to:false}));
  // if(isMusicPlayingBeforeVideoPlay.current) {
  //   setIsNowMusicPlaying(true);
  //   isMusicPlayingBeforeVideoPlay.current = false;
  // }
  setIsNowMusicPlaying(isMusicPlayingBeforeVideoPlay.current);
  isMusicPlayingBeforeVideoPlay.current = false;
};

const getPrevStateAndOnlyUriChange = ({
  uri,
  to,
}: getPrevStateAndOnlyUriChangeType) => {
  return (prev: {[key: string]: boolean})=>{
    const newObj = {...prev};
    newObj[uri] = to;
    return newObj;
  };
};

type getPrevStateAndOnlyUriChangeType = {
  uri: string;
  to: boolean;
}

const setNowVideoPlayingIsThisVideo = ({
  uri,
  setVideoPlayingState,
}: setNowVideoPlayingIsThisVideoProps) => {
  setVideoPlayingState(prev=>{
    const newObj: {[key: string]: boolean} = {};
    for (const key in prev) {;
      newObj[key] = false;
    }
    newObj[uri] = true;
    return newObj;
  });
};

type setNowVideoPlayingIsThisVideoProps = {
  uri: string;
  setVideoPlayingState: React.Dispatch<React.SetStateAction<{[key: string]: boolean}>>;
};

type elseSetProps = {
  setIsNowMusicPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  isMusicPlayingBeforeVideoPlay: React.MutableRefObject<boolean>;
} & setNowVideoPlayingIsThisVideoProps;