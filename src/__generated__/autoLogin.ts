/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: autoLogin
// ====================================================

export interface autoLogin_autoLogin_loggedInUser_todayDiaries {
  __typename: "Diary";
  id: number;
  title: string;
  thumbNail: string | null;
  body: string[];
  createdAt: string;
}

export interface autoLogin_autoLogin_loggedInUser_thisMonthData {
  __typename: "Calendar";
  id: number;
  title: string;
  date: number;
  summaryBody: string | null;
}

export interface autoLogin_autoLogin_loggedInUser {
  __typename: "LogInUser";
  id: number;
  userName: string;
  avatar: string | null;
  totalUnreadNotification: number;
  totalDiary: number;
  prevYtIdArr: string[] | null;
  todayDiaries: (autoLogin_autoLogin_loggedInUser_todayDiaries | null)[] | null;
  thisMonthData: (autoLogin_autoLogin_loggedInUser_thisMonthData | null)[] | null;
}

export interface autoLogin_autoLogin {
  __typename: "LoginResult";
  ok: boolean;
  error: string | null;
  loggedInUser: autoLogin_autoLogin_loggedInUser | null;
  accessToken: string | null;
}

export interface autoLogin {
  autoLogin: autoLogin_autoLogin;
}

export interface autoLoginVariables {
  token: string;
}
