import styled from "styled-components/native";
import dateTimeToFormatTime from "../../logic/dateTimeToFormatTime";
import { useCallback } from "react";
import { FontAppliedBaseTextNeedFontSize } from "../../styled-components/FontAppliedComponents";
import BaseYoutubePlayer from "../youtubeRelated/BaseYoutubePlayer";
import useGetYoutubePlayerHeight from "../../hooks/useGetYoutubePlayerHeight";
import useColorsChangedByDarkMode from "../../hooks/useColorsChangedByDarkMode";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { View } from "react-native";
import BaseMiniMusicSwitchBtn from "../myDiary/BaseMiniMusicSwitchBtn";

const Container = styled.View`

`;
const DateContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0px;
`;
const DiaryDateText = styled(FontAppliedBaseTextNeedFontSize)`
  
`;
const YoutubePlayerShowBtn = styled.TouchableOpacity`

`;

type NotificationDiaryStickyHeaderComponentType = {
  dateTime: number | null | undefined
  isNowMusicPlaying: boolean,
  setIsNowMusicPlaying: React.Dispatch<React.SetStateAction<boolean>>,
  youtubeMusicShow: boolean,
  switchYoutubeMusicShow: () => void,
  youtubeId: string | null | undefined,
};

const NotificationDiaryStickyHeaderComponent = ({
  dateTime,
  isNowMusicPlaying,
  setIsNowMusicPlaying,
  youtubeMusicShow,
  switchYoutubeMusicShow,
  youtubeId,
}:NotificationDiaryStickyHeaderComponentType) => {

  const { isNowYear, diaryYear, diaryMonth, diaryDate } = dateTimeToFormatTime(dateTime);

  const diaryYearText = isNowYear ? "" : diaryYear+"년 "
  const diaryDateText = diaryMonth ? `${diaryYearText}${diaryMonth}월 ${diaryDate}일` : null;

  const {textColor:iconColor} = useColorsChangedByDarkMode();

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

  const youtubePlayerHeight = useGetYoutubePlayerHeight();

  return (
    <Container>
      <DateContainer>
        <YoutubePlayerShowBtn onPress={switchYoutubeMusicShow}>
          { youtubeMusicShow ?
            <MaterialIcons name="close-fullscreen" size={20} color={iconColor} />
          :
            <Entypo name="resize-full-screen" size={20} color={iconColor} />
          }
        </YoutubePlayerShowBtn>
        <DiaryDateText>{diaryDateText}</DiaryDateText>
        <View>
        <BaseMiniMusicSwitchBtn
          isNowMusicPlaying={isNowMusicPlaying}
          setIsNowMusicPlaying={setIsNowMusicPlaying}
        />
        </View>
      </DateContainer>
      
      { youtubeId && 
        <BaseYoutubePlayer
          height={youtubeMusicShow ? youtubePlayerHeight : 0}
          play={isNowMusicPlaying}
          videoId={youtubeId}
          onChangeState={onStateChange}
          // webViewStyle={isAndroid ? {opacity: 0.99} : undefined} // 안드로이드 크래시 때문에 넣음 빼도 되지 않을까?
        />
      }
    </Container>
  );
};

export default NotificationDiaryStickyHeaderComponent;