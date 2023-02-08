import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAppliedBaseTextNeedFontSize } from '../styled-components/FontAppliedComponents';
import { isAndroid } from '../utils';
import useColorsChangedByDarkMode from '../hooks/useColorsChangedByDarkMode';
import useGetFontFamily from '../hooks/useGetFontFamily';
import AccuseBoard from '../screens/boardNav/AccuseBoard';
import { BoardTabStackParamsList } from '../types/navigation/homeNavStackParamsList';
import Board from '../screens/boardNav/Board';
import NewBoardList from '../screens/boardNav/BoardList';
import SearchBoard from '../screens/boardNav/SearchBoard';
import UploadBoard from '../screens/boardNav/UploadBoard';
import DiaryPlusPhotoAndVideo from '../screens/mainNav/uploadDiary/DiaryPlusPhotoAndVideo';
import EditBoard from '../screens/boardNav/EditBoard';
import DiarySelectPhotoAndVideo from '../screens/mainNav/uploadDiary/DiarySelectPhotoAndVideo';
import FullScreenVideo from '../screens/mainNav/uploadDiary/FullScreenVideo';
import EditVideo from '../screens/mainNav/uploadDiary/EditVideo';
import EditNetworkVideo from '../screens/mainNav/editDiary/EditNetworkVideo';
import UserBoardProfile from '../screens/boardNav/UserBoardProfile';
import BoardDrawerNav from './BoardDrawerNav';
import MyBoardList from '../screens/boardNav/MyBoardList';
import EditBoardForTemporaryBoardData from '../screens/boardNav/EditBoardForTemporaryBoardData';

// const Stack = createNativeStackNavigator<LocalProfileListTabStackParamsList>();
const Stack = createNativeStackNavigator<BoardTabStackParamsList>();

// 이름을 Profile 로 쓸까?

const BoardNav = () => {

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
      {/* <Stack.Screen
        name="NewBoardList"
        component={NewBoardList}
        options={{
          title:"게시판",
        }}
      /> */}
      <Stack.Screen
        name="BoardDrawerNav"
        component={BoardDrawerNav}
        options={{
          headerShown:false
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
        name="UploadBoard"
        component={UploadBoard}
        options={{
          title:"게시물 작성",
          headerBackVisible: false,
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
        name="AccuseBoard"
        component={AccuseBoard}
        options={{
          title:"신고하기",
        }}
      />
      <Stack.Screen
        name="EditBoard"
        component={EditBoard}
        options={{
          title:"게시물 작성",
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="EditBoardForTemporaryBoardData"
        component={EditBoardForTemporaryBoardData}
        options={{
          headerBackVisible:false,
          title:"",
        }}
      />

      <Stack.Screen
        name={"DiaryPlusPhotoAndVideo"}
        component={DiaryPlusPhotoAndVideo}
        options={{
          title:"사진 추가",
          headerBackVisible:false,
        }}
      />
      <Stack.Screen
        name={"DiarySelectPhotoAndVideo"}
        component={DiarySelectPhotoAndVideo}
        options={{
          // headerLeft:({tintColor})=><UploadGoBackBtn tintColor={tintColor ?? ""} whichComponent="SelectPhoto" />,
          // headerBackVisible:false,
          title:"사진 선택",
          headerBackTitleVisible:false,
          // headerBackVisible:false,
        }}
      />
      <Stack.Screen
        name="FullScreenVideo"
        component={FullScreenVideo}
        options={{
          // title:"선택한 동영상",
          title:"",
          headerBackTitleVisible:false,
        }}
      />

      <Stack.Screen
        name="EditVideo"
        component={EditVideo}
        options={{
          title:"동영상 편집",
          headerBackTitleVisible:false,
          // headerBackButtonMenuEnabled:true,
          headerBackVisible:true
        }}
      />
      <Stack.Screen
        name="EditNetworkVideo"
        component={EditNetworkVideo}
        options={{
          title:"동영상 편집",
          headerBackTitleVisible:false,
          // headerBackButtonMenuEnabled:true,
          headerBackVisible:true
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
export default BoardNav;