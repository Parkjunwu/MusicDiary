/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getMyDiaryList
// ====================================================

export interface getMyDiaryList_getMyDiaryList_diaries {
  __typename: "Diary";
  id: number;
  title: string;
  thumbNail: string | null;
  dateTime: number;
  summaryBody: string | null;
}

export interface getMyDiaryList_getMyDiaryList {
  __typename: "GetMyDiaryListResponse";
  cursorId: number | null;
  hasNextPage: boolean | null;
  diaries: (getMyDiaryList_getMyDiaryList_diaries | null)[] | null;
  error: string | null;
}

export interface getMyDiaryList {
  getMyDiaryList: getMyDiaryList_getMyDiaryList;
}

export interface getMyDiaryListVariables {
  cursorId?: number | null;
}
