/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: editBoard
// ====================================================

export interface editBoard_editBoard {
  __typename: "MutationResponse";
  ok: boolean;
  error: string | null;
}

export interface editBoard {
  editBoard: editBoard_editBoard;
}

export interface editBoardVariables {
  id: number;
  title?: string | null;
  body?: string[] | null;
  changeThumbNail?: boolean | null;
  addFileArr?: any[] | null;
  addFileIndexArr?: number[] | null;
  deleteFileArr?: string[] | null;
  wholeFileArr?: string[] | null;
  addThumbNailArr?: any[] | null;
}
