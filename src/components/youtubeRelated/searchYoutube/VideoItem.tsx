import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import moment from "moment";
import momentSeoulTZ from "../../../logic/momentSeoul/momentSeoulTZ";
import { TouchableHighlight, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import styled from "styled-components/native";
import { colors } from "../../../js-assets/color";
import { FontAppliedBaseTextNeedFontSize, FontAppliedLightTextNeedFontSize } from "../../../styled-components/FontAppliedComponents";
import { UploadDiaryTabStackParamsList } from "../../../types/navigation/homeNavStackParamsList";

// styledComponent 조건 넣으면 FlatList 가 이상하게 렌더링됨.
// const Container = styled.TouchableHighlight<{isSelected:boolean}>`
//   padding: 10px;
//   flex: 2;
//   background-color: ${props=>props.isSelected ? colors.yellow : "white"};
//   margin-top: 10px;
// `;
const Wrapper = styled.View`
  flex: 2;
  padding-left: 5px;
  padding-right: 5px;
`;
// const Title = styled.Text`
//   font-size: 16px;
//   padding-top: 10px;
//   padding-bottom: 10px;
//   font-weight: bold;
// `;
// 얜 또 되네? View 같은 애들만 이상해지나봄
const Title = styled(FontAppliedBaseTextNeedFontSize)<{isSelected:boolean}>`
  /* font-size: 15px; */
  padding-top: 10px;
  padding-bottom: 10px;
  /* font-weight: bold; */
  color: ${props=>props.isSelected ? "black" : props.theme.textColor};
`;
const Details = styled.View`
  flex: 2;
  flex-direction: row;
  padding-top: 5px;
`;
const DivideView = styled.View`
  flex: 1;
`;
// const TextRight = styled.Text`
//   text-align: right;
// `;
const ChannelTitle = styled(FontAppliedBaseTextNeedFontSize)<{isSelected:boolean}>`
  /* font-size: 13px; */
  color: ${props=>props.isSelected ? "black" : props.theme.textColor};
`;
const TextRight = styled(FontAppliedLightTextNeedFontSize)<{isSelected:boolean}>`
  text-align: right;
  /* font-size: 13px; */
  color: ${props=>props.isSelected ? "black" : props.theme.textColor};
`;

type VideoItemProps = {
  title: string,
  image: string,
  vId: string,
  published: string,
  channelTitle: string,
  index: number,
  setYoutubeId: React.Dispatch<React.SetStateAction<string | undefined>>,
  selectedIndex: React.MutableRefObject<number | undefined>,
  youtubeTitle: React.MutableRefObject<string | undefined>,
  // diaryId?: number,
  // 없으면 누를때 까맣게됨
  backgroundColor: string,
};

const VideoItem = ({
  title,
  image,
  vId,
  published,
  channelTitle,
  index,
  setYoutubeId,
  selectedIndex,
  youtubeTitle,
  // diaryId,
  backgroundColor,
}:VideoItemProps) => {

  const convertedPublished = momentSeoulTZ(published).fromNow();

  const navigation = useNavigation<NativeStackNavigationProp<UploadDiaryTabStackParamsList>>();

  // const _animated = useRef(new Animated.Value(0)).current;
  // const _animatedPos = useRef(new Animated.Value(250)).current;

  // useEffect(()=>{
  //   Animated.timing(_animated, {
  //     toValue: 1,
  //     duration: 800,
  //     useNativeDriver: false,
  //   }).start();

  //   Animated.timing(_animatedPos, {
  //     toValue: 0,
  //     duration: 600,
  //     easing: Easing.inOut(Easing.quad),
  //     useNativeDriver: false,
  //   }).start();
  // },[]);

  const notSelectThisVideo = () => {
    youtubeTitle.current = undefined;
    setYoutubeId(undefined);
    selectedIndex.current = undefined;
  };

  const selectThisVideo = () => {
    youtubeTitle.current = title;
    setYoutubeId(vId);
    selectedIndex.current = index;
  };

  const onPressImage = () => navigation.navigate("WatchYoutube",{
    title,
    vId,
    published,
    channelTitle,
    selectThisVideo,
    // MyDiary 에서는 goBack 이 안되서 얘로 jumpTo 씀
    // diaryId,
  });

  const onPressItem = () => {
    // if(selectedIndex.current === index) {
    //   youtubeTitle.current = undefined;
    //   setYoutubeId(undefined);
    //   selectedIndex.current = undefined;
    // } else {
    //   youtubeTitle.current = title;
    //   setYoutubeId(vId);
    //   selectedIndex.current = index;
    // }
    selectedIndex.current === index ? notSelectThisVideo() : selectThisVideo();
  };

  const isSelected = selectedIndex.current === index;

  return (
    <TouchableHighlight onPress={onPressItem}>
      {/* <Animated.View
        style={{
          opacity: _animated,
          transform:[{
            translateY: _animatedPos
          }]
        }}
      > */}
        {/* styledComponent 조건 넣으면 FlatList 가 이상하게 렌더링됨.
        <Container
          isSelected={selectedIndex.current === index}
        > */}
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 20,
            flex: 2,
            borderBottomColor: "rgba(200,200,200,0.4)",
            borderBottomWidth: 2,
            backgroundColor: selectedIndex.current === index ? colors.yellow : backgroundColor,
            // ...(selectedIndex.current === index && {backgroundColor: colors.yellow}),
          }}
        >
          <TouchableOpacity onPress={onPressImage}>
            <FastImage
              style={{
                height: 200,
                flex: 1,
                // backgroundColor:'#666666',
              }}
              source={{ uri: image }}
              resizeMode={'cover'}
            />
          </TouchableOpacity>
          <Wrapper>
            {/* 여긴 되네? */}
            <Title
              fontSize={15}
              isSelected={isSelected}
            >{title}</Title>
            <Details>
              <DivideView>
                <ChannelTitle
                  fontSize={13}
                  isSelected={isSelected}
                >{channelTitle}</ChannelTitle>
              </DivideView>
              <DivideView>
                <TextRight
                  fontSize={13}
                  isSelected={isSelected}
                >{convertedPublished}</TextRight>
              </DivideView>
            </Details>
          </Wrapper>
          
        </View>
        {/* </Container> */}
      {/* </Animated.View> */}
    </TouchableHighlight>
  );
};



export default VideoItem;