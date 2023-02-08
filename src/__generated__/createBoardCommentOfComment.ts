/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createBoardCommentOfComment
// ====================================================

export interface createBoardCommentOfComment_createBoardCommentOfComment {
  __typename: "MutationResponse";
  ok: boolean;
  error: string | null;
  id: number | null;
}

export interface createBoardCommentOfComment {
  createBoardCommentOfComment: createBoardCommentOfComment_createBoardCommentOfComment;
}

export interface createBoardCommentOfCommentVariables {
  payload: string;
  boardCommentId: number;
}
