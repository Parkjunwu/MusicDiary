import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { LOCAL_SCHEDULED_ALERT_WRITE } from "../../../pushNotification/constants";

type AsyncStorageStoreType = {
  enable: boolean;
  halfDay: "오전"|"오후";
  hour: number;
  minute: number;
};

let prevSetting: AsyncStorageStoreType = {
  enable: false,
  halfDay: "오후",
  hour: 9,
  minute: 0,
};

type useGetAndSetPrevSettingProps = {
  setIsEnabled: ;
  setHalfDay: ;
  setHour: ;
  setMinute: ;
};

const useGetAndSetPrevSetting = ({
  setIsEnabled,
  setHalfDay,
  setHour,
  setMinute,
}: useGetAndSetPrevSettingProps) => {
  const [settingReady,setSettingReady] = useState(false);
  
  useEffect(()=>{
    const getPrevSetting = async() => {
      const getPrevSetting = await AsyncStorage.getItem(LOCAL_SCHEDULED_ALERT_WRITE);
      // const prevSetting: AsyncStorageStoreType = getPrevSetting && JSON.parse(getPrevSetting);
      getPrevSetting && (prevSetting = JSON.parse(getPrevSetting));

      console.log("prevSetting : "+ getPrevSetting)
      // if(prevSetting) {
      if(getPrevSetting) {
        const { enable, halfDay, hour, minute } = prevSetting;
        setIsEnabled(enable);
        setHalfDay(halfDay);
        setHour(hour);
        setMinute(minute);
      }
    };

    // Promise 안쓰면 ScrollPicker 에 안 받아짐.
    getPrevSetting().catch((e)=>console.error(e)).finally(()=>setSettingReady(true));
  },[]);

  return settingReady;
};

export default useGetAndSetPrevSetting;