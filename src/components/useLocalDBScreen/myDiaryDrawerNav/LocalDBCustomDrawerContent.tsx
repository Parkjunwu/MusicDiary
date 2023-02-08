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

// 네비게이션 왔다갔다 할라면 타입을 이래 써야 하는듯
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

  const changeAutoPlayText = musicAutoPlay ? "음악 자동 재생 끄기" : "음악 자동 재생 켜기";

  // Diary 에서 음악 제목 받아와서 놓을까?
  
  const navigation = useNavigation<ThisNavigationProp>();

  const isDarkMode = useIsDarkMode();

  // diaryId 넣어야 함
  const deleteDiary = useLocalDBDeleteDiary(diaryId);

  // const isHaveMusic = Boolean(typeof nowDiaryData === "object" && nowDiaryData.music);
  const music = typeof nowDiaryData === "object" && nowDiaryData.youtubeId;

  const onPressAutoPlay = async() => {
    if(musicAutoPlay) {
      await AsyncStorage.removeItem(MUSIC_AUTO_PLAY);
    } else {
      await AsyncStorage.setItem(MUSIC_AUTO_PLAY,"ok");
      // youtubeId 있으면 재생
      if(music){
        // setIsNowMusicPlaying(true);
        nowFocusDiary.current === "MyDiary1" ? setDiary1MusicPlaying(true) : setDiary2MusicPlaying(true); // 추가
      }
    }
    setMusicAutoPlay(prev=>!prev);
  };

  // const 
  const changeYoutubeMusicShowText = youtubeMusicShow ? "유튜브 음악 화면 닫기" : "유튜브 음악 화면 보이기";

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
              // 이건 확인 안해도 될듯
              // if(!nowDiaryData) {
              //   // 일기 데이터가 없거나 지정한 일기와 데이터가 달라. 이건 내가 로직 잘못 짯을 가능성 있음
              //   console.error("LocalDBCustomDrawerContent // nowDiaryData 가 undefined 인 상황. 이게 뜨면 수정 필요");
              //   return Alert.alert("알 수 없는 접근입니다.",undefined,[
              //     {
              //       text:"확인",
              //     },
              //   ]);
              // }
              // if(typeof nowDiaryData === "string") {
              //   // 에러인 상황. 얘도 확인 필요
              //   console.error("LocalDBCustomDrawerContent // seeMyDiary 쿼리를 받아야 되는데 에러인 상황. 얘도 확인 필요");
              //   return Alert.alert(nowDiaryData,undefined,[
              //     {
              //       text:"확인",
              //     },
              //   ]);
              // }
              // if(nowDiaryData.id !== diaryId) {
              //   console.log("LocalDBCustomDrawerContent // !nowDiaryData || nowDiaryData.id !== diaryId")
              //   return Alert.alert("일기가 존재하지 않습니다.",undefined,[
              //     {
              //       text:"확인",
              //     },
              //   ]);
              // } else {
                return Alert.alert("해당 일기를 수정하시겠습니까?",undefined,[
                  {
                    text:"변경하기",
                    // 보낼 데이터 필요함. 데이터를 어디서 받아야 하나
                    onPress:async()=>{
                      const { title, body, youtubeId } = nowDiaryData;
                      
                      // UploadForm 말고 컴포넌트 따로 만들어야할듯. 너무 복잡해
                      navigation.navigate("EditDiary",{
                        diaryId,
                        title,
                        body,
                        youtubeId,
                      });
                    },
                  },
                  {
                    text:"취소",
                    style:"cancel",
                  },
                ]);
              // }
            }}

            text="일기 수정하기"
          />
          <DivideLine/>
          <PressableItemNeedOnPressAndText
            onPress={()=>navigation.navigate("ChangeYoutubeSong",{
              // routeFrom:"MyDiaryNav",
              routeFrom:"DrawerNav",
              diaryId,
            })}
            text="음악 변경하기"
          />
          <DivideLine/>
          {/* <PressableItemNeedOnPressAndText
            onPress={()=>navigation.navigate("RequestSongChange",{
              diaryId,
            })}
            text="음악 변경 신청"
          />
          <DivideLine/> */}
          <PressableItemNeedOnPressAndText
            onPress={()=>{
              Alert.alert("해당 일기를 삭제하시겠습니까?",undefined,[
                {
                  text:"삭제하기",
                  // async 걍 뺌
                  onPress:()=>deleteDiary(),
                },
                {
                  text:"취소",
                  style:"cancel",
                },
              ]);
            }}
            text="일기 삭제하기"
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
