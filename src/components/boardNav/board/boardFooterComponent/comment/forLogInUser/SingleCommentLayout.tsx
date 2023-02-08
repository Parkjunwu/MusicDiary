import React from "react";
import styled from "styled-components/native";
import { gql, LazyQueryResult, QueryLazyOptions, useLazyQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { seeBoardComments, seeBoardCommentsVariables, seeBoardComments_seeBoardComments } from "../../../../../../__generated__/seeBoardComments";
import { UpdateSeeBoardCommentOfCommentsQueryType, UpdateSeeBoardCommentsQueryType } from "../../../../../../types/board/updateQueryType";
import { toggleBoardCommentLike, toggleBoardCommentLikeVariables } from "../../../../../../__generated__/toggleBoardCommentLike";
import { createBoardCommentOfComment, createBoardCommentOfCommentVariables } from "../../../../../../__generated__/createBoardCommentOfComment";
import useMe from "../../../../../../hooks/useMe";
import cursorPaginationFetchMore from "../../../../../../logic/cursorPaginationFetchMore";
import SingleCommentOfCommentLayout from "./SingleCommentOfCommentLayout";
import { editBoardComment, editBoardCommentVariables } from "../../../../../../__generated__/editBoardComment";
import { deleteBoardComment, deleteBoardCommentVariables } from "../../../../../../__generated__/deleteBoardComment";
import getPassedTime from "../../../../../../logic/getPassedTime";
import FlexRowContainer from "../../../../../comment/commonStyledComponent/FlexRowContainer";
import AvatarContainer from "../../../../../comment/commonStyledComponent/AvatarContainer";
import UserNameAndPayloadContainer from "../../../../../comment/commonStyledComponent/UserNameAndPayloadContainer";
import { seeBoardCommentOfComments, seeBoardCommentOfCommentsVariables } from "../../../../../../__generated__/seeBoardCommentOfComments";
import { LikesAndCommentsAndSeeMoreCommentContainer } from "../../../../../comment/layoutComponent/PayloadAndLikesContainer";
import CreateCommentOfCommentContainer from "../../../../../comment/layoutComponent/CreateCommentOfCommentContainer";
import EditBtnIfCommentOwner from "../../../../../comment/layoutComponent/EditBtnIfCommentOwner";
import { CommentsNavProps } from "../../../../../../types/board/boardComment";
import { SEE_BOARD_COMMENT_OF_COMMENTS } from "../../../../../../gql/forCodeGen";
import { FontAppliedBaseTextInputLittlePaddingNeedFontSize } from "../../../../../../styled-components/FontAppliedComponents";
import { getBaseText } from "../../../../../comment/commonStyledComponent/CommentBaseStyledCompoents";

const ContentContainer = styled.View`
  flex: 1;
`;
const UserActionContainer = styled.View`
  margin-top: 3px;
  margin-left: 10px;
`;

const TOGGLE_BOARD_COMMENT_LIKE = gql`
  mutation toggleBoardCommentLike ($id:Int!) {
    toggleBoardCommentLike (id:$id) {
      ok
      error
    }
  }
`;

const CREATE_BOARD_COMMENT_OF_COMMENT = gql`
  mutation createBoardCommentOfComment (
    $payload:String!,
    $boardCommentId:Int!
  ) {
    createBoardCommentOfComment (
      payload:$payload,
      boardCommentId:$boardCommentId
    ) {
      ok
      error
      id
    }
  }
`;

const EDIT_BOARD_COMMENT = gql`
  mutation editBoardComment(
    $id:Int!,
    $payload:String!
  ) {
    editBoardComment(
      id:$id,
      payload:$payload
    ) {
      ok
      error
    }
  }
`;

const DELETE_BOARD_COMMENT = gql`
  mutation deleteBoardComment($id:Int!) {
    deleteBoardComment(id:$id) {
      ok
      error
    }
  }
`;

const BaseText = getBaseText({fontSize:12});

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
const BottomContainer = styled.View`
  margin-left: 40px;
`;
const SeeAllComments = styled.TouchableOpacity`
  margin-top: 5px;
  margin-left: 60px;
`;
// const EditComment = styled.TextInput`
//   color: ${props => props.theme.textColor};
const EditComment = styled(FontAppliedBaseTextInputLittlePaddingNeedFontSize)`
  flex: 1;
  margin-left: 10px;
  background-color: ${props=>props.theme.textInputBackgroundColor};
  border-radius: 3px;
  padding-left: 8px;
  padding-right: 8px;
  /* 얜 뭔가 안맞음. 그래서 넣음 */
  padding-bottom: 2px;
`;

type LogInSingleCommentProps = {
  comment:seeBoardComments_seeBoardComments;
  notifiedCommentOfComment?:any; // 몰라
  nowEditingIndex: string,
  setNowEditingIndex: React.Dispatch<React.SetStateAction<string>>,
  updateSeeBoardCommentsQuery:(props:UpdateSeeBoardCommentsQueryType) => void;
  userWhichWriting: string | {userName:string},
  setUserWhichWriting: React.Dispatch<React.SetStateAction<string|{userName:string}>>,
  boardId:number;
  seeBoardComments:(options?: QueryLazyOptions<seeBoardCommentsVariables>) => Promise<LazyQueryResult<seeBoardComments, seeBoardCommentsVariables>>
}

const SingleCommentLayout = ({comment,notifiedCommentOfComment,nowEditingIndex,setNowEditingIndex,updateSeeBoardCommentsQuery,userWhichWriting,setUserWhichWriting,boardId,seeBoardComments}:LogInSingleCommentProps) => {

  // const commentId = comment.id;
  const boardCommentId = comment.id;
  const idForCacheAndEdit = `BoardComment:${comment.id}`;
  
  // 로그인 유저냐에 따라 좋아요 클릭 시 알림, 댓글 작성 아예 바꾸기 댓글을 작성하시려면 로그인 하셔야 합니다. 내 댓글일 경우 오른쪽 끝에 점점점 세개 붙여서 수정 삭제
  const [
    seeBoardCommentOfComments,
    {
      data,
      loading,
      // refetch,
      fetchMore,
      // updateQuery:updateSeeBoardCommentOfCommentsQuery
      updateQuery
    }
  ] = useLazyQuery<seeBoardCommentOfComments,seeBoardCommentOfCommentsVariables>(SEE_BOARD_COMMENT_OF_COMMENTS,{
    variables:{
      boardCommentId,
    },
    // network-only 하니까 두번 이상 받으면 뭐가 자꾸 이상해짐.
    // network-only 안해도 서버에서 받네? 뭐지?
    // fetchPolicy:"network-only"
  });

  // seeBoardCommentOfComments 캐시 변경 로직. 겹치는게 많은데 하나하나 너무 길어서 몰아 놓음
  // const updateSeeBoardCommentOfCommentsQuery = makeUpdateSeeBoardCommentOfCommentsQuery(updateQuery);
  const updateSeeBoardCommentOfCommentsQuery = ({action,boardCommentOfCommentId,editPayload,newCacheData}:UpdateSeeBoardCommentOfCommentsQueryType) => {

    updateQuery((prev)=>{

      if(action === 'createCommentOfComment') {

        // const __typename:"SeeBoardCommentOfCommentsResponse" = "SeeBoardCommentOfCommentsResponse";
        // const hasNextPage = prevCommentNumber === 0 ? false : true;
        // const now = numberNow +"";

        // const newSeeCommentOfComments = {
        //   seeBoardCommentOfComments: {
        //     __typename,
        //     commentOfComments:[newCacheData],
        //     cursorId: boardCommentOfCommentId,
        //     error: null,
        //     hasNextPage: false,
        //     isNotFetchMore: null,
        //     // fetchedTime: now,
        //   },
        // };

        // // 이전 댓글이 없으면 기존 캐시가 없어. 그런 경우 새로 생성
        // if(prev.seeBoardCommentOfComments === undefined ) {
        //   return newSeeCommentOfComments;
        // }

        const {
          seeBoardCommentOfComments:{
            commentOfComments: prevCommentOfComments,
            isNotFetchMore,
            ...prevRest
          }
        } = prev;
        // commentOfComments:prevCommentOfComments, isNotFetchMore, fetchedTime, ...prevRest }} = prev;

        // 기존의 캐시가 너무 오래 지났으면 이전 캐시 안받고 새로 생성
        // 이게 뭐지? refetch 해야 되는거 아닌가?
        // const passedByTime = numberNow - Number(fetchedTime);
        // // 5분 이상 지남.
        // if ( passedByTime > 60000*5 ) {
        //   return newSeeCommentOfComments;
        // }

        // 캐시 변경
        const updateResult = {
          seeBoardCommentOfComments: {
            // commentOfComments:[newCacheData,...prevCommentOfComments],
            // 시간 역순이라 뒤에 놓음
            commentOfComments:[...prevCommentOfComments,newCacheData],
            isNotFetchMore:true,
            // fetchedTime,
            ...prevRest,
          }
        };

        return updateResult;
      };

      // 그외
      const {seeBoardCommentOfComments:{ commentOfComments:prevCommentOfComments, isNotFetchMore, ...prevRest }} = prev;

      let newCommentOfComments;

      switch(action) {
          
        case 'editCommentOfComment':  // 댓글 변경
          newCommentOfComments = prevCommentOfComments.map(commentOfComment => {
            if(commentOfComment.id === boardCommentOfCommentId) {
              const newCommentOfComment = {...commentOfComment};
              newCommentOfComment.payload = editPayload;
              return newCommentOfComment;
            } else {
              return {...commentOfComment};
            }
          });
          break;

        case 'deleteCommentOfComment': // 댓글 삭제
          newCommentOfComments = prevCommentOfComments.filter(commentOfComment => commentOfComment.id !== boardCommentOfCommentId);
          break;

        // default:
        //   break;
      }

      const updateResult = {
        seeBoardCommentOfComments: {
          commentOfComments:newCommentOfComments,
          isNotFetchMore:true,
          ...prevRest,
        }
      };

      return updateResult;
    });
  };

  const onPressSeeMoreComments = async() => {
    if(loading) return;
    await seeBoardCommentOfComments();
  };
  
  const [commentLikeMutation] = useMutation<toggleBoardCommentLike,toggleBoardCommentLikeVariables>(TOGGLE_BOARD_COMMENT_LIKE);
  const onPressLikes = async() => {
    const result = await commentLikeMutation({
      variables:{
        id:boardCommentId
      },
      update: (cache,result) => {
        const ok = result.data?.toggleBoardCommentLike.ok;
        if(ok) {
          cache.modify({
            id: idForCacheAndEdit,
            fields: {
              isLiked(prev) {
                return !prev
              },
              totalLikes(prev) {
                return comment.isLiked ? prev-1 : prev+1
              }
            }
          });
        };
      },
    });
  };

  const [createBoardCommentOfComment] = useMutation<createBoardCommentOfComment,createBoardCommentOfCommentVariables>(CREATE_BOARD_COMMENT_OF_COMMENT);

  const {data:meData} = useMe();

  const onPressCreateCommentOfComment = async(payload:string) => {
    await createBoardCommentOfComment({
      variables:{
        boardCommentId,
        payload,
      },
      update: (cache,mutationResult) => {
        if(mutationResult.data.createBoardCommentOfComment.ok){
          // 지금은 캐시 변경인데 그전 seeBoardCommentOfComments 캐시가 5분 이상 됐으면 삭제함.

          // 대댓글 갯수 변경
          updateSeeBoardCommentsQuery({
            action: "createCommentOfComment",
            boardCommentId: boardCommentId,
          });

          const readCache = data?.seeBoardCommentOfComments;
          const hasNextPage = readCache?.hasNextPage;
          const cursorId = readCache?.cursorId;

          // 이전 캐시 데이터는 있어. 근데 걔의 갯수랑 총 댓글 갯수가 안맞을 때도 가져와
          if(hasNextPage === true) {
            // 이전에 안불러온 댓글이 있으면 fetchMore. await 는 굳이 안함
            // data 가 5배수인 경우에 hasNextPage 가 true 일 수 있지만 걍 이렇게 함.
            // 근데 만약에 대댓글이 100개 이러면. 끝에 몇개만 받거나 해야함. 이건 아직 구현x

            // 왜 두번 받는거지? 그것도 isGetAllCommentOfComments:true isGetAllCommentOfComments:false 로 받아서 결국 5개 이상은 안나와
            fetchMore({
              variables:{
                cursorId,
                // 끝까지 다받음. 여기서 isGetAllCommentOfComments 쓸라면 useLazyQuery 의 variables 에도 넣어줘야 함.
                isGetAllCommentOfComments:true,
              },
            });
          } else if(readCache === undefined) {
            // 끝까지 다받음.
            seeBoardCommentOfComments({
              variables:{
                boardCommentId,
                isGetAllCommentOfComments:true,
              }}
            );
          } else {

            const numberNow = new Date().getTime();
            const now = numberNow+"";
            const __typename:"BoardCommentOfComment" = "BoardCommentOfComment";
            
            const newCommentOfComment = {
              __typename,
              id: mutationResult.data.createBoardCommentOfComment.id,
              user: meData.me,
              payload,
              createdAt: now,
              isMine: true,
              totalLikes: 0,
              isLiked: false,
            };

            // 마지막 댓글까지 불러온 상태면 캐시 넣음
            // 대댓글 캐시에 넣음
            updateSeeBoardCommentOfCommentsQuery({
              action: "createCommentOfComment",
              boardCommentOfCommentId: mutationResult.data.createBoardCommentOfComment.id,
              newCacheData: newCommentOfComment,
            });
          }
        }
      },
    });
  };



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
  const IfCommentOfCommentsExistThenShowSeeMoreButton = () => {
    if(comment.totalCommentOfComments !== 0 && !data){
      return (
        <SeeMoreComments onPress={onPressSeeMoreComments}>
          <SeeMoreCommentsText>댓글 보기</SeeMoreCommentsText>
        </SeeMoreComments>
      );
    } else {
      return null;
    }
  };

  // Notification 으로 들어왔을 시 전체 대댓글 보여주기 버튼
  const ShowAllCommentBtn = () => {
    if(!data){
      return (
        <SeeAllComments onPress={onPressSeeMoreComments}>
          <SeeMoreCommentsText>전체 댓글 보기</SeeMoreCommentsText>
        </SeeAllComments>
      );
    }
  };
  
  // 대댓글 fetchMore 버튼, 다음 없으면 안나옴, 댓글 하나 수정중이면 다른거 수정 못함.
  const IfUserPressGettingCommentOfCommentsThenShowThemNeedIsNowSomethingEditingAndSetFnBecauseEditOnlyOne = () => {
    return (
      <>
        {data?.seeBoardCommentOfComments.commentOfComments?.map(mention => <SingleCommentOfCommentLayout
          key={mention.id}
          mention={mention}
          nowEditingIndex={nowEditingIndex}
          setNowEditingIndex={setNowEditingIndex}
          updateSeeBoardCommentOfCommentsQuery={updateSeeBoardCommentOfCommentsQuery}
          setUserWhichWriting={setUserWhichWriting}
          updateSeeBoardCommentsQuery={updateSeeBoardCommentsQuery}
          boardCommentId={boardCommentId}
        />)}
        {data?.seeBoardCommentOfComments.hasNextPage && (
          <SeeMoreCommentOfComments onPress={onPressSeeMoreCommentOfComments}>
            <SeeMoreCommentOfCommentsText>댓글 더보기</SeeMoreCommentOfCommentsText>
          </SeeMoreCommentOfComments>
        )}
      </>
      )
  };

  
  // 댓글 수정 중이란 뜻
  const isCommentEdit = nowEditingIndex === idForCacheAndEdit;

  const [editPayload,setEditPayload] = useState(comment.payload);



  const [editBoardComment] = useMutation<editBoardComment,editBoardCommentVariables>(EDIT_BOARD_COMMENT,{
    variables:{
      id:boardCommentId,
      payload:editPayload,
    },
    update:(cache,result)=>{
      const ok = result.data.editBoardComment.ok;
      if(ok) {
        cache.modify({
          id: idForCacheAndEdit,
          fields: {
            payload:() => editPayload
          }
        });

        // 대댓글 캐시 변경
        updateSeeBoardCommentsQuery({
          action: "editComment",
          boardCommentId: boardCommentId,
          editPayload,
        });
      }
    },
  });
  
  const [deleteBoardComment] = useMutation<deleteBoardComment,deleteBoardCommentVariables>(DELETE_BOARD_COMMENT,{
    variables:{
      id:boardCommentId,
    },
    update:(cache,result)=>{
      const ok = result.data.deleteBoardComment.ok;
      if(ok) {

        let nowCommentNumber:number;

        // 댓글 개수 변경
        cache.modify({
          id:`Board:${boardId}`,
          fields:{
            commentNumber(prev){
              nowCommentNumber = prev-1;
              return nowCommentNumber;
            },
          },
        });

        if(nowCommentNumber%10 === 0 && nowCommentNumber !== 0){
          // 11개 21개 이러면 삭제시 댓글창이 날라가서 다시 받음
          seeBoardComments({
            variables:{
              boardId,
              offset: nowCommentNumber-10,
            }
          })
        } else {
          // 대댓글 제거
          updateSeeBoardCommentsQuery({
            action:"deleteComment",
            boardCommentId:boardCommentId
          });
        }
      }
    },
  });

  const user = comment.user;
  const userId = user.id;
  const userName = user.userName;
  const avatar = user.avatar;
  const payload = comment.payload;
  const totalCommentOfComments = comment.totalCommentOfComments;
  const isLiked = comment.isLiked;
  const totalLikes = comment.totalLikes;
  const isMine = comment.isMine;
  const createAt = comment.createdAt;

  const passedTime = getPassedTime(createAt);

  const navigation = useNavigation<CommentsNavProps["navigation"]>();
  const onPressUserInfo = () => {
    navigation.navigate("Profile",{id:userId,userName})
  };

  // 컴포넌트 안에 만드는게 성능상 안좋지 않을라나?
  const EditBtn = () => (
    <EditBtnIfCommentOwner
      id={idForCacheAndEdit}
      isMine={isMine}
      nowEditingIndex={nowEditingIndex}
      setNowEditingIndex={setNowEditingIndex}
      editMutation={editBoardComment}
      deleteMutation={deleteBoardComment}
      setUserWhichWriting={setUserWhichWriting}
    />
  );

  return (
    notifiedCommentOfComment ?
      <>
        <FlexRowContainer>
          <AvatarContainer
            avatar={avatar}
            onPressAvatar={onPressUserInfo}
          />
          
          <ContentContainer>
            {isCommentEdit ?
              <EditComment
                value={editPayload}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={(text)=>setEditPayload(text)}
                multiline={true}
              />
            :
              <UserNameAndPayloadContainer
                onPressUserName={onPressUserInfo}
                userName={userName}
                payload={payload}
              />
            }

            <UserActionContainer>
              <LikesAndCommentsAndSeeMoreCommentContainer
                onPressLike={onPressLikes}
                isLiked={isLiked}
                totalLikes={totalLikes}
                totalCommentOfComments={totalCommentOfComments}
                passedTime={passedTime}
              >
                {/* noti 로 들어온 애는 댓글 보기가 여기 없고 밑에 있음 */}
                {/* {IfCommentOfCommentsExistThenShowSeeMoreButton()} */}
              </LikesAndCommentsAndSeeMoreCommentContainer>
            </UserActionContainer>
            
          </ContentContainer>
          <EditBtn />
        </FlexRowContainer>

        <BottomContainer>
          {/* 전체 댓글 불러오면 알림 댓글은 안보이게 */}
          {!data && <SingleCommentOfCommentLayout
            mention={notifiedCommentOfComment}
            nowEditingIndex={nowEditingIndex}
            setNowEditingIndex={setNowEditingIndex}
            updateSeeBoardCommentOfCommentsQuery={updateSeeBoardCommentOfCommentsQuery}
            setUserWhichWriting={setUserWhichWriting}
            updateSeeBoardCommentsQuery={updateSeeBoardCommentsQuery}
            boardCommentId={boardCommentId}
          />}
          {/* 댓글 목록 */}
          {IfUserPressGettingCommentOfCommentsThenShowThemNeedIsNowSomethingEditingAndSetFnBecauseEditOnlyOne()}
          <CreateCommentOfCommentContainer
            onPressCreateCommentOfComment={onPressCreateCommentOfComment}
            userWhichWriting={userWhichWriting}
            setUserWhichWriting={setUserWhichWriting}
            userName={userName}
          />
          {/* 전체 댓글보기 버튼 */}
          {ShowAllCommentBtn()}
        </BottomContainer>
      </>
    :
      <>
        <FlexRowContainer>
          <AvatarContainer
            avatar={avatar}
            onPressAvatar={onPressUserInfo}
          />
          
          <ContentContainer>
            {isCommentEdit ?
              <EditComment
                value={editPayload}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={(text)=>setEditPayload(text)}
                multiline={true}
              />
            :
              <UserNameAndPayloadContainer
                onPressUserName={onPressUserInfo}
                userName={userName}
                payload={payload}
              />
            }

            <UserActionContainer>
              <LikesAndCommentsAndSeeMoreCommentContainer
                onPressLike={onPressLikes}
                isLiked={isLiked}
                totalLikes={totalLikes}
                totalCommentOfComments={totalCommentOfComments}
                passedTime={passedTime}
              >
                {IfCommentOfCommentsExistThenShowSeeMoreButton()}
              </LikesAndCommentsAndSeeMoreCommentContainer>
            </UserActionContainer>
            
          </ContentContainer>
          <EditBtn />
        </FlexRowContainer>
        <BottomContainer>
          <CreateCommentOfCommentContainer
            onPressCreateCommentOfComment={onPressCreateCommentOfComment}
            userWhichWriting={userWhichWriting}
            setUserWhichWriting={setUserWhichWriting}
            userName={userName}
          />
          {IfUserPressGettingCommentOfCommentsThenShowThemNeedIsNowSomethingEditingAndSetFnBecauseEditOnlyOne()}
        </BottomContainer>
      </>
  );
};

export default SingleCommentLayout;