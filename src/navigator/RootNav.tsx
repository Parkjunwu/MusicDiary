import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import GoHomeBtn from "../components/rootNav/GoHomeBtn";
import PushNotificationBoard from "../screens/rootNav/PushNotificationBoard";
import useIsDarkMode from "../hooks/useIsDarkMode";
import LogOutCompletedView from "../screens/otherScreens/LogOutCompletedView";
import RootNavStackParamsList from "../types/navigation/rootNavStackParamsList";
import { isAndroid } from "../utils";
import AuthNav from "./AuthNav";
import HomeNav from "./HomeNav";
import NotificationDiaryDrawerNav from "./NotificationDiaryDrawerNav";
import RequestSongChange from "../screens/mainNav/myDiary/RequestSongChange";
import SearchYoutube from "../screens/youtubeRelated/SearchYoutube";
import WatchYoutube from "../screens/youtubeRelated/WatchYoutube";

const Stack = createNativeStackNavigator<RootNavStackParamsList>();

const RootNav = () => {

  const isDarkMode = useIsDarkMode();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle:{
          backgroundColor: isDarkMode ? "black" : "white",
        },
        headerTintColor: isDarkMode ? "white" : "black",
        headerTitleAlign:"center",
        headerShown:false,
        animation: isAndroid ? 'none' : "default",
      }}
    >
      <Stack.Screen
        name="HomeNav"
        component={HomeNav}
      />
      <Stack.Screen
        name="AuthNav"
        component={AuthNav}
      />
      <Stack.Screen
        name="LogOutCompletedView"
        component={LogOutCompletedView}
      />
      <Stack.Screen name="PushNotificationBoard" component={PushNotificationBoard} options={{
        title:"게시물",
        headerShown:true,
        headerLeft:({tintColor})=><GoHomeBtn tintColor={tintColor+""}/>
      }}/>
      <Stack.Screen name="PushNotificationDiaryNav" component={NotificationDiaryDrawerNav}/>
      <Stack.Screen
        name="RequestSongChange"
        component={RequestSongChange}
        options={{
          title:"음악 변경 재신청",
          headerShown:true,
        }}
      />
      <Stack.Screen
        name="ChangeYoutubeSong"
        component={SearchYoutube}
        options={{
          title:"유튜브 찾기",
          headerBackVisible:false,
          headerShown:true,
        }}
      />
      <Stack.Screen
        name="WatchYoutube"
        component={WatchYoutube}
        options={{
          title:"유튜브 영상 보기",
          headerShown:true,
        }}
      />
    </Stack.Navigator>
  );
};

export default RootNav;