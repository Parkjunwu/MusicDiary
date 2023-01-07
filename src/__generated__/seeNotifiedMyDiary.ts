/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeNotifiedMyDiary
// ====================================================

export interface seeNotifiedMyDiary_seeNotifiedMyDiary_diary {
  __typename: "Diary";
  id: number;
  title: string;
  body: string[];
  file: string[];
  createdAt: string;
  dateTime: number;
  youtubeId: string | null;
}

export interface seeNotifiedMyDiary_seeNotifiedMyDiary {
  __typename: "SeeNotifiedMyDiaryResponse";
  diary: seeNotifiedMyDiary_seeNotifiedMyDiary_diary | null;
  error: string | null;
}

export interface seeNotifiedMyDiary {
  seeNotifiedMyDiary: seeNotifiedMyDiary_seeNotifiedMyDiary | null;
}

export interface seeNotifiedMyDiaryVariables {
  id: number;
}
