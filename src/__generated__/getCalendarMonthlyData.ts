/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getCalendarMonthlyData
// ====================================================

export interface getCalendarMonthlyData_getCalendarMonthlyData {
  __typename: "Calendar";
  id: number;
  date: number;
  title: string;
  summaryBody: string | null;
}

export interface getCalendarMonthlyData {
  getCalendarMonthlyData: (getCalendarMonthlyData_getCalendarMonthlyData | null)[] | null;
}

export interface getCalendarMonthlyDataVariables {
  year: number;
  month: number;
}
