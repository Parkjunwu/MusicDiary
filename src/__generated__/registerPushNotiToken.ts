/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: registerPushNotiToken
// ====================================================

export interface registerPushNotiToken_registerPushNotiToken {
  __typename: "MutationResponse";
  ok: boolean;
  error: string | null;
}

export interface registerPushNotiToken {
  registerPushNotiToken: registerPushNotiToken_registerPushNotiToken;
}

export interface registerPushNotiTokenVariables {
  deviceToken: string;
}
