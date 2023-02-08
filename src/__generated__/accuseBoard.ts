/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: accuseBoard
// ====================================================

export interface accuseBoard_accuseBoard {
  __typename: "MutationResponse";
  ok: boolean;
  error: string | null;
}

export interface accuseBoard {
  accuseBoard: accuseBoard_accuseBoard;
}

export interface accuseBoardVariables {
  id: number;
  reason: number;
  detail?: string | null;
}
