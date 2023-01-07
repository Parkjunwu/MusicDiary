import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import messaging from '@react-native-firebase/messaging';
import useOnPressPushNotification from "../hooks/useOnPressPushNotification";
import useMe from "../hooks/useMe";
import { HomeNavStackParamsList } from "../types/navigation/homeNavStackParamsList";
import { isAndroid } from "../utils";
import MainNav from "./MainNav";

const Stack = createNativeStackNavigator<HomeNavStackParamsList>();

const HomeNav = () => {

  const {data:currentUser} = useMe();

  // notification 눌러서 들어왔을 경우
  const notificationNavigate = useOnPressPushNotification();
  
  useEffect(()=>{
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        '백그라운드에서 noti 눌러서 들어옴',
        remoteMessage.data,
      );
      
      // receiverUserId 가 있다는건 현재 유저랑 같은지 확인하는거. 현재는 message 받은 때만 확인함. 다르면 return
      const receiverUserId = remoteMessage.data?.receiverUserId;
      // 로그인 안한 상태면 currentUser null 이니까 ?.체크
      const isNotCurrentUsersMessage = receiverUserId !== String(currentUser?.me?.id);
      if(receiverUserId && isNotCurrentUsersMessage) return;

      notificationNavigate(remoteMessage.data);
    });

    const appOpenPushMessage = async() => {
      const message = await messaging().getInitialNotification()
      if (message) {
        console.log(
          '꺼진 상태에서 noti 눌러서 들어옴',
          message.data,
        );

        // 얘도 onNotificationOpenedApp 랑 마찬가지
        const receiverUserId = message.data?.receiverUserId;
        const isNotCurrentUsersMessage = receiverUserId !== String(currentUser?.me?.id);
        if(receiverUserId && isNotCurrentUsersMessage) return;

        notificationNavigate(message.data);
      }
    }
    appOpenPushMessage();
  },[])

  return (
    <Stack.Navigator
      screenOptions={{
        ...(isAndroid && {
          headerTitleStyle: {
            fontSize: 15,
            fontWeight: "bold",
          },
        }),
      }}
    >
      <Stack.Screen name="MainNav" component={MainNav} options={{
        headerShown:false,
      }} />
    </Stack.Navigator>
  );
}
export default HomeNav;