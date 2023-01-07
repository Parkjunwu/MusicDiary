/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: editProfile
// ====================================================

export interface editProfile_editProfile {
  __typename: "MutationResponse";
  ok: boolean;
  error: string | null;
}

export interface editProfile {
  editProfile: editProfile_editProfile;
}

export interface editProfileVariables {
  userName?: string | null;
  avatar?: any | null;
  deleteAvatar?: boolean | null;
}
