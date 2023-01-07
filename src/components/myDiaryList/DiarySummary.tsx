import { useNavigation } from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import styled from "styled-components/native";
// import { logoUriVar } from "../../apollo";
// import getFormatTime from "../../logic/getFormatTime";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import useIsDarkMode from "../../hooks/useIsDarkMode";
// import { getMyDiaryList_getMyDiaryList_diaries } from "../../__generated__/getMyDiaryList";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MyDiaryListTabStackParamsList } from "../../types/navigation/homeNavStackParamsList";
import dateTimeToFormatTime from "../../logic/dateTimeToFormatTime";
import { FontAppliedBaseTextNeedFontSize } from "../../styled-components/FontAppliedComponents";
import { logoUri } from "../../localImage/preloadLocalImageAndSetReactiveVar";
import { fromWhereType } from "../../apollo";

const Container = styled.View`
  margin-left: 10px;
  margin-right: 10px;
  padding-top: 10px;
  padding-bottom: 7px;
  border-bottom-color: grey;
  border-bottom-width: 1px;
`;
const MarginHorizontalContainer = styled.TouchableOpacity`
  flex-direction: row;
`;
const LeftContainer = styled.View`

`;
const RightContainer = styled.View`
  flex: 1;
  /* margin-left: 3px; */
`;
const TitleText = styled(FontAppliedBaseTextNeedFontSize)`
  font-weight: 400;
  /* margin-bottom 으로 주니까 글자가 짤림. padding-bottom 로 줘야함 */
  /* margin-bottom: 3px; */
  padding-bottom: 5px;
  /* margin-left: 3px; */
  margin-right: 8px;
`;
const SummaryBodyText = styled(FontAppliedBaseTextNeedFontSize)`
  font-weight: 100;
  /* margin-bottom 으로 주니까 글자가 짤림. padding-bottom 로 줘야함 */
  /* margin-bottom: 3px; */
  padding-bottom: 5px;
  margin-left: 3px;
  margin-right: 10px;
`;
const TimeText = styled(FontAppliedBaseTextNeedFontSize)`
  /* font-size: 12px; */
  /* 얅게 쓸라고 추가함 */
  font-weight: 100;
  /* margin-left: 5px; */
`;

type DiarySummaryProps = {
  id: number;
  title: string;
  thumbNail?: string | null;
  dateTime: number;
  summaryBody?: string | null;
  setFromWhere:() => fromWhereType;
};

// const DiarySummary = ({id,thumbNail,title,createdAt}:getMyDiaryList_getMyDiaryList_diaries) => {
const DiarySummary = ({
  id,
  thumbNail,
  title,
  dateTime,
  summaryBody,
  setFromWhere,
}: DiarySummaryProps) => {

  const navigation = useNavigation<NativeStackNavigationProp<MyDiaryListTabStackParamsList, "MyDiaryList">>();

  // const formatTime = getFormatTime(createdAt);
  const { diaryYear, diaryMonth, diaryDate } = dateTimeToFormatTime(dateTime);

  const formatTime = `${diaryYear}년 ${diaryMonth}월 ${diaryDate}일`

  const onPressSingleDiary = () => {
    setFromWhere();
    navigation.navigate("MyDiaryDrawerNav",{
      screen: 'MyDiary1',
      params:{
        id,
        title,
        createdAt:formatTime,
      }
    });
  };

  // const uri = thumbNail ?? logoUriVar();
  const uri = thumbNail ?? logoUri;
  // console.log(uri)

  return (
    <Container>
      <MarginHorizontalContainer onPress={onPressSingleDiary}>
        <LeftContainer>
          <FastImage
            style={{
              width: 60,
              height: 60,
              marginRight: 10,
            }}
            source={{
              // uri : thumbNail ?? logoUriVar()
              uri
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </LeftContainer>
        <RightContainer>
          <TitleText ellipsizeMode='tail' numberOfLines={1}>
            {title}
          </TitleText>
          
          {/* <UserContainer>
            <FastImage
              style={{
                width: 15,
                height: 15,
                borderRadius: 20,
                marginRight: 5,
              }}
              source={
                {uri : user.avatar ?? noUserUriVar()}
                {uri : user.avatar ?? noUserUri}
              }
              resizeMode={FastImage.resizeMode.cover}
            />
            <UserNameText>
              {user.userName}
            </UserNameText>
          </UserContainer>
          <PopularityContainer>
            <Ionicons name="heart" color="tomato" size={13}/>
            <NumberText>{likes}</NumberText>
            <Ionicons name="chatbubble-outline" color={isDarkMode ? "white" : "black"} size={13}/>
            <NumberText>{commentNumber}</NumberText>
          </PopularityContainer> */}
          <SummaryBodyText fontSize={12} ellipsizeMode='tail' numberOfLines={1}>
            {summaryBody}
          </SummaryBodyText>
          <TimeText fontSize={12}>
            {formatTime}
          </TimeText>
        </RightContainer>
      </MarginHorizontalContainer>
    </Container>
  );
};

export default DiarySummary;