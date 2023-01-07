/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: resendEmail
// ====================================================

export interface resendEmail_resendEmail {
  __typename: "MutationResponse";
  ok: boolean;
  error: string | null;
}

export interface resendEmail {
  resendEmail: resendEmail_resendEmail;
}

export interface resendEmailVariables {
  email: string;
}
