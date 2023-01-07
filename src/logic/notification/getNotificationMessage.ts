
const getNotificationMessage = (which:string) => {
  switch (which) {
    // case 'FOLLOWING_WRITE_POST':
    //   return "새로운 게시물을 작성하였습니다."
    // case 'FOLLOW_ME':
    //   return "회원님을 팔로우 하였습니다."
    // case 'MY_COMMENT_GET_COMMENT':
    // case "MY_PETLOG_COMMENT_GET_COMMENT":
    //   return "회원님의 댓글에 댓글을 남겼습니다."
    // case 'MY_COMMENT_GET_LIKE':
    // case "MY_PETLOG_COMMENT_GET_LIKE":
    //   return "회원님의 댓글을 좋아합니다."
    // case 'MY_COMMENT_OF_COMMENT_GET_LIKE':
    // case "MY_PETLOG_COMMENT_OF_COMMENT_GET_LIKE":
    //   return "회원님의 댓글을 좋아합니다."
    // case 'MY_POST_GET_COMMENT':
    //   return "회원님의 게시물에 댓글을 남겼습니다."
    // case 'MY_POST_GET_LIKE':
    //   return "회원님의 게시물을 좋아합니다."
    // case "FOLLOWING_WRITE_PETLOG":
    //   return "새로운 펫로그를 작성하였습니다."
    // case "MY_PETLOG_GET_LIKE":
    //   return "회원님의 펫로그를 좋아합니다."
    // case "MY_PETLOG_GET_COMMENT":
    //   return "회원님의 펫로그에 댓글을 남겼습니다."
    case "MUSIC_SELECTED":
      return "회원님의 일기에 노래가 지정되었습니다."
    case "MUSIC_CHANGED":
      return "회원님께서 요청하신 일기의 노래가 변경되었습니다."
    
    default:
      console.error("getNotificationMessage / Notification 이상한 값 들어옴.");
      return "알 수 없는 값을 입력하셨습니다.";
  }
};

export default getNotificationMessage;