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
  /* ??? ?????? ?????????. ????????? ?????? */
  padding-bottom: 2px;
`;

type LogInSingleCommentProps = {
  comment:seeBoardComments_seeBoardComments;
  notifiedCommentOfComment?:any; // ??????
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
  
  // ????????? ???????????? ?????? ????????? ?????? ??? ??????, ?????? ?????? ?????? ????????? ????????? ?????????????????? ????????? ????????? ?????????. ??? ????????? ?????? ????????? ?????? ????????? ?????? ????????? ?????? ??????
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
    // network-only ????????? ?????? ?????? ????????? ?????? ?????? ????????????.
    // network-only ????????? ???????????? ??????? ???????
    // fetchPolicy:"network-only"
  });

  // seeBoardCommentOfComments ?????? ?????? ??????. ???????????? ????????? ???????????? ?????? ????????? ?????? ??????
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

        // // ?????? ????????? ????????? ?????? ????????? ??????. ?????? ?????? ?????? ??????
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

        // ????????? ????????? ?????? ?????? ???????????? ?????? ?????? ????????? ?????? ??????
        // ?????? ??????? refetch ?????? ????????? ??????????
        // const passedByTime = numberNow - Number(fetchedTime);
        // // 5??? ?????? ??????.
        // if ( passedByTime > 60000*5 ) {
        //   return newSeeCommentOfComments;
        // }

        // ?????? ??????
        const updateResult = {
          seeBoardCommentOfComments: {
            // commentOfComments:[newCacheData,...prevCommentOfComments],
            // ?????? ???????????? ?????? ??????
            commentOfComments:[...prevCommentOfComments,newCacheData],
            isNotFetchMore:true,
            // fetchedTime,
            ...prevRest,
          }
        };

        return updateResult;
      };

      // ??????
      const {seeBoardCommentOfComments:{ commentOfComments:prevCommentOfComments, isNotFetchMore, ...prevRest }} = prev;

      let newCommentOfComments;

      switch(action) {
          
        case 'editCommentOfComment':  // ?????? ??????
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

        case 'deleteCommentOfComment': // ?????? ??????
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
          // ????????? ?????? ???????????? ?????? seeBoardCommentOfComments ????????? 5??? ?????? ????????? ?????????.

          // ????????? ?????? ??????
          updateSeeBoardCommentsQuery({
            action: "createCommentOfComment",
            boardCommentId: boardCommentId,
          });

          const readCache = data?.seeBoardCommentOfComments;
          const hasNextPage = readCache?.hasNextPage;
          const cursorId = readCache?.cursorId;

          // ?????? ?????? ???????????? ??????. ?????? ?????? ????????? ??? ?????? ????????? ????????? ?????? ?????????
          if(hasNextPage === true) {
            // ????????? ???????????? ????????? ????????? fetchMore. await ??? ?????? ??????
            // data ??? 5????????? ????????? hasNextPage ??? true ??? ??? ????????? ??? ????????? ???.
            // ?????? ????????? ???????????? 100??? ?????????. ?????? ????????? ????????? ?????????. ?????? ?????? ??????x

            // ??? ?????? ????????????? ????????? isGetAllCommentOfComments:true isGetAllCommentOfComments:false ??? ????????? ?????? 5??? ????????? ?????????
            fetchMore({
              variables:{
                cursorId,
                // ????????? ?????????. ????????? isGetAllCommentOfComments ????????? useLazyQuery ??? variables ?????? ???????????? ???.
                isGetAllCommentOfComments:true,
              },
            });
          } else if(readCache === undefined) {
            // ????????? ?????????.
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

            // ????????? ???????????? ????????? ????????? ?????? ??????
            // ????????? ????????? ??????
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



  // infinite scroll, ?????? ????????? ????????? ??????
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


  // ????????? ???????????? ??????. ????????? ????????? ?????????.
  const IfCommentOfCommentsExistThenShowSeeMoreButton = () => {
    if(comment.totalCommentOfComments !== 0 && !data){
      return (
        <SeeMoreComments onPress={onPressSeeMoreComments}>
          <SeeMoreCommentsText>?????? ??????</SeeMoreCommentsText>
        </SeeMoreComments>
      );
    } else {
      return null;
    }
  };

  // Notification ?????? ???????????? ??? ?????? ????????? ???????????? ??????
  const ShowAllCommentBtn = () => {
    if(!data){
      return (
        <SeeAllComments onPress={onPressSeeMoreComments}>
          <SeeMoreCommentsText>?????? ?????? ??????</SeeMoreCommentsText>
        </SeeAllComments>
      );
    }
  };
  
  // ????????? fetchMore ??????, ?????? ????????? ?????????, ?????? ?????? ??????????????? ????????? ?????? ??????.
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
            <SeeMoreCommentOfCommentsText>?????? ?????????</SeeMoreCommentOfCommentsText>
          </SeeMoreCommentOfComments>
        )}
      </>
      )
  };

  
  // ?????? ?????? ????????? ???
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

        // ????????? ?????? ??????
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

        // ?????? ?????? ??????
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
          // 11??? 21??? ????????? ????????? ???????????? ???????????? ?????? ??????
          seeBoardComments({
            variables:{
              boardId,
              offset: nowCommentNumber-10,
            }
          })
        } else {
          // ????????? ??????
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

  // ???????????? ?????? ???????????? ????????? ????????? ?????????????
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
                {/* noti ??? ????????? ?????? ?????? ????????? ?????? ?????? ?????? ?????? */}
                {/* {IfCommentOfCommentsExistThenShowSeeMoreButton()} */}
              </LikesAndCommentsAndSeeMoreCommentContainer>
            </UserActionContainer>
            
          </ContentContainer>
          <EditBtn />
        </FlexRowContainer>

        <BottomContainer>
          {/* ?????? ?????? ???????????? ?????? ????????? ???????????? */}
          {!data && <SingleCommentOfCommentLayout
            mention={notifiedCommentOfComment}
            nowEditingIndex={nowEditingIndex}
            setNowEditingIndex={setNowEditingIndex}
            updateSeeBoardCommentOfCommentsQuery={updateSeeBoardCommentOfCommentsQuery}
            setUserWhichWriting={setUserWhichWriting}
            updateSeeBoardCommentsQuery={updateSeeBoardCommentsQuery}
            boardCommentId={boardCommentId}
          />}
          {/* ?????? ?????? */}
          {IfUserPressGettingCommentOfCommentsThenShowThemNeedIsNowSomethingEditingAndSetFnBecauseEditOnlyOne()}
          <CreateCommentOfCommentContainer
            onPressCreateCommentOfComment={onPressCreateCommentOfComment}
            userWhichWriting={userWhichWriting}
            setUserWhichWriting={setUserWhichWriting}
            userName={userName}
          />
          {/* ?????? ???????????? ?????? */}
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