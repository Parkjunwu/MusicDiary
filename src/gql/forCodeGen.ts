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
  USER_NOTIFICATION_UPDATE,
};