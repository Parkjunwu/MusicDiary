/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deleteDiary
// ====================================================

export interface deleteDiary_deleteDiary {
  __typename: "MutationResponse";
  ok: boolean;
  error: string | null;
}

export interface deleteDiary {
  deleteDiary: deleteDiary_deleteDiary;
}

export interface deleteDiaryVariables {
  id: number;
}
