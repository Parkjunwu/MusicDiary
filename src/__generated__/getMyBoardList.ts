/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getMyBoardList
// ====================================================

export interface getMyBoardList_getMyBoardList_boards {
  __typename: "Board";
  id: number;
  title: string;
  thumbNail: string | null;
}

export interface getMyBoardList_getMyBoardList {
  __typename: "GetMyBoardListResponse";
  cursorId: number | null;
  hasNextPage: boolean | null;
  boards: (getMyBoardList_getMyBoardList_boards | null)[] | null;
  error: string | null;
}

export interface getMyBoardList {
  getMyBoardList: getMyBoardList_getMyBoardList;
}

export interface getMyBoardListVariables {
  cursorId?: number | null;
}
