import { createBoardComment_createBoardComment_offsetComments } from "../../__generated__/createBoardComment";

type UpdateSeeBoardCommentsQueryType = {
  action: string;
  boardCommentId: number;
  editPayload?: string;
  // newCacheData?: seeBoardComments_seeBoardComments_comments;
  // prevCommentNumber?: number
  forCreateComment?: {
    offsetComments: (createBoardComment_createBoardComment_offsetComments | null)[] | null,
    setNowCommentsBundleNumber: React.Dispatch<React.SetStateAction<number>>,
    totalCommentsNumber: number,
  }
}

type UpdateSeeBoardCommentOfCommentsQueryType = {
  action: string;
  boardCommentOfCommentId: number;
  editPayload?: string;
  newCacheData?: seeBoardCommentOfComments_seeBoardCommentOfComments_commentOfComments;
  // prevCommentNumber?: number;
  // numberNow?: number;
}

export { UpdateSeeBoardCommentsQueryType, UpdateSeeBoardCommentOfCommentsQueryType };