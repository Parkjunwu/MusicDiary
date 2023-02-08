import { LazyQueryResult, QueryLazyOptions } from "@apollo/client";
import styled from "styled-components/native";
import { FontAppliedBoldTextLittlePaddingNeedFontSize } from "../../../../styled-components/FontAppliedComponents";
import { UpdateSeeBoardCommentsQueryType } from "../../../../types/board/updateQueryType";
import { getNotifiedBoardCommentOfComment_getNotifiedBoardCommentOfComment_boardCommentOfComment } from "../../../../__generated__/getNotifiedBoardCommentOfComment";
import { seeBoardComments, seeBoardCommentsVariables, seeBoardComments_seeBoardComments } from "../../../../__generated__/seeBoardComments";
import SingleCommentLayout from "./comment/forLogInUser/SingleCommentLayout";
import NotLogInSingleCommentLayout from "./comment/forNotLogInUser/NotLogInSingleCommentLayout";

const DivideLine = styled.View`
  border-top-width: 1px;
  border-top-color: rgba(192,192,192,0.6);
  margin-bottom: 5px;
`;
// const CommentViewTitle = styled.Text`
//   color: ${props=>props.theme.textColor};
//   font-weight: bold;
//   /* margin-left: 8px; */
//   /* text-align: center; */
//   margin: 5px 0px 8px 10px;
//   font-size: 15px;
// `;
const CommentViewTitle = styled(FontAppliedBoldTextLittlePaddingNeedFontSize)`
  margin: 5px 0px 8px 10px;
`;
const FlexRowContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  padding-top: 5px;
  border-top-width: 1px;
  border-top-color: rgba(192,192,192,0.6);
`;

type Props = {
  dataDotSeeBoardComments:seeBoardComments_seeBoardComments[];
  isLoggedIn:boolean;
  nowEditingIndex:string;
  setNowEditingIndex:React.Dispatch<React.SetStateAction<string>>;
  updateSeeBoardCommentsQuery:({ action, boardCommentId, editPayload, forCreateComment }: UpdateSeeBoardCommentsQueryType) => void;
  userWhichWriting:string | {
    userName: string;
  };
  setUserWhichWriting:React.Dispatch<React.SetStateAction<string | {
    userName: string;
  }>>;
  bundleIndexPressable:() => any[];
  commentId?:number;
  notifiedCommentOfComment?:getNotifiedBoardCommentOfComment_getNotifiedBoardCommentOfComment_boardCommentOfComment;
  boardId:number;
  seeBoardComments:(options?: QueryLazyOptions<seeBoardCommentsVariables>) => Promise<LazyQueryResult<seeBoardComments, seeBoardCommentsVariables>>
}

const CommentListContainer = ({
  dataDotSeeBoardComments,
  isLoggedIn,
  nowEditingIndex,
  setNowEditingIndex,
  updateSeeBoardCommentsQuery,
  userWhichWriting,
  setUserWhichWriting,
  bundleIndexPressable,
  commentId,
  notifiedCommentOfComment,
  boardId,
  seeBoardComments,
}:Props) => {

  return (
    <>
      {dataDotSeeBoardComments.length !==  0 && <>
        <CommentViewTitle fontSize={14}>댓글</CommentViewTitle>
        <DivideLine/>
      </>}
      {/* comment.id 가 안받아 지는 경우가 있음. 왠진 몰라 */}
      {dataDotSeeBoardComments.map(comment=>(
        comment.id ?
          isLoggedIn ?
            <SingleCommentLayout
              key={comment.id}
              comment={comment}
              nowEditingIndex={nowEditingIndex}
              setNowEditingIndex={setNowEditingIndex}
              updateSeeBoardCommentsQuery={updateSeeBoardCommentsQuery}
              userWhichWriting={userWhichWriting}
              setUserWhichWriting={setUserWhichWriting}notifiedCommentOfComment={commentId === comment.id ? notifiedCommentOfComment : null}
              boardId={boardId}
              seeBoardComments={seeBoardComments}
            />
          :
            <NotLogInSingleCommentLayout
              key={comment.id}
              comment={comment}
            />
        :
          null
        )
      )}
      {dataDotSeeBoardComments.length !==  0 && <FlexRowContainer>
        {bundleIndexPressable()}
      </FlexRowContainer>}
    </>
  );
};

export default CommentListContainer;