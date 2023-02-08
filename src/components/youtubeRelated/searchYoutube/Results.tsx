import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useRef, useState } from "react";
import { FlatList, TouchableOpacity, Alert } from "react-native";
import fetchSearch from "../../../logic/upload/searchYoutube/fetchSearch";
import { UploadDiaryTabStackParamsList } from "../../../types/navigation/homeNavStackParamsList";
import VideoItem from "./VideoItem";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ResultsProps } from "./resultsType";
import getUnknownErrorThenAlert from "../../../logic/getUnknownErrorThenAlert";
import { FontAppliedBaseTextNeedFontSize } from "../../../styled-components/FontAppliedComponents";
import styled from "styled-components/native";
import useBackgroundColorAndTextColor from "../../../hooks/useBackgroundColorAndTextColor";
import useGetYoutubePlayerHeight from "../../../hooks/useGetYoutubePlayerHeight";

const SelectText = styled(FontAppliedBaseTextNeedFontSize)<{youtubeId:string|undefined}>`
  opacity: ${props=>props.youtubeId ? 1 : 0.5};
`;

const Results = ({
  searchData,
  setSearchData,
  nowSearchingKeyword,
  pageToken,
  diaryId,
  onFinishSelection,
}: ResultsProps) => {

  const navigation = useNavigation<NativeStackNavigationProp<UploadDiaryTabStackParamsList>>();

  // 얜 렌더링 관련 없어서 ref 로
  // const [selectedIndex,setSelectedIndex] = useState<number|undefined>(undefined);
  const selectedIndex = useRef<number|undefined>(undefined);
  const [youtubeId,setYoutubeId] = useState<string|undefined>(undefined);
  const youtubeTitle = useRef<string|undefined>(undefined);

  const onPressSelectYoutube = async () => {
    if(youtubeId === undefined) {
      Alert.alert("선택된 음악이 없습니다.");
    } else {
      // // UploadDiary 에 받는 것도 만들어야함
      // navigation.navigate("UploadDiary",{
      //   youtubeId,
      //   youtubeTitle: youtubeTitle.current,
      // });
      // 타입 체크 하기위해.
      if(!youtubeTitle.current) {
        console.error("youtubeId 있는데 youtubeTitle.current 가 없음. 코드 확인");
        return Alert.alert("알 수 없는 에러입니다.","지속적으로 같은 문제가 발생 시 문의주시면 감사드리겠습니다.");
      }

      const result = await onFinishSelection({
        diaryId,
        youtubeId,
        youtubeTitle: youtubeTitle.current,
      });

      console.log("result")
      console.log(result)

      return result ? Alert.alert("음악이 변경되었습니다.") : getUnknownErrorThenAlert();
    }
  };

  const onPressGoBack = () => {
    if(youtubeId === undefined) return navigation.goBack();
  
    Alert.alert(
      "선택된 음악이 있습니다.",
      "음악 선택을 취소하시겠습니까?",
      [
        {
          text:"확인",
          onPress:()=>navigation.goBack(),
        },
        {
          text:"취소",
          style:"cancel",
        },
      ],
    );
  };

  useEffect(()=>{
    navigation.setOptions({
      headerLeft:({tintColor})=><TouchableOpacity
          onPress={onPressGoBack}
        >
          <Ionicons name="chevron-back" size={24} color={tintColor} />
        </TouchableOpacity>,
      headerRight:()=><TouchableOpacity
          onPress={onPressSelectYoutube}
          disabled={!youtubeId}
        >
          <SelectText youtubeId={youtubeId} >선택</SelectText>
        </TouchableOpacity>,
    })
  // 의존성 꼭 확인. youtubeTitle 도 넣어야 되나? 같이 바뀔라나?
  },[youtubeId]);

  const fetchMore = () => fetchSearch({
    searchKeyword: nowSearchingKeyword,
    setSearchData,
    pageToken,
    fetchState: "fetchMore",
  });
    
  const { backgroundColor } = useBackgroundColorAndTextColor();

  const paddingHorizontal = 10;
  const thumbNailHeight = useGetYoutubePlayerHeight(paddingHorizontal*2);

  return (
    // <View style={styles.container}>
      <FlatList
        data={searchData}
        renderItem={({item,index}) => {
          return (
            <VideoItem
              // key={item.key}
              // title={item.snippet.title}
              // image={item.snippet.thumbnails.high.url}
              // vId={item.id.videoId}
              // published={item.snippet.publishedAt}
              // channelTitle={item.snippet.channelTitle}
              key={index}
              title={item.title}
              image={item.image}
              vId={item.vId}
              published={item.published}
              channelTitle={item.channelTitle}
              index={index}
              setYoutubeId={setYoutubeId}
              selectedIndex={selectedIndex}
              youtubeTitle={youtubeTitle}
              // setSelectedIndex={setSelectedIndex}
              // diaryId={diaryId}
              backgroundColor={backgroundColor}
              paddingHorizontal={paddingHorizontal}
              thumbNailHeight={thumbNailHeight}
            />
          )
        }}
        onEndReached={fetchMore}
        style={{
          flex: 1,
        }}
      />
    // {/* </View> */}
  );
};

// const styles = StyleSheet.create({
//   container: {
//     // backgroundColor:'#ebeef0',
//     flex:1
//   },
//   item: {
//     padding: 10,
//     fontSize: 18,
//     flex: 1,
//   },
// })

export default Results;