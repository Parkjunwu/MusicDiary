/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeNewBoardList
// ====================================================

export interface seeNewBoardList_seeNewBoardList_boards_user {
  __typename: "User";
  id: number;
  userName: string;
  avatar: string | null;
}

export interface seeNewBoardList_seeNewBoardList_boards {
  __typename: "Board";
  id: number;
  user: seeNewBoardList_seeNewBoardList_boards_user;
  title: string;
  thumbNail: string | null;
  createdAt: string;
  likes: number;
  commentNumber: number;
}

export interface seeNewBoardList_seeNewBoardList {
  __typename: "SeeNewBoardListResponse";
  cursorId: number | null;
  hasNextPage: boolean | null;
  boards: seeNewBoardList_seeNewBoardList_boards[] | null;
  error: string | null;
}

export interface seeNewBoardList {
  seeNewBoardList: seeNewBoardList_seeNewBoardList;
}

export interface seeNewBoardListVariables {
  cursorId?: number | null;
}
