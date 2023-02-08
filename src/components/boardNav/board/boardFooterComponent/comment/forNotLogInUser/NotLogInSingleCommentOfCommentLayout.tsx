import React from "react";
import styled from "styled-components/native";
import { Alert, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FlexRowContainer from "../../../../../comment/commonStyledComponent/FlexRowContainer";
import AvatarContainer from "../../../../../comment/commonStyledComponent/AvatarContainer";
import UserNameAndPayloadContainer from "../../../../../comment/commonStyledComponent/UserNameAndPayloadContainer";
import { LikesAndPassedTimeContainer } from "../../../../../comment/layoutComponent/PayloadAndLikesContainer";
import UserActionContainer from "../../../../../comment/commonStyledComponent/UserActionContainer";
import getPassedTime from "../../../../../../logic/getPassedTime";
import { seeBoardCommentOfComments_seeBoardCommentOfComments_commentOfComments } from "../../../../../../__generated__/seeBoardCommentOfComments";
import { CommentsNavProps } from "../../../../../../types/board/boardComment";

const FlexRowContainerWithMargin = styled(FlexRowContainer)<{isAndroid:boolean}>`
  margin: ${props=>props.isAndroid ? "0px" : "1px 0px" };
`;
const LeftMarginContainer = styled.View`
  width: 20px;
`;
const ContentContainer = styled.View`
  flex: 1;
`;

const NotLogInSingleCommentOfCommentLayout = ({mention}:{mention:seeBoardCommentOfComments_seeBoardCommentOfComments_commentOfComments}) => {

  const onPressLike = () => {
    Alert.alert("로그인 후 이용 가능합니다.",undefined,[{
      text:"확인"
    }])
  };

  const user = mention.user;
  const userId = user.id;
  const userName = user.userName;
  const avatar = user.avatar;
  const payload = mention.payload;
  const createAt = mention.createdAt;

  const passedTime = getPassedTime(createAt);
  
  const navigation = useNavigation<CommentsNavProps["navigation"]>();
  const onPressUserInfo = () => {
    navigation.navigate("Profile",{id:userId,userName});
  };

  const isAndroid = Platform.OS === "android";

  return (
    <FlexRowContainerWithMargin isAndroid={isAndroid}>
      <LeftMarginContainer/>
      <AvatarContainer
        avatar={avatar}
        onPressAvatar={onPressUserInfo}
      />
      <ContentContainer>
        <UserNameAndPayloadContainer
          onPressUserName={onPressUserInfo}
          userName={userName}
          payload={payload}
        />
        <UserActionContainer>
          <LikesAndPassedTimeContainer
            onPressLike={onPressLike}
            isLiked={false}
            totalLikes={mention.totalLikes}
            passedTime={passedTime}
          />
        </UserActionContainer>
      </ContentContainer>
    </FlexRowContainerWithMargin>
  )
};

export default NotLogInSingleCommentOfCommentLayout;