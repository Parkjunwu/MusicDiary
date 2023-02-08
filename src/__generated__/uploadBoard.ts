/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: uploadBoard
// ====================================================

export interface uploadBoard_uploadBoard_uploadedBoard {
  __typename: "Board";
  id: number;
  createdAt: string;
}

export interface uploadBoard_uploadBoard {
  __typename: "UploadBoardResponse";
  ok: boolean;
  error: string | null;
  uploadedBoard: uploadBoard_uploadBoard_uploadedBoard | null;
}

export interface uploadBoard {
  uploadBoard: uploadBoard_uploadBoard;
}

export interface uploadBoardVariables {
  title: string;
  fileArr: any[];
  body: string[];
  thumbNailArr?: any[] | null;
  isFirstVideo: boolean;
}
