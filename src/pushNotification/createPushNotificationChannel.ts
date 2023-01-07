import PushNotification, { ChannelObject } from "react-native-push-notification";

// channelId,channelName 말고 다른 것도 넣을 거면 추가
const createPushNotificationChannel = ({channelId,channelName}:ChannelObject) => PushNotification.createChannel(
  {
    channelId, // (required)
    channelName, // (required)
    // channelDescription: '앱 실행하는 알림', // (optional) default: undefined.
    soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
    importance: 4, // (optional) default: 4. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  },
  (created: boolean) =>
    console.log(`${channelId} push notification create result : '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);

export default createPushNotificationChannel;