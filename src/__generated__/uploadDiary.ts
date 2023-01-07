/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: uploadDiary
// ====================================================

export interface uploadDiary_uploadDiary_uploadedDiary {
  __typename: "Diary";
  id: number;
  createdAt: string;
}

export interface uploadDiary_uploadDiary {
  __typename: "UploadDiaryResponse";
  ok: boolean;
  error: string | null;
  uploadedDiary: uploadDiary_uploadDiary_uploadedDiary | null;
}

export interface uploadDiary {
  uploadDiary: uploadDiary_uploadDiary;
}

export interface uploadDiaryVariables {
  title: string;
  fileArr: any[];
  body: string[];
  thumbNailArr?: any[] | null;
  isFirstVideo: boolean;
  dateTime: string;
  youtubeId?: string | null;
  requestMusic: boolean;
  showDiary?: boolean | null;
  requestMessage?: string | null;
  summaryBody?: string | null;
}
