import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import UploadGoBackBtn from "../components/upload/UploadGoBackBtn";
import useIsDarkMode from "../hooks/useIsDarkMode";
import EditDiary from "../screens/mainNav/editDiary/EditDiary";
import EditNetworkVideo from "../screens/mainNav/editDiary/EditNetworkVideo";
import Calendar from "../screens/mainNav/myDiary/Calendar";
import LocalDBMyDiaryList from "../screens/useLocalDBScreen/LocalDBMyDiaryList";
import MyDiaryList from "../screens/mainNav/myDiary/MyDiaryList";
import RequestSongChange from "../screens/mainNav/myDiary/RequestSongChange";
import SearchMyDiaries from "../screens/mainNav/myDiary/SearchMyDiaries";
import DiaryPlusPhotoAndVideo from "../screens/mainNav/uploadDiary/DiaryPlusPhotoAndVideo";
import DiarySelectPhotoAndVideo from "../screens/mainNav/uploadDiary/DiarySelectPhotoAndVideo";
import FullScreenVideo from "../screens/mainNav/uploadDiary/FullScreenVideo";
import SearchYoutube from "../screens/youtubeRelated/SearchYoutube";
import WatchYoutube from "../screens/youtubeRelated/WatchYoutube";
import MyDiaryDrawerNav from "./MyDiaryDrawerNav";
import useIsUsingCache from "../hooks/useIsUsingCache";
import LocalDBEditDiary from "../screens/useLocalDBScreen/LocalDBEditDiary";
import LocalDBSearchMyDiaries from "../screens/useLocalDBScreen/LocalDBSearchMyDiaries";
import LocalDBCalendar from "../screens/useLocalDBScreen/LocalDBCalendar";
import useGetFontFamily from "../hooks/useGetFontFamily";
import { FontAppliedBaseTextNeedFontSize } from "../styled-components/FontAppliedComponents";
import { isAndroid } from "../utils";

const Stack = createNativeStackNavigator();

interface ISharedStackNavProps {
  screenName: string;
}

const SharedStackNav: React.FC<ISharedStackNavProps> = ({screenName}) => {

  const isDarkMode = useIsDarkMode();
  const fontFamily = useGetFontFamily("Medium");
  const isUsingCache = useIsUsingCache();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle:{
          backgroundColor: isDarkMode ? "black" : "white"
        },
        headerTintColor: isDarkMode ? "white" : "black",
        headerShadowVisible:true,
        headerBackTitleVisible:false,
        headerTitleAlign:"center",
        headerTitleStyle: {
          fontSize: 17,
          fontFamily,
        },
        headerTitle:({children})=><FontAppliedBaseTextNeedFontSize fontSize={17}>
          {children}
        </FontAppliedBaseTextNeedFontSize>,
        animation: isAndroid ? 'none' : "default",
      }}
    >
      {
        screenName === "MyDiaryList"
        ?
          <>
            <Stack.Screen
              name={"MyDiaryList"}
              component={isUsingCache ? MyDiaryList : LocalDBMyDiaryList}
              options={{title:"??? ?????? ??????"}}
            />
            <Stack.Screen
              name={"SearchMyDiaries"}
              component={isUsingCache ? SearchMyDiaries : LocalDBSearchMyDiaries}
              // options={{headerShown:false}}
              options={{title:"?????? ??????"}}
            />
            <Stack.Screen
              name={"Calendar"}
              component={isUsingCache ?  Calendar : LocalDBCalendar}
              options={{title:"?????????"}}
            />
          </>
        :
          null
      }

      <Stack.Screen
        name="MyDiaryDrawerNav"
        component={MyDiaryDrawerNav}
        options={{
          title:"",
          headerShown:false,
        }}
      />

      <Stack.Screen
        name="EditDiary"
        component={isUsingCache ? EditDiary : LocalDBEditDiary}
        options={{
          headerBackVisible:false,
          ...(isUsingCache ? {
              title: "",
            }
          :
            { title: "?????? ??????" }
          ),
        }}
      />

      <Stack.Screen
        name={"DiarySelectPhotoAndVideo"}
        component={DiarySelectPhotoAndVideo}
        options={{
          headerLeft:({tintColor})=><UploadGoBackBtn tintColor={tintColor ?? ""} whichComponent="SelectPhoto" />,
          title:"?????? ??????",
          headerBackVisible:false,
        }}
      />

      <Stack.Screen
        name={"DiaryPlusPhotoAndVideo"}
        component={DiaryPlusPhotoAndVideo}
        options={{
          title:"?????? ??????",
          headerBackVisible:false,
        }}
      />

      <Stack.Screen
        name="FullScreenVideo"
        component={FullScreenVideo}
        options={{
          // title:"????????? ?????????",
          title:"",
          headerBackTitleVisible:false,
        }}
      />

      <Stack.Screen
        name="EditNetworkVideo"
        component={EditNetworkVideo}
        options={{
          title:"????????? ??????",
          headerBackTitleVisible:false,
          // headerBackButtonMenuEnabled:true,
          headerBackVisible:true
        }}
      />

        {/* MyDiaryDrawerNav ?????? ?????????. ?????? ????????? warn ???. */}
      <Stack.Screen
        name="RequestSongChange"
        component={RequestSongChange}
        options={{
          title:"?????? ?????? ??????",
        }}
      />
      <Stack.Screen
        name="ChangeYoutubeSong"
        component={SearchYoutube}
        options={{
          title:"????????? ??????",
          headerBackVisible:false,
        }}
      />
      <Stack.Screen
        name="WatchYoutube"
        component={WatchYoutube}
        options={{
          title:"????????? ?????? ??????",
        }}
      />

    </Stack.Navigator>
  );
};

export default SharedStackNav;
