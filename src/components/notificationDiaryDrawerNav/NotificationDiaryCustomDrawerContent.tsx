import { CompositeNavigationProp, useNavigation } from "@react-navigation/core";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";
import useIsDarkMode from "../../hooks/useIsDarkMode";
import { BaseSharedStackNavStackParamsList, MyDiaryDrawerNavParamsList } from "../../types/navigation/homeNavStackParamsList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MUSIC_AUTO_PLAY } from "../../track-player/constants";
import ScrollViewWithoutBounce from "../shared/ScrollViewWithoutBounce";
import useMaterialTabGetInnerLayoutHeight from "../../hooks/useMaterialTabGetInnerLayoutHeight";
import PressableItemNeedOnPressAndText from "../myDiaryDrawerNav/PressableItemNeedOnPressAndText";
import NotificationDiaryMusicPlayingStateView from "./NotificationDiaryMusicPlayingStateView";
import { seeNotifiedMyDiary_seeNotifiedMyDiary_diary } from "../../__generated__/seeNotifiedMyDiary";

const ForBackgroundColorContainer = styled.View<{isDarkMode:boolean}>`
  ${props=>props.isDarkMode ? "background-color: rgb(60,60,60)" : ""}
  flex: 1;
`;
const Container = styled.View<{marginTop:number,minHeight:number}>`
  margin: ${props=>props.marginTop}px 15px 10px 15px;
  flex: 1;
  min-height: ${props=>props.minHeight}px;
`;
const DivideLine = styled.View`
  height: 1px;
  background-color: rgba(192,192,192,0.7);
`;

type NotificationDiaryCustomDrawerContentType = {
  musicAutoPlay:boolean,
  setMusicAutoPlay:React.Dispatch<React.SetStateAction<boolean>>,
  youtubeMusicShow: boolean,
  switchYoutubeMusicShow: () => void,
  diaryId:number,
  nowDiaryData:seeNotifiedMyDiary_seeNotifiedMyDiary_diary | null | undefined
  isNowMusicPlaying:boolean,
  setIsNowMusicPlaying:React.Dispatch<React.SetStateAction<boolean>>,
  // diary1MusicPlaying: boolean,
  // setDiary1MusicPlaying: React.Dispatch<React.SetStateAction<boolean>>,
  // diary2MusicPlaying: boolean,
  // setDiary2MusicPlaying: React.Dispatch<React.SetStateAction<boolean>>,
  // nowFocusDiary: React.MutableRefObject<"MyDiary1" | "MyDiary2">,
};

// ??????????????? ???????????? ????????? ????????? ?????? ?????? ?????????
type ThisNavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<MyDiaryDrawerNavParamsList>,
  NativeStackNavigationProp<BaseSharedStackNavStackParamsList>
>;

const NotificationDiaryCustomDrawerContent = ({
  musicAutoPlay,
  setMusicAutoPlay,
  youtubeMusicShow,
  switchYoutubeMusicShow,
  diaryId,
  nowDiaryData,
  isNowMusicPlaying,
  setIsNowMusicPlaying,
  // diary1MusicPlaying,
  // setDiary1MusicPlaying,
  // diary2MusicPlaying,
  // setDiary2MusicPlaying,
  // nowFocusDiary,
}:NotificationDiaryCustomDrawerContentType) => {

  const {top} = useSafeAreaInsets();

  const changeAutoPlayText = musicAutoPlay ? "?????? ?????? ?????? ??????" : "?????? ?????? ?????? ??????";

  // Diary ?????? ?????? ?????? ???????????? ??????????
  
  const navigation = useNavigation<ThisNavigationProp>();

  const isDarkMode = useIsDarkMode();

  // const isHaveMusic = Boolean(typeof nowDiaryData === "object" && nowDiaryData.music);
  const music = nowDiaryData?.youtubeId;

  const onPressAutoPlay = async() => {
    if(musicAutoPlay) {
      await AsyncStorage.removeItem(MUSIC_AUTO_PLAY);
    } else {
      await AsyncStorage.setItem(MUSIC_AUTO_PLAY,"ok");
      // youtubeId ????????? ??????
      if(music){
        setIsNowMusicPlaying(true);
        // nowFocusDiary.current === "MyDiary1" ? setDiary1MusicPlaying(true) : setDiary2MusicPlaying(true); // ??????
      }
    }
    setMusicAutoPlay(prev=>!prev);
  };

  // const 
  const changeYoutubeMusicShowText = youtubeMusicShow ? "????????? ?????? ?????? ??????" : "????????? ?????? ?????? ?????????";

  const minHeight = useMaterialTabGetInnerLayoutHeight();
  // console.log("MyDrawer minHeight "+ minHeight)

  return (
    // <DrawerContentScrollView {...props}>
    <ScrollViewWithoutBounce>
      <ForBackgroundColorContainer isDarkMode={isDarkMode}>
        <Container marginTop={top} minHeight={minHeight}>
          <PressableItemNeedOnPressAndText
            onPress={onPressAutoPlay}
            text={changeAutoPlayText}
          />
          <DivideLine/>
          <PressableItemNeedOnPressAndText
            onPress={switchYoutubeMusicShow}
            text={changeYoutubeMusicShowText}
          />
          <DivideLine/>
          <PressableItemNeedOnPressAndText
            onPress={()=>navigation.navigate("RequestSongChange",{
              diaryId,
            })}
            text="?????? ?????? ?????????"
          />
          <DivideLine/>
          <PressableItemNeedOnPressAndText
            onPress={()=>navigation.navigate("ChangeYoutubeSong",{
              // routeFrom:"MyDiaryNav",
              routeFrom:"DrawerNav",
              diaryId,
            })}
            text="?????? ????????????"
          />
          <DivideLine/>
          <NotificationDiaryMusicPlayingStateView
            color={isDarkMode ? "white" : "black"}
            music={music}
            isMusicPlaying={isNowMusicPlaying}
            setIsNowMusicPlaying={setIsNowMusicPlaying}
            // youtubeMusicShow={youtubeMusicShow}
            // switchYoutubeMusicShow={switchYoutubeMusicShow}
            // diary1MusicPlaying={diary1MusicPlaying}
            // setDiary1MusicPlaying={setDiary1MusicPlaying}
            // diary2MusicPlaying={diary2MusicPlaying}
            // setDiary2MusicPlaying={setDiary2MusicPlaying}
            // nowFocusDiary={nowFocusDiary}
          />
        </Container>
      </ForBackgroundColorContainer>
    </ScrollViewWithoutBounce>
  );
};

export default NotificationDiaryCustomDrawerContent;
