import { ChannelObject } from "react-native-push-notification";
import { remoteNotificationChannelList } from "./constants";
import createPushNotificationChannel from "./createPushNotificationChannel";

const remote_notificationChannelArr: ChannelObject[] = [
  // notice
  { channelId: remoteNotificationChannelList.NOTICE, channelName: '공지사항' },
  // music
  { channelId: remoteNotificationChannelList.MUSIC_SELECTED, channelName: '음악 지정' },
  { channelId: remoteNotificationChannelList.MUSIC_CHANGED, channelName: '음악 변경' },
  // board
  { channelId: remoteNotificationChannelList.MY_BOARD_GET_LIKE, channelName: '게시글 좋아요' },
  { channelId: remoteNotificationChannelList.MY_BOARD_GET_COMMENT, channelName: '게시글 새 댓글' },
  { channelId: remoteNotificationChannelList.MY_BOARD_COMMENT_GET_LIKE, channelName: '댓글 좋아요' },
  { channelId: remoteNotificationChannelList.MY_BOARD_COMMENT_GET_COMMENT, channelName: '내 댓글에 새 댓글' },
  { channelId: remoteNotificationChannelList.MY_BOARD_COMMENT_OF_COMMENT_GET_LIKE, channelName: '대댓글 좋아요' },
];

const createAllRemotePushNotificationChannels = () => remote_notificationChannelArr.forEach(channel => createPushNotificationChannel(channel));

// const createRemotePushNotificationChannelsNeedChannelArr = (channelArr:ChannelObject[]) => channelArr.forEach(channel => createPushNotificationChannel(channel));

export {
  remote_notificationChannelArr,
  createAllRemotePushNotificationChannels,
  // createRemotePushNotificationChannelsNeedChannelArr,
};
