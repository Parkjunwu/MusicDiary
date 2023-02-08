import FastImage from "react-native-fast-image";
import styled from "styled-components/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { logoUri } from "../../../localImage/preloadLocalImageAndSetReactiveVar";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BoardTabStackParamsList } from "../../../types/navigation/homeNavStackParamsList";
import { me } from "../../../__generated__/me";
import getFormatTime from "../../../logic/getFormatTime";
import { seeProfile_seeProfile_user } from "../../../__generated__/seeProfile";
import { getUserBoardList_getUserBoardList_boards } from "../../../__generated__/getUserBoardList";

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
const TitleText = styled.Text`
  font-weight: bold;
  color: ${props=>props.theme.textColor};
  margin-bottom: 3px;
  margin-left: 3px;
`;
const TimeText = styled.Text`
  color: ${props=>props.theme.textColor};
  font-size: 12px;
`;
const PopularityContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 4px;
`;
const NumberText = styled.Text`
  color: ${props=>props.theme.textColor};
  font-size: 13px;
  margin-left: 2px;
  margin-right: 5px;
`;

type NavigateProps = NativeStackScreenProps<BoardTabStackParamsList,'UserBoardProfile'>

type SingleBoardProps = getUserBoardList_getUserBoardList_boards & {
  navigation: NavigateProps["navigation"],
  // isDarkMode: boolean
  textColor: string
  meData?: me
  user?: seeProfile_seeProfile_user
};

const SingleBoard = (item:SingleBoardProps) => {
  
  // const navigation = useNavigation<NavigateProps["navigation"]>();
  // const isDarkMode = useIsDarkMode();
  const navigation = item.navigation;
  // const isDarkMode = item.isDarkMode;
  const textColor = item.textColor;

  const thumbNail = item.thumbNail;
  const title = item.title;
  const formatTime = getFormatTime(item.createdAt);
  const likes = item.likes;
  const commentNumber = item.commentNumber;
  const {meData,user,...rest} = item;

  const sendingUser = user ?? meData;
  
  return (
    <Container>
      <MarginHorizontalContainer
        onPress={()=>navigation.navigate("Board",{user:sendingUser, ...rest})}
      >
        <LeftContainer>
          <FastImage
            style={{
              width: 60,
              height: 60,
              marginRight: 10,
            }}
            source={{
              uri : thumbNail ?? logoUri
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </LeftContainer>
        <RightContainer>
          <TitleText ellipsizeMode='tail' numberOfLines={1}>
            {title}
          </TitleText>
          <PopularityContainer>
            <Ionicons name="heart" color="tomato" size={13}/>
            <NumberText>{likes}</NumberText>
            <Ionicons name="chatbubble-outline" color={textColor} size={13}/>
            <NumberText>{commentNumber}</NumberText>
          </PopularityContainer>
          <TimeText>
            {formatTime}
          </TimeText>
        </RightContainer>
      </MarginHorizontalContainer>
    </Container>
  );
};

export default SingleBoard;