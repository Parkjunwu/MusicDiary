import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Alert, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import BaseContainer from "../../../components/shared/BaseContainer";
import { LOCAL_SCHEDULED_ALERT_WRITE } from "../../../pushNotification/constants";
import { FontAppliedBaseTextNeedFontSize } from "../../../styled-components/FontAppliedComponents";
import { ProfileListTabStackParamsList } from "../../../types/navigation/homeNavStackParamsList";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { deleteAllLocalNotifications, setLocalScheduledAlertWriteNotificationNeedHalfDayHourMinute } from "../../../pushNotification/localPushNotification";
import SwitchWithExplanation from "../../../components/profileNav/settingPushNotification/SwitchWithExplanation";
import TimeScrollPicker from "../../../components/profileNav/settingPushNotification/TimeScrollPicker";
import UploadHorizontalEmptyLayoutForBigScreenNeedScreenWidth from "../../../components/upload/UploadHorizontalEmptyLayoutForBigScreenNeedScreenWidth";

const BottomContainer = styled.View`
  flex-direction: row;
  flex: 2;
`;


const halfDayArr = ["오전","오후"];
const hourArr = [1,2,3,4,5,6,7,8,9,10,11,12];
const minuteArr: number[] = [];
for(let i=0;i<60;i++) {
  minuteArr.push(i);
}

type LocalNotificationStoreType = {
  localScheduledAlert: {
    scheduledAlertEnable: boolean;
    halfDay: "오전"|"오후";
    hour: number;
    minute: number;
  };
};

const prevLocalNotiSetting: LocalNotificationStoreType = {
  localScheduledAlert: {
    scheduledAlertEnable: false,
    halfDay: "오후",
    hour: 9,
    minute: 0,
  },
};

const getPrevLocalScheduledAlertSetting = () => prevLocalNotiSetting.localScheduledAlert;

type LocalDBSettingPushNotificationProps = NativeStackScreenProps<ProfileListTabStackParamsList,"SettingPushNotification">;

const LocalDBSettingPushNotification = ({navigation}:LocalDBSettingPushNotificationProps) => {

  const [isLocalAlertEnabled, setIsLocalAlertEnabled] = useState(false);
  const toggleSwitch = () => setIsLocalAlertEnabled(previousState => !previousState);
  const [halfDay, setHalfDay] = useState<"오전"|"오후">("오후");
  const [hour, setHour] = useState<number>(9);
  const [minute, setMinute] = useState<number>(0);

  const [settingReady,setSettingReady] = useState(false);
  
  useEffect(()=>{
    const getPrevSetting = async() => {
      const getLocalPrevSetting = await AsyncStorage.getItem(LOCAL_SCHEDULED_ALERT_WRITE);
      // getLocalPrevSetting && (prevLocalNotiSetting.localScheduledAlert = JSON.parse(getLocalPrevSetting));
      if(getLocalPrevSetting) {
        const { enable, ...rest } = JSON.parse(getLocalPrevSetting);
        const refinedPrevSetting = { scheduledAlertEnable:enable, ...rest };
        prevLocalNotiSetting.localScheduledAlert = refinedPrevSetting;
      };

      console.log("getLocalPrevSetting : "+ getLocalPrevSetting)
      
      if(getLocalPrevSetting) {
        // const { localScheduledAlert:{ scheduledAlertEnable, halfDay, hour, minute} } = prevLocalNotiSetting;
        const { scheduledAlertEnable, halfDay, hour, minute } = getPrevLocalScheduledAlertSetting();

        setIsLocalAlertEnabled(scheduledAlertEnable);
        setHalfDay(halfDay);
        setHour(hour);
        setMinute(minute);
      }
    };

    // 이게 받아지는데 ScrollPicker 에 적용이 안됨.
    getPrevSetting().catch((e)=>console.error(e)).finally(()=>setSettingReady(true));
  },[]);

  const goBack = () => navigation.goBack();

  const isSomethingChange = () => {
    const isLocalChange = () => {
      // const { localScheduledAlert: {scheduledAlertEnable:prevEnable, halfDay:prevHalfDay, hour:prevHour, minute:prevMinute } } = prevLocalNotiSetting;
      const { scheduledAlertEnable:prevLocalAlertEnable, halfDay:prevHalfDay, hour:prevHour, minute:prevMinute } = getPrevLocalScheduledAlertSetting();
      const localSomethingChange = isLocalAlertEnabled !== prevLocalAlertEnable || halfDay !== prevHalfDay || hour !== prevHour || minute !== prevMinute;
      return localSomethingChange;
    };

    return isLocalChange();
  };

  const onPressCancel = () => {
    if(!isSomethingChange()) return goBack();
    Alert.alert("변경 사항이 있습니다. 돌아가시겠습니까?",undefined,[
      {
        text:"돌아가기",
        onPress:goBack,
      },
      {
        text:"취소",
        style:"destructive",
      },
    ]);
  };

  const onPressOk = async() => {
    if(!isSomethingChange()) return goBack();

    deleteAllLocalNotifications();
    if(isLocalAlertEnabled) {
      setLocalScheduledAlertWriteNotificationNeedHalfDayHourMinute(halfDay,hour,minute);
    }

    const localStoreData = {
      enable: isLocalAlertEnabled,
      halfDay,
      hour,
      minute,
    };
    await AsyncStorage.setItem(LOCAL_SCHEDULED_ALERT_WRITE,JSON.stringify(localStoreData));

    Alert.alert("변경 되었습니다.");
    goBack();
  };

  useEffect(()=>{
    navigation.setOptions({
      headerLeft:({tintColor})=><TouchableOpacity onPress={onPressCancel}>
        <Ionicons name="chevron-back" size={24} color={tintColor} />
      </TouchableOpacity>,
      headerRight:()=><TouchableOpacity onPress={onPressOk}>
        <FontAppliedBaseTextNeedFontSize>저장</FontAppliedBaseTextNeedFontSize>
      </TouchableOpacity>,
    });
  },[isLocalAlertEnabled,halfDay,hour,minute,]);

  return (
    <UploadHorizontalEmptyLayoutForBigScreenNeedScreenWidth>
      {settingReady && <>
        <SwitchWithExplanation
          explanation="일기 쓰기 알림 설정"
          value={isLocalAlertEnabled}
          toggleSwitch={toggleSwitch}
        />
        <BottomContainer>
          <TimeScrollPicker
            timeArr={halfDayArr}
            time={halfDay}
            setTime={setHalfDay}
          />
          <TimeScrollPicker
            timeArr={hourArr}
            time={hour}
            setTime={setHour}
          />
          <TimeScrollPicker
            timeArr={minuteArr}
            time={minute}
            setTime={setMinute}
          />
        </BottomContainer>
      </>}
    </UploadHorizontalEmptyLayoutForBigScreenNeedScreenWidth>
  );
};

export default LocalDBSettingPushNotification;






  // const onPressOk = async() => {
  //   if(!isSomethingChange()) return goBack();

  //   PushNotification.cancelAllLocalNotifications();
  //   if(isLocalAlertEnabled) {
  //     // 오후면 12 더해서 getHour 랑 비교, 0시면 12 말고 0으로
  //     let convertedHour = hour;
  //     console.log("hour : "+ hour)
  //     halfDay === "오후" && (convertedHour += 12);
  //     console.log("halfDay : "+ halfDay)
  //     console.log("halfDay === 오후 : "+ (halfDay === "오후"))
  //     hour === 12 && convertedHour - 12;

  //     console.log("convertedHour : "+ convertedHour)

  //     const now = new Date()
  //     const nowYear = now.getFullYear();
  //     const nowMonth = now.getMonth();
  //     const nowDate = now.getDate();
      
  //     console.log("now : "+ now)

  //     const comparedTime = new Date(nowYear,nowMonth,nowDate,convertedHour,minute);

  //     console.log("comparedTime : "+ comparedTime)

  //     console.log("now < comparedTime : "+ (now < comparedTime))

  //     const firstAlertDate = new Date (nowYear,nowMonth,now < comparedTime ? nowDate : nowDate+1,convertedHour,minute);

  //     console.log("firstAlertDate : "+ firstAlertDate)

  //     PushNotification.localNotificationSchedule({
  //       // id: ID,
  //       channelId: LOCAL_SCHEDULED_ALERT_WRITE,
  //       title: '음악일기',
  //       // date: new Date(new Date().getTime()+10000),
  //       date: firstAlertDate,
  //       message: getRandomLocalScheduledAlertMessage(),
  //       // allowWhileIdle: false,
  //       allowWhileIdle: true,
  //       // repeatType: 'minute',
  //       repeatType: 'day',
  //       // repeatTime: 3,
  //       // userInfo: { id: '123' },
  //     });
  //   }
  //   const storeData = {
  //     enable: isLocalAlertEnabled,
  //     halfDay,
  //     hour,
  //     minute,
  //   };
  //   await AsyncStorage.setItem(LOCAL_SCHEDULED_ALERT_WRITE,JSON.stringify(storeData));

  //   Alert.alert("변경 되었습니다.");
  //   goBack();
  // };