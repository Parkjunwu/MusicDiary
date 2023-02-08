import { TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import styled from "styled-components/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import useToggleBoardLike from "../../../../hooks/board/useToggleBoardLike";
import { noUserUri } from "../../../../localImage/preloadLocalImageAndSetReactiveVar";
import { BoardFooterComponentProps } from "../../../../types/board/boardFooterComponentProps";
import { BoardTabStackParamsList } from "../../../../types/navigation/homeNavStackParamsList";
import { getBaseText } from "../../../comment/commonStyledComponent/CommentBaseStyledCompoents";
import { FontAppliedBaseTextLittlePaddingNeedFontSize } from "../../../../styled-components/FontAppliedComponents";

const BaseText = getBaseText({fontSize:12});

const UserContainer = styled.View`
  margin-bottom: 3px;
  align-items: center;
`;
// const SeeProfileText = styled.Text`
//   color: ${props=>props.theme.textColor};
// `;
const SeeProfileText = styled(FontAppliedBaseTextLittlePaddingNeedFontSize)``;
const InfoContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
// const LikeText = styled.Text`
//   color: ${props=>props.theme.textColor};
// `;
// const TotalComment = styled(LikeText)`

// `;
const LikeText = BaseText;
const TotalComment = BaseText;

const UserAndInfoContainer = ({id,isLiked,likes,commentNumber,user,isDarkMode}:BoardFooterComponentProps&{isDarkMode:boolean}) => {

  const navigation = useNavigation<NativeStackNavigationProp<BoardTabStackParamsList,"Board">>();
  const onPressProfile = () => navigation.navigate("UserBoardProfile",{
    ...user,
  });
  const toggleBoardLike = useToggleBoardLike(id);
  const onPressLike = () => toggleBoardLike();

  return (
    <>
      <UserContainer>
        <TouchableOpacity onPress={onPressProfile}>
          <FastImage
            style={{
              width: 40,
              height: 40,
              borderRadius: 50,
              marginBottom: 8,
            }}
            source={{
              uri : noUserUri
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressProfile}>
          <SeeProfileText fontSize={13}>
            프로필 보기
          </SeeProfileText>
        </TouchableOpacity>
      </UserContainer>

      <InfoContainer>
        <TouchableOpacity onPress={onPressLike}>
          <Ionicons name={isLiked?"heart":"heart-outline"} color={isLiked ? "tomato" : isDarkMode ? "white" : "black"} size={20}/> 
        </TouchableOpacity>
          <LikeText> {likes}</LikeText>
        <TotalComment>     {commentNumber} 개의 댓글</TotalComment>
      </InfoContainer>
    </>
  );
};

export default UserAndInfoContainer;