import React from "react";
import styled from "styled-components/native";
import { useLazyQuery } from "@apollo/client";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import NotLogInSingleCommentOfCommentLayout from "./NotLogInSingleCommentOfCommentLayout";
import { seeBoardComments_seeBoardComments } from "../../../../../../__generated__/seeBoardComments";
import { seeBoardCommentOfComments, seeBoardCommentOfCommentsVariables } from "../../../../../../__generated__/seeBoardCommentOfComments";
import cursorPaginationFetchMore from "../../../../../../logic/cursorPaginationFetchMore";
import getPassedTime from "../../../../../../logic/getPassedTime";
import { CommentsNavProps } from "../../../../../../types/board/boardComment";
import FlexRowContainer from "../../../../../comment/commonStyledComponent/FlexRowContainer";
import AvatarContainer from "../../../../../comment/commonStyledComponent/AvatarContainer";
import UserNameAndPayloadContainer from "../../../../../comment/commonStyledComponent/UserNameAndPayloadContainer";
import UserActionContainer from "../../../../../comment/commonStyledComponent/UserActionContainer";
import { LikesAndCommentsAndSeeMoreCommentContainer } from "../../../../../comment/layoutComponent/PayloadAndLikesContainer";
import { SEE_BOARD_COMMENT_OF_COMMENTS } from "../../../../../../gql/forCodeGen";
import { getBaseText } from "../../../../../comment/commonStyledComponent/CommentBaseStyledCompoents";

const BaseText = getBaseText({fontSize:12});

// const FlexRowContainerWithMargin = styled(FlexRowContainer)`
//   margin: 2px 10px 3px 10px;
// `;
const SeeMoreComments = styled.TouchableOpacity`
`;
// const SeeMoreCommentsText = styled.Text`
//   color: ${props => props.theme.textColor};
// `;
const SeeMoreCommentsText = BaseText;
const SeeMoreCommentOfComments = styled(SeeMoreComments)`
  margin-left: 60px;
  margin-bottom: 5px;
`;
// const SeeMoreCommentOfCommentsText = styled(SeeMoreCommentsText)``;
const SeeMoreCommentOfCommentsText = BaseText;
const BottomContainer = styled.View``;
const ContentContainer = styled.View``;
const RightEmptyContainer = styled.View`
  width: 30px;
`;

const NotLogInSingleCommentLayout = ({comment}:{comment:seeBoardComments_seeBoardComments}) => {

  const boardCommentId = comment.id;
  
  // 로그인 유저냐에 따라 좋아요 클릭 시 알림, 댓글 작성 아예 바꾸기 댓글을 작성하시려면 로그인 하셔야 합니다. 내 댓글일 경우 오른쪽 끝에 점점점 세개 붙여서 수정 삭제
  const [
    seeBoardCommentOfComments,
    {
      data,
      loading,
      fetchMore,
    }
  ] = useLazyQuery<seeBoardCommentOfComments,seeBoardCommentOfCommentsVariables>(SEE_BOARD_COMMENT_OF_COMMENTS,{
    variables:{
      boardCommentId,
      // ...(cursorId && { cursorId })
    }
  });

  const onPressSeeMoreComments = async() => {
    if(loading) return;
    // await refetch();
    await seeBoardCommentOfComments();
  };

  const onPressLikes = async() => Alert.alert("로그인 후 이용 가능합니다.",undefined,[{
    text:"확인"
  }]);


  // infinite scroll, 얘는 더보기 누를때 실행
  const fetchMoreFn = async() => {
    await fetchMore({
      variables:{
        cursorId:data.seeBoardCommentOfComments.cursorId,
      },
    });
  };

  const onPressSeeMoreCommentOfComments = async() => {
    await cursorPaginationFetchMore(data?.seeBoardCommentOfComments,fetchMoreFn);
  };


  // 대댓글 가져오기 버튼. 대댓글 없으면 안나옴.
  const IfCommentOfCommentsExistThenShowButton = () => {
    if(comment.totalCommentOfComments !== 0 && !data){
      return (
        <SeeMoreComments onPress={onPressSeeMoreComments}>
          <SeeMoreCommentsText>댓글 보기</SeeMoreCommentsText>
        </SeeMoreComments>
      );
    }
  };

  // 대댓글 fetchMore 버튼, 다음 없으면 안나옴, 댓글 하나 수정중이면 다른거 수정 못함.
  const IfUserPressGettingCommentOfCommentsThenShowThemNeedIsNowSomethingEditingAndSetFnBecauseEditOnlyOne = () => {
    return (
      <>
        {data?.seeBoardCommentOfComments.commentOfComments?.map(mention => <NotLogInSingleCommentOfCommentLayout
          key={mention.id}
          mention={mention}
        />)}
        {data?.seeBoardCommentOfComments.hasNextPage && (
          <SeeMoreCommentOfComments onPress={onPressSeeMoreCommentOfComments}>
            <SeeMoreCommentOfCommentsText>댓글 더보기</SeeMoreCommentOfCommentsText>
          </SeeMoreCommentOfComments>
        )}
      </>
      )
  };

  const user = comment.user;
  const userId = user.id
  const userName = user.userName;
  const avatar = user.avatar;
  const payload = comment.payload;
  const totalCommentOfComments = comment.totalCommentOfComments;
  const totalLikes = comment.totalLikes;
  const createAt = comment.createdAt;

  const passedTime = getPassedTime(createAt);

  const navigation = useNavigation<CommentsNavProps["navigation"]>();

  const onPressUserInfo = () => {
    navigation.navigate("Profile",{id:userId,userName})
  };
  


  return (
    <>
      <FlexRowContainer>
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
            <LikesAndCommentsAndSeeMoreCommentContainer
              onPressLike={onPressLikes}
              isLiked={false}
              totalLikes={totalLikes}
              totalCommentOfComments={totalCommentOfComments}
              passedTime={passedTime}
            >
              {IfCommentOfCommentsExistThenShowButton()}
            </LikesAndCommentsAndSeeMoreCommentContainer>
          </UserActionContainer>
          
        </ContentContainer>
        <RightEmptyContainer />
      </FlexRowContainer>
      
      <BottomContainer>
        {IfUserPressGettingCommentOfCommentsThenShowThemNeedIsNowSomethingEditingAndSetFnBecauseEditOnlyOne()}
      </BottomContainer>
    </>
  );
};

export default NotLogInSingleCommentLayout;