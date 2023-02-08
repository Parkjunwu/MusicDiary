/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeUserNotificationList
// ====================================================

export interface seeUserNotificationList_seeUserNotificationList_notification {
  __typename: "Notification";
  id: number;
  subscribeUserId: number | null;
  which: string;
  createdAt: string;
  diaryId: number | null;
  boardId: number | null;
  commentId: number | null;
  commentOfCommentId: number | null;
}

export interface seeUserNotificationList_seeUserNotificationList {
  __typename: "SeeUserNotificationListResponse";
  cursorId: number | null;
  hasNextPage: boolean | null;
  notification: (seeUserNotificationList_seeUserNotificationList_notification | null)[] | null;
  error: string | null;
}

export interface seeUserNotificationList {
  seeUserNotificationList: seeUserNotificationList_seeUserNotificationList | null;
}

export interface seeUserNotificationListVariables {
  cursorId?: number | null;
}
