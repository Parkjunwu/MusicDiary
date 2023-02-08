/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createBoardComment
// ====================================================

export interface createBoardComment_createBoardComment_offsetComments_user {
  __typename: "User";
  id: number;
  userName: string;
  avatar: string | null;
}

export interface createBoardComment_createBoardComment_offsetComments {
  __typename: "BoardComment";
  id: number;
  user: createBoardComment_createBoardComment_offsetComments_user;
  payload: string;
  createdAt: string;
  isMine: boolean;
  totalLikes: number;
  totalCommentOfComments: number;
  isLiked: boolean | null;
}

export interface createBoardComment_createBoardComment {
  __typename: "CreateBoardCommentResponse";
  ok: boolean;
  error: string | null;
  totalCommentsNumber: number | null;
  offsetComments: createBoardComment_createBoardComment_offsetComments[] | null;
}

export interface createBoardComment {
  createBoardComment: createBoardComment_createBoardComment;
}

export interface createBoardCommentVariables {
  payload: string;
  boardId: number;
}
