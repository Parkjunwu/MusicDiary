import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import useIsDarkMode from "../hooks/useIsDarkMode";
import LogOutCompletedView from "../screens/otherScreens/LogOutCompletedView";
import { isAndroid } from "../utils";
import AuthNav from "./AuthNav";
import HomeNav from "./HomeNav";

type RootNavStackParamsList = {
  HomeNav: undefined;
  AuthNav: undefined;
  LogOutCompletedView: undefined;
};

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
    </Stack.Navigator>
  );
};

export default RootNav;