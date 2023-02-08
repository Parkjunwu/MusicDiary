import { NativeStackScreenProps } from "@react-navigation/native-stack";
// import moment from "moment";
import momentSeoulTZ from "../../logic/momentSeoul/momentSeoulTZ";
import { useCallback, useEffect, useState } from "react";
// import YoutubeIframe from "react-native-youtube-iframe";
import styled from "styled-components/native";
// import BaseContainer from "../../components/shared/BaseContainer";
import { UploadDiaryTabStackParamsList } from "../../types/navigation/homeNavStackParamsList";
import Ionicons from "react-native-vector-icons/Ionicons";
import { FontAppliedBaseTextNeedFontSize, FontAppliedBoldTextNeedFontSize } from "../../styled-components/FontAppliedComponents";
import BaseYoutubePlayer from "../../components/youtubeRelated/BaseYoutubePlayer";
import useGetYoutubePlayerHeight from "../../hooks/useGetYoutubePlayerHeight";
import UploadHorizontalEmptyLayoutForBigScreenNeedScreenWidth from "../../components/upload/UploadHorizontalEmptyLayoutForBigScreenNeedScreenWidth";

const Wrapper = styled.View`
  /* flex: 2; */
  padding: 0px 15px;
`;
// const Title = styled.Text`
//   font-size: 16px;
//   padding-top: 10px;
//   padding-bottom: 10px;
//   font-weight: bold;
//   color: ${props=>props.theme.textColor};
// `;
const Title = styled(FontAppliedBoldTextNeedFontSize)`
  /* font-size: 17px; */
  padding-top: 10px;
  padding-bottom: 10px;
`;
const Details = styled.View`
  /* flex: 2; */
  flex-direction: row;
  padding-top: 25px;
`;
const Channel = styled.View`
  flex: 1;
`;
// const TextLeft = styled.Text`
//   color: ${props=>props.theme.textColor};
// `;
const TextLeft = styled(FontAppliedBaseTextNeedFontSize)`
  
`;
// const TextRight = styled.Text`
//   text-align: right;
//   color: ${props=>props.theme.textColor};
// `;
const TextRight = styled(FontAppliedBaseTextNeedFontSize)`
  text-align: right;
`;

const SelectThisVideoBtn = styled.TouchableOpacity`
  margin-left: 5px;
`;
// const SelectThisVideoBtnText = styled.Text`
//   color: ${props=>props.theme.textColor};
// `;
const SelectThisVideoBtnText = styled(FontAppliedBaseTextNeedFontSize)`
  /* font-size: 15px; */
`;

// type WatchYoutubeProps = {
//   title: string;
//   vId: string;
//   published: string;
//   channelTitle: string;
//   selectThisVideo: () => void;
// };

type WatchYoutubeProps = NativeStackScreenProps<UploadDiaryTabStackParamsList,"WatchYoutube">;
// type WatchYoutubeProps = CompositeScreenProps<
//   DrawerScreenProps<MyDiaryDrawerNavParamsList,"WatchYoutube">,
//   NativeStackScreenProps<UploadDiaryTabStackParamsList,"WatchYoutube">
// >;
// type WatchYoutubeProps = DrawerScreenProps<MyDiaryDrawerNavParamsList>;

const WatchYoutube = ({navigation,route}:WatchYoutubeProps) => {

  const {
    params: {
      title,
      vId,
      published,
      channelTitle,
      selectThisVideo,
      // diaryId,
    }
  } = route;

  const routeGoBack = () => {
    // MyDiaryNav 에 컴포넌트 놓을 경우. 지금은 SharedStack 으로 옮겨서 잘 됨. 근데 warn 뜸. 만약 다시 MyDiaryNav 로 옮기면 diaryId 받아야함. Result, VideoItem, 여기 diaryId 넣어야함.
    // MyDiaryNav 에서 온 애는 goBack 하면 MyDiary 로 감..
    // diaryId ?
    //     navigation.jumpTo("ChangeYoutubeSong",{
    //       routeFrom:"MyDiary",
    //       diaryId,
    //     })
    //   :
    navigation.goBack();
  };

  const onPressSelect = () => {
    selectThisVideo && selectThisVideo();
    routeGoBack();
  };

  useEffect(()=>{
    navigation.setOptions({
      headerLeft:({tintColor})=><SelectThisVideoBtn onPress={routeGoBack}>
        <Ionicons name="chevron-back" size={24} color={tintColor} />
      </SelectThisVideoBtn>,
      ...(selectThisVideo && {
        headerRight:()=><SelectThisVideoBtn onPress={onPressSelect}>
          <SelectThisVideoBtnText fontSize={15}>선택</SelectThisVideoBtnText>
        </SelectThisVideoBtn>,
      }),
    });
  },[]);

  const [play,setPlay] = useState(false);
  const onChangeState = useCallback((state:string) => {
    // console.log(state)
    if(state === "playing" || state === "buffering") {
      setPlay(true);
    } else if(state === "paused") {
      setPlay(false);
    } else if (state === "ended") {
      setPlay(false);
    }
  }, []);

  const convertedPublished = momentSeoulTZ(published).fromNow();

  const youtubePlayerHeight = useGetYoutubePlayerHeight();

  return (
    // <BaseContainer>
    <UploadHorizontalEmptyLayoutForBigScreenNeedScreenWidth>
      {/* <YoutubeIframe */}
      <BaseYoutubePlayer
        // height={240}
        height={youtubePlayerHeight+20}
        videoId={vId}
        play={play}
        onChangeState={onChangeState}
      />
      <Wrapper>
        <Title
          fontSize={17}
        >{title}</Title>
        <Details>
          {/* UploadDiary 에는 videoId title 밖에 없어서 조건으로 */}
          {channelTitle && <Channel>
            <TextLeft>{channelTitle}</TextLeft>
          </Channel>}
          {published && <Channel>
            <TextRight>{convertedPublished}</TextRight>
          </Channel>}
        </Details>
      </Wrapper>
    {/* </BaseContainer> */}
    </UploadHorizontalEmptyLayoutForBigScreenNeedScreenWidth>
  )
};

export default WatchYoutube;