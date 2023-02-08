import { gql } from "@apollo/client";
import { ME_FRAGMENT } from "./fragment";

const GET_CALENDAR_MONTHLY_DATA = gql`
  query getCalendarMonthlyData ($year:Int!,$month:Int!) {
    getCalendarMonthlyData (year:$year,month:$month) {
      id
      date
      title
      summaryBody
    }
  }
`;

const ME_QUERY = gql`
  query me {
    me {
      ...MeFragment
    }
  }
  ${ME_FRAGMENT}
`;

const DELETE_BOARD = gql`
  mutation deleteBoard($id: Int!){
    deleteBoard(id: $id) {
      ok
      error
    }
  }
`;

const SEE_BOARD_COMMENTS = gql`
  query seeBoardComments(
    $boardId:Int!,
    $offset:Int!
  ) {
    seeBoardComments(
      boardId: $boardId,
      offset: $offset,
    ) {
      id
      user {
        id
        userName
        avatar
      }
      payload
      createdAt
      isMine
      totalLikes
      totalCommentOfComments
      isLiked
    }
  }
`;

const SEE_PROFILE = gql`
  query seeProfile($id:Int!){
    seeProfile(id:$id){
      user {
        id
        userName
        avatar
      }
      isMe
      error
    }
  }
`;

export {
  GET_CALENDAR_MONTHLY_DATA,
  ME_QUERY,
  DELETE_BOARD,
  SEE_BOARD_COMMENTS,
  SEE_PROFILE,
};