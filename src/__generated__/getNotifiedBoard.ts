/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getNotifiedBoard
// ====================================================

export interface getNotifiedBoard_getNotifiedBoard_board_user {
  __typename: "User";
  id: number;
  userName: string;
  avatar: string | null;
}

export interface getNotifiedBoard_getNotifiedBoard_board {
  __typename: "Board";
  id: number;
  user: getNotifiedBoard_getNotifiedBoard_board_user;
  title: string;
  body: (string | null)[];
  file: (string | null)[];
  createdAt: string;
  isMine: boolean;
  likes: number;
  commentNumber: number;
  isLiked: boolean;
}

export interface getNotifiedBoard_getNotifiedBoard {
  __typename: "GetNotifiedBoardResponse";
  board: getNotifiedBoard_getNotifiedBoard_board | null;
  error: string | null;
}

export interface getNotifiedBoard {
  getNotifiedBoard: getNotifiedBoard_getNotifiedBoard;
}

export interface getNotifiedBoardVariables {
  boardId: number;
}
