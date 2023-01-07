import { TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import useIsDarkMode from "../../hooks/useIsDarkMode";
import { MyDiaryDrawerNavParamsList, MyDiaryListTabStackParamsList } from "../../types/navigation/homeNavStackParamsList";
import HamburgerBtn from "../../components/myDiary/HamburgerBtn";
import { useIsFocused } from "@react-navigation/core";
import { fromWhere } from "../../apollo";
import Ionicons from "react-native-vector-icons/Ionicons";
import DiaryStickyHeaderComponent from "../../components/myDiary/DiaryStickyHeaderComponent";
import { CompositeScreenProps } from "@react-navigation/core";
import { getRealmSingleDiaryAndPrevAfterId } from "../../realm";
import { ScrollView } from "react-native-gesture-handler";
import BodyText from "../../components/myDiary/BodyText";
import { realmDiaryType } from "../../types/realm/realmDiaryType";


type NavigationProps = CompositeScreenProps<
  NativeStackScreenProps<MyDiaryDrawerNavParamsList,"MyDiary1">,
  NativeStackScreenProps<MyDiaryListTabStackParamsList>
>;

type LocalDBMyDiaryProps = NavigationProps & {
  musicAutoPlay: boolean,
  isNowMusicPlaying: boolean,
  setIsNowMusicPlaying: React.Dispatch<React.SetStateAction<boolean>>,
  setDiaryId: React.Dispatch<React.SetStateAction<number | undefined>>,
  youtubeMusicShow: boolean,
  // setYoutubeMusicShow: React.Dispatch<React.SetStateAction<boolean>>,
  switchYoutubeMusicShow: () => void,
  // nowDiaryData: seeMyDiary_seeMyDiary_diary | string | undefined,
  setNowDiaryData: React.Dispatch<realmDiaryType | undefined>,
};

const LocalDBMyDiary = ({
  navigation,
  route,
  musicAutoPlay,
  isNowMusicPlaying,
  setIsNowMusicPlaying,
  setDiaryId,
  youtubeMusicShow,
  // setYoutubeMusicShow,
  switchYoutubeMusicShow,
  // nowDiaryData,
  setNowDiaryData,
}:LocalDBMyDiaryProps) => {

  // 이게 navigate 로 param 받은거라 캐시 업데이트가 안됨. 여기서 또 받든지 아님 캐시에서 받든지 근데 캐시에서 받은 애를 또 state 에 넣으니까 똑같이 또 안받아져. 걍 여기서 받자
  const id = route.params.id;

  // const [pressGoBack,setPressGoBack] = useState(false);
  
  useEffect(()=>{
    navigation.setOptions({
      headerTitleAlign:"center",
      headerRight:({tintColor})=><HamburgerBtn tintColor={tintColor}/>,
      // cleanUp 이랑 그냥 goBack 쓰면 playingMusicVar 가 씹힘. 그래서 따로 만듦.
      // 이전, 이후, 캘린더로 이동하는 때도 만들어야 겠네
      headerLeft:({tintColor}) => <TouchableOpacity onPress={()=>{
        // setPressGoBack(true);
        // playingMusicVar(false);
        setIsNowMusicPlaying(false);
        // isFromCalendarVar() ? navigation.navigate("Calendar") : navigation.navigate("MyDiaryList");
        navigation.navigate(fromWhere());
      }}>
      <Ionicons name="chevron-back-sharp" color={tintColor} size={30} />
    </TouchableOpacity>
    });
  },[]);

  // useEffect(()=>{
  //   // 뒤로 가기를 누르고 isNowMusicPlaying 가 false 완료되면 뒤로가기 실행
  //   if(pressGoBack && !isNowMusicPlaying) {
  //     // goBack 하면 MyDiary2 > MyDiary1 이래 가짐
  //     // navigation.goBack();
  //     // Calendar 에서 온거면 Calendar 로 가게
  //     isFromCalendarVar() ? navigation.navigate("Calendar") : navigation.navigate("MyDiaryList");
  //   }
  // },[isNowMusicPlaying,pressGoBack])

  // 이거 확인. 이동할 때마다 데이터 다시 받는지
  useEffect(()=>{
    setDiaryId(id);
  },[route]);

  const {
    nowDiary: diaryData,
    prevId,
    afterId,
  } = getRealmSingleDiaryAndPrevAfterId(id);

  // nowDiaryData 위한애
  const isFocused = useIsFocused();
  useEffect(()=>{
    if(isFocused) {
      setNowDiaryData(diaryData);
    }
  },[isFocused]);

  const setMusic = async () => {
    
    // 유튜브 넣음
    if(musicAutoPlay){
      setIsNowMusicPlaying(true);
      // playingMusicVar(true);
    }
  };


  useEffect(()=>{
    // const diaryData = data?.seeMyDiary?.diary;
    if(diaryData) {
      // 타이틀 넣기
      navigation.setOptions({
        // title 말고 날짜로 넣을까?
        title: diaryData.title,
      });
      // 음악 재생. music 있는 경우. 근데 이걸 Header 에 넣는 게 더 나을듯. 두군데서 음악을 컨트롤 하고 있음.
      // if(diaryData.musicUrl){
      if(diaryData.youtubeId){
        setMusic();
      }
      // setIsNowMusicPlaying(true);
    }
  },[diaryData]);
  
  const isDarkMode = useIsDarkMode();

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? "black" : "white",
        padding: 10,
        paddingTop: 0,
      }}
    >
      {diaryData && 
      <>
        <DiaryStickyHeaderComponent
          myDiaryNumber={Number(route.name.slice(-1))}
          prevDiaryId={prevId}
          nextDiaryId={afterId}
          dateTime={diaryData.dateTime}
          youtubeId={diaryData.youtubeId}
          isNowMusicPlaying={isNowMusicPlaying}
          setIsNowMusicPlaying={setIsNowMusicPlaying}
          youtubeMusicShow={youtubeMusicShow}
          // setYoutubeMusicShow={setYoutubeMusicShow}
          switchYoutubeMusicShow={switchYoutubeMusicShow}
        />
        <BodyText index={1}>{diaryData.body}</BodyText>
      </>
      }

    </ScrollView>
  );
};

export default LocalDBMyDiary;