import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import styled from "styled-components/native";
import useIsDarkMode from "../../hooks/useIsDarkMode";
import dateTimeToFormatTime from "../../logic/dateTimeToFormatTime";
import { MyDiaryDrawerNavParamsList } from "../../types/navigation/homeNavStackParamsList";
// import YoutubePlayer from "react-native-youtube-iframe";
import { useCallback } from "react";
import DiaryMiniMusicSwitchBtn from "./DiaryMiniMusicSwitchBtn";
import { FontAppliedBaseTextNeedFontSize } from "../../styled-components/FontAppliedComponents";
import { isAndroid } from "../../utils";
import BaseYoutubePlayer from "../youtubeRelated/BaseYoutubePlayer";
import useGetYoutubePlayerHeight from "../../hooks/useGetYoutubePlayerHeight";

const Container = styled.View`

`;
const DateContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0px;
`;
// const DiaryDateText = styled.Text`
//   color: ${props=>props.theme.textColor};
// `;
const DiaryDateText = styled(FontAppliedBaseTextNeedFontSize)`

`;
const PrevOrNextDiaryBtn = styled.TouchableOpacity<{disabled:boolean}>`
  opacity: ${props=>props.disabled ? 0.4 : 1};
`;


type DiaryStickyHeaderComponentType = {
  // myDiaryNumber: 1 | 2
  myDiaryNumber: number
  prevDiaryId: number | null | undefined
  nextDiaryId: number | null | undefined
  dateTime: number | null | undefined
  isNowMusicPlaying: boolean,
  setIsNowMusicPlaying: React.Dispatch<React.SetStateAction<boolean>>,
  youtubeMusicShow: boolean,
  switchYoutubeMusicShow: () => void,
  youtubeId: string | null | undefined,
};

const DiaryStickyHeaderComponent = ({
  myDiaryNumber,
  prevDiaryId,
  nextDiaryId,
  dateTime,
  isNowMusicPlaying,
  setIsNowMusicPlaying,
  youtubeMusicShow,
  switchYoutubeMusicShow,
  youtubeId,
}:DiaryStickyHeaderComponentType) => {

  const navigateToScreen = myDiaryNumber === 1 ? "MyDiary2" : "MyDiary1";
  
  const navigation = useNavigation<NativeStackNavigationProp<MyDiaryDrawerNavParamsList>>();

  const navigateToDifferentDiary = (which:"prev"|"next") => {

    setIsNowMusicPlaying(false); // 추가
    
    const diaryId = which === "prev" ? prevDiaryId : nextDiaryId;

    if(diaryId){
      navigation.navigate(navigateToScreen,{
        id:diaryId,
      });
    }
  };

  const onPressPrev = () => navigateToDifferentDiary("prev");
  const onPressNext = () => navigateToDifferentDiary("next");

  const { isNowYear, diaryYear, diaryMonth, diaryDate } = dateTimeToFormatTime(dateTime);

  const diaryYearText = isNowYear ? "" : diaryYear+"년 "
  const diaryDateText = diaryMonth ? `${diaryYearText}${diaryMonth}월 ${diaryDate}일` : null;

  const isDarkMode = useIsDarkMode();
  const iconColor = isDarkMode ? "white" : "black";

  // Youtube
  
  const onStateChange = useCallback((state:string) => {
    console.log(state)
    if(state === "playing" || state === "buffering") {
      setIsNowMusicPlaying(true);
    } else if(state === "paused") {
      setIsNowMusicPlaying(false);
    } else if (state === "ended") {
      // 자동 반복
      setIsNowMusicPlaying(false);
      setIsNowMusicPlaying(true);
    }
  }, []);

  // const youtubeRef = useRef<YoutubeIframeRef | null>(null);
  
  // const data = () => getYoutubeMeta("xiifjlrtHfM")
  //   .then(data=>{
  //     console.log("getYoutubeMeta")
  //     console.log(data)
  //   });

  // useEffect(()=>{
  //   data();
  // },[]);

  // const isFocused = useIsFocused();
  // useEffect(()=>{
  //   console.log("isFocused")
  //   console.log(isFocused)
  // },[isFocused]);
  // const [playerShow, setPlayerShow] = useState(true);

  // const onPressPlayerShowOrHide = () => setPlayerShow(prev=>!prev);

  const youtubePlayerHeight = useGetYoutubePlayerHeight();

  return (
    <Container>
      <DateContainer>
        <PrevOrNextDiaryBtn
          onPress={onPressPrev}
          disabled={!prevDiaryId}
        >
          <Ionicons name="chevron-back" size={24} color={iconColor} />
        </PrevOrNextDiaryBtn>
        <DiaryDateText>{diaryDateText}</DiaryDateText>
        <PrevOrNextDiaryBtn
          onPress={onPressNext}
          disabled={!nextDiaryId}
        >
          <Ionicons name="chevron-forward" size={24} color={iconColor} />
        </PrevOrNextDiaryBtn>
      </DateContainer>
      
        { youtubeId && 
          <>
            {/* <YoutubePlayer */}
            <BaseYoutubePlayer
              // ref={youtubeRef}
              // height={youtubeMusicShow ? 225 : 0}
              height={youtubeMusicShow ? youtubePlayerHeight : 0}
              play={isNowMusicPlaying}
              videoId={youtubeId}
              onChangeState={onStateChange}
              // webViewProps={{
              //   renderToHardwareTextureAndroid: true,
              // }}
              webViewStyle={isAndroid ? {opacity: 0.99} : undefined} // 안드로이드 크래시 때문에 넣음
            />
            {!youtubeMusicShow && <DiaryMiniMusicSwitchBtn
              isNowMusicPlaying={isNowMusicPlaying}
              setIsNowMusicPlaying={setIsNowMusicPlaying}
            />}
          </>
        }
    </Container>
  );
};

export default DiaryStickyHeaderComponent;