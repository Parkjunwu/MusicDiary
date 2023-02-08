import React, { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import useIsDarkMode from '../hooks/useIsDarkMode';
import GoBackBtn from '../components/myDiary/GoBackBtn';
// import MyDiary from '../screens/mainNav/myDiary/MyDiary';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MUSIC_AUTO_PLAY, YOUTUBE_MUSIC_SHOW } from '../track-player/constants';
import useGetFontFamily from '../hooks/useGetFontFamily';
// import { NativeStackScreenProps } from '@react-navigation/native-stack';
import NotificationDiaryDrawerNavParamsList from '../types/navigation/NotificationDiaryDrawerNavParamsList';
import NotificationDiaryCustomDrawerContent from '../components/notificationDiaryDrawerNav/NotificationDiaryCustomDrawerContent';
import { gql, useQuery } from '@apollo/client';
import { DIARY_FRAGMENT } from '../gql/fragment';
import { seeNotifiedMyDiary, seeNotifiedMyDiaryVariables } from '../__generated__/seeNotifiedMyDiary';
import NotificationDiary from '../screens/mainNav/notification/NotificationDiary';
import HamburgerBtn from '../components/myDiary/HamburgerBtn';

const SEE_NOTIFIED_MY_DIARY = gql`
  query seeNotifiedMyDiary($id: Int!) {
    seeNotifiedMyDiary(id:$id) {
      diary {
        ...DiaryFragment
      }
      error
    }
  }
  ${DIARY_FRAGMENT}
`;

const Drawer = createDrawerNavigator<NotificationDiaryDrawerNavParamsList>();

const NotificationDiaryDrawerNav = ({route}) => {

  const diaryId = route.params.id;
  // const diaryId = route.params.diaryId;

  const { loading, data } = useQuery<seeNotifiedMyDiary,seeNotifiedMyDiaryVariables>(SEE_NOTIFIED_MY_DIARY, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: 'cache-first',
    variables: {
      id: diaryId,
    },
  });

  // const [diaryId,setDiaryId] = useState<number>();

  const [musicAutoPlay,setMusicAutoPlay] = useState(false);

  // state 로 쓰거나 useReactiveVar 로 subscription 받아야 겠네
  
  // const [isNowMusicPlaying,setIsNowMusicPlaying] = useState(false);  // 음악 재생
  const [isNowMusicPlaying,setIsNowMusicPlaying] = useState(false); // 추가
  // const [diary2MusicPlaying,setDiary2MusicPlaying] = useState(false); // 추가
  // const nowFocusDiary = useRef<"MyDiary1"|"MyDiary2">("MyDiary1"); // 추가

  const [youtubeMusicShow, setYoutubeMusicShow] = useState(true);  //유튜브 영상 보이게 할지. 얘도 저장해야겠네

  const switchYoutubeMusicShow = () => {
    // let prevShow;
    setYoutubeMusicShow((prev)=>{
      // 원래 async 들어가야 하는데 setState 는 안됨. 상관 없겠지?
      prev ? AsyncStorage.removeItem(YOUTUBE_MUSIC_SHOW) : AsyncStorage.setItem(YOUTUBE_MUSIC_SHOW,"ok");
      return !prev;
    });
  };
  // 이걸 해야 await 한 애가 받아짐
  // const [settingReady,setSettingReady] = useState(false);

  const setFirstAutoPlaySetting = async() => {
    const getStoredSetting = Boolean(await AsyncStorage.getItem(MUSIC_AUTO_PLAY));
    setMusicAutoPlay(getStoredSetting);
    // setSettingReady(true);
  };

  // 유튜브 쓸 경우
  const setFirstYoutubeMusicShowSetting = async() => {
    const getStoredSetting = Boolean(await AsyncStorage.getItem(YOUTUBE_MUSIC_SHOW));
    setYoutubeMusicShow(getStoredSetting);
    // setSettingReady(true);
  };

  useEffect(()=>{
    setFirstAutoPlaySetting();
    // 유튜브 쓸 경우
    setFirstYoutubeMusicShowSetting();
  },[]);

  const isDarkMode = useIsDarkMode();

  const fontFamily = useGetFontFamily("Medium");

  return (
    <Drawer.Navigator
      useLegacyImplementation={true}
      screenOptions={{
        drawerStyle:{
          backgroundColor: isDarkMode ? "rgba(0,0,0,0.8)" : "white",
        },
        headerStyle:{
          backgroundColor: isDarkMode ? "black" : "white",
        },
        headerTintColor:isDarkMode ? "white" : "black",
        drawerPosition:"right",
        headerLeft:({tintColor})=><GoBackBtn tintColor={tintColor}/>,
        headerRight:({tintColor})=><HamburgerBtn tintColor={tintColor}/>,
        headerTitleAlign:'center',
        swipeEnabled:false,
        headerTitleStyle: {
          fontSize: 17,
          fontFamily,
          padding: 3,
        },
      }}
      // 이게 그릴 애고
      drawerContent={() => (<NotificationDiaryCustomDrawerContent
        musicAutoPlay={musicAutoPlay}
        setMusicAutoPlay={setMusicAutoPlay}
        youtubeMusicShow={youtubeMusicShow}
        switchYoutubeMusicShow={switchYoutubeMusicShow}
        diaryId={diaryId}
        nowDiaryData={data?.seeNotifiedMyDiary?.diary}
        isNowMusicPlaying={isNowMusicPlaying}
        setIsNowMusicPlaying={setIsNowMusicPlaying}
      />)}
    >
      {/* 여기 오는 애들은 navigation 에 들어가는 스크린들 인듯, 맨처음 오는 애가 화면에 나오고. 지정도 가능하고 당연히. navigate 역시 name 기준으로 */}
      {/* MyDiary1 MyDiary2 두개 넣어서 이동 가능하게 */}
      <Drawer.Screen
        name="Diary"
      >
        {()=>(<NotificationDiary
          youtubeMusicShow={youtubeMusicShow}
          switchYoutubeMusicShow={switchYoutubeMusicShow}
          isNowMusicPlaying={isNowMusicPlaying}
          setIsNowMusicPlaying={setIsNowMusicPlaying}
          data={data}
          loading={loading}
        />)}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default NotificationDiaryDrawerNav;