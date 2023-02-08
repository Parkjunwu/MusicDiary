/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: searchBoards
// ====================================================

export interface searchBoards_searchBoards_boards_user {
  __typename: "User";
  id: number;
  userName: string;
  avatar: string | null;
}

export interface searchBoards_searchBoards_boards {
  __typename: "Board";
  id: number;
  user: searchBoards_searchBoards_boards_user;
  title: string;
  createdAt: string;
  thumbNail: string | null;
  likes: number;
  commentNumber: number;
}

export interface searchBoards_searchBoards {
  __typename: "SearchBoardsResponse";
  cursorId: number | null;
  hasNextPage: boolean | null;
  boards: searchBoards_searchBoards_boards[] | null;
  error: string | null;
}

export interface searchBoards {
  searchBoards: searchBoards_searchBoards;
}

export interface searchBoardsVariables {
  keyword: string;
  cursorId?: number | null;
}
