import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useColorScheme } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import TabIcon from "../components/mainNav/TabIcon";
import ForResetSharedNavScreen from "../components/sharedStackNav/ForResetSharedNavScreen";
import SharedStackNav from "./SharedStackNav";
import { MainNavTabParamsList } from "../types/navigation/homeNavStackParamsList";
import UploadDiaryNav from "./UploadDiaryNav";
import ProfileNav from "./ProfileNav";
import useMe from "../hooks/useMe";
import { UpdateQueryFn } from "@apollo/client/core/watchQueryOptions";
import { me } from "../__generated__/me";
import { userNotificationUpdate } from "../__generated__/userNotificationUpdate";
import { USER_NOTIFICATION_UPDATE } from "../gql/forCodeGen";
import subscribeToMoreExecuteOnlyOnceNeedWholeSubscribeToMoreFnAndQueryData from "../logic/subscribeToMoreExcuteOnlyOnce";


const Tab = createBottomTabNavigator<MainNavTabParamsList>();

const MainNav_useCache = () => {

  // subscription 을 MainNav 에서 받아야함. Today 에 놓으면 Today 화면에서만 subscription 받아짐. 그럼 결국 앱을 쓸 때 subscription 을 못받는 거랑 마찬가지임.
  // 글고 이렇게 쓸라면 isUsingCache 으로 확실하게 화면을 나눠버려야 함. MainNav 자체를
  const { data, subscribeToMore } = useMe();

  const updateQuery:UpdateQueryFn<me,null,userNotificationUpdate> = (prev,{subscriptionData}) => {
    if(!subscriptionData.data.userNotificationUpdate?.id) {
      return prev;
    }
    const isMeData = prev.me;
    let prevTotalUnreadNotification = 0;
    let prevRest;
    if(isMeData){
      const { totalUnreadNotification, ...rest } = isMeData;
      prevTotalUnreadNotification = totalUnreadNotification;
      prevRest = rest;
    }
    return Object.assign({}, prev, {
      me: {
        totalUnreadNotification: isMeData ? prevTotalUnreadNotification + 1 : 1,
        ...prevRest,
      },
    });
  };

  // 캐시 바뀌면 렌더링 되서 걍 변수로 씀
  const totalUnreadNotification = data?.me?.totalUnreadNotification;
  // 0 이거나 null, undefined 인 경우 전부 null
  // 얘를 MainNav > UploadDiaryNav > TodayDiary 보냄.
  const numberOfUnreadIfZeroIsNull = totalUnreadNotification ? totalUnreadNotification : null;

  // notification subscribe 하고 캐시까지 변경하는 함수
  const wholeSubscribeToMoreFn = () => {
    console.log("subscribe")
    subscribeToMore({
      document:USER_NOTIFICATION_UPDATE,
      updateQuery,
      onError:(err) => console.error("error is "+err),
    });
  };
  
  // subscription 한번만 실행되게 하기 위함
  subscribeToMoreExecuteOnlyOnceNeedWholeSubscribeToMoreFnAndQueryData(wholeSubscribeToMoreFn,data?.me?.totalUnreadNotification);

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
      // />
      >
        {()=><UploadDiaryNav
          isUsingCache={true}
          numberOfUnreadIfZeroIsNull={numberOfUnreadIfZeroIsNull}
        />}
      </Tab.Screen>

      <Tab.Screen
        name="ProfileListTab"
        component={ProfileNav}
        options={{
          tabBarIcon:({focused,color})=>
          <TabIcon iconName="person" focused={focused} color={color}/>
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNav_useCache;