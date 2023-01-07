/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: me
// ====================================================

export interface me_me_todayDiaries {
  __typename: "Diary";
  id: number;
  title: string;
  thumbNail: string | null;
  body: string[];
  createdAt: string;
}

export interface me_me_thisMonthData {
  __typename: "Calendar";
  id: number;
  title: string;
  date: number;
  summaryBody: string | null;
}

export interface me_me {
  __typename: "LogInUser";
  id: number;
  userName: string;
  avatar: string | null;
  totalUnreadNotification: number;
  totalDiary: number;
  prevYtIdArr: string[] | null;
  todayDiaries: (me_me_todayDiaries | null)[] | null;
  thisMonthData: (me_me_thisMonthData | null)[] | null;
}

export interface me {
  me: me_me | null;
}
