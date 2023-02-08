import styled from "styled-components/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Platform, useColorScheme } from "react-native";
import { PropsWithChildren } from "react";
import { getBaseText } from "../commonStyledComponent/CommentBaseStyledCompoents";

const CommentBaseText = getBaseText({fontSize:12});

const ContentContainer = styled.View`
  margin-left: 3px;
  flex-direction: row;
  align-items: center;
`;
// const PassedTime = styled.Text`
//   color: ${props => props.theme.textColor};
// `;
// const BaseText = styled(FontAppliedBaseTextNeedFontSize)``;

// const BaseTextWithFontSize = ({children}:{children: React.ReactNode}) => <BaseText fontSize={12}>{children}</BaseText>;

// const PassedTime = styled(FontAppliedBaseTextNeedFontSize)`
  
// `;
const ToLikeLink = styled.TouchableOpacity``;
// const TotalLikes = styled(PassedTime)``;
// const TotalCommentOfComments = styled.Text`
//   color: ${props => props.theme.textColor};
// `;
// const TotalCommentOfComments = styled(PassedTime)``;

type Props = {
  onPressLike: () => void;
  isLiked: boolean;
  totalLikes: number;
  passedTime: string;
}

type LikesAndCommentsAndSeeMoreCommentContainerProps = {
  totalCommentOfComments: number;
} & Props

// 컴포넌트 두개가 거의 똑같은데 밑에거는 대댓글 불러오는 children 을 넣을 수 있음.
// 위에 놈은 대댓글 레이아웃, 아래 놈은 댓글 레이아웃.

const LikesAndPassedTimeContainer = ({onPressLike,isLiked,totalLikes,passedTime}:Props) => {
  const darkModeSubscription = useColorScheme();
  return (
    <ContentContainer>
      <ToLikeLink onPress={onPressLike}>
        <Ionicons name={isLiked?"heart":"heart-outline"} color={isLiked ? "tomato" : darkModeSubscription === "light" ? "black" : "white"} size={16}/>
      </ToLikeLink>
      <CommentBaseText>  {totalLikes}   </CommentBaseText>
      <CommentBaseText>{passedTime}  </CommentBaseText>
    </ContentContainer>
  );
};

// children 에 대댓글 보기 넣음. 그외엔 위와 동일.

const LikesAndCommentsAndSeeMoreCommentContainer: React.FC<PropsWithChildren<LikesAndCommentsAndSeeMoreCommentContainerProps>> = ({onPressLike,isLiked,totalLikes,passedTime,children,totalCommentOfComments}) => {

  const darkModeSubscription = useColorScheme();

  const isAndroid = Platform.OS === "android";

  const totalLikesText = isAndroid ? ` ${totalLikes}    ` : `  ${totalLikes}   `;

  const passedTimeText = isAndroid ? `${passedTime}    ` : `${passedTime}  `;

  const totalCommentOfCommentsText = totalCommentOfComments === 0 ? null : `${totalCommentOfComments} 개의 댓글`;

  return (
    <ContentContainer>
      <ToLikeLink onPress={onPressLike}>
        <Ionicons name={isLiked?"heart":"heart-outline"} color={isLiked ? "tomato" : darkModeSubscription === "light" ? "black" : "white"} size={16}/>
      </ToLikeLink>
      <CommentBaseText>{totalLikesText}</CommentBaseText>
      <CommentBaseText>{passedTimeText}</CommentBaseText>
      <CommentBaseText>{totalCommentOfCommentsText}       </CommentBaseText>
      {children}
    </ContentContainer>
  );
};

export { LikesAndPassedTimeContainer, LikesAndCommentsAndSeeMoreCommentContainer };