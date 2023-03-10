import { CompositeNavigationProp, useNavigation } from "@react-navigation/core";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";
import useIsDarkMode from "../../../hooks/useIsDarkMode";
import { BaseSharedStackNavStackParamsList, MyDiaryDrawerNavParamsList } from "../../../types/navigation/homeNavStackParamsList";
import MusicPlayingStateView from "../../myDiaryDrawerNav/MusicPlayingStateView";
import PressableItemNeedOnPressAndText from "../../myDiaryDrawerNav/PressableItemNeedOnPressAndText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MUSIC_AUTO_PLAY } from "../../../track-player/constants";
import { realmDiaryType } from "../../../types/realm/realmDiaryType";
import useLocalDBDeleteDiary from "../../../hooks/useLocalDBScreen/useLocalDBDeleteDiary";
import ScrollViewWithoutBounce from "../../shared/ScrollViewWithoutBounce";
import useMaterialTabGetInnerLayoutHeight from "../../../hooks/useMaterialTabGetInnerLayoutHeight";

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

type LocalDBCustomDrawerContentType = {
  musicAutoPlay:boolean,
  setMusicAutoPlay:React.Dispatch<React.SetStateAction<boolean>>,
  // isNowMusicPlaying:boolean,
  // setIsNowMusicPlaying:React.Dispatch<React.SetStateAction<boolean>>,
  youtubeMusicShow: boolean,
  // setYoutubeMusicShow: React.Dispatch<React.SetStateAction<boolean>>,
  switchYoutubeMusicShow: () => void,
  diaryId:number,
  // nowDiaryData:seeMyDiary_seeMyDiary_diary | string | undefined,
  nowDiaryData: realmDiaryType,
  diary1MusicPlaying: boolean,
  setDiary1MusicPlaying: React.Dispatch<React.SetStateAction<boolean>>,
  diary2MusicPlaying: boolean,
  setDiary2MusicPlaying: React.Dispatch<React.SetStateAction<boolean>>,
  nowFocusDiary: React.MutableRefObject<"MyDiary1" | "MyDiary2">,
};

// ??????????????? ???????????? ????????? ????????? ?????? ?????? ?????????
type ThisNavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<MyDiaryDrawerNavParamsList>,
  NativeStackNavigationProp<BaseSharedStackNavStackParamsList>
>;

const LocalDBCustomDrawerContent = ({
  musicAutoPlay,
  setMusicAutoPlay,
  // isNowMusicPlaying,
  // setIsNowMusicPlaying,
  youtubeMusicShow,
  // setYoutubeMusicShow,
  switchYoutubeMusicShow,
  diaryId,
  nowDiaryData,
  diary1MusicPlaying,
  setDiary1MusicPlaying,
  diary2MusicPlaying,
  setDiary2MusicPlaying,
  nowFocusDiary,
}:LocalDBCustomDrawerContentType) => {

  const {top} = useSafeAreaInsets();

  const changeAutoPlayText = musicAutoPlay ? "?????? ?????? ?????? ??????" : "?????? ?????? ?????? ??????";

  // Diary ?????? ?????? ?????? ???????????? ??????????
  
  const navigation = useNavigation<ThisNavigationProp>();

  const isDarkMode = useIsDarkMode();

  // diaryId ????????? ???
  const deleteDiary = useLocalDBDeleteDiary(diaryId);

  // const isHaveMusic = Boolean(typeof nowDiaryData === "object" && nowDiaryData.music);
  const music = typeof nowDiaryData === "object" && nowDiaryData.youtubeId;

  const onPressAutoPlay = async() => {
    if(musicAutoPlay) {
      await AsyncStorage.removeItem(MUSIC_AUTO_PLAY);
    } else {
      await AsyncStorage.setItem(MUSIC_AUTO_PLAY,"ok");
      // youtubeId ????????? ??????
      if(music){
        // setIsNowMusicPlaying(true);
        nowFocusDiary.current === "MyDiary1" ? setDiary1MusicPlaying(true) : setDiary2MusicPlaying(true); // ??????
      }
    }
    setMusicAutoPlay(prev=>!prev);
  };

  // const 
  const changeYoutubeMusicShowText = youtubeMusicShow ? "????????? ?????? ?????? ??????" : "????????? ?????? ?????? ?????????";

  const minHeight = useMaterialTabGetInnerLayoutHeight();

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
            onPress={()=>{
              // ?????? ?????? ????????? ??????
              // if(!nowDiaryData) {
              //   // ?????? ???????????? ????????? ????????? ????????? ???????????? ??????. ?????? ?????? ?????? ?????? ?????? ????????? ??????
              //   console.error("LocalDBCustomDrawerContent // nowDiaryData ??? undefined ??? ??????. ?????? ?????? ?????? ??????");
              //   return Alert.alert("??? ??? ?????? ???????????????.",undefined,[
              //     {
              //       text:"??????",
              //     },
              //   ]);
              // }
              // if(typeof nowDiaryData === "string") {
              //   // ????????? ??????. ?????? ?????? ??????
              //   console.error("LocalDBCustomDrawerContent // seeMyDiary ????????? ????????? ????????? ????????? ??????. ?????? ?????? ??????");
              //   return Alert.alert(nowDiaryData,undefined,[
              //     {
              //       text:"??????",
              //     },
              //   ]);
              // }
              // if(nowDiaryData.id !== diaryId) {
              //   console.log("LocalDBCustomDrawerContent // !nowDiaryData || nowDiaryData.id !== diaryId")
              //   return Alert.alert("????????? ???????????? ????????????.",undefined,[
              //     {
              //       text:"??????",
              //     },
              //   ]);
              // } else {
                return Alert.alert("?????? ????????? ?????????????????????????",undefined,[
                  {
                    text:"????????????",
                    // ?????? ????????? ?????????. ???????????? ????????? ????????? ??????
                    onPress:async()=>{
                      const { title, body, youtubeId } = nowDiaryData;
                      
                      // UploadForm ?????? ???????????? ?????? ??????????????????. ?????? ?????????
                      navigation.navigate("EditDiary",{
                        diaryId,
                        title,
                        body,
                        youtubeId,
                      });
                    },
                  },
                  {
                    text:"??????",
                    style:"cancel",
                  },
                ]);
              // }
            }}

            text="?????? ????????????"
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
          {/* <PressableItemNeedOnPressAndText
            onPress={()=>navigation.navigate("RequestSongChange",{
              diaryId,
            })}
            text="?????? ?????? ??????"
          />
          <DivideLine/> */}
          <PressableItemNeedOnPressAndText
            onPress={()=>{
              Alert.alert("?????? ????????? ?????????????????????????",undefined,[
                {
                  text:"????????????",
                  // async ??? ???
                  onPress:()=>deleteDiary(),
                },
                {
                  text:"??????",
                  style:"cancel",
                },
              ]);
            }}
            text="?????? ????????????"
          />
          <DivideLine/>
          <MusicPlayingStateView
            color={isDarkMode ? "white" : "black"}
            music={music}
            // isMusicPlaying={isNowMusicPlaying}
            // setIsNowMusicPlaying={setIsNowMusicPlaying}
            // youtubeMusicShow={youtubeMusicShow}
            // switchYoutubeMusicShow={switchYoutubeMusicShow}
            diary1MusicPlaying={diary1MusicPlaying}
            setDiary1MusicPlaying={setDiary1MusicPlaying}
            diary2MusicPlaying={diary2MusicPlaying}
            setDiary2MusicPlaying={setDiary2MusicPlaying}
            nowFocusDiary={nowFocusDiary}
          />
        </Container>
      </ForBackgroundColorContainer>
    </ScrollViewWithoutBounce>
  );
};

export default LocalDBCustomDrawerContent;
