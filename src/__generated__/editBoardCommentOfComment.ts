/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: editBoardCommentOfComment
// ====================================================

export interface editBoardCommentOfComment_editBoardCommentOfComment {
  __typename: "MutationResponse";
  ok: boolean;
  error: string | null;
}

export interface editBoardCommentOfComment {
  editBoardCommentOfComment: editBoardCommentOfComment_editBoardCommentOfComment;
}

export interface editBoardCommentOfCommentVariables {
  id: number;
  payload: string;
}
