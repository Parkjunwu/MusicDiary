// import { FlatList, ListRenderItem } from "react-native";
// import { gql, useQuery } from "@apollo/client";
// import React, { useEffect, useRef, useState } from "react";
// import { NativeStackScreenProps } from "@react-navigation/native-stack";
// import DiaryLoading from "../../../components/myDiary/DiaryLoading";
// import BodyText from "../../../components/myDiary/BodyText";
// import DiaryVideoOrImage from "../../../components/myDiary/DiaryVideoOrImage";
// import { UploadDiaryTabStackParamsList } from "../../../types/navigation/homeNavStackParamsList";
// import { seeNotifiedMyDiary, seeNotifiedMyDiaryVariables } from "../../../__generated__/seeNotifiedMyDiary";
// import { DIARY_FRAGMENT } from "../../../gql/fragment";
// import UploadHorizontalEmptyLayoutForBigScreenNeedScreenWidth from "../../../components/upload/UploadHorizontalEmptyLayoutForBigScreenNeedScreenWidth";
// import useColorsChangedByDarkMode from "../../../hooks/useColorsChangedByDarkMode";
// import useGetWidthDealWithBigScreenNeedImageHorizontalEmptySpaceBase20 from "../../../hooks/forDealWithBigScreen/useGetWidthDealWithBigScreenNeedImageHorizontalEmptySpaceBase20";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { MUSIC_AUTO_PLAY, YOUTUBE_MUSIC_SHOW } from "../../../track-player/constants";
// import NotificationDiaryStickyHeaderComponent from "../../../components/notificationDiary/NotificationDiaryStickyHeaderComponent";

// const SEE_NOTIFIED_MY_DIARY = gql`
//   query seeNotifiedMyDiary($id: Int!) {
//     seeNotifiedMyDiary(id:$id) {
//       diary {
//         ...DiaryFragment
//       }
//       error
//     }
//   }
//   ${DIARY_FRAGMENT}
// `;

// type NotificationDiaryProps = NativeStackScreenProps<UploadDiaryTabStackParamsList,"NotificationDiary">;

// // Diary 랑 똑같고 title 이랑 createdAt 을 더 받음.

// const NotificationDiary = ({navigation,route}:NotificationDiaryProps) => {

//   const { loading, data } = useQuery<seeNotifiedMyDiary,seeNotifiedMyDiaryVariables>(SEE_NOTIFIED_MY_DIARY, {
//     // fetchPolicy: 'network-only', 이 pagination 에 걸릴 수 있음. 만약 그러면 걍 refetch. 얘는 근데 pagination 안쓰니 괜찮을듯.
//     // fetchPolicy: 'network-only',
//     fetchPolicy: "cache-and-network",
//     nextFetchPolicy: 'cache-first',
//     variables: {
//       id: route.params.id,
//     },
//   });
//   console.log(data)
  
//   useEffect(()=>{
//     if(data){
//       const diaryInfo = data.seeNotifiedMyDiary;
//       navigation.setOptions({
//         title:diaryInfo?.diary?.title,
//       });
//     }
//   },[data]);

//   // NotificationDiaryDrawerNav 안써서 얘는 여기
//   // 만약 쓸거면 여기부터 아래는 MyDiaryDrawerNav 참고해서 빼가지고 넣으면 됨
//   const [isNowMusicPlaying,setIsNowMusicPlaying] = useState(false);  // 음악 재생

//   const [youtubeMusicShow, setYoutubeMusicShow] = useState(true);  //유튜브 영상 보이게 할지. 얘도 저장해야겠네

//   const switchYoutubeMusicShow = () => {
//     // let prevShow;
//     setYoutubeMusicShow((prev)=>{
//       // 원래 async 들어가야 하는데 setState 는 안됨. 상관 없겠지?
//       prev ? AsyncStorage.removeItem(YOUTUBE_MUSIC_SHOW) : AsyncStorage.setItem(YOUTUBE_MUSIC_SHOW,"ok");
//       return !prev;
//     });
//   };

//   const setFirstAutoPlay = async() => {
//     const getStoredSetting = Boolean(await AsyncStorage.getItem(MUSIC_AUTO_PLAY));
//     setIsNowMusicPlaying(getStoredSetting);
//   };

//   const setFirstYoutubeMusicShowSetting = async() => {
//     const getStoredSetting = Boolean(await AsyncStorage.getItem(YOUTUBE_MUSIC_SHOW));
//     setYoutubeMusicShow(getStoredSetting);
//   };

//   useEffect(()=>{
//     setFirstAutoPlay();
//     setFirstYoutubeMusicShowSetting();
//   },[]);

  
//   // 이건 동영상 위한건데 지금은 동영상을 안씀. 얘는 MyDiary 에 있음.
//   const isMusicPlayingBeforeVideoPlay = useRef(false);
//   const [videoPlayingState,setVideoPlayingState] = useState<{[key:string]:boolean}>({});

//   useEffect(()=>{
//     if(isNowMusicPlaying){
//       setVideoPlayingState(prev=>{
//         const newObj: {[key: string]: boolean} = {};
//         for (const key in prev) {;
//           newObj[key] = false;
//         }
//         return newObj;
//       });
//     }
//   },[isNowMusicPlaying]);
//   // 여기까지

  
//   const {backgroundColor} = useColorsChangedByDarkMode();

//   const {imageWidth} = useGetWidthDealWithBigScreenNeedImageHorizontalEmptySpaceBase20();

//   if(loading) {
//     return <DiaryLoading {...route.params} />;
//   }

//   // 에러인 경우도 생성해야함

//   const sortedData = data && data.seeNotifiedMyDiary?.diary?.body.map((bodyString:string,index:number) => ({body:bodyString,file:data.seeNotifiedMyDiary?.diary?.file[index]}));


//   const renderItem:ListRenderItem<{body?:string,file?:string}> = ({item,index}) => {
//     const file = item.file;
//     const body = item.body;
//     return (
//       <React.Fragment
//         key={index}
//       >
//         {body !== "" && <BodyText
//           index={index}
//           fontSize={16}
//         >{body}</BodyText>}
//         {file && <DiaryVideoOrImage
//           uri={file}
//           fileWidth={imageWidth}
//           isNowMusicPlaying={isNowMusicPlaying}
//           setIsNowMusicPlaying={setIsNowMusicPlaying}
//           videoPlayingState={videoPlayingState}
//           setVideoPlayingState={setVideoPlayingState}
//           isMusicPlayingBeforeVideoPlay={isMusicPlayingBeforeVideoPlay}
//         />}
//       </React.Fragment>
//     );
//   };

//   return (
//     <UploadHorizontalEmptyLayoutForBigScreenNeedScreenWidth>
//       <FlatList
//         style={{
//           flex: 1,
//           backgroundColor,
//           padding: 10,
//           paddingTop: 0,
//         }}
//           data={sortedData}
//           renderItem={renderItem}
//           keyExtractor={(item,index)=>index+""}
//           ListHeaderComponent={<NotificationDiaryStickyHeaderComponent
//             dateTime={data?.seeNotifiedMyDiary?.diary?.dateTime}
//             youtubeId={data?.seeNotifiedMyDiary?.diary?.youtubeId}
//             isNowMusicPlaying={isNowMusicPlaying}
//             setIsNowMusicPlaying={setIsNowMusicPlaying}
//             youtubeMusicShow={youtubeMusicShow}
//             switchYoutubeMusicShow={switchYoutubeMusicShow}
//           />}
//       />
//     </UploadHorizontalEmptyLayoutForBigScreenNeedScreenWidth>
//   );
// };

// export default NotificationDiary;




import { FlatList, ListRenderItem } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import DiaryLoading from "../../../components/myDiary/DiaryLoading";
import BodyText from "../../../components/myDiary/BodyText";
import DiaryVideoOrImage from "../../../components/myDiary/DiaryVideoOrImage";
import { UploadDiaryTabStackParamsList } from "../../../types/navigation/homeNavStackParamsList";
import { seeNotifiedMyDiary } from "../../../__generated__/seeNotifiedMyDiary";
import UploadHorizontalEmptyLayoutForBigScreenNeedScreenWidth from "../../../components/upload/UploadHorizontalEmptyLayoutForBigScreenNeedScreenWidth";
import useColorsChangedByDarkMode from "../../../hooks/useColorsChangedByDarkMode";
import useGetWidthDealWithBigScreenNeedImageHorizontalEmptySpaceBase20 from "../../../hooks/forDealWithBigScreen/useGetWidthDealWithBigScreenNeedImageHorizontalEmptySpaceBase20";
import NotificationDiaryStickyHeaderComponent from "../../../components/notificationDiary/NotificationDiaryStickyHeaderComponent";
import { useNavigation } from "@react-navigation/core";

type NotificationDiaryProps = {
  youtubeMusicShow: boolean;
  switchYoutubeMusicShow: () => void;
  isNowMusicPlaying: boolean;
  setIsNowMusicPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  data: seeNotifiedMyDiary | undefined;
  loading: boolean;
};

type NavigationProps = NativeStackNavigationProp<UploadDiaryTabStackParamsList,"NotificationDiary">;

// Diary 랑 똑같고 title 이랑 createdAt 을 더 받음.

const NotificationDiary = ({
  youtubeMusicShow,
  switchYoutubeMusicShow,
  isNowMusicPlaying,
  setIsNowMusicPlaying,
  data,
  loading,
}: NotificationDiaryProps) => {

  const navigation = useNavigation<NavigationProps>();

  useEffect(()=>{
    if(data){
      const diaryInfo = data.seeNotifiedMyDiary;
      navigation.setOptions({
        title:diaryInfo?.diary?.title,
      });
    }
  },[data]);

  // // NotificationDiaryDrawerNav 안써서 얘는 여기
  // // 만약 쓸거면 여기부터 아래는 MyDiaryDrawerNav 참고해서 빼가지고 넣으면 됨
  // const [isNowMusicPlaying,setIsNowMusicPlaying] = useState(false);  // 음악 재생

  // const [youtubeMusicShow, setYoutubeMusicShow] = useState(true);  //유튜브 영상 보이게 할지. 얘도 저장해야겠네

  // const switchYoutubeMusicShow = () => {
  //   // let prevShow;
  //   setYoutubeMusicShow((prev)=>{
  //     // 원래 async 들어가야 하는데 setState 는 안됨. 상관 없겠지?
  //     prev ? AsyncStorage.removeItem(YOUTUBE_MUSIC_SHOW) : AsyncStorage.setItem(YOUTUBE_MUSIC_SHOW,"ok");
  //     return !prev;
  //   });
  // };

  // const setFirstAutoPlay = async() => {
  //   const getStoredSetting = Boolean(await AsyncStorage.getItem(MUSIC_AUTO_PLAY));
  //   setIsNowMusicPlaying(getStoredSetting);
  // };

  // const setFirstYoutubeMusicShowSetting = async() => {
  //   const getStoredSetting = Boolean(await AsyncStorage.getItem(YOUTUBE_MUSIC_SHOW));
  //   setYoutubeMusicShow(getStoredSetting);
  // };

  // useEffect(()=>{
  //   setFirstAutoPlay();
  //   setFirstYoutubeMusicShowSetting();
  // },[]);

  
  // 이건 동영상 위한건데 지금은 동영상을 안씀. 얘는 MyDiary 에 있음.
  const isMusicPlayingBeforeVideoPlay = useRef(false);
  const [videoPlayingState,setVideoPlayingState] = useState<{[key:string]:boolean}>({});

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
  // 여기까지

  
  const {backgroundColor} = useColorsChangedByDarkMode();

  const {imageWidth} = useGetWidthDealWithBigScreenNeedImageHorizontalEmptySpaceBase20();

  if(loading) {
    return <DiaryLoading/>;
  }

  // 에러인 경우도 생성해야함

  const sortedData = data && data.seeNotifiedMyDiary?.diary?.body.map((bodyString:string,index:number) => ({body:bodyString,file:data.seeNotifiedMyDiary?.diary?.file[index]}));


  const renderItem:ListRenderItem<{body?:string,file?:string}> = ({item,index}) => {
    const file = item.file;
    const body = item.body;
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
          fileWidth={imageWidth}
          isNowMusicPlaying={isNowMusicPlaying}
          setIsNowMusicPlaying={setIsNowMusicPlaying}
          videoPlayingState={videoPlayingState}
          setVideoPlayingState={setVideoPlayingState}
          isMusicPlayingBeforeVideoPlay={isMusicPlayingBeforeVideoPlay}
        />}
      </React.Fragment>
    );
  };

  return (
    <UploadHorizontalEmptyLayoutForBigScreenNeedScreenWidth>
      <FlatList
        style={{
          flex: 1,
          backgroundColor,
          padding: 10,
          paddingTop: 0,
        }}
          data={sortedData}
          renderItem={renderItem}
          keyExtractor={(item,index)=>index+""}
          ListHeaderComponent={<NotificationDiaryStickyHeaderComponent
            dateTime={data?.seeNotifiedMyDiary?.diary?.dateTime}
            youtubeId={data?.seeNotifiedMyDiary?.diary?.youtubeId}
            isNowMusicPlaying={isNowMusicPlaying}
            setIsNowMusicPlaying={setIsNowMusicPlaying}
            youtubeMusicShow={youtubeMusicShow}
            switchYoutubeMusicShow={switchYoutubeMusicShow}
          />}
      />
    </UploadHorizontalEmptyLayoutForBigScreenNeedScreenWidth>
  );
};

export default NotificationDiary;