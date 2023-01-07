/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MeFragment
// ====================================================

export interface MeFragment_todayDiaries {
  __typename: "Diary";
  id: number;
  title: string;
  thumbNail: string | null;
  body: string[];
  createdAt: string;
}

export interface MeFragment_thisMonthData {
  __typename: "Calendar";
  id: number;
  title: string;
  date: number;
  summaryBody: string | null;
}

export interface MeFragment {
  __typename: "LogInUser";
  id: number;
  userName: string;
  avatar: string | null;
  totalUnreadNotification: number;
  totalDiary: number;
  prevYtIdArr: string[] | null;
  todayDiaries: (MeFragment_todayDiaries | null)[] | null;
  thisMonthData: (MeFragment_thisMonthData | null)[] | null;
}
