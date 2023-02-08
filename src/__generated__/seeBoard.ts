/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeBoard
// ====================================================

export interface seeBoard_seeBoard {
  __typename: "Board";
  id: number;
  body: (string | null)[];
  file: (string | null)[];
  title: string;
  isMine: boolean;
  likes: number;
  commentNumber: number;
  isLiked: boolean;
}

export interface seeBoard {
  seeBoard: seeBoard_seeBoard | null;
}

export interface seeBoardVariables {
  id: number;
}
