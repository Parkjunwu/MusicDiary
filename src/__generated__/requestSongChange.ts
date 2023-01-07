/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: requestSongChange
// ====================================================

export interface requestSongChange_requestSongChange {
  __typename: "MutationResponse";
  ok: boolean;
  error: string | null;
}

export interface requestSongChange {
  requestSongChange: requestSongChange_requestSongChange;
}

export interface requestSongChangeVariables {
  id: number;
  showDiary: boolean;
  requestMessage?: string | null;
}
