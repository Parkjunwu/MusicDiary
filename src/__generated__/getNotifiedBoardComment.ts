/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getNotifiedBoardComment
// ====================================================

export interface getNotifiedBoardComment_getNotifiedBoardComment {
  __typename: "GetNotifiedBoardCommentResponse";
  offset: number | null;
  totalComments: number | null;
  error: string | null;
}

export interface getNotifiedBoardComment {
  getNotifiedBoardComment: getNotifiedBoardComment_getNotifiedBoardComment;
}

export interface getNotifiedBoardCommentVariables {
  boardCommentId: number;
  boardId: number;
}
