/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum CreateAccountErrorCode {
  ALREADY_TOKEN = "ALREADY_TOKEN",
  EMAIL = "EMAIL",
  INVALID_INPUT = "INVALID_INPUT",
  UNKNOWN = "UNKNOWN",
  USERNAME = "USERNAME",
}

export enum LoginErrorCode {
  NOT_AUTHENTICATED = "NOT_AUTHENTICATED",
  NO_USER = "NO_USER",
}

export interface diaryFormat {
  title: string;
  body: string;
  dateTime: number;
  youtubeId?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
