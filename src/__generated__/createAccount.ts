/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateAccountErrorCode } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createAccount
// ====================================================

export interface createAccount_createAccount {
  __typename: "CreateAccountResponse";
  ok: boolean;
  errorCode: CreateAccountErrorCode | null;
}

export interface createAccount {
  createAccount: createAccount_createAccount;
}

export interface createAccountVariables {
  email: string;
  password: string;
  userName: string;
}
