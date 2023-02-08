import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import TabIcon from "../components/mainNav/TabIcon";
import ForResetSharedNavScreen from "../components/sharedStackNav/ForResetSharedNavScreen";
import SharedStackNav from "./SharedStackNav";
import { MainNavTabParamsList } from "../types/navigation/homeNavStackParamsList";
import UploadDiaryNav from "./UploadDiaryNav";
import LocalDBProfileNav from "./useLocalDBNav/LocalDBProfileNav";
import BoardNavForNotLogInUser from "./BoardNavForNotLogInUser";
import useIsDarkMode from "../hooks/useIsDarkMode";


const Tab = createBottomTabNavigator<MainNavTabParamsList>();

const MainNav_useLocalDB = () => {

  const isDarkMode = useIsDarkMode();

  // Upload, List, Notification, Me
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown:false,
        tabBarStyle:{
          backgroundColor: isDarkMode ? "black" : "white",
          borderTopColor: isDarkMode ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)",
        },
        tabBarActiveTintColor: isDarkMode ? "white" : "rgba(0,0,0,0.7)",
        tabBarShowLabel:false,
      }}
      initialRouteName="UploadDiaryTab"
    >

      <Tab.Screen
        name="UploadDiaryTab"
        options={{
          tabBarIcon:({focused, color})=>
          <Feather name="edit-3" size={24} color={color} />
          // <Text style={{fontSize:11,fontWeight:"900",color}}>TODAY</Text>
        }}
        >
        {()=><UploadDiaryNav
          isUsingCache={false}
        />}
      </Tab.Screen>

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
        name="BoardTab"
        component={BoardNavForNotLogInUser} // 아직 안함
        options={{
          tabBarIcon:({focused,color})=>
          <MaterialCommunityIcons name={focused ? "clipboard-text" : "clipboard-text-outline"} size={24} color={color} />
        }}
      />

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