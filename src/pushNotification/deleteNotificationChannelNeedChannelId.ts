import PushNotification from "react-native-push-notification";

// deleteChannel 한다고 해당 체널 Notification 을 안받는게 아님. 쓸 필요 없음.

const deleteNotificationChannelNeedChannelId = (channelId:string) => PushNotification.deleteChannel(channelId);

export default deleteNotificationChannelNeedChannelId;