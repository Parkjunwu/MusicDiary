import { useNavigation } from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import styled from "styled-components/native";
import getFormatTime from "../../logic/getFormatTime";
import { seeNewBoardList_seeNewBoardList_boards } from "../../__generated__/seeNewBoardList";
import Ionicons from "react-native-vector-icons/Ionicons";
import useIsDarkMode from "../../hooks/useIsDarkMode";
import { BoardTabStackParamsList } from "../../types/navigation/homeNavStackParamsList";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { logoUri, noUserUri } from "../../localImage/preloadLocalImageAndSetReactiveVar"
import { FontAppliedBaseTextLittlePaddingNeedFontSize, FontAppliedBoldTextLittlePaddingNeedFontSize } from "../../styled-components/FontAppliedComponents";

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
`;
// const TitleText = styled.Text`
//   font-weight: bold;
//   color: ${props=>props.theme.textColor};
const TitleText = styled(FontAppliedBoldTextLittlePaddingNeedFontSize)`
  /* margin-bottom: 3px; */
  margin-left: 3px;
`;
const UserContainer = styled.View`
  flex-direction: row;
  /* center 가 더 안맞는거 같네 */
  align-items: center;
  /* margin-bottom: 1px; */
`;
// const UserNameText = styled.Text`
//   color: ${props=>props.theme.textColor};
//   font-size: 12px;
const UserNameText = styled(FontAppliedBaseTextLittlePaddingNeedFontSize)`
  /* margin-bottom: 3px; */
  margin-left: 3px;
`;
// const TimeText = styled.Text`
//   color: ${props=>props.theme.textColor};
//   font-size: 12px;
// `;
const TimeText = styled(FontAppliedBaseTextLittlePaddingNeedFontSize)``;
const PopularityContainer = styled.View`
  flex-direction: row;
  align-items: center;
  /* margin-bottom: 1px; */
`;
// const NumberText = styled.Text`
//   color: ${props=>props.theme.textColor};
//   font-size: 13px;
const NumberText = styled(FontAppliedBaseTextLittlePaddingNeedFontSize)`
  margin-left: 2px;
  margin-right: 5px;
`;

const BoardSummary = ({id,thumbNail,title,createdAt,user,likes,commentNumber}:seeNewBoardList_seeNewBoardList_boards) => {

  const navigation = useNavigation<NativeStackNavigationProp<BoardTabStackParamsList>>();

  const formatTime = getFormatTime(createdAt);

  const onPressSingleBoard = () => {
    navigation.navigate("Board",{
      id,
      title,
      createdAt:formatTime,
      user,
      // likes,
      // commentNumber
    });
  };
  
  const isDarkMode = useIsDarkMode();

  return (
    <Container>
      <MarginHorizontalContainer onPress={onPressSingleBoard}>
        <LeftContainer>
          <FastImage
            style={{
              // width: 60,
              // height: 60,
              width: 70,
              height: 70,
              marginRight: 10,
              marginTop: "auto",
              marginBottom: "auto",
            }}
            source={{
              uri : thumbNail ?? logoUri
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </LeftContainer>
        <RightContainer>
          <TitleText fontSize={13} ellipsizeMode='tail' numberOfLines={1}>
            {title}
          </TitleText>
          <UserContainer>
            <FastImage
              style={{
                width: 15,
                height: 15,
                borderRadius: 20,
                marginRight: 5,
              }}
              source={
                {uri : user.avatar ?? noUserUri}
              }
              resizeMode={FastImage.resizeMode.cover}
            />
            <UserNameText fontSize={12}>
              {user.userName}
            </UserNameText>
          </UserContainer>
          <PopularityContainer>
            <Ionicons name="heart" color="tomato" size={13}/>
            <NumberText fontSize={13}>{likes}</NumberText>
            <Ionicons name="chatbubble-outline" color={isDarkMode ? "white" : "black"} size={13}/>
            <NumberText fontSize={13}>{commentNumber}</NumberText>
          </PopularityContainer>
          <TimeText fontSize={10}>
            {formatTime}
          </TimeText>
        </RightContainer>
      </MarginHorizontalContainer>
    </Container>
  );
};

export default BoardSummary;