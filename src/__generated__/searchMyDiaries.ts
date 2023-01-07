/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: searchMyDiaries
// ====================================================

export interface searchMyDiaries_searchMyDiaries_diaries {
  __typename: "Diary";
  id: number;
  title: string;
  thumbNail: string | null;
  dateTime: number;
}

export interface searchMyDiaries_searchMyDiaries {
  __typename: "SearchMyDiariesResponse";
  cursorId: number | null;
  hasNextPage: boolean | null;
  diaries: (searchMyDiaries_searchMyDiaries_diaries | null)[] | null;
  error: string | null;
}

export interface searchMyDiaries {
  searchMyDiaries: searchMyDiaries_searchMyDiaries;
}

export interface searchMyDiariesVariables {
  keyword: string;
  cursorId?: number | null;
}
