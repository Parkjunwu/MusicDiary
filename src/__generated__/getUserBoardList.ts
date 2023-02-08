/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getUserBoardList
// ====================================================

export interface getUserBoardList_getUserBoardList_boards {
  __typename: "Board";
  id: number;
  title: string;
  thumbNail: string | null;
  createdAt: string;
  likes: number;
  commentNumber: number;
}

export interface getUserBoardList_getUserBoardList {
  __typename: "GetUserBoardListResponse";
  cursorId: number | null;
  hasNextPage: boolean | null;
  boards: (getUserBoardList_getUserBoardList_boards | null)[] | null;
  error: string | null;
}

export interface getUserBoardList {
  getUserBoardList: getUserBoardList_getUserBoardList;
}

export interface getUserBoardListVariables {
  userId: number;
  cursorId?: number | null;
}
