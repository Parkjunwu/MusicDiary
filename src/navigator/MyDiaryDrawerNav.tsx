  // Track Player 사용시

// import React, { useEffect, useState } from 'react';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import useIsDarkMode from '../hooks/useIsDarkMode';
// import GoBackBtn from '../components/myDiary/GoBackBtn';
// import CustomDrawerContent from '../components/myDiaryDrawerNav/CustomDrawerContent';
// import MyDiary from '../screens/mainNav/myDiary/MyDiary';
// import RequestSongChange from '../screens/mainNav/myDiary/RequestSongChange';
// import { MyDiaryDrawerNavParamsList } from '../types/navigation/homeNavStackParamsList';
// import { seeMyDiary_seeMyDiary_diary } from '../__generated__/seeMyDiary';
// import TrackPlayer from 'react-native-track-player';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { MUSIC_AUTO_PLAY } from '../track-player/constants';
// import BaseContainer from '../components/shared/BaseContainer';
// import { playingMusicVar } from '../apollo';
// import { useReactiveVar } from '@apollo/client';

// const Drawer = createDrawerNavigator<MyDiaryDrawerNavParamsList>();

// // 뭐 딱히 props 쓸게 없어서 걍 뺌
// // type MyDiaryDrawerNavProp = NativeStackScreenProps<BaseSharedStackNavStackParamsList,"MyDiaryDrawerNav">

// const MyDiaryDrawerNav = () => {

//   const [diaryId,setDiaryId] = useState<number>();

//   const [musicAutoPlay,setMusicAutoPlay] = useState(false);
//   // const [isNowMusicPlaying,setIsNowMusicPlaying] = useState(false);

//   // 이걸 해야 await 한 애가 받아짐
//   const [settingReady,setSettingReady] = useState(false);

//   const setFirstAutoPlaySetting = async() => {
//     const getStoredSetting = Boolean(await AsyncStorage.getItem(MUSIC_AUTO_PLAY));
//     setMusicAutoPlay(getStoredSetting);
//     setSettingReady(true);
//   };

//   useEffect(()=>{
//     setFirstAutoPlaySetting();
//   },[]);


//   //// 얘가 전역으로 음악 재생 상태 받아서 재생함. 나중에 MyDiary 말고 다른데도 쓰면 헷갈리니까 MainNav 뭐 이런데로 옮기는게 나을듯. 안옮겨도 작동은 하겠지만. 근데 isNowMusicPlaying 을 또 MyDiary 에서 받네. 애매하군
//   const isNowMusicPlaying = useReactiveVar(playingMusicVar);

//   useEffect(()=>{
//     // MyDiary cleanup 에서 안되는 중임
//     console.log("playingMusicVar")
//     console.log(playingMusicVar())
//     if(isNowMusicPlaying) {
//       TrackPlayer.play();
//     } else {
//       TrackPlayer.pause();
//     }
//   },[isNowMusicPlaying]);

//   ////// 여기까지

  

//   // useEffect(()=>{
//   //   // MyDiary cleanup 에서 안되는 중임
//   //   console.log("isNowMusicPlaying")
//   //   console.log(isNowMusicPlaying)
//   //   // if(isNowMusicPlaying) {
//   //   //   TrackPlayer.play();
//   //   // }
//   //   if(isNowMusicPlaying) {
//   //     TrackPlayer.play();
//   //   } else {
//   //     TrackPlayer.pause();
//   //   }
//   // },[isNowMusicPlaying]);
  
//   // 일단 useRef 로 쓰 만약 안되면 state 로. 에러인 경우도 포함
//   // const nowDiaryData = useRef<seeMyDiary_seeMyDiary_diary|string>().current;
//   const [nowDiaryData,setNowDiaryData] = useState<seeMyDiary_seeMyDiary_diary|string>();

//   const isDarkMode = useIsDarkMode();

//   if(!settingReady) {
//     return <BaseContainer/>;
//   }

//   return (
//     <Drawer.Navigator
//       useLegacyImplementation={true}
//       screenOptions={{
//         drawerStyle:{
//           backgroundColor: isDarkMode ? "rgba(0,0,0,0.8)" : "white",
//         },
//         headerStyle:{
//           backgroundColor: isDarkMode ? "black" : "white",
//         },
//         headerTintColor:isDarkMode ? "white" : "black",
//         drawerPosition:"right",
//         headerLeft:({tintColor})=><GoBackBtn tintColor={tintColor}/>,
//         swipeEnabled:false,
//       }}
//       // 이게 그릴 애고
//       drawerContent={() => (
//         <CustomDrawerContent
//           musicAutoPlay={musicAutoPlay}
//           setMusicAutoPlay={setMusicAutoPlay}
//           // isNowMusicPlaying={isNowMusicPlaying}
//           // setIsNowMusicPlaying={setIsNowMusicPlaying}
//           // number | undefined 로 되서 타입 문제 나옴
//           diaryId={diaryId}

//           nowDiaryData={nowDiaryData}
//         />
//       )}
//     >
//       {/* 여기 오는 애들은 navigation 에 들어가는 스크린들 인듯, 맨처음 오는 애가 화면에 나오고. 지정도 가능하고 당연히. navigate 역시 name 기준으로 */}
//       {/* MyDiary1 MyDiary2 두개 넣어서 이동 가능하게 */}
//       <Drawer.Screen
//         name="MyDiary1"
//       >
//         {(props)=>(
//           <MyDiary
//             {...props}
//             musicAutoPlay={musicAutoPlay}
//             isNowMusicPlaying={isNowMusicPlaying}
//             // setIsNowMusicPlaying={setIsNowMusicPlaying}
//             setDiaryId={setDiaryId}

//             // nowDiaryData={nowDiaryData}
//             setNowDiaryData={setNowDiaryData}
//           />
//         )}
//       </Drawer.Screen>
//       <Drawer.Screen
//         name="MyDiary2"
//       >
//         {(props)=>(
//           // name 이 달라서 뜨는거임. 타입 ㄱㅊ
//           <MyDiary
//             {...props}
//             musicAutoPlay={musicAutoPlay}
//             isNowMusicPlaying={isNowMusicPlaying}
//             // setIsNowMusicPlaying={setIsNowMusicPlaying}
//             setDiaryId={setDiaryId}

//             // nowDiaryData={nowDiaryData}
//             setNowDiaryData={setNowDiaryData}
//           />
//         )}
//       </Drawer.Screen>
//       <Drawer.Screen
//         name="RequestSongChange"
//         component={RequestSongChange}
//         options={{
//           title:"음악 변경 신청",
//         }}
//       />
//     </Drawer.Navigator>
//   );
// };

// export default MyDiaryDrawerNav;

  // 여기까지Track Player 사용시


  // 유튜브 사용시

import React, { useEffect, useRef, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import useIsDarkMode from '../hooks/useIsDarkMode';
import GoBackBtn from '../components/myDiary/GoBackBtn';
import CustomDrawerContent from '../components/myDiaryDrawerNav/CustomDrawerContent';
import MyDiary from '../screens/mainNav/myDiary/MyDiary';
// import RequestSongChange from '../screens/mainNav/myDiary/RequestSongChange';
import { MyDiaryDrawerNavParamsList } from '../types/navigation/homeNavStackParamsList';
import { seeMyDiary_seeMyDiary_diary } from '../__generated__/seeMyDiary';
// import TrackPlayer from 'react-native-track-player';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MUSIC_AUTO_PLAY, YOUTUBE_MUSIC_SHOW } from '../track-player/constants';
import LocalDBMyDiary from '../screens/useLocalDBScreen/LocalDBMyDiary';
import useIsUsingCache from '../hooks/useIsUsingCache';
import { realmDiaryType } from '../types/realm/realmDiaryType';
import LocalDBCustomDrawerContent from '../components/useLocalDBScreen/myDiaryDrawerNav/LocalDBCustomDrawerContent';
import useGetFontFamily from '../hooks/useGetFontFamily';
// import WatchYoutube from '../screens/youtubeRelated/WatchYoutube';
// import SearchYoutube from '../screens/youtubeRelated/SearchYoutube';
// import BaseContainer from '../components/shared/BaseContainer';
// import { playingMusicVar } from '../apollo';
// import { useReactiveVar } from '@apollo/client';

const Drawer = createDrawerNavigator<MyDiaryDrawerNavParamsList>();

// 뭐 딱히 props 쓸게 없어서 걍 뺌
// type MyDiaryDrawerNavProp = NativeStackScreenProps<BaseSharedStackNavStackParamsList,"MyDiaryDrawerNav">

const MyDiaryDrawerNav = () => {

  const [diaryId,setDiaryId] = useState<number>();

  const [musicAutoPlay,setMusicAutoPlay] = useState(false);

  // state 로 쓰거나 useReactiveVar 로 subscription 받아야 겠네
  
  // const [isNowMusicPlaying,setIsNowMusicPlaying] = useState(false);  // 음악 재생
  const [diary1MusicPlaying,setDiary1MusicPlaying] = useState(false); // 추가
  const [diary2MusicPlaying,setDiary2MusicPlaying] = useState(false); // 추가
  const nowFocusDiary = useRef<"MyDiary1"|"MyDiary2">("MyDiary1"); // 추가

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

  
  const [nowDiaryData,setNowDiaryData] = useState<seeMyDiary_seeMyDiary_diary|string|realmDiaryType>();

  const isDarkMode = useIsDarkMode();

  const commonProps = {
    musicAutoPlay,
    // isNowMusicPlaying,
    // setIsNowMusicPlaying,
    nowFocusDiary, // 추가
    youtubeMusicShow,
    switchYoutubeMusicShow,
  }

  const diaryProps = {
    ...commonProps,
    setNowDiaryData,
    setDiaryId,
  };

  const diary1Props = {
    isNowMusicPlaying: diary1MusicPlaying,
    setIsNowMusicPlaying: setDiary1MusicPlaying,
    // setElseDiaryMusicPlaying: setDiary2MusicPlaying,
  };

  const diary2Props = {
    isNowMusicPlaying: diary2MusicPlaying,
    setIsNowMusicPlaying: setDiary2MusicPlaying,
    // setElseDiaryMusicPlaying: setDiary1MusicPlaying,
  };

  const customDrawerContentProps = {
    ...commonProps,
    nowDiaryData,
    diaryId,
    setMusicAutoPlay,
    diary1MusicPlaying, // 추가
    setDiary1MusicPlaying, // 추가
    diary2MusicPlaying, // 추가
    setDiary2MusicPlaying, // 추가
    nowFocusDiary, // 추가
  };

  const fontFamily = useGetFontFamily("Medium");

  const isUsingCache = useIsUsingCache();

  // if(!settingReady) {
  //   return <BaseContainer/>;
  // }

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
        swipeEnabled:false,
        headerTitleStyle: {
          fontSize: 17,
          fontFamily,
          padding: 3,
        },
      }}
      // 이게 그릴 애고
      drawerContent={() => (
        // <CustomDrawerContent
        //   musicAutoPlay={musicAutoPlay}
        //   setMusicAutoPlay={setMusicAutoPlay}

        //   isNowMusicPlaying={isNowMusicPlaying}
        //   setIsNowMusicPlaying={setIsNowMusicPlaying}

        //   youtubeMusicShow={youtubeMusicShow}
        //   // setYoutubeMusicShow={setYoutubeMusicShow}
        //   switchYoutubeMusicShow={switchYoutubeMusicShow}

        //   // number | undefined 로 되서 타입 문제 나옴
        //   diaryId={diaryId}

        //   nowDiaryData={nowDiaryData}
        // />
        isUsingCache ? 
          <CustomDrawerContent
            {...customDrawerContentProps}
          />
        :
          <LocalDBCustomDrawerContent
            {...customDrawerContentProps}
          />
      )}
    >
      {/* 여기 오는 애들은 navigation 에 들어가는 스크린들 인듯, 맨처음 오는 애가 화면에 나오고. 지정도 가능하고 당연히. navigate 역시 name 기준으로 */}
      {/* MyDiary1 MyDiary2 두개 넣어서 이동 가능하게 */}
      <Drawer.Screen
        name="MyDiary1"
      >
        {(props)=>(
          isUsingCache ? 
            <MyDiary
              {...props}
              {...diaryProps}
              {...diary1Props}
            />
          :
            <LocalDBMyDiary
              {...props}
              {...diaryProps}
              {...diary1Props}
            />
        )}
      </Drawer.Screen>
      <Drawer.Screen
        name="MyDiary2"
      >
        {(props)=>(
          // name 이 달라서 뜨는거임. 타입 ㄱㅊ
          isUsingCache ? 
            <MyDiary
              {...props}
              {...diaryProps}
              {...diary2Props}
            />
          :
            <LocalDBMyDiary
              {...props}
              {...diaryProps}
              {...diary2Props}
            />
        )}
      </Drawer.Screen>
      {/* SharedStackNav 로 옮김 */}
      {/* <Drawer.Screen
        name="RequestSongChange"
        component={RequestSongChange}
        options={{
          title:"음악 변경 신청",
        }}
      />
      <Drawer.Screen
        name="ChangeYoutubeSong"
        component={SearchYoutube}
        options={{
          title:"유튜브 찾기",
        }}
      />
      <Drawer.Screen
        name="WatchYoutube"
        component={WatchYoutube}
        options={{
          title:"유튜브 영상 보기",
        }}
      /> */}

    </Drawer.Navigator>
  );
};

export default MyDiaryDrawerNav;

// 여기까지 유튜브 사용시


// 얘는 옜날꺼?

// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { useState } from 'react';
// import { Alert, View } from 'react-native';
// import GoBackBtn from '../components/myDiary/GoBackBtn';
// import MusicPlayingStateView from '../components/myDiaryDrawerNav/MusicPlayingStateView';
// import useIsDarkMode from '../hooks/useIsDarkMode';
// import MyDiary from '../screens/mainNav/myDiary/MyDiary';
// import RequestSongChange from '../screens/mainNav/myDiary/RequestSongChange';
// import { BaseSharedStackNavStackParamsList } from '../types/navigation/homeNavStackParamsList';

// const Drawer = createDrawerNavigator();

// type Prop = NativeStackScreenProps<BaseSharedStackNavStackParamsList,"MyDiaryDrawerNav">

// // const MyDiaryDrawerNav = ({navigation,route}:Prop) => {
// const MyDiaryDrawerNav = ({route}:Prop) => {
//   console.log(route.params.params)

//   // const deleteDiary = useDeleteDiary(diaryId);
  
//   const isDarkMode = useIsDarkMode();

//   const [musicAutoPlay,setMusicAutoPlay] = useState(false);
//   const changeAutoPlayText = musicAutoPlay ? "음악 자동 재생 끄기" : "음악 자동 재생 켜기";

//   const [isNowMusicPlaying,setIsNowMusicPlaying] = useState(false);
//   // 아니면 그냥 플레이/일시정지 아이콘 넣어. 심플하게

//   // Diary 에서 음악 제목 받아와서 놓을까?

//   const RequestSongChangeTitle = "음악 변경 신청";
  
//   return (
//     // 걍 사이드 메뉴를 보여주기 위함이라 navigation 의미는 없음. 전부 e.preventDefault(); 하고 기능 넣음.
//     <Drawer.Navigator
//       useLegacyImplementation={true}
//       screenOptions={{
//         drawerStyle:{
//           backgroundColor: isDarkMode ? "rgba(0,0,0,0.8)" : "white",
//         },
//         headerStyle:{
//           backgroundColor: isDarkMode ? "black" : "white",
//         },
//         headerTintColor:isDarkMode ? "white" : "black",
//         drawerPosition:"right",
//         headerLeft:({tintColor})=><GoBackBtn tintColor={tintColor}/>,
//         swipeEnabled:false,
//         drawerItemStyle:{
//           backgroundColor: isDarkMode ? null : "white",
//           borderBottomColor: isDarkMode ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.1)",
//           borderBottomWidth:1,
//           // flex: 1,
//         },
//         drawerLabelStyle:{
//           color: isDarkMode ? "white" : "black",
//         },
//         drawerContentContainerStyle:{
//           // backgroundColor:"yellow",
//           flex: 1,
//         },
//         // drawerContentStyle:{
//           // backgroundColor:"yellow",
//           // flex: 1,
//         // }
//       }}
//     >
//       {/* 맨처음 Diary 을 놔야 스크린 뜸. */}
//       <Drawer.Screen
//         name="MyDiary"
//         component={MyDiary}
//         options={{
//           drawerLabel:changeAutoPlayText
//         }}
//         listeners={()=>{
//           return {
//             drawerItemPress:(e)=>{
//               e.preventDefault();
//               setMusicAutoPlay(prev=>!prev);
//             }
//           };
//         }}
//       />
//       <Drawer.Screen
//         name="a"
//         // 여기다 EditDiary 놓으면 슬라이드가 그대로 있어서 navigate 해야할듯
//         component={View}
//         options={{
//           drawerLabel:"일기 수정하기",
//         }}
//         listeners={()=>{
//           return {
//             drawerItemPress:(e)=>{
//               e.preventDefault();
//               // Alert > navigation.navigate("EditDiary");
//             }
//           }
//         }}
//       />
//       <Drawer.Screen
//         name="RequestSongChange"
//         component={RequestSongChange}
//         options={{
//           drawerLabel:RequestSongChangeTitle,
//           title:RequestSongChangeTitle,
//         }}
//       />
//       <Drawer.Screen
//         name="b"
//         // 여기다 EditDiary 놓으면 슬라이드가 그대로 있어서 navigate 해야할듯
//         component={View}
//         options={{
//           drawerLabel:"일기 삭제하기",
//         }}
//         listeners={()=>{
//           return {
//             drawerItemPress:(e)=>{
//               e.preventDefault();
//               // Alert > 삭제 > navigation.navigate("MyDiaryList");
//             }
//           }
//         }}
//       />
//       {/* 노래 없을 때 어떻게 할지도 만들어. 노래 제목도 받고 싶은데 어떻게 넣을라나 Diary 에서 받아야 할텐데 아님 노래 진행률 */}
//       <Drawer.Screen
//         name="c"
//         component={View}
//         options={{
//           // color 가 drawerLabelStyle 이 아니네. 왜지?
//           drawerLabel:({color})=>(
//             <MusicPlayingStateView
//               color={color}
//               // focused={focused}
//               isMusicPlaying={isNowMusicPlaying}
//               setIsNowMusicPlaying={setIsNowMusicPlaying}
//             />
//           ),
//           drawerItemStyle:{
//             flex: 1,
//             justifyContent:"flex-end"
//           }
//         }}
//         listeners={()=>{
//           return {
//             drawerItemPress:(e)=>{
//               e.preventDefault();
//             }
//           }
//         }}
//       />
//     </Drawer.Navigator>
//   );
// }

// export default MyDiaryDrawerNav;