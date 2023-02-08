/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeBlockUsers
// ====================================================

export interface seeBlockUsers_seeBlockUsers_users {
  __typename: "User";
  id: number;
  userName: string;
  avatar: string | null;
}

export interface seeBlockUsers_seeBlockUsers {
  __typename: "seeBlockUsersResponse";
  cursorId: number | null;
  hasNextPage: boolean | null;
  users: (seeBlockUsers_seeBlockUsers_users | null)[] | null;
  error: string | null;
}

export interface seeBlockUsers {
  seeBlockUsers: seeBlockUsers_seeBlockUsers;
}

export interface seeBlockUsersVariables {
  cursorId?: number | null;
}
