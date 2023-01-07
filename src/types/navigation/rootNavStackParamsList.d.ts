type RootNavStackParamsList = {
  HomeNav: undefined;
  AuthNav: undefined;
  LogOutCompletedView: undefined;
  PushNotificationUser: { id: number, userName: string };
  PushNotificationPost: { photoId: number };
  PushNotificationComment: { postId: number, commentId?: number, commentOfCommentId?: number };
  PushNotificationPetLog: { petLogId: number, commentId?: number, commentOfCommentId?: number };
  // talkingTo 는 userName 만 잇으면 됨. unreadTotal 이 애매하네. 백에서 보내지 말고 여기서 받을까?
  PushNotificationRoom: { id: number, opponentUserName:string, unreadTotal?:number };
};

export default RootNavStackParamsList;