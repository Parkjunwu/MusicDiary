
  // Track Player 사용시

// import { ListRenderItem, TouchableOpacity } from "react-native";
// import { useWindowDimensions } from 'react-native';
// import { gql, useQuery } from "@apollo/client";
// import { useEffect, useState } from "react";
// import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
// import { NativeStackScreenProps } from "@react-navigation/native-stack";
// import useIsDarkMode from "../../../hooks/useIsDarkMode";
// import DiaryLoading from "../../../components/myDiary/DiaryLoading";
// import BodyText from "../../../components/myDiary/BodyText";
// import DiaryVideoOrImage from "../../../components/myDiary/DiaryVideoOrImage";
// import { MyDiaryDrawerNavParamsList, MyDiaryListTabStackParamsList } from "../../../types/navigation/homeNavStackParamsList";
// import { seeMyDiary, seeMyDiaryVariables, seeMyDiary_seeMyDiary_diary } from "../../../__generated__/seeMyDiary";
// import HamburgerBtn from "../../../components/myDiary/HamburgerBtn";
// import { useIsFocused } from "@react-navigation/core";
// import TrackPlayer, { TrackType } from "react-native-track-player";
// import { isFromCalendarVar, playingMusicVar } from "../../../apollo";
// // import DiaryHeaderComponent from "../../../components/diary/DiaryHeaderComponent";
// // import DiaryFooterComponent from "../../../components/diary/DiaryFooterComponent";
// // import DiaryDropDown from "../../../components/diary/DiaryDropDown";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import { DIARY_FRAGMENT } from "../../../gql/fragment";
// import DiaryStickyHeaderComponent from "../../../components/myDiary/DiaryStickyHeaderComponent";
// import { CompositeScreenProps } from "@react-navigation/core";

// const SEE_MY_DIARY = gql`
//   query seeMyDiary($id: Int!) {
//     seeMyDiary(id:$id) {
//       diary {
//         ...DiaryFragment
//       }
//       prevDiaryId
//       nextDiaryId
//       error
//     }
//   }
//   ${DIARY_FRAGMENT}
// `;


// type NavigationProps = CompositeScreenProps<
//   NativeStackScreenProps<MyDiaryDrawerNavParamsList,"MyDiary1">,
//   NativeStackScreenProps<MyDiaryListTabStackParamsList>
// >;

// type MyDiaryProps = NavigationProps & {
//   musicAutoPlay:boolean,
//   isNowMusicPlaying:boolean,
//   // setIsNowMusicPlaying:React.Dispatch<React.SetStateAction<boolean>>,
//   setDiaryId:React.Dispatch<React.SetStateAction<number | undefined>>,
//   // nowDiaryData:seeMyDiary_seeMyDiary_diary | string | undefined,
//   setNowDiaryData:React.Dispatch<React.SetStateAction<string | seeMyDiary_seeMyDiary_diary | undefined>>,
// };

// const MyDiary = ({
//   navigation,
//   route,
//   musicAutoPlay,
//   isNowMusicPlaying,
//   // setIsNowMusicPlaying,
//   setDiaryId,
//   // nowDiaryData,
//   setNowDiaryData,
// }:MyDiaryProps) => {

//   // 이게 navigate 로 param 받은거라 캐시 업데이트가 안됨. 여기서 또 받든지 아님 캐시에서 받든지 근데 캐시에서 받은 애를 또 state 에 넣으니까 똑같이 또 안받아져. 걍 여기서 받자
//   const id = route.params.id;

//   const [pressGoBack,setPressGoBack] = useState(false);
  
//   useEffect(()=>{
//     navigation.setOptions({
//       headerTitleAlign:"center",
//       headerRight:({tintColor})=><HamburgerBtn tintColor={tintColor}/>,
//       // cleanUp 이랑 그냥 goBack 쓰면 playingMusicVar 가 씹힘. 그래서 따로 만듦.
//       // 이전, 이후, 캘린더로 이동하는 때도 만들어야 겠네
//       headerLeft:({tintColor}) => <TouchableOpacity onPress={()=>{
//         setPressGoBack(true);
//         playingMusicVar(false);
//       }}>
//       <Ionicons name="chevron-back-sharp" color={tintColor} size={30} />
//     </TouchableOpacity>
//     });
//   },[]);

//   useEffect(()=>{
//     // 뒤로 가기를 누르고 isNowMusicPlaying 가 false 완료되면 뒤로가기 실행
//     if(pressGoBack && !isNowMusicPlaying) {
//       // goBack 하면 MyDiary2 > MyDiary1 이래 가짐
//       // navigation.goBack();
//       // Calendar 에서 온거면 Calendar 로 가게
//       isFromCalendarVar() ? navigation.navigate("Calendar") : navigation.navigate("MyDiaryList");
//     }
//   },[isNowMusicPlaying,pressGoBack])

//   // 이거 확인. 이동할 때마다 데이터 다시 받는지
//   useEffect(()=>{
//     setDiaryId(id);
//   },[route]);

//   const { loading, error, data } = useQuery<seeMyDiary,seeMyDiaryVariables>(SEE_MY_DIARY, {
//     // fetchPolicy: 'network-only', 이 pagination 에 걸릴 수 있음. 만약 그러면 걍 refetch. 얘는 근데 pagination 안쓰니 괜찮을듯.
//     fetchPolicy: 'network-only',
//     nextFetchPolicy: 'cache-first',
//     variables: {
//       id,
//     },
//   });

//   console.log("data")
//   console.log(data)

//   const isGetData = data?.seeMyDiary;
//   const diaryData = isGetData?.diary;
//   const diaryError = isGetData?.error;
//   const apolloError = error ? "서버와 연결에 실패하였습니다." : undefined;
  
//   // nowDiaryData 위한애
//   const isFocused = useIsFocused();
//   useEffect(()=>{
//     // if(isFocused && diaryData) {
//     //   nowDiaryData = diaryData;
//     // }
//     if(isFocused) {
//       setNowDiaryData(apolloError ?? diaryData ?? diaryError ?? undefined);
//     }
//   },[data,error,isFocused]);

//   const setMusic = async () => {
//     // clean up 에 async 가 못옴. 그래서 걍 여기서 reset 해줌,
//     await TrackPlayer.reset()
//     await TrackPlayer.add([{
//       // data 의 url 넣어.
//       url:"https://music-diary-upload.s3.ap-northeast-2.amazonaws.com/music/music-hls/music.m3u8",
//       type: TrackType.HLS,
//       // isLiveStream: true,
      
//     }]);
//     if(musicAutoPlay){
//       playingMusicVar(true);
//     }
//   };

//   // const deleteMusic = () => {
//   //   setIsNowMusicPlaying(false);
//   //   // clean up 에 async 가 못옴.
//   //   // const trackIndex = await TrackPlayer.getCurrentTrack();
//   //   // trackIndex && await TrackPlayer.remove([trackIndex]);
//   // };

//   useEffect(()=>{
//     // const diaryData = data?.seeMyDiary?.diary;
//     if(diaryData) {
//       // 타이틀 넣기
//       navigation.setOptions({
//         // title 말고 날짜로 넣을까?
//         title: loading ? "" : diaryData.title,
//       });
//       // 음악 재생. music 있는 경우
//       // if(diaryData.musicUrl){
//       if(diaryData.music){
//         setMusic();
//       }
//       // setIsNowMusicPlaying(true);
//     }
//   },[data,loading]);
  
//   const { width:windowWidth } = useWindowDimensions();

//   const isDarkMode = useIsDarkMode();

//   if(loading) {
//     return <DiaryLoading {...route.params} />;
//   }

//   // 에러인 경우도 생성해야함

//   const sortedData = data && data.seeMyDiary?.diary?.body.map((bodyString:string,index:number) => ({body:bodyString,file:data.seeMyDiary?.diary?.file[index]}));


//   const renderItem:ListRenderItem<{body?:string,file?:string}> = ({item}) => {
//     const file = item.file;
//     const body = item.body;
//     const fileWidth = windowWidth - 20;
//     return (
//       <>
//         {body !== "" && <BodyText>{body}</BodyText>}
//         {file && <DiaryVideoOrImage uri={file} fileWidth={fileWidth} />}
//       </>
//     );
//   };

//   return (
//     <KeyboardAwareFlatList
//       style={{
//         flex: 1,
//         backgroundColor: isDarkMode ? "black" : "white",
//         padding: 10,
//       }}
//         data={sortedData}
//         renderItem={renderItem}
//         keyExtractor={(item,index)=>index+""}
//         // ListHeaderComponent={<DiaryHeaderComponent {...data?.seeDiary} title={title} user={user} createdAt={createdAt} />}
//         // ListFooterComponent={<DiaryFooterComponent {...data?.seeDiary} user={user} />}
//         // StickyHeaderComponent={()=><DiaryStickyHeaderComponent
//         //   myDiaryNumber={Number(route.name.slice(-1))}
//         //   prevDiaryId={data?.seeMyDiary?.prevDiaryId}
//         //   nextDiaryId={data?.seeMyDiary?.nextDiaryId}
//         // />}
//         // stickyHeaderHiddenOnScroll={false}
//         // stickyHeaderIndices={[0]}
//         ListHeaderComponent={()=><DiaryStickyHeaderComponent
//           myDiaryNumber={Number(route.name.slice(-1))}
//           prevDiaryId={data?.seeMyDiary?.prevDiaryId}
//           nextDiaryId={data?.seeMyDiary?.nextDiaryId}
//           dateTime={data?.seeMyDiary?.diary?.dateTime}
//         />}
//     />
//   );
// };

// export default MyDiary;

  // 여기까지Track Player 사용시


  // 유튜브 사용시

import { FlatList, ListRenderItem, TouchableOpacity } from "react-native";
import { useWindowDimensions } from 'react-native';
import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
// import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import useIsDarkMode from "../../../hooks/useIsDarkMode";
import DiaryLoading from "../../../components/myDiary/DiaryLoading";
import BodyText from "../../../components/myDiary/BodyText";
import DiaryVideoOrImage from "../../../components/myDiary/DiaryVideoOrImage";
import { MyDiaryDrawerNavParamsList, MyDiaryListTabStackParamsList } from "../../../types/navigation/homeNavStackParamsList";
import { seeMyDiary, seeMyDiaryVariables, seeMyDiary_seeMyDiary_diary } from "../../../__generated__/seeMyDiary";
import HamburgerBtn from "../../../components/myDiary/HamburgerBtn";
import { useIsFocused } from "@react-navigation/core";
// import TrackPlayer, { TrackType } from "react-native-track-player";
import { fromWhere } from "../../../apollo";
// import DiaryHeaderComponent from "../../../components/diary/DiaryHeaderComponent";
// import DiaryFooterComponent from "../../../components/diary/DiaryFooterComponent";
// import DiaryDropDown from "../../../components/diary/DiaryDropDown";
import Ionicons from "react-native-vector-icons/Ionicons";
import { DIARY_FRAGMENT } from "../../../gql/fragment";
import DiaryStickyHeaderComponent from "../../../components/myDiary/DiaryStickyHeaderComponent";
import { CompositeScreenProps } from "@react-navigation/core";

const SEE_MY_DIARY = gql`
  query seeMyDiary($id: Int!) {
    seeMyDiary(id:$id) {
      diary {
        ...DiaryFragment
      }
      prevDiaryId
      nextDiaryId
      error
    }
  }
  ${DIARY_FRAGMENT}
`;


type NavigationProps = CompositeScreenProps<
  NativeStackScreenProps<MyDiaryDrawerNavParamsList,"MyDiary1">,
  NativeStackScreenProps<MyDiaryListTabStackParamsList>
>;

type MyDiaryProps = NavigationProps & {
  musicAutoPlay: boolean,
  isNowMusicPlaying: boolean,
  setIsNowMusicPlaying: React.Dispatch<React.SetStateAction<boolean>>,
  // setElseDiaryMusicPlaying: React.Dispatch<React.SetStateAction<boolean>>,
  nowFocusDiary: React.MutableRefObject<"MyDiary1" | "MyDiary2">,
  setDiaryId: React.Dispatch<React.SetStateAction<number | undefined>>,
  youtubeMusicShow: boolean,
  // setYoutubeMusicShow: React.Dispatch<React.SetStateAction<boolean>>,
  switchYoutubeMusicShow: () => void,
  // nowDiaryData: seeMyDiary_seeMyDiary_diary | string | undefined,
  setNowDiaryData: React.Dispatch<React.SetStateAction<string | seeMyDiary_seeMyDiary_diary | undefined>>,
};

const MyDiary = ({
  navigation,
  route,
  musicAutoPlay,
  isNowMusicPlaying,
  setIsNowMusicPlaying,
  // setElseDiaryMusicPlaying,
  nowFocusDiary,
  setDiaryId,
  youtubeMusicShow,
  // setYoutubeMusicShow,
  switchYoutubeMusicShow,
  // nowDiaryData,
  setNowDiaryData,
}:MyDiaryProps) => {

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

  useEffect(()=>{
    // 이거 확인. 이동할 때마다 데이터 다시 받는지
    setDiaryId(id);
    
    nowFocusDiary.current = route.name; // 추가
  },[route]);

  const { loading, error, data } = useQuery<seeMyDiary,seeMyDiaryVariables>(SEE_MY_DIARY, {
    // fetchPolicy: 'network-only', 이 pagination 에 걸릴 수 있음. 만약 그러면 걍 refetch. 얘는 근데 pagination 안쓰니 괜찮을듯.
    // 근데 'network-only' 로 할 이유가 있나? 'cache-first', 가 낫지 않나? 안맞으면 refetch 하고
    // fetchPolicy: 'network-only',
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: 'cache-first',
    variables: {
      id,
    },
  });

  console.log("data")
  console.log(data)

  const isGetData = data?.seeMyDiary;
  const diaryData = isGetData?.diary;
  // const diaryError = isGetData?.error;
  // const apolloError = error ? "서버와 연결에 실패하였습니다." : undefined;
  
  const isFocused = useIsFocused();

  useEffect(()=>{
    // if(isFocused && diaryData)  nowDiaryData = diaryData;
    // if(isFocused) setNowDiaryData(apolloError ?? diaryData ?? diaryError ?? undefined); // 이래 하니까 네트워크 안되는 상태에서 캐시로 노래 재생 안됨. 
    if(isFocused) setNowDiaryData(diaryData);
  },[data,error,isFocused]);

  const setMusicPlaying = () => musicAutoPlay && setIsNowMusicPlaying(true);

  useEffect(()=>{
    // 음악 재생. music 있는 경우. 근데 이걸 Header 에 넣는 게 더 나을듯. 두군데서 음악을 컨트롤 하고 있음.
    // if(diaryData.musicUrl){
    if(!loading && diaryData?.youtubeId && isFocused) setMusicPlaying();
  },[data,loading,isFocused])

  const isMusicPlayingBeforeVideoPlay = useRef(false);
  const [videoPlayingState,setVideoPlayingState] = useState<{[key:string]:boolean}>({});

  // 이거 될라나 뭔가 어디서 문제 생길 거 같은데. 근데 일단 되긴하네. 아니면 MyDiaryDrawerNav 에서 유튜브 재생때 VideoPlayingState 바꿔주던지. 그럴라면 isMusicPlayingBeforeVideoPlay 랑 VideoPlayingState 다 MyDiaryDrawerNav 로 올려야함.
  useEffect(()=>{
    if(isNowMusicPlaying){
      setVideoPlayingState(prev=>{
        const newObj: {[key: string]: boolean} = {};
        for (const key in prev) {;
          newObj[key] = false;
        }
        return newObj;
      });
    }
  },[isNowMusicPlaying]);

  useEffect(()=>{
    // const diaryData = data?.seeMyDiary?.diary;
    if(diaryData) {
      // 타이틀 넣기
      navigation.setOptions({
        // title 말고 날짜로 넣을까?
        title: loading ? "" : diaryData.title,
      });

      // 비디오 재생 중 목록
      if(diaryData.file){
        const videoArr: string[] = diaryData.file.filter((fileName:string)=>fileName.endsWith("m3u8"));

        const makeVideoPlayingState: {[key:string]:boolean} = {};
        videoArr.forEach(fileName => makeVideoPlayingState[fileName] = false);

        setVideoPlayingState(makeVideoPlayingState);
      }

      // 위에 isFocused 까지 넣음
      // // 음악 재생. music 있는 경우. 근데 이걸 Header 에 넣는 게 더 나을듯. 두군데서 음악을 컨트롤 하고 있음.
      // // if(diaryData.musicUrl){
      // if(diaryData.youtubeId){
      //   setMusicPlaying();
      // }
      // setIsNowMusicPlaying(true);
    }
  },[data,loading]);
  
  
  const { width:windowWidth } = useWindowDimensions();

  const isDarkMode = useIsDarkMode();

  if(loading) {
    return <DiaryLoading {...route.params} />;
  }

  // 에러인 경우도 생성해야함

  const sortedData = data && data.seeMyDiary?.diary?.body.map((bodyString:string,index:number) => ({body:bodyString,file:data.seeMyDiary?.diary?.file[index]}));


  const renderItem:ListRenderItem<{body?:string,file?:string}> = ({item,index}) => {
    const file = item.file;
    const body = item.body;
    const fileWidth = windowWidth - 20;
    return (
      <React.Fragment
        key={index}
      >
        {body !== "" && <BodyText
          index={index}
          fontSize={16}
        >{body}</BodyText>}
        {file && <DiaryVideoOrImage
          uri={file}
          fileWidth={fileWidth}
          isNowMusicPlaying={isNowMusicPlaying}
          setIsNowMusicPlaying={setIsNowMusicPlaying}
          videoPlayingState={videoPlayingState}
          setVideoPlayingState={setVideoPlayingState}
          isMusicPlayingBeforeVideoPlay={isMusicPlayingBeforeVideoPlay}
        />}
      </React.Fragment>
    );
  };

  // 여기는 KeyboardAwareFlatList 쓸 필요 없지 않나?
  return (
    // <KeyboardAwareFlatList
    <FlatList
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? "black" : "white",
        padding: 10,
        paddingTop: 0,
      }}
        data={sortedData}
        renderItem={renderItem}
        keyExtractor={(item,index)=>index+""}
        // ListHeaderComponent={<DiaryHeaderComponent {...data?.seeDiary} title={title} user={user} createdAt={createdAt} />}
        // ListFooterComponent={<DiaryFooterComponent {...data?.seeDiary} user={user} />}
        // StickyHeaderComponent={()=><DiaryStickyHeaderComponent
        //   myDiaryNumber={Number(route.name.slice(-1))}
        //   prevDiaryId={data?.seeMyDiary?.prevDiaryId}
        //   nextDiaryId={data?.seeMyDiary?.nextDiaryId}
        // />}
        // stickyHeaderHiddenOnScroll={false}
        // stickyHeaderIndices={[0]}
        ListHeaderComponent={<DiaryStickyHeaderComponent
          myDiaryNumber={Number(route.name.slice(-1))}
          prevDiaryId={data?.seeMyDiary?.prevDiaryId}
          nextDiaryId={data?.seeMyDiary?.nextDiaryId}
          dateTime={data?.seeMyDiary?.diary?.dateTime}
          youtubeId={data?.seeMyDiary?.diary?.youtubeId}
          isNowMusicPlaying={isNowMusicPlaying}
          setIsNowMusicPlaying={setIsNowMusicPlaying}
          youtubeMusicShow={youtubeMusicShow}
          // setYoutubeMusicShow={setYoutubeMusicShow}
          switchYoutubeMusicShow={switchYoutubeMusicShow}
        />}
    />
  );
};

export default MyDiary;