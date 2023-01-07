import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { LOCAL_SCHEDULED_ALERT_WRITE } from './constants';
import { createLocalScheduledAlertWriteNotificationChannel, deleteAllLocalNotifications, setLocalScheduledAlertWriteNotificationNeedHalfDayHourMinute } from './localPushNotification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAllRemotePushNotificationChannels } from './remotePushNotification';

const setDevicePushNotification = () => {
  setPushNotificationConfigure();
  setLocalPushNotification();
  setRemotePushNotification();

  // PushNotification.getChannels(function (channel_ids) {
  //   console.log("getChannels : "+JSON.stringify(channel_ids)); // ['channel_id_1']
  // });
};

const setPushNotificationConfigure = () => {
  // messaging 은 firebase
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

  // PushNotification 가 메인.
  PushNotification.configure({
    // (optional) 토큰이 생성될 때 실행됨(토큰을 서버에 등록할 때 쓸 수 있음)
    // onRegister: function (token: any) {
    //   // console.log('TOKEN:', token);
    // },

    // (required) 알림 클릭시 실행할 로직. 어디로 navigate 한다거나.
    onNotification: function (notification: any) {
      // console.log("notification is : "+ JSON.stringify(notification))
      // (required) 아이폰은 얘 무조건 있어야함. 걍 무조건 넣어
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    // 어떤 동작 가능하게 지정
    // (optional) 등록한 액션을 누렀고 invokeApp이 false 상태일 때 실행됨, true면 onNotification이 실행됨 (Android)
    // onAction: function (notification: any) {
    // },

    // 에러시
    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: function (err: Error) {
      console.error(err.message, err);
    },

    // ios 옵션. 그냥 다 true.
    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    // 얘도 기본설정.
    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,


    // 얘도 기본설정. 권한요청인데 걍 true 냅둬.
    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     * - if you are not using remote notification or do not have Firebase installed, use this:
     *     requestPermissions: Platform.OS === 'ios'
     */
    requestPermissions: true,
  });
}

const setLocalPushNotification = async() => {
  createLocalScheduledAlertWriteNotificationChannel();
  resetLocalNotificationForMessageChange();
};

const resetLocalNotificationForMessageChange = async() => {
  deleteAllLocalNotifications();

  const localScheduledSetting = await AsyncStorage.getItem(LOCAL_SCHEDULED_ALERT_WRITE);
  
  if(localScheduledSetting) {
    const { enable, halfDay, hour, minute } = JSON.parse(localScheduledSetting);
    if(enable) {
      setLocalScheduledAlertWriteNotificationNeedHalfDayHourMinute(halfDay, hour, minute);
    }
  }
}

const setRemotePushNotification = () => createAllRemotePushNotificationChannels();

export default setDevicePushNotification;










// const setPushNotification = () => {

//   // messaging 은 firebase
//   // 없으면 어떻게 되나?
//   messaging().setBackgroundMessageHandler(async remoteMessage => {
//     console.log('Message handled in the background!', remoteMessage);
//   });

//   // PushNotification 가 메인.
//   PushNotification.configure({
//     // (optional) 토큰이 생성될 때 실행됨(토큰을 서버에 등록할 때 쓸 수 있음)
//     onRegister: function (token: any) {
//       console.log('TOKEN:', token);
//     },

//     // (required) 알림 클릭시 실행할 로직. 어디로 navigate 한다거나.
//     onNotification: function (notification: any) {
//       console.log("notification is : "+ notification)
//       // (required) 아이폰은 얘 무조건 있어야함. 걍 무조건 넣어
//       notification.finish(PushNotificationIOS.FetchResult.NoData);
//     },

//     // 공식문서 참고하래 Action 은
//     // (optional) 등록한 액션을 누렀고 invokeApp이 false 상태일 때 실행됨, true면 onNotification이 실행됨 (Android)
//     // onAction: function (notification: any) {
//     // },

//     // 에러시
//     // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
//     onRegistrationError: function (err: Error) {
//       console.error(err.message, err);
//     },

//     // ios 옵션. 그냥 다 true 하래.
//     // IOS ONLY (optional): default: all - Permissions to register.
//     permissions: {
//       alert: true,
//       badge: true,
//       sound: true,
//     },

//     // 얘도 기본설정.
//     // Should the initial notification be popped automatically
//     // default: true
//     popInitialNotification: true,


//     // 얘도 기본설정. 권한요청인데 걍 true 냅둬.
//     /**
//      * (optional) default: true
//      * - Specified if permissions (ios) and token (android and ios) will requested or not,
//      * - if not, you must call PushNotificationsHandler.requestPermissions() later
//      * - if you are not using remote notification or do not have Firebase installed, use this:
//      *     requestPermissions: Platform.OS === 'ios'
//      */
//     requestPermissions: true,
//   });

//   // ///// 여기서 Channel 생성. 여러개 생성 가능.

//   // PushNotification.createChannel(
//   //   {
//   //     channelId: notificationChannel.notice, // (required)
//   //     channelName: '공지사항', // (required)
//   //     // channelDescription: '앱 실행하는 알림', // (optional) default: undefined.
//   //     soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
//   //     importance: 4, // (optional) default: 4. Int value of the Android notification importance
//   //     vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
//   //   },
//   //   (created: boolean) =>
//   //     console.log(`${notificationChannel.notice} push notification '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
//   // );

//   // PushNotification.createChannel(
//   //   {
//   //     channelId: notificationChannel.musicSelected, // (required)
//   //     channelName: '음악 지정', // (required)
//   //     // channelDescription: '앱 실행하는 알림', // (optional) default: undefined.
//   //     soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
//   //     importance: 4, // (optional) default: 4. Int value of the Android notification importance
//   //     vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
//   //   },
//   //   (created: boolean) =>
//   //     console.log(`${notificationChannel.musicSelected} push notification '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
//   // );


//   // // 체널. 중요
//   // // 체널 여러개 만들고 유저가 설정할 수 있게 만들 수도 있음.
//   // PushNotification.createChannel(
//   //   {
//   //     channelId: notificationChannel.musicChanged, // (required)
//   //     channelName: '음악 변경', // (required)
//   //     // channelDescription: '앱 실행하는 알림', // (optional) default: undefined.
//   //     soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
//   //     importance: 4, // (optional) default: 4. Int value of the Android notification importance
//   //     vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
//   //   },
//   //   (created: boolean) =>
//   //     console.log(`${notificationChannel.musicChanged} push notification '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
//   // );

//   setRemotePushNotification();
//   setLocalPushNotification();
  
// };