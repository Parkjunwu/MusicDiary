/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: userNotificationUpdate
// ====================================================

export interface userNotificationUpdate_userNotificationUpdate {
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

export interface userNotificationUpdate {
  userNotificationUpdate: userNotificationUpdate_userNotificationUpdate | null;
}
