/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeBoardComments
// ====================================================

export interface seeBoardComments_seeBoardComments_user {
  __typename: "User";
  id: number;
  userName: string;
  avatar: string | null;
}

export interface seeBoardComments_seeBoardComments {
  __typename: "BoardComment";
  id: number;
  user: seeBoardComments_seeBoardComments_user;
  payload: string;
  createdAt: string;
  isMine: boolean;
  totalLikes: number;
  totalCommentOfComments: number;
  isLiked: boolean | null;
}

export interface seeBoardComments {
  seeBoardComments: seeBoardComments_seeBoardComments[] | null;
}

export interface seeBoardCommentsVariables {
  boardId: number;
  offset: number;
}
