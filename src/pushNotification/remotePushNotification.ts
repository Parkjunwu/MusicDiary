import { ChannelObject } from "react-native-push-notification";
import { remoteNotificationChannelList } from "./constants";
import createPushNotificationChannel from "./createPushNotificationChannel";

const remote_notificationChannelArr: ChannelObject[] = [
  { channelId: remoteNotificationChannelList.NOTICE, channelName: '공지사항' },
  { channelId: remoteNotificationChannelList.MUSIC_SELECTED, channelName: '음악 지정' },
  { channelId: remoteNotificationChannelList.MUSIC_CHANGED, channelName: '음악 변경' },
];

const createAllRemotePushNotificationChannels = () => remote_notificationChannelArr.forEach(channel => createPushNotificationChannel(channel));

// const createRemotePushNotificationChannelsNeedChannelArr = (channelArr:ChannelObject[]) => channelArr.forEach(channel => createPushNotificationChannel(channel));

export {
  remote_notificationChannelArr,
  createAllRemotePushNotificationChannels,
  // createRemotePushNotificationChannelsNeedChannelArr,
};
