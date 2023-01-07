import React, { useEffect, useRef, useState } from 'react';
import { Alert, useWindowDimensions, View } from 'react-native';
import { Trimmer, ProcessingManager } from 'react-native-video-processing';
import styled from 'styled-components/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useIsFocused } from '@react-navigation/native';
import Video from 'react-native-video';
import { isAndroid } from 'react-native-draggable-flatlist/lib/constants';
import useIsDarkMode from '../../../hooks/useIsDarkMode';
import { isIOS } from '../../../utils';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MyDiaryListTabStackParamsList, NotificationTabStackParamsList } from '../../../types/navigation/homeNavStackParamsList';
import { FontAppliedBaseTextNeedFontSize } from '../../../styled-components/FontAppliedComponents';
// import convertToProxyURL from 'react-native-video-cache';

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
const SaveBtnText = styled(FontAppliedBaseTextNeedFontSize)`
  
`;
const PreviewBtn = styled.TouchableOpacity`

`;
const PreviewBtnText = styled(FontAppliedBaseTextNeedFontSize)`
  font-weight: bold;
  margin-left: auto;
`;
const ExplainTextContainer = styled.View`
  flex:1;
`;
const ExplainText = styled(FontAppliedBaseTextNeedFontSize)`
  text-align: center;
`;
const EditCompleteBtn = styled.TouchableOpacity`
  
`;
const EditCompleteBtnText = styled(FontAppliedBaseTextNeedFontSize)`
  
`;

type EditNetworkVideoProps = NativeStackScreenProps<MyDiaryListTabStackParamsList|NotificationTabStackParamsList,"EditNetworkVideo">;

// 안드로이드는 Trimmer 에 로컬파일 말고 remote 파일 주면 에러뜸. 캐시를 받든가 해야 함. 일단 안드로이드는 못하게 해야겠다

const EditNetworkVideo = ({navigation,route}:EditNetworkVideoProps) => {

  const pureVideoFile = route.params.file;
  console.log(pureVideoFile)
  console.log("pureVideoFile")

  const [nowTrim,setNowTrim] = useState<{startTime:number,endTime:number|null}>({startTime:0,endTime:null});

  const videoPlayerRef = useRef<any>();

  const windowWidth = useWindowDimensions().width;
  
  const [isVideoSave,setIsVideoSave] = useState(false);

  const trimVideoWithSaveOptionReturnAlsoPureVideoFileAndGivenParamForIOSThumbNailUri = (thumbNail:string) => {
    const options = {

      startTime:nowTrim.startTime,
      endTime:nowTrim.endTime,
      
      // quality: VideoPlayer.Constants.quality.QUALITY_1280x720, // iOS only
      saveToCameraRoll: isVideoSave, // default is false // iOS only
      saveWithCurrentDate: isVideoSave, // default is false // iOS only
    };
    // return videoPlayerRef?.current.trim(options)
    return ProcessingManager.trim(pureVideoFile, options)
      .then((uri:string)=>({
        pureVideoFile,
        newVideoFile:uri,
        thumbNail,
      }));
  };

  const trimVideoWithoutSaveOption = () => {
    const options = {
      startTime:nowTrim.startTime,
      endTime:nowTrim.endTime,
      // quality: VideoPlayer.Constants.quality.QUALITY_1280x720, // iOS only
    };
    // return videoPlayerRef?.current.trim(options);
    return ProcessingManager.trim(pureVideoFile, options);
  };

  // 영상 사이즈 조절은 업로드에서 일괄로 함

  // 안드로이드는 JPEG 못받는듯. base64String 로 나옴, ios 도 되나 확인?
  const getPreviewImageForIOSThumbnail = (second:number) => {
    const maximumSize = { width: 500, height: 500 }; // default is { width: 1080, height: 1080 } iOS only
    // react-native-video 라 이건 안됨.
    // return videoPlayerRef?.current.getPreviewForSecond(second, maximumSize, "JPEG")
    return ProcessingManager.getPreviewForSecond(pureVideoFile, second, maximumSize, "JPEG")
    // ios 는 SelectPhoto 에서도 썸네일 받아서 base64 쓰면 형식이 안맞음.
    // return videoPlayerRef?.current.getPreviewForSecond(second, maximumSize, 'base64')
    
      // 안드로이드는 "JPEG" 로 받을 때 어떤 때는 .image 고 어떤 때는 .uri 인듯? 아마 .image 는 잘못 받은 것 같긴 한데 쓸꺼면 확인
      // .then(image=>image.uri) // maximumSize is iOS only
      .then((image:{image:string,uri:string})=>{
        return isAndroid ? image.image : image.uri;
        // base64 일 때.
        // return isAndroid ? image.image : image;
      }) // maximumSize is iOS only
  };


  const onTrackMove = (e:{currentTime:number}) => {
    videoPlayerRef.current.seek(e.currentTime);
  };

  const onTrimMove = (e:{startTime:number,endTime:number}) => {
    // startTime 이 같으면 endTime 이 변경된거니까 endTime 넣고 아니면 startTime
    const trimStartTime = e.startTime;
    const trimEndTime = e.endTime;
    const convertedTrimStartTimeByPlatform = isAndroid ? trimStartTime*1000 : trimStartTime;
    const convertedTrimEndTimeByPlatform = isAndroid ? trimEndTime*1000 : trimEndTime;
    const isTrimReturnNaNOnAndroid = isNaN(trimStartTime) || isNaN(trimEndTime);
    
    setNowTrim(prev=>{
      if(isTrimReturnNaNOnAndroid) return prev;
      // state 가 60/1 초라 그런지 start 는 왔다갔다함. 근데 머 방법이..
      const renderTime = prev.startTime === trimStartTime ? convertedTrimEndTimeByPlatform : convertedTrimStartTimeByPlatform;

      videoPlayerRef.current.seek(renderTime);
      // 얜 또 그대로 줘야 되네 1000곱한거 말고
      return {
        startTime:trimStartTime,
        endTime:trimEndTime,
      };
    });

    // videoPlayerRef.current.seek(currentTime)

  };

  // console.log("currentTime")
  // console.log(currentTime)
  console.log("nowTrim")
  console.log(nowTrim)

  const isDarkMode = useIsDarkMode();

  const onPressSaveBtn = () => {
    setIsVideoSave(prev=>!prev);
  };

  const ifErrorThenAlert = (e:any) => {
    console.warn(e);
    Alert.alert("동영상 변환에 실패하였습니다.");
  };

  const onPressPreview = () => {
    trimVideoWithoutSaveOption()
      .then((uri:string)=>{
        navigation.navigate("FullScreenVideo",{
          uri,
          title:"미리보기",
        });
      })
      .catch(ifErrorThenAlert);
  };

  const onPressEditComplete = () => {
    if(nowTrim.startTime === 0 && nowTrim.endTime === null) {
      return navigation.goBack();
    }
    getPreviewImageForIOSThumbnail(nowTrim.startTime)
      .then((thumbNail:string) => trimVideoWithSaveOptionReturnAlsoPureVideoFileAndGivenParamForIOSThumbNailUri(thumbNail))
      .then(completeResult => navigation.navigate("EditDiary",completeResult))
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
      <GettingHeightContainer>
        {/* isFocused 로 안주면 미리보기 갔다 오면 안드로이드 렌더링 안됨. */}
        
        {isFocused ? <Video
          // source={{ uri: convertToProxyURL(pureVideoFile) }}
          source={{ uri: pureVideoFile }}
          ref={videoPlayerRef}
          style={{ flex: 1 }}
          // repeat={ true }
          paused={ true }
          // muted={true}
          resizeMode="contain"
          // onEnd={ onEndVideo }
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
          // currentTime={currentTime} // use this prop to set tracker position iOS only
          themeColor={'white'} // iOS only
          thumbWidth={10} // iOS only
          // trackerColor={'green'} // iOS only
          onChange={onTrimMove}
        />
      </TrimmerContainer>
      <ExplainTextContainer>
        <ExplainText>양 옆의 바를 움직여 시간을 조절해 주세요.</ExplainText>
      </ExplainTextContainer>
    </Container>
  );
};

export default EditNetworkVideo;