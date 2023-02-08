/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeProfile
// ====================================================

export interface seeProfile_seeProfile_user {
  __typename: "User";
  id: number;
  userName: string;
  avatar: string | null;
}

export interface seeProfile_seeProfile {
  __typename: "SeeProfileResponse";
  user: seeProfile_seeProfile_user | null;
  isMe: boolean | null;
  error: string | null;
}

export interface seeProfile {
  seeProfile: seeProfile_seeProfile;
}

export interface seeProfileVariables {
  id: number;
}
