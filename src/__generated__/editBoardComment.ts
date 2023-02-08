/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: editBoardComment
// ====================================================

export interface editBoardComment_editBoardComment {
  __typename: "MutationResponse";
  ok: boolean;
  error: string | null;
}

export interface editBoardComment {
  editBoardComment: editBoardComment_editBoardComment;
}

export interface editBoardCommentVariables {
  id: number;
  payload: string;
}
