import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import useIsDarkMode from '../../hooks/useIsDarkMode';
import useGetFontFamily from '../../hooks/useGetFontFamily';
import { LocalProfileListTabStackParamsList } from '../../types/navigation/homeNavStackParamsList';
import { colors } from '../../js-assets/color';
import LocalDBProfileDrawerNav from './LocalDBProfileDrawerNav';
import FeelChange from '../../screens/profileNav/FeelChange';
import FontChange from '../../screens/profileNav/FontChange';
import Security from '../../screens/profileNav/Security';
import SettingAppPassword from '../../screens/profileNav/SettingAppPassword';
import CheckPasswordForAppStart from '../../screens/profileNav/CheckPasswordForAppStart';
import SettingAppStartPassword from '../../screens/profileNav/SettingAppStartPassword';
import ConfirmAppPassword from '../../screens/profileNav/ConfirmAppPassword';
import CheckAppPassword from '../../screens/profileNav/CheckAppPassword';
import SettingQuote from '../../screens/profileNav/SettingQuote';
import RequestEmailToAdministrator from '../../screens/profileNav/RequestEmailToAdministrator';
import { FontAppliedBaseTextNeedFontSize } from '../../styled-components/FontAppliedComponents';
import { isAndroid } from '../../utils';
import LocalDBSettingPushNotification from '../../screens/useLocalDBNav/localDBProfileNav/LocalDBSettingPushNotification';

const Stack = createNativeStackNavigator<LocalProfileListTabStackParamsList>();

// 이름을 Profile 로 쓸까?

const LocalDBProfileNav = () => {

  const isDarkMode = useIsDarkMode();
  const fontFamily = useGetFontFamily("Medium");

  return (
    <Stack.Navigator screenOptions={{
      headerBackTitleVisible:false,
      // headerTransparent:true,
      // headerTitle:()=>undefined,
      headerTintColor:isDarkMode ? "white" : colors.darkYellow,
      // headerStyle:{backgroundColor:"red"}
      headerTitleStyle: {
        fontSize: 17,
        fontFamily,
        // padding: 3,
      },
      headerStyle:{
        backgroundColor: isDarkMode ? "black" : "white"
      },
      headerTitleAlign:"center",
      headerTitle:({children})=><FontAppliedBaseTextNeedFontSize fontSize={17}>
        {children}
      </FontAppliedBaseTextNeedFontSize>,
      animation: isAndroid ? 'none' : "default",
    }}>
      <Stack.Screen
        name="ProfileDrawerNav"
        component={LocalDBProfileDrawerNav}
        options={{
          headerShown:false,
          headerTransparent:true,
          headerTitle:()=>undefined,
        }}
      />
      <Stack.Screen
        name="FeelChange"
        component={FeelChange}
        options={{
          title:"",
          // headerShown:false,
          headerTransparent:true,
        }}
      />
      <Stack.Screen
        name="FontChange"
        component={FontChange}
        options={{
          title:"폰트 설정",
        }}
      />
      <Stack.Screen
        name="Security"
        component={Security}
        options={{
          title:"보안",
        }}
      />
      <Stack.Screen
        name="SettingAppPassword"
        component={SettingAppPassword}
        options={{
          title:"앱 비밀번호 설정",
        }}
      />

      <Stack.Screen
        name="CheckPasswordForAppStart"
        component={CheckPasswordForAppStart}
        options={{
          title:"비밀번호 입력",
        }}
      />
      <Stack.Screen
        name="SettingAppStartPassword"
        component={SettingAppStartPassword}
        options={{
          title:"앱 시작시 비밀번호 사용 설정",
          headerBackVisible:false,
        }}
      />
      <Stack.Screen
        name="ConfirmAppPassword"
        component={ConfirmAppPassword}
        options={{
          title:"비밀번호 확인",
        }}
      />
      <Stack.Screen
        name="CheckAppPassword"
        component={CheckAppPassword}
        options={{
          title:"현재 비밀번호 입력",
        }}
      />
      {/* 기존에 비밀번호 있으면 변경도 넣어야함. */}
      <Stack.Screen
        name="SettingQuote"
        component={SettingQuote}
        options={{
          title:"좌우명, 문구 설정",
        }}
      />
      {/* <Stack.Screen
        name="SyncDiaries"
        component={SyncDiaries}
        options={{
          title:"일기 동기화",
        }}
      /> */}
      {/* 일기 동기화는 비밀번호 치는 화면으로 가야할듯. */}
      <Stack.Screen
        name="SettingPushNotification"
        // component={SettingPushNotification}
        component={LocalDBSettingPushNotification}
        options={{
          title:"푸시 알림 설정",
          headerBackVisible:false,
        }}
      />
      <Stack.Screen
        name="RequestEmailToAdministrator"
        component={RequestEmailToAdministrator}
        options={{
          title:"메일 보내기",
          headerBackVisible:false,
        }}
      />
      {/* <Stack.Screen
        name="AboutAccount"
        component={AboutAccount}
        options={{
          title:"계정 정보",
        }}
      />
      <Stack.Screen
        name="WithdrawalAccount"
        component={WithdrawalAccount}
        options={{
          title:"회원 탈퇴",
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          title:"프로필 변경",
        }}
      /> */}
      
    </Stack.Navigator>
  );
}
export default LocalDBProfileNav;