import { gql } from "@apollo/client";
import { NOTIFICATION_FRAGMENT } from "./fragment";

// local field 쓰는 애
const SEE_USER_NOTIFICATION_LIST = gql`
  query seeUserNotificationList($cursorId:Int) {
    seeUserNotificationList(cursorId:$cursorId) {
      cursorId
      hasNextPage
      notification {
        ...NotificationFragment
      }
      error
      isNotFetchMore @client # 얘 주석처리하고 써
    }
  }
  ${NOTIFICATION_FRAGMENT}
`;

const SEE_NEW_BOARD_LIST = gql`
  query seeNewBoardList($cursorId: Int) {
    seeNewBoardList(cursorId: $cursorId) {
      cursorId
      hasNextPage
      boards {
        id
        user {
          id
          userName
          # avatar 까지 넣긴 너무 좁을듯 ? 근데 없으니까 밋밋해. avatar thumbnail 을 같이 저장할까?
          avatar
        }
        title
        thumbNail
        createdAt
        likes
        commentNumber
      }
      error
      isNotFetchMore @client # 얘 주석처리하고 써
    }
  }
`;

const GET_MY_DIARY_LIST = gql`
  query getMyDiaryList($cursorId:Int) {
    getMyDiaryList(cursorId:$cursorId) {
      cursorId
      hasNextPage
      diaries {
        id
        title
        thumbNail
        # createdAt
        dateTime
        summaryBody
        # likes
        # commentNumber
      }
      error
      isNotFetchMore @client # 얘 주석처리하고 써
    }
  }
`;

const GET_MY_BOARD_LIST = gql`
  query getMyBoardList($cursorId:Int) {
    getMyBoardList(cursorId:$cursorId) {
      cursorId
      hasNextPage
      boards {
        id
        title
        thumbNail
        # 필요한거 추가
        createdAt
        likes
        commentNumber
      }
      error
      isNotFetchMore @client # 얘 주석처리하고 써
    }
  }
`;

const SEE_BOARD_COMMENT_OF_COMMENTS = gql`
  query seeBoardCommentOfComments(
    $boardCommentId:Int!,
    $cursorId:Int
    $isGetAllCommentOfComments:Boolean,
  ) {
    seeBoardCommentOfComments(
      boardCommentId:$boardCommentId,
      cursorId:$cursorId,
      isGetAllCommentOfComments:$isGetAllCommentOfComments,
    ) {
      cursorId
      hasNextPage
      commentOfComments {
        id
        user{
          id
          userName
          avatar
        }
        payload
        createdAt
        isMine
        totalLikes
        isLiked
      }
      error
      # fetchedTime
      isNotFetchMore @client # 얘 주석처리하고 써
    }
  }
`;

const SEE_BLOCK_USERS = gql`
  query seeBlockUsers($cursorId:Int) {
    seeBlockUsers(cursorId:$cursorId) {
      cursorId
      hasNextPage
      users{
        id
        userName
        avatar
      }
      error
      isNotFetchMore @client # 얘 주석처리하고 써
    }
  }
`;

// seeBoardLikes seeBoardCommentLikes seeBoardCommentOfCommentLikes

// 걍 전체 주석
const USER_NOTIFICATION_UPDATE = gql`
  subscription userNotificationUpdate {
    userNotificationUpdate {
      id
    }
  }
`;


export {
  SEE_USER_NOTIFICATION_LIST,
  GET_MY_DIARY_LIST,
  SEE_NEW_BOARD_LIST,
  GET_MY_BOARD_LIST,
  SEE_BOARD_COMMENT_OF_COMMENTS,
  SEE_BLOCK_USERS,
  // SEE_BOARD_LIKES, SEE_BOARD_COMMENT_LIKES, SEE_BOARD_COMMENT_OF_COMMENT_LIKES,
  USER_NOTIFICATION_UPDATE,
};