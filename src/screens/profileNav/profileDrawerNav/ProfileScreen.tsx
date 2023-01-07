import AsyncStorage from "@react-native-async-storage/async-storage";
import { CompositeScreenProps } from "@react-navigation/core";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useMemo, useState } from "react";
import FastImage from "react-native-fast-image";
import styled from "styled-components/native";
import SafeAreaContainer from "../../../components/upload/SafeAreaContainer";
import useMe from "../../../hooks/useMe";
import { colors } from "../../../js-assets/color";
import { noUserUri } from "../../../localImage/preloadLocalImageAndSetReactiveVar";
import quote from "../../../quote/quoteConstants";
import { FontAppliedBaseTextNeedFontSize } from "../../../styled-components/FontAppliedComponents";
import { ProfileDrawerNavParamsList, ProfileListTabStackParamsList } from "../../../types/navigation/homeNavStackParamsList";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { feelingNameArr, youtubeArrByFeeling, youtubeType } from "../../../recommend/youtubeRecommendByFeeling/youtubeRecommendByFeeling";
import getYoutubeMetaData from "../../../logic/profileScreen/getYoutubeMetaData";
import HorizontalMusicFlatList from "../../../components/profileNav/profileScreen/HorizontalMusicFlatList";
import YoutubeWithCloseBtn from "../../../components/profileNav/profileScreen/YoutubeWithCloseBtn";
import MusicFlatListWithLoadingError from "../../../components/profileNav/profileScreen/MusicFlatListWithLoadingError";
import useBackgroundColorAndTextColor from "../../../hooks/useBackgroundColorAndTextColor";


// const PaddingContainer = styled.View`
const PaddingScrollView = styled.ScrollView`
  padding: 0px 10px;
  /* padding-bottom 이 들어가면 아래가 짤림. 왜지? */
  flex: 1;
`;
const ProfileContainer = styled.View`
  flex-direction: row;
  margin: 10px 20px;
`;
const UserInfo = styled.View`
  margin-left: 20px;
  /* margin-right: 20px; */
  justify-content: center;
  /* background-color: red; */
`;
const UserNameText = styled(FontAppliedBaseTextNeedFontSize)`
  /* font-size: 15px; */
`;
const EmptyView = styled.View`
  height: 20px;
`;
const SectionTitle = styled(FontAppliedBaseTextNeedFontSize)`
  margin-left: 10px;
  /* font-size: 17px; */
`;
const RecommendTitleView = styled.View`
  margin-left: 10px;
  flex-direction: row;
`;
const TouchableRecommend = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;
const RecommendTitle = styled(FontAppliedBaseTextNeedFontSize)`
  /* font-size: 17px; */
  /* color: ${colors.brown}; */
  text-decoration-line: underline;
`;
const MusicFlatListContainer = styled.View`
  height: 160px;
`;
const QuoteText = styled(FontAppliedBaseTextNeedFontSize)`
  padding: 0px 10px 10px 10px;
`;

type ProfileScreenType = CompositeScreenProps<
NativeStackScreenProps<ProfileDrawerNavParamsList, "ProfileScreen">,NativeStackScreenProps<ProfileListTabStackParamsList,"ProfileDrawerNav">>;

const ProfileScreen = ({navigation,route}: ProfileScreenType) => {

  const {data:meData} = useMe();

  const [showQuote,setShowQuote] = useState("");
  
  useEffect(()=>{
    const getQuote = async() => {
      const getPrevIndexArr = await AsyncStorage.getItem(quote.QUOTE_INDEX_ARR);
      // null 은 지정을 안한거고 [] 는 안쓰는거. 안쓰는 경우도 넣을까? 아님 하나 이상 선택하도록?
      const prevIndexArr: number[] = getPrevIndexArr ? JSON.parse(getPrevIndexArr) : quote.indexArr;

      if(prevIndexArr.length === 0) return;

      const randomNumber = Math.floor(Math.random() * prevIndexArr.length);
      const randomIndex = prevIndexArr[randomNumber];
      const isSelfQuote = randomIndex === quote.allNameArrLength-1;

      let randomQuote: string[];
      if(isSelfQuote) {
        const getSelfQuote = await AsyncStorage.getItem(quote.QUOTE_USER_INPUT_ARR);

        if(!getSelfQuote) return;

        randomQuote = JSON.parse(getSelfQuote);
      } else {
        randomQuote = quote.allArr[randomIndex];
      }
      
      const randomQuoteNumber = Math.floor(Math.random() * randomQuote.length);
      const newQuote = randomQuote[randomQuoteNumber];
      
      setShowQuote(newQuote);
    };

    getQuote();
  },[]);

  const [recommendText,setRecommendText] = useState(getRandomFeeling());
  const onPressRecommend = () => navigation.navigate("FeelChange",{
    feeling: recommendText
  });

  useEffect(()=>{
    console.log("route.params : " + JSON.stringify(route.params));
    // console.log("route.params?.newQuote : "+ route.params?.newQuote)
    const newQuote = route.params?.newQuote;
    // 안보이게 할 경우 "" 를 보내도록 만듦
    if(newQuote || newQuote === "") {
      setShowQuote(newQuote);
    }
    const newFeeling = route.params?.newFeeling;
    if(newFeeling) {
      setRecommendText(newFeeling);
    }
  },[route]);

  const recommendYoutubeByFeelingArr = useMemo(()=>getYoutubeArrByFeeling(recommendText),[recommendText]);

  const me = meData?.me;
  const userName = me?.userName;
  const avatar = me?.avatar ?? noUserUri;
  const totalDiary = me?.totalDiary ?? 0;
  const thisMonthData = me?.thisMonthData;
  const thisMonthDiaryNumber = thisMonthData?.length ?? 0;
  const prevYtIdArr = me?.prevYtIdArr;

  // const slicedUserName = (userName && userName?.length > 14) ? 

  const [getPrevYtLoading,setGetPrevYtLoading] = useState(false);
  const [prevYtMusicArr,setPrevYtMusicArr] = useState<youtubeType[]|string>();

  useEffect(()=>{
    // console.log("meData")
    console.log("prevYtIdArr")
    const getPrevYtMusicArr = async(ytIdArr:string[]) => {
      setGetPrevYtLoading(true);
      const result = await getYoutubeMetaData(ytIdArr);
      // if(typeof result === "object") {
      //   setPrevYtMusicArr(result);
      //   // 로컬에 썸네일 저장
      // }
      //  else {
        // 로컬에 썸네일 저장돼 있는걸 가져와.
      // }
      setPrevYtMusicArr(result);
      setGetPrevYtLoading(false);
    };

    if(prevYtIdArr) {
      getPrevYtMusicArr(prevYtIdArr);
    }
  // },[meData]);
  },[prevYtIdArr]); // 이래도 되나?

  // const recommendYtId = useRef("");
  const [recommendYtId,setRecommendYtId] = useState("");
  const [recommendYtShow,setRecommendYtShow] = useState(false);
  // const [recommendYtPlay,setRecommendYtPlay] = useState(false);
  const onPressRecommendYt = (youtubeId:string) => {
    setRecommendYtId(youtubeId);
    setRecommendYtShow(true);
  };
  // const prevYtId = useRef("");
  const [prevYtId,setPrevYtId] = useState("");
  const [prevYtShow,setPrevYtShow] = useState(false);
  // const [prevYtPlay,setPrevYtPlay] = useState(false);
  const onPressPrevYt = (youtubeId:string) => {
    console.log("onPressPrevYt")
    console.log("youtubeId : "+youtubeId)
    setPrevYtId(youtubeId);
    setPrevYtShow(true);
  };

  const {textColor} = useBackgroundColorAndTextColor();

  // const getThisWeekDiaryNumber = () => {
  //   // 근데 이번주를 구할라면 저번 달 데이터도 받아야 함. 1일인데 금요일 이러면은.
  // };

  // ScrollView 넣으먄 flex 안맞아질텐데 흠. showQuote 때문에 넣긴 해야 할듯?
  return (
    <SafeAreaContainer>
      <PaddingScrollView
        showsVerticalScrollIndicator={false}
        // ios 위아래 더 멀리 안움직이는거
        bounces={false}
        // android 위아래 더 멀리 안움직이는거
        overScrollMode={'never'}
      >
        <ProfileContainer>
          <FastImage
            style={{
              width: 70,
              height: 70,
              borderRadius: 50,
            }}
            source={{
              uri: avatar,
            }}
          />
          <UserInfo>
            <UserNameText
              fontSize={15}
              numberOfLines={1}
              // ellipsizeMode="tail"
            >
              {userName} 님
            </UserNameText>
            <FontAppliedBaseTextNeedFontSize>
              {`총 일기 ${totalDiary}`}
            </FontAppliedBaseTextNeedFontSize>
            <FontAppliedBaseTextNeedFontSize>
              {`이번 달 일기 ${thisMonthDiaryNumber}`}
            </FontAppliedBaseTextNeedFontSize>
          </UserInfo>
        </ProfileContainer>
        
        <RecommendTitleView>
          <TouchableRecommend onPress={onPressRecommend}>
            <MaterialCommunityIcons name="menu-swap-outline" size={20} color={textColor} />
            <RecommendTitle fontSize={17}>
              {recommendText}
            </RecommendTitle>
          </TouchableRecommend>
          {/* <SectionTitle>
            좋은 음악
          </SectionTitle> */}
        </RecommendTitleView>
        <HorizontalMusicFlatList
          data={recommendYoutubeByFeelingArr}
          onPressItem={onPressRecommendYt}
        />

        {recommendYtId && <YoutubeWithCloseBtn
          videoId={recommendYtId}
          youtubeShow={recommendYtShow}
          setYoutubeShow={setRecommendYtShow}
        />}

        {/* <SectionTitle>
          추천 음악
        </SectionTitle>
        <RecommendMusic/> */}

        {/* {prevYtIdArr && 
          <> */}
            <EmptyView/>
            <SectionTitle fontSize={17}>
              과거 나의 음악
            </SectionTitle>
            <MusicFlatListContainer>
              <MusicFlatListWithLoadingError
                data={prevYtMusicArr}
                onPressItem={onPressPrevYt}
                loading={getPrevYtLoading}
              />
            </MusicFlatListContainer>
          {/* </>
        } */}

        {prevYtId && <YoutubeWithCloseBtn
          videoId={prevYtId}
          youtubeShow={prevYtShow}
          setYoutubeShow={setPrevYtShow}
        />}
        
        {showQuote && 
          <>
            <EmptyView/>
            <SectionTitle fontSize={17}>
              오늘의 문구
            </SectionTitle>
            <QuoteText>
              {showQuote}
            </QuoteText>
          </>
        }
      </PaddingScrollView>
    </SafeAreaContainer>
  )
};

export default ProfileScreen;



const getRandomFeeling = () => {
  console.log("getRandomFeeling")
  const randomNumber = Math.floor(Math.random() * feelingNameArr.length);
  return feelingNameArr[randomNumber];
};

const shuffleArrayList = (array:Array<any>) => {
  const newArr = [...array];
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

const getYoutubeArrByFeeling = (feeling:string) => {
  const youtubeArr = youtubeArrByFeeling[feeling];
  return shuffleArrayList(youtubeArr);
};