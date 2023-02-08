import FastImage from "react-native-fast-image";
import styled from "styled-components/native";
import { noUserUri } from "../../../localImage/preloadLocalImageAndSetReactiveVar";
import Ionicons from "react-native-vector-icons/Ionicons"
import useToggleBoardLike from "../../../hooks/board/useToggleBoardLike";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import useIsDarkMode from "../../../hooks/useIsDarkMode";
import useColorsChangedByDarkMode from "../../../hooks/useColorsChangedByDarkMode";
import { getBaseText } from "../../comment/commonStyledComponent/CommentBaseStyledCompoents";
import { FontAppliedBaseTextInputLittlePaddingNeedFontSize, FontAppliedBoldTextInputLittlePaddingNeedFontSize } from "../../../styled-components/FontAppliedComponents";

const BaseText = getBaseText({fontSize:11});

const Container = styled.View<{isDarkMode:boolean}>`
  border-bottom-color: rgba(100,100,100,0.4);
  border-bottom-width: ${props=>props.isDarkMode ? "0px" : "1px"};
  /* border-color: rgba(100,100,100,0.1);
  border-width: 2px; */
  /* background-color: ${props=>props.isDarkMode ? "rgba(160,160,160,0.2)" : "rgba(255,235,205,0.2)"}; */
  background-color: ${props=>props.isDarkMode ? "rgba(160,160,160,0.2)" : "white" };
  padding: 6px 10px;
  margin-bottom: 10px;
`;
// const TitleText = styled.Text`
//   color: ${props=>props.theme.textColor};
//   font-size: 16px;
//   font-weight: bold;
const TitleText = styled(FontAppliedBoldTextInputLittlePaddingNeedFontSize)`
  margin-bottom: 2px;
`;
const UserContainer = styled.View`
  flex-direction: row;
  margin-bottom: 3px;
  align-items: center;
`;
// const UserNameText = styled.Text`
//   color: ${props=>props.theme.textColor};
// `;
// const UserNameText = BaseText;
const UserNameText = styled(FontAppliedBaseTextInputLittlePaddingNeedFontSize)``;
// const TimeText = styled.Text`
//   color: ${props=>props.theme.textColor};
//   font-size: 13px;
const TimeText = styled(FontAppliedBaseTextInputLittlePaddingNeedFontSize)`
  margin-bottom: 5px;
  margin-left: 2px;
`;
const BoardInfoContainer = styled.View`
  flex-direction: row;
  margin-left: 6px;
`;
// const TotalLikes = styled(UserNameText)`

// `;
// const TotalComments = styled(UserNameText)`

// `;
const TotalLikes = BaseText;
const TotalComments = BaseText;

type BoardHeaderComponentType = {
  id: number;
  title: string;
  createdAt: string;
  user: {
    id: number,
    userName: string,
    avatar: string | null,
  };
  likes:number;
  commentNumber:number;
  isLiked:boolean;
};

const BoardHeaderComponent = ({id,title,createdAt,user,likes,commentNumber,isLiked}:BoardHeaderComponentType) => {

  const isDarkMode = useIsDarkMode();
  const {textColor} = useColorsChangedByDarkMode();
  const navigation = useNavigation();
  const onPressProfile = () => navigation.navigate("Profile",{
    ...user,
  });
  const toggleBoardLike = useToggleBoardLike(id);
  const onPressLike = () => toggleBoardLike();
  return (
    <Container isDarkMode={isDarkMode} >
      <TitleText fontSize={16}>
        {title}
      </TitleText>
      <UserContainer>
        <TouchableOpacity onPress={onPressProfile}>
          <FastImage
            style={{
              width: 20,
              height: 20,
              borderRadius: 50,
              marginRight: 8,
            }}
            source={{
              uri : user.avatar ?? noUserUri
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressProfile}>
          <UserNameText fontSize={13}>
            {user.userName}
          </UserNameText>
        </TouchableOpacity>
      </UserContainer>
      <TimeText fontSize={11}>
        {createdAt}
      </TimeText>
      <BoardInfoContainer>
        <TouchableOpacity onPress={onPressLike}>
          <Ionicons name={isLiked?"heart":"heart-outline"} color={isLiked ? "tomato" : textColor} size={16}/> 
        </TouchableOpacity>
        <TotalLikes> {likes}</TotalLikes>
        <TotalComments>   {commentNumber} 개의 댓글</TotalComments>
      </BoardInfoContainer>
    </Container>
  );
};

export default BoardHeaderComponent;