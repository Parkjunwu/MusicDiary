import PushNotification, { ChannelObject } from "react-native-push-notification";
import createPushNotificationChannel from "./createPushNotificationChannel";

const local_notificationChannelArr: ChannelObject[] = [
  { channelId: "local_scheduledAlertWrite", channelName: '지정 시간 일기 쓰기' },
];

// 지금은 scheduledAlertWrite 만 쓸거라서 걍 scheduledAlertWrite 로 만듦.

const createLocalScheduledAlertWriteNotificationChannel = () => createPushNotificationChannel(local_notificationChannelArr[0]);

const messages = [
  // '오늘 하루를 작성할 시간입니다.',
  '오늘 하루를 작성할 시간이에요',
  '오늘 하루는 어땠나요?',
  '오늘 하루는 어떠셨나요?',
];

const getRandomLocalScheduledAlertMessage = () => messages[Math.floor(Math.random() * messages.length)];

const setLocalScheduledAlertWriteNotificationNeedHalfDayHourMinute = (halfDay:"오전"|"오후",hour:number,minute:number) => {
  // 오후면 12 더해서 getHour 랑 비교, 0시면 12 말고 0으로
  let convertedHour = hour;
  halfDay === "오후" && (convertedHour += 12);
  hour === 12 && convertedHour - 12;
  
  const now = new Date();
  const nowYear = now.getFullYear();
  const nowMonth = now.getMonth();
  const nowDate = now.getDate();
  
  const comparedTime = new Date(nowYear,nowMonth,nowDate,convertedHour,minute);
  
  const startDate = now < comparedTime ? nowDate : nowDate+1;
  
  const firstAlertDate = new Date (nowYear,nowMonth,startDate,convertedHour,minute);
  
  // console.log("halfDay === 오후 : "+ (halfDay === "오후"))
  // console.log("convertedHour : "+ convertedHour)
  // console.log("now : "+ now)
  // console.log("comparedTime : "+ comparedTime)
  // console.log("now < comparedTime : "+ (now < comparedTime))
  // console.log("firstAlertDate : "+ firstAlertDate);

  PushNotification.localNotificationSchedule({
    // id: ID, // id 있으면 알림이 안됨.
    channelId: local_notificationChannelArr[0].channelId,
    title: '음악일기',
    date: firstAlertDate,
    message: getRandomLocalScheduledAlertMessage(),
    allowWhileIdle: true,
    repeatType: 'day',
  });
};

const deleteAllLocalNotifications = () => PushNotification.cancelAllLocalNotifications();


export {
  createLocalScheduledAlertWriteNotificationChannel,
  setLocalScheduledAlertWriteNotificationNeedHalfDayHourMinute,
  deleteAllLocalNotifications,
};