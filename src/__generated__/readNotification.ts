/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: readNotification
// ====================================================

export interface readNotification_readNotification {
  __typename: "MutationResponse";
  ok: boolean;
  error: string | null;
}

export interface readNotification {
  readNotification: readNotification_readNotification;
}

export interface readNotificationVariables {
  lastReadNotificationId: number;
}
