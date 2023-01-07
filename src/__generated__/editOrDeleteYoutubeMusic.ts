/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: editOrDeleteYoutubeMusic
// ====================================================

export interface editOrDeleteYoutubeMusic_editOrDeleteYoutubeMusic {
  __typename: "MutationResponse";
  ok: boolean;
  error: string | null;
}

export interface editOrDeleteYoutubeMusic {
  editOrDeleteYoutubeMusic: editOrDeleteYoutubeMusic_editOrDeleteYoutubeMusic;
}

export interface editOrDeleteYoutubeMusicVariables {
  id: number;
  youtubeId?: string | null;
}
