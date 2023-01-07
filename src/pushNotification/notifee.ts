
export {}

// // 그냥 react-native-push-notification 씀. 얘 쓸거면 5.7.0 쓰던지 아님 sdk 33 으로 올리면 되는데 그러면 안드로이드 다른 라이브러리들이 설치가 안됨....


// import pushNotification, { AndroidChannel, AndroidNotificationSetting, Notification, RepeatFrequency, TimestampTrigger, TriggerType, AuthorizationStatus } from '@notifee/react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
// import { Alert } from 'react-native';
// import { REMOTE_NOTIFICATION_CHANNEL_NAME_LIST, remoteNotificationChannelList, LOCAL_SCHEDULED_ALERT_WRITE } from './constants';
// import messaging from '@react-native-firebase/messaging';

// const setDevicePushNotification = async() => {
//   await pushNotification.requestPermission();
//   resetLocalNotificationForMessageChange();
//   createRemoteNotificationChannels();

//   // messaging().onMessage(onMessageReceived);
//   // messaging().setBackgroundMessageHandler(onMessageReceived);
// };

// const setLocalPushNotification = async() => {
//   // createLocalScheduledAlertWriteNotificationChannel(); // 여기선 굳이 안만들어도 될듯? 딱히 설명은 없음.
//   resetLocalNotificationForMessageChange();
// };

// const resetLocalNotificationForMessageChange = async() => {
//   await cancelScheduledDiaryAlertNotification();

//   const localScheduledSetting = await AsyncStorage.getItem(LOCAL_SCHEDULED_ALERT_WRITE);
  
//   if(localScheduledSetting) {
//     const { enable, halfDay, hour, minute } = JSON.parse(localScheduledSetting);
//     if(enable) {
//       let convertedHour = hour;
//       halfDay === "오후" && (convertedHour += 12);
//       hour === 12 && convertedHour - 12;
//       createScheduledDiaryAlertNotification(convertedHour,minute);
//     }
//   }
// };

// const createRemoteNotificationChannels = async() => {
//   const remoteNotificationChannelNameList = await AsyncStorage.getItem(REMOTE_NOTIFICATION_CHANNEL_NAME_LIST);
//   console.log("remoteNotificationChannelNameList : "+ JSON.stringify(remoteNotificationChannelNameList));

//   if(!remoteNotificationChannelNameList) {
//     createAllRemotePushNotificationChannels();
//   } else {
//     const channelNameArr:string[] = JSON.parse(remoteNotificationChannelNameList);
//     const toGetChannelArr = remote_notificationChannelArr.filter(channel=>channelNameArr.includes(channel.name));
//     console.log("toGetChannelArr : "+ JSON.stringify(toGetChannelArr));
//     createRemotePushNotificationChannelsNeedChannelArr(toGetChannelArr);
//   }
// };

// const remote_notificationChannelArr: AndroidChannel[] = [
//   { id: remoteNotificationChannelList.NOTICE, name: '공지사항' },
//   { id: remoteNotificationChannelList.MUSIC_SELECTED, name: '음악 지정' },
//   { id: remoteNotificationChannelList.MUSIC_CHANGED, name: '음악 변경' },
// ];

// const createAllRemotePushNotificationChannels = () => remote_notificationChannelArr.forEach(channel => createPushNotificationChannel(channel));

// const createRemotePushNotificationChannelsNeedChannelArr = (channelArr:AndroidChannel[]) => channelArr.forEach(channel => createPushNotificationChannel(channel));

// const createPushNotificationChannel = (channelOptions:AndroidChannel)=>pushNotification.createChannel(channelOptions);



// const createTriggerNotification = async(hour:number,minute:number,notificationOption: Notification) => {

//   const now = new Date();
//   const nowYear = now.getFullYear();
//   const nowMonth = now.getMonth();
//   const nowDate = now.getDate();
  
//   const comparedTime = new Date(nowYear,nowMonth,nowDate,hour,minute);
  
//   const startDate = now < comparedTime ? nowDate : nowDate+1;
  
//   const firstAlertDate = new Date (nowYear,nowMonth,startDate,hour,minute);

//   const trigger: TimestampTrigger = {
//     type: TriggerType.TIMESTAMP,
//     // timestamp: date.getTime(),
//     timestamp: firstAlertDate.getTime(),
//     repeatFrequency: RepeatFrequency.DAILY,
//     alarmManager: {
//       allowWhileIdle: true,
//     },
//   };

//   await pushNotification.createTriggerNotification(
//     // {
//     //   id: '123',
//     //   title: 'Meeting with Jane',
//     //   body: 'Today at 11:20am',
//     //   android: {
//     //     channelId: 'your-channel-id',
//     //   },
//     // },
//     notificationOption, // 위에 있는 애들
//     trigger,
//   );
// };

// const messages = [
//   // '오늘 하루를 작성할 시간입니다.',
//   '오늘 하루를 작성할 시간이에요',
//   '오늘 하루는 어땠나요?',
//   '오늘 하루는 어떠셨나요?',
// ];

// const getRandomLocalScheduledAlertMessage = () => messages[Math.floor(Math.random() * messages.length)];

// const createScheduledDiaryAlertNotification = async(hour:number,minute:number,notificationOption?: Notification) => {

//   const scheduledDiaryAlertNotificationOption = {
//     ...notificationOption,
//     id: LOCAL_SCHEDULED_ALERT_WRITE,
//     title: '음악일기',
//     body: getRandomLocalScheduledAlertMessage(),
//     android: {
//       channelId: LOCAL_SCHEDULED_ALERT_WRITE,
//     },
//   };

//   createTriggerNotification(hour,minute,scheduledDiaryAlertNotificationOption);
// };

// const getTriggerNotificationIds = () => pushNotification.getTriggerNotificationIds().then(ids => console.log('All trigger notifications: ', JSON.stringify(ids)));

// const getAndroidTriggerNotificationPermission = async() => {
//   const settings = await pushNotification.getNotificationSettings();
//   // if (settings.android.alarm == AndroidNotificationSetting.ENABLED) {
//   //   //Create timestamp trigger
//   // } else {
//     // == 로 비교했는데 !== 해도 상관 없겠지?
//   console.log("getAndroidTriggerNotificationPermission : " + JSON.stringify(settings))
//   if (settings.android.alarm !== AndroidNotificationSetting.ENABLED) {
//     Alert.alert("알림 권한이 필요합니다.","권한 변경 화면으로 이동하시겠습니까?",[
//       {
//         text:"이동",
//         onPress:pushNotification.openAlarmPermissionSettings,
//       },
//       {
//         text:"취소",
//         style:"destructive",
//       },
//     ]);
//     // await pushNotification.openAlarmPermissionSettings();
//   }
// };

// const cancelNotification = async(notificationId:string) => pushNotification.cancelNotification(notificationId);

// const cancelScheduledDiaryAlertNotification = () => cancelNotification(LOCAL_SCHEDULED_ALERT_WRITE);

// const onMessageReceived = async(message:FirebaseMessagingTypes.RemoteMessage) => {
//   // pushNotification.displayNotification(JSON.parse(message.data?.notifee ?? ""));
//   console.log("onMessageReceived message : "+ message)
// };


// export default setDevicePushNotification;