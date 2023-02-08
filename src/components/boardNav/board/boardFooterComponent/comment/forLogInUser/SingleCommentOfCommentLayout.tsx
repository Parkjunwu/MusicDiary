import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { UpdateSeeBoardCommentOfCommentsQueryType, UpdateSeeBoardCommentsQueryType } from "../../../../../../types/board/updateQueryType";
import { toggleBoardCommentOfCommentLike, toggleBoardCommentOfCommentLikeVariables } from "../../../../../../__generated__/toggleBoardCommentOfCommentLike";
import { editBoardCommentOfComment, editBoardCommentOfCommentVariables } from "../../../../../../__generated__/editBoardCommentOfComment";
import { deleteBoardCommentOfComment, deleteBoardCommentOfCommentVariables } from "../../../../../../__generated__/deleteBoardCommentOfComment";
import getPassedTime from "../../../../../../logic/getPassedTime";
import FlexRowContainer from "../../../../../comment/commonStyledComponent/FlexRowContainer";
import AvatarContainer from "../../../../../comment/commonStyledComponent/AvatarContainer";
import UserNameAndPayloadContainer from "../../../../../comment/commonStyledComponent/UserNameAndPayloadContainer";
import { LikesAndPassedTimeContainer } from "../../../../../comment/layoutComponent/PayloadAndLikesContainer";
import EditBtnIfCommentOwner from "../../../../../comment/layoutComponent/EditBtnIfCommentOwner";
import { CommentsNavProps } from "../../../../../../types/board/boardComment";
import { FontAppliedBaseTextInputLittlePaddingNeedFontSize } from "../../../../../../styled-components/FontAppliedComponents";

const TOGGLE_BOARD_COMMENT_OF_COMMENT_LIKE = gql`
  mutation toggleBoardCommentOfCommentLike ($id:Int!) {
    toggleBoardCommentOfCommentLike (id:$id) {
      ok
      error
    }
  }
`;

const EDIT_BOARD_COMMENT_OF_COMMENT = gql`
  mutation editBoardCommentOfComment($id:Int!,$payload:String!) {
    editBoardCommentOfComment(id:$id,payload:$payload) {
      ok
      error
    }
  }
`;

const DELETE_BOARD_COMMENT_OF_COMMENT = gql`
  mutation deleteBoardCommentOfComment($id:Int!) {
    deleteBoardCommentOfComment(id:$id) {
      ok
      error
    }
  }
`;

const ContentContainer = styled.View`
  flex: 1;
`;
const UserActionContainer = styled.View`
  margin-top: 3px;
  margin-left: 10px;
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
`;

type LogInSingleCommentOfCommentProps = {
  nowEditingIndex: string,
  setNowEditingIndex: React.Dispatch<React.SetStateAction<string>>,
  mention:any;
  updateSeeBoardCommentOfCommentsQuery:(props:UpdateSeeBoardCommentOfCommentsQueryType) => void;
  setUserWhichWriting: React.Dispatch<React.SetStateAction<string|{userName:string}>>;
  updateSeeBoardCommentsQuery:(props:UpdateSeeBoardCommentsQueryType) => void;
  boardCommentId: number;
}

const SingleCommentOfCommentLayout = ({mention,nowEditingIndex,setNowEditingIndex,updateSeeBoardCommentOfCommentsQuery,setUserWhichWriting,updateSeeBoardCommentsQuery,boardCommentId}:LogInSingleCommentOfCommentProps) => {
  const commentOfCommentId = mention.id;
  const idForCacheAndEdit = `BoardCommentOfComment:${mention.id}`;

  const [boardCommentOfCommentLikeMutation] = useMutation<toggleBoardCommentOfCommentLike,toggleBoardCommentOfCommentLikeVariables>(TOGGLE_BOARD_COMMENT_OF_COMMENT_LIKE);



  const onPressLike = () => {
    boardCommentOfCommentLikeMutation({
      variables:{
        id:mention.id
      },
      update: (cache,result) => {
        const ok = result.data?.toggleBoardCommentOfCommentLike.ok;
        if(ok) {
          cache.modify({
            id: idForCacheAndEdit,
            fields: {
              isLiked(prev) {
                return !prev
              },
              totalLikes(prev) {
                return mention.isLiked ? prev-1 : prev+1
              }
            }
          });
        };
      },
    });
  };

  
  // 댓글 수정 중이란 뜻
  const isCommentEdit = nowEditingIndex === idForCacheAndEdit;

  const [editPayload,setEditPayload] = useState(mention.payload);



  const [editBoardCommentOfComment] = useMutation<editBoardCommentOfComment,editBoardCommentOfCommentVariables>(EDIT_BOARD_COMMENT_OF_COMMENT,{
    variables:{
      id:mention.id,
      payload:editPayload,
    },
    update:(cache,result) => {
      const ok = result.data?.editBoardCommentOfComment.ok;
      if(ok) {
        cache.modify({
          id: idForCacheAndEdit,
          fields: {
            payload:() => editPayload
          }
        });

        updateSeeBoardCommentOfCommentsQuery({
          action: "editCommentOfComment",
          boardCommentOfCommentId: commentOfCommentId,
          editPayload
        });
      }
    },
  });
  
  const [deleteBoardCommentOfComment] = useMutation<deleteBoardCommentOfComment,deleteBoardCommentOfCommentVariables>(DELETE_BOARD_COMMENT_OF_COMMENT,{
    variables:{
      id:mention.id,
    },
    update:(cache,result) => {
      const ok = result.data?.deleteBoardCommentOfComment.ok;
      if(ok) { 

        // 대댓글 갯수 변경
        updateSeeBoardCommentsQuery({
          action: "deleteCommentOfComment",
          boardCommentId: boardCommentId,
        });

        // 대댓글 제거
        updateSeeBoardCommentOfCommentsQuery({
          action: "deleteCommentOfComment",
          boardCommentOfCommentId: commentOfCommentId,
        });
        
      }
    },
  });

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

  return (
    <FlexRowContainer>
      <AvatarContainer
        avatar={avatar}
        onPressAvatar={onPressUserInfo}
      />
      {isCommentEdit ?
        <EditComment
          value={editPayload}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(text)=>setEditPayload(text)}
          multiline={true}
        />
      :
        <ContentContainer>
          <UserNameAndPayloadContainer
            onPressUserName={onPressUserInfo}
            userName={userName}
            payload={payload}
          />
          <UserActionContainer>
            <LikesAndPassedTimeContainer
              onPressLike={onPressLike}
              isLiked={mention.isLiked}
              totalLikes={mention.totalLikes}
              passedTime={passedTime}
            />
          </UserActionContainer>
        </ContentContainer>
      }
      <EditBtnIfCommentOwner
        id={idForCacheAndEdit}
        isMine={mention.isMine}
        nowEditingIndex={nowEditingIndex}
        setNowEditingIndex={setNowEditingIndex}
        editMutation={editBoardCommentOfComment}
        deleteMutation={deleteBoardCommentOfComment}
        setUserWhichWriting={setUserWhichWriting}
      />
    </FlexRowContainer>
  )
};

export default SingleCommentOfCommentLayout;