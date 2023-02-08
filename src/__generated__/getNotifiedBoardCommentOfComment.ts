/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getNotifiedBoardCommentOfComment
// ====================================================

export interface getNotifiedBoardCommentOfComment_getNotifiedBoardCommentOfComment_boardCommentOfComment_user {
  __typename: "User";
  id: number;
  userName: string;
  avatar: string | null;
}

export interface getNotifiedBoardCommentOfComment_getNotifiedBoardCommentOfComment_boardCommentOfComment {
  __typename: "BoardCommentOfComment";
  id: number;
  user: getNotifiedBoardCommentOfComment_getNotifiedBoardCommentOfComment_boardCommentOfComment_user;
  payload: string;
  createdAt: string;
  isMine: boolean;
  totalLikes: number;
  isLiked: boolean | null;
}

export interface getNotifiedBoardCommentOfComment_getNotifiedBoardCommentOfComment {
  __typename: "GetNotifiedBoardCommentOfCommentResponse";
  boardCommentOfComment: getNotifiedBoardCommentOfComment_getNotifiedBoardCommentOfComment_boardCommentOfComment | null;
  error: string | null;
}

export interface getNotifiedBoardCommentOfComment {
  getNotifiedBoardCommentOfComment: getNotifiedBoardCommentOfComment_getNotifiedBoardCommentOfComment;
}

export interface getNotifiedBoardCommentOfCommentVariables {
  boardCommentOfCommentId: number;
}
