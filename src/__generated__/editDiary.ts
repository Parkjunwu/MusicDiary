/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: editDiary
// ====================================================

export interface editDiary_editDiary {
  __typename: "MutationResponse";
  ok: boolean;
  error: string | null;
}

export interface editDiary {
  editDiary: editDiary_editDiary;
}

export interface editDiaryVariables {
  id: number;
  title?: string | null;
  body?: string[] | null;
  changeThumbNail?: boolean | null;
  addFileArr?: any[] | null;
  addFileIndexArr?: number[] | null;
  addThumbNailArr?: any[] | null;
  deleteFileArr?: string[] | null;
  wholeFileArr?: string[] | null;
  youtubeId?: string | null;
  summaryBody?: string | null;
}
