/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { diaryFormat } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: synchronizeDiary
// ====================================================

export interface synchronizeDiary_synchronizeDiary {
  __typename: "MutationResponse";
  ok: boolean;
  error: string | null;
}

export interface synchronizeDiary {
  synchronizeDiary: synchronizeDiary_synchronizeDiary;
}

export interface synchronizeDiaryVariables {
  uploadDiaries: (diaryFormat | null)[];
}
