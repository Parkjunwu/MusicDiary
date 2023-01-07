/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeMyDiary
// ====================================================

export interface seeMyDiary_seeMyDiary_diary {
  __typename: "Diary";
  id: number;
  title: string;
  body: string[];
  file: string[];
  createdAt: string;
  dateTime: number;
  youtubeId: string | null;
}

export interface seeMyDiary_seeMyDiary {
  __typename: "SeeMyDiaryResponse";
  diary: seeMyDiary_seeMyDiary_diary | null;
  prevDiaryId: number | null;
  nextDiaryId: number | null;
  error: string | null;
}

export interface seeMyDiary {
  seeMyDiary: seeMyDiary_seeMyDiary | null;
}

export interface seeMyDiaryVariables {
  id: number;
}
