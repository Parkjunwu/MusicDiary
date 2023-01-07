/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LoginErrorCode } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: login
// ====================================================

export interface login_login_loggedInUser_todayDiaries {
  __typename: "Diary";
  id: number;
  title: string;
  thumbNail: string | null;
  body: string[];
  createdAt: string;
}

export interface login_login_loggedInUser_thisMonthData {
  __typename: "Calendar";
  id: number;
  title: string;
  date: number;
  summaryBody: string | null;
}

export interface login_login_loggedInUser {
  __typename: "LogInUser";
  id: number;
  userName: string;
  avatar: string | null;
  totalUnreadNotification: number;
  totalDiary: number;
  prevYtIdArr: string[] | null;
  todayDiaries: (login_login_loggedInUser_todayDiaries | null)[] | null;
  thisMonthData: (login_login_loggedInUser_thisMonthData | null)[] | null;
}

export interface login_login {
  __typename: "LoginResult";
  ok: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  errorCode: LoginErrorCode | null;
  loggedInUser: login_login_loggedInUser | null;
}

export interface login {
  login: login_login;
}

export interface loginVariables {
  email: string;
  password: string;
}
