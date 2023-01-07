import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useColorScheme } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import TabIcon from "../components/mainNav/TabIcon";
import ForResetSharedNavScreen from "../components/sharedStackNav/ForResetSharedNavScreen";
import SharedStackNav from "./SharedStackNav";
import { MainNavTabParamsList } from "../types/navigation/homeNavStackParamsList";
import UploadDiaryNav from "./UploadDiaryNav";
import LocalDBProfileNav from "./useLocalDBNav/LocalDBProfileNav";

const Tab = createBottomTabNavigator<MainNavTabParamsList>();

const MainNav_useLocalDB = () => {

  const darkModeSubscription = useColorScheme();

  // Upload, List, Notification, Me
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown:false,
        tabBarStyle:{
          backgroundColor: darkModeSubscription === "light" ? "white" : "black",
          borderTopColor: darkModeSubscription === "light" ? "rgba(0,0,0,0.5)":"rgba(255,255,255,0.5)",
        },
        tabBarActiveTintColor: darkModeSubscription === "light" ? "rgba(0,0,0,0.7)" : "white",
        tabBarShowLabel:false,
      }}
      initialRouteName="UploadDiaryTab"
    >

      <Tab.Screen
        name="MyDiaryListTab"
        options={{
          tabBarIcon:({focused,color})=>
          <TabIcon iconName="md-book" focused={focused} color={color}/>
        }}
      >
        {() => (
          <ForResetSharedNavScreen>
            <SharedStackNav screenName="MyDiaryList"/>
          </ForResetSharedNavScreen>
        )} 
      </Tab.Screen>

      <Tab.Screen
        name="UploadDiaryTab"
        options={{
          tabBarIcon:({focused, color})=>
          <Feather name="edit-3" size={24} color={color} />
        }}
        >
        {()=><UploadDiaryNav
          isUsingCache={false}
        />}
      </Tab.Screen>
      <Tab.Screen
        name="ProfileListTab"
        component={LocalDBProfileNav}
        options={{
          tabBarIcon:({focused,color})=>
          <TabIcon iconName="person" focused={focused} color={color}/>
        }}
      />

    </Tab.Navigator>
  );
};

export default MainNav_useLocalDB;