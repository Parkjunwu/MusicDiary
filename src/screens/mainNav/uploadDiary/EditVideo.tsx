import React, { useEffect, useRef, useState } from 'react';
import { Alert, LayoutChangeEvent, useWindowDimensions, View } from 'react-native';
import { VideoPlayer, Trimmer, ProcessingManager } from 'react-native-video-processing';
import styled, { css } from 'styled-components/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useIsFocused } from '@react-navigation/native';
import { isAndroid, isIOS } from '../../../utils';
import useIsDarkMode from '../../../hooks/useIsDarkMode';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { UploadDiaryTabStackParamsList } from '../../../types/navigation/homeNavStackParamsList';
import { FontAppliedBaseTextNeedFontSize } from '../../../styled-components/FontAppliedComponents';

const Container = styled.View`
  flex: 1;
  background-color: ${props=>props.theme.backgroundColor};
`;
const GettingHeightContainer = styled.View`
  flex: 5;
`;
const TrimmerContainer = styled.View`
  flex: 1;
  align-items: center;
`;
const ActionBtnContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 20px;
  width: 100%;
`;
const SaveBtnContainer = styled.View`
  flex-direction: row;
`;
const SaveBtn = styled.TouchableOpacity<{isDarkMode:boolean,isVideoSave:boolean}>`
  margin-right: 7px;
  width: 17px;
  height: 17px;
  border-radius: 3px;
  border: 1px;
  border-color: ${props => props.isDarkMode ? "white" : "black"
  };
  background-color: white;
  align-items: center;
  justify-content: center;
`;
// const SaveBtnText = styled.Text`
//   color: ${props=>props.theme.textColor};
// `;
const SaveBtnText = styled(FontAppliedBaseTextNeedFontSize)`
  
`;
const PreviewBtn = styled.TouchableOpacity`

`;
const PreviewBtnText = styled(SaveBtnText)`
  font-weight: bold;
  margin-left: auto;
`;
const ExplainTextContainer = styled.View<{isAndroid:boolean}>`
  ${(props)=>props.isAndroid
  ?
    css`
      flex: 1;
    `
  :
    css`
      flex: 0.6;
      padding-top: 55px;
    `
  };
`;
const ExplainText = styled(SaveBtnText)`
  text-align: center;
`;
const EditCompleteBtn = styled.TouchableOpacity`
  
`;
const EditCompleteBtnText = styled(FontAppliedBaseTextNeedFontSize)`
  
`;

type TodayDiaryProps = NativeStackScreenProps<UploadDiaryTabStackParamsList,"EditVideo">;

const EditVideo = ({navigation,route}:TodayDiaryProps) => {

  const pureVideoFile = route.params.file;
  const isFromPetLog = route.params.from;

  const [currentTime,setCurrentTime] = useState(0);
  const [containerHeight,setContainerHeight] = useState(0);
  const [nowTrim,setNowTrim] = useState<{startTime:number,endTime:number}>();

  const videoPlayerRef = useRef<any>();

  const windowWidth = useWindowDimensions().width;
  
  
  const getVideoInfo = () => {
    videoPlayerRef.current.getVideoInfo()
    .then((info) => {
      console.log("getVideoInfo")
      console.log(info)
      setNowTrim({
        startTime: 0,
        endTime: info.duration
      });
    })
    .catch(console.warn);
  };

  useEffect(()=>{
    if(videoPlayerRef?.current){
      getVideoInfo();
    }
  },[videoPlayerRef]);
  
  const [isVideoSave,setIsVideoSave] = useState(false);

  // const trimVideoAndNavigateWithThumbNail = (forIOSThumbNailUri) => {
  //   const options = {
  //     startTime:nowTrim.startTime,
  //     endTime:nowTrim.endTime,
  //     // quality: VideoPlayer.Constants.quality.QUALITY_1280x720, // iOS only
  //     saveToCameraRoll: isVideoSave, // default is false // iOS only
  //     saveWithCurrentDate: isVideoSave, // default is false // iOS only
  //   };
  //   videoPlayerRef?.current.trim(options)
  //     .then((newVideoFile) => {
  //       // navigation.navigate("CheckEditVideo",{
  //       navigation.navigate("UploadForm",{
  //         pureVideoFile,
  //         newVideoFile,
  //         forIOSThumbNailUri,
  //       });
  //     })
  //     .catch(console.warn);
  // };

  const trimVideoWithSaveOptionReturnAlsoPureVideoFileAndGivenParamForIOSThumbNailUri = (forIOSThumbNailUri) => {
    const options = {
      startTime:isAndroid ? nowTrim.startTime * 1000 : nowTrim.startTime,
      endTime:isAndroid ? nowTrim.endTime * 1000 : nowTrim.endTime,
      // quality: VideoPlayer.Constants.quality.QUALITY_1280x720, // iOS only
      saveToCameraRoll: isVideoSave, // default is false // iOS only
      saveWithCurrentDate: isVideoSave, // default is false // iOS only
    };
    // videoPlayerRef?.current 로 쓰니까 undefined 나옴. 왜지?
    // return videoPlayerRef?.current.trim(options)
    return ProcessingManager.trim(pureVideoFile, options)
      .then(uri=>({
        pureVideoFile,
        newVideoFile:uri,
        forIOSThumbNailUri,
      }));
  };

  const trimVideoWithoutSaveOption = () => {
    const options = {
      startTime:isAndroid ? nowTrim.startTime * 1000 : nowTrim.startTime,
      endTime:isAndroid ? nowTrim.endTime * 1000 : nowTrim.endTime,
      // quality: VideoPlayer.Constants.quality.QUALITY_1280x720, // iOS only
    };
    // 얘도 videoPlayerRef?.current 로 쓰니까 undefined 나옴.
    // return videoPlayerRef?.current.trim(options);
    return ProcessingManager.trim(pureVideoFile, options)
  };

  // 영상 사이즈 조절은 업로드에서 일괄로 함

  // 안드로이드는 JPEG 못받는듯. base64String 로 나옴, ios 도 되나 확인?
  const getPreviewImageForIOSThumbnail = (second) => {
    const maximumSize = { width: 500, height: 500 }; // default is { width: 1080, height: 1080 } iOS only
    return videoPlayerRef?.current.getPreviewForSecond(second, maximumSize, "JPEG")
    // ios 는 SelectPhoto 에서도 썸네일 받아서 base64 쓰면 형식이 안맞음.
    // return videoPlayerRef?.current.getPreviewForSecond(second, maximumSize, 'base64')
    
      // .then(image=>image.uri) // maximumSize is iOS only
      .then(image=>{
        return isAndroid ? image.image : image.uri;
        // base64 일 때.
        // return isAndroid ? image.image : image;
      }) // maximumSize is iOS only
  };

  const getHeightForVideoPlayer = (event: LayoutChangeEvent) => {
    const {height} = event.nativeEvent.layout;
    setContainerHeight(height);
  };

  const onTrackMove = (e) => {
    console.log("onTrackMove e")
    console.log(e)
    setCurrentTime(e.currentTime);
  };

  const onTrimMove = (e) => {
    // startTime 이 같으면 endTime 이 변경된거니까 endTime 넣고 아니면 startTime
    const trimStartTime = e.startTime;
    const trimEndTime = e.endTime;
    const convertedTrimStartTimeByPlatform = isAndroid ? trimStartTime*1000 : trimStartTime;
    const convertedTrimEndTimeByPlatform = isAndroid ? trimEndTime*1000 : trimEndTime;
    const isTrimReturnNaNOnAndroid = isNaN(trimStartTime) || isNaN(trimEndTime);
    
    // 안드로이드는 처음에 NaN 이 뜸.
    const setCurrentTimeFromTrim = (prev:number) => {
      if(isTrimReturnNaNOnAndroid) return prev;
      return nowTrim.startTime === trimStartTime ? convertedTrimEndTimeByPlatform : convertedTrimStartTimeByPlatform;
    };

    setCurrentTime(prev=>setCurrentTimeFromTrim(prev));
    setNowTrim(prev=>{
      if(isTrimReturnNaNOnAndroid) return prev;
      // 얜 또 그대로 줘야 되네 1000곱한거 말고
      return {
        startTime:trimStartTime,
        endTime:trimEndTime,
      };
    });

    // setCurrentTime(() => nowTrim.startTime === e.startTime ? e.endTime : e.startTime);
    // setNowTrim({
    //   startTime:e.startTime,
    //   endTime:e.endTime,
    // });
  };

  console.log("currentTime")
  console.log(currentTime)
  console.log("nowTrim")
  console.log(nowTrim)

  // const darkModeSubscription = useColorScheme();
  // const isDarkMode = darkModeSubscription === "dark";
  const isDarkMode = useIsDarkMode();
  // const isIOS = Platform.OS === "ios";

  const onPressSaveBtn = () => {
    setIsVideoSave(prev=>!prev);
  };

  const ifErrorThenAlert = (e) => {
    console.warn(e);
    Alert.alert("동영상 변환에 실패하였습니다.");
  };

  const onPressPreview = () => {
    trimVideoWithoutSaveOption()
      .then(uri=>{
        navigation.navigate("FullScreenVideo",{
          uri,
          title:"미리보기",
        });
      })
      .catch(ifErrorThenAlert);
  };

  const onPressEditComplete = () => {
    getPreviewImageForIOSThumbnail(nowTrim.startTime)
      .then(forIOSThumbNailUri => trimVideoWithSaveOptionReturnAlsoPureVideoFileAndGivenParamForIOSThumbNailUri(forIOSThumbNailUri))
      .then(completeResult => navigation.navigate("UploadForm",{
        ...completeResult,
        ...(isFromPetLog && {whichComponent:"PetLog"}),
      }))
      .catch(ifErrorThenAlert);
  };

  useEffect(()=>{
    navigation.setOptions({
      headerRight:()=>(
        <EditCompleteBtn onPress={onPressEditComplete}>
          <EditCompleteBtnText>완료</EditCompleteBtnText>
        </EditCompleteBtn>
      )
    });
  },[nowTrim]);
  
  const isFocused = useIsFocused();

  return (
    <Container>
      <GettingHeightContainer
        onLayout={getHeightForVideoPlayer}
      >
        {/* isFocused 로 안주면 미리보기 갔다 오면 안드로이드 렌더링 안됨. */}
        {isFocused ? <VideoPlayer
          ref={videoPlayerRef}
          // 안드로이드는 flex:1 있어야 나옴.
          style={{flex:1}}
          // startTime={0}  // seconds
          // endTime={30}   // seconds
          play={false}     // 얘 넣어야 안드로이드도 재생 안됨.
          // replay={false}   // should player play video again if it's ended
          // rotate={true}   // use this prop to rotate video if it captured in landscape mode iOS only
          source={pureVideoFile}
          playerWidth={windowWidth} // iOS only
          playerHeight={containerHeight} // iOS only
          // resizeMode={VideoPlayer.Constants.resizeMode.CONTAIN}
          // 안드로이드는 CONTAIN 해야 맞네
          resizeMode={isAndroid ? VideoPlayer.Constants.resizeMode.CONTAIN : VideoPlayer.Constants.resizeMode.COVER}
          // onChange={({ nativeEvent })=>{}} // get Current time on every second
          currentTime={currentTime}
          // getPreviewForSecondResolves
          // volume
        /> : null}
      </GettingHeightContainer>
      <TrimmerContainer>
        <ActionBtnContainer>
          {isIOS && 
            <SaveBtnContainer>
              <SaveBtn onPress={onPressSaveBtn} isDarkMode={isDarkMode} isVideoSave={isVideoSave} >
                {isVideoSave && <FontAwesome name="check" size={14} color={"tomato"} />}
              </SaveBtn>
              <SaveBtnText>변경한 동영상 저장</SaveBtnText>
            </SaveBtnContainer>
          }
          {/* SaveBtn 없으면 space between 안먹혀서 View 하나 넣음. */}
          <View/>
          <PreviewBtn onPress={onPressPreview}>
            <PreviewBtnText>미리보기</PreviewBtnText>
          </PreviewBtn>
        </ActionBtnContainer>
        <Trimmer
          source={pureVideoFile}
          height={100}
          width={windowWidth-30}
          // showTrackerHandle={true}
          onTrackerMove={onTrackMove} // iOS only
          currentTime={currentTime} // use this prop to set tracker position iOS only
          themeColor={'white'} // iOS only
          thumbWidth={10} // iOS only
          // trackerColor={'green'} // iOS only
          onChange={onTrimMove}
        />
      </TrimmerContainer>
      <ExplainTextContainer isAndroid={isAndroid}>
        <ExplainText>양 옆의 바를 움직여 시간을 조절해 주세요.</ExplainText>
      </ExplainTextContainer>
    </Container>
  );
};

export default EditVideo;