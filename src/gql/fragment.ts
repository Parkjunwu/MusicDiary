import { gql } from "@apollo/client";

// export const ROOM_FRAGMENT = gql`
//   fragment RoomParts on Room {
//     id
//     talkingTo {
//       id
//       userName
//       avatar
//     }
//     lastMessage {
//       id
//       payload
//       createdAt
//     }
//     unreadTotal
//   }
// `;

// export const MESSAGE_FRAGMENT = gql`
//   fragment MessageFragment on Message {
//     id
//     payload
//     user{
//       id
//       userName
//       avatar
//     }
//     read
//     createdAt
//     # roomId
//   }
// `;

export const NOTIFICATION_FRAGMENT = gql`
  fragment NotificationFragment on Notification {
    id
    # publishUser{
    #   id
    #   userName
    #   avatar
    # }
    subscribeUserId
    which
    # read
    createdAt
    diaryId
    boardId
    commentId
    commentOfCommentId
    # userId
    # petLogId
  }
`;

export const ME_FRAGMENT = gql`
  # fragment MeFragment on User {
  fragment MeFragment on LogInUser {  # LogInUser 로 바꿈.
    id
    userName
    avatar
    # # 프로필에 들어갈 애들
    # bio
    # totalFollowing
    # totalFollowers
    totalUnreadNotification
    totalDiary #totalDiary 추가
    prevYtIdArr #prevYtIdArr 추가
    todayDiaries {
      id
      title
      thumbNail
      body #body 추가
      createdAt #createdAt 추가
    }
    thisMonthData {
      id
      title
      date
      summaryBody
    }
  }
`;

export const DIARY_FRAGMENT = gql`
  fragment DiaryFragment on Diary {
    id
    title
    body
    file
    createdAt
    dateTime
    # music {
    #   id
    #   title
    #   author
    #   url
    # }
    youtubeId
  }
`;