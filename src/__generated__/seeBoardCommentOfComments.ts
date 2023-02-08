/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeBoardCommentOfComments
// ====================================================

export interface seeBoardCommentOfComments_seeBoardCommentOfComments_commentOfComments_user {
  __typename: "User";
  id: number;
  userName: string;
  avatar: string | null;
}

export interface seeBoardCommentOfComments_seeBoardCommentOfComments_commentOfComments {
  __typename: "BoardCommentOfComment";
  id: number;
  user: seeBoardCommentOfComments_seeBoardCommentOfComments_commentOfComments_user;
  payload: string;
  createdAt: string;
  isMine: boolean;
  totalLikes: number;
  isLiked: boolean | null;
}

export interface seeBoardCommentOfComments_seeBoardCommentOfComments {
  __typename: "SeeBoardCommentOfCommentsResponse";
  cursorId: number | null;
  hasNextPage: boolean | null;
  commentOfComments: seeBoardCommentOfComments_seeBoardCommentOfComments_commentOfComments[] | null;
  error: string | null;
}

export interface seeBoardCommentOfComments {
  seeBoardCommentOfComments: seeBoardCommentOfComments_seeBoardCommentOfComments;
}

export interface seeBoardCommentOfCommentsVariables {
  boardCommentId: number;
  cursorId?: number | null;
  isGetAllCommentOfComments?: boolean | null;
}
