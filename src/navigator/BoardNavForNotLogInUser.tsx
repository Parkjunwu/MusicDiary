import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAppliedBaseTextNeedFontSize } from '../styled-components/FontAppliedComponents';
import { isAndroid } from '../utils';
import useColorsChangedByDarkMode from '../hooks/useColorsChangedByDarkMode';
import useGetFontFamily from '../hooks/useGetFontFamily';
import { BoardTabForNotLogInUserStackParamsList } from '../types/navigation/homeNavStackParamsList';
import Board from '../screens/boardNav/Board';
import NewBoardList from '../screens/boardNav/BoardList';
import SearchBoard from '../screens/boardNav/SearchBoard';
import UserBoardProfile from '../screens/boardNav/UserBoardProfile';
import MyBoardList from '../screens/boardNav/MyBoardList';

const Stack = createNativeStackNavigator<BoardTabForNotLogInUserStackParamsList>();

// 이름을 Profile 로 쓸까?

const BoardNavForNotLogInUser = () => {

  const { backgroundColor, textColor } = useColorsChangedByDarkMode();
  const fontFamily = useGetFontFamily("Medium");

  return (
    <Stack.Navigator screenOptions={{
      headerBackTitleVisible:false,
      headerTintColor: textColor,
      headerTitleStyle: {
        fontSize: 17,
        fontFamily,
      },
      headerStyle:{
        backgroundColor,
      },
      headerTitleAlign:"center",
      headerTitle:({children})=><FontAppliedBaseTextNeedFontSize fontSize={17}>
        {children}
      </FontAppliedBaseTextNeedFontSize>,
      animation: isAndroid ? 'none' : "default",
    }}>
      <Stack.Screen
        name="NewBoardList"
        component={NewBoardList}
        options={{
          title:"게시판",
        }}
      />
      <Stack.Screen
        name="MyBoardList"
        component={MyBoardList}
        options={{
          title:"내 글 목록",
        }}
      />
      <Stack.Screen
        name="SearchBoard"
        component={SearchBoard}
        options={{
          title:"게시글 찾기",
          // headerShown:false,
        }}
      />
      <Stack.Screen
        name="Board"
        component={Board}
        options={{
          title:"게시글",
        }}
      />
      <Stack.Screen
        name="UserBoardProfile"
        component={UserBoardProfile}
        options={{
          title:"프로필",
          headerBackTitleVisible:false,
          // headerBackButtonMenuEnabled:true,
          headerBackVisible:true
        }}
      />
    </Stack.Navigator>
  );
}
export default BoardNavForNotLogInUser;