import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useIsDarkMode from "../hooks/useIsDarkMode";
import { UploadDiaryTabStackParamsList } from "../types/navigation/homeNavStackParamsList";
import TodayDiary from "../screens/mainNav/uploadDiary/TodayDiary";
import DiarySelectPhotoAndVideo from "../screens/mainNav/uploadDiary/DiarySelectPhotoAndVideo";
import UploadGoBackBtn from "../components/upload/UploadGoBackBtn";
import FullScreenVideo from "../screens/mainNav/uploadDiary/FullScreenVideo";
import DiaryPlusPhotoAndVideo from "../screens/mainNav/uploadDiary/DiaryPlusPhotoAndVideo";
import EditVideo from "../screens/mainNav/uploadDiary/EditVideo";
import SearchYoutube from "../screens/youtubeRelated/SearchYoutube";
import WatchYoutube from "../screens/youtubeRelated/WatchYoutube";
import UploadDiary from "../screens/mainNav/uploadDiary/UploadDiary";
import LocalDBUploadDiary from "../screens/useLocalDBScreen/LocalDBUploadDiary";
import Notification from "../screens/mainNav/notification/Notification";
import NotificationDiary from "../screens/mainNav/notification/NotificationDiary";
import MyDiaryDrawerNav from "./MyDiaryDrawerNav";
import EditDiary from "../screens/mainNav/editDiary/EditDiary";
import LocalDBEditDiary from "../screens/useLocalDBScreen/LocalDBEditDiary";
import EditNetworkVideo from "../screens/mainNav/editDiary/EditNetworkVideo";
import RequestSongChange from "../screens/mainNav/myDiary/RequestSongChange";
import LocalDBTodayDiary from "../screens/useLocalDBScreen/LocalDBTodayDiary";
import useGetFontFamily from "../hooks/useGetFontFamily";
import { FontAppliedBaseTextNeedFontSize } from "../styled-components/FontAppliedComponents";
import RequestSong from "../screens/mainNav/uploadDiary/RequsetSong";
import { isAndroid } from "../utils";
import EditDiaryForTemporaryDiaryData from "../screens/mainNav/uploadDiary/EditDiaryForTemporaryDiaryData";
import LocalDBEditDiaryForTemporaryDiaryData from "../screens/useLocalDBScreen/LocalDBEditDiaryForTemporaryDiaryData";
import NotificationDiaryDrawerNav from "./NotificationDiaryDrawerNav";
import PushNotificationBoard from "../screens/rootNav/PushNotificationBoard";

const Stack = createNativeStackNavigator<UploadDiaryTabStackParamsList>();

// UploadStackNavGeneratorNeedWhichComponent ?????? isUploadDiary ????????? ???

type UploadDiaryNavProps = {
  isUsingCache: boolean;
  numberOfUnreadIfZeroIsNull?: number|null;
};

const UploadDiaryNav = ({isUsingCache,numberOfUnreadIfZeroIsNull}:UploadDiaryNavProps) => {

  const isDarkMode = useIsDarkMode();
  const fontFamily = useGetFontFamily("Medium");
  // ?????? UploadDiaryNav ??? MainNav ?????? isUsingCache ??? useReactiveVar ??? ?????? ????????? ???????????? ?????? useReactiveVar ??? useIsUsingCache ??? ??? ????????? ?????????. ?????? props ??? isUsingCache ??? ????????? ??????. ??? ??????????????????
  // const isUsingCache = isLoggedInVar();
  // const isUsingCache = useIsUsingCache();

  return (
    // SafeAreaContainer ??? ?????? MyDiaryDrawerNav ????????? ?????????. TodayDiary ??? ??????. 
    // <SafeAreaContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign:"center",
          headerTintColor: isDarkMode ? "white" : "black",
          headerStyle:{
            backgroundColor: isDarkMode ? "black" : "white",
          },
          headerBackTitleVisible:false,
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
        <Stack.Screen
          name={"TodayDiary"}
          options={{
            headerShown:false,
          }}
        >
          {
            (props)=> isUsingCache ?
              <TodayDiary
                {...props}
                numberOfUnreadIfZeroIsNull={numberOfUnreadIfZeroIsNull}
              />
            :
              <LocalDBTodayDiary
                {...props}
              />
          }
        </Stack.Screen>

        {/* Notification ?????? ?????? */}
        <Stack.Screen
          name={"Notification"}
          component={Notification} 
          options={{
            title:"??????"
          }}
        />
        {/* <Stack.Screen
          name={"NotificationDiary"}
          component={NotificationDiary}
          options={{
            title:""
          }}
        /> */}
        <Stack.Screen
          name={"NotificationDiaryDrawerNav"}
          component={NotificationDiaryDrawerNav}
          options={{
            headerShown:false,
          }}
        />
        <Stack.Screen
          name={"NotificationBoard"}
          component={PushNotificationBoard}
          options={{
            title:""
          }}
        />
        
        <Stack.Screen
          name="UploadDiary"
          component={isUsingCache ? UploadDiary : LocalDBUploadDiary}
          options={{
            ...(isUsingCache ?
                { title: "" }
              :
                { title: "?????? ??????" }
            ),
            headerBackVisible:false,
          }}
        />
        
        {/* ?????????????????? cameraRoll ??? ?????? ?????? ????????? ????????? ?????? ??? ??????. ios ??? expo MediaLibrary ?????? localUri ?????? ?????? ????????? FastImage ??? ??????. cameraRoll ?????? localUri ??? ?????? ??? ?????? ?????? ?????? ????????????. */}
        <Stack.Screen
          name={"DiarySelectPhotoAndVideo"}
          component={DiarySelectPhotoAndVideo}
          options={{
            headerLeft:({tintColor})=><UploadGoBackBtn tintColor={tintColor ?? ""} whichComponent="SelectPhoto" />,
            // headerBackVisible:false,
            // headerBackTitle:"",
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
          name="EditVideo"
          component={EditVideo}
          options={{
            title:"????????? ??????",
            headerBackTitleVisible:false,
            // headerBackButtonMenuEnabled:true,
            headerBackVisible:true
          }}
        />

        {/* {uploadRelatedScreens} */}

        <Stack.Screen
          name="SearchYoutube"
          component={SearchYoutube}
          options={{
            title:"?????? ??????",
            headerBackVisible:false,
          }}
        />
        <Stack.Screen
          name="WatchYoutube"
          component={WatchYoutube}
          options={{
            title:"????????? ?????? ??????",
            headerBackVisible:false,
          }}
        />

        <Stack.Screen
          name="RequestSong"
          component={RequestSong}
          options={{
            title:"?????? ??????",
            // headerShown:false,
            headerBackVisible:false,
          }}
        />
        
        {/* ??????. UploadDiaryNav ??? isUsingCache ??? numberOfUnreadIfZeroIsNull ??? ????????? Shared ??? ??????????????? ?????? ?????? ????????? ???.*/}
        <Stack.Screen
          name="MyDiaryDrawerNav"
          component={MyDiaryDrawerNav}
          options={{
            // title:"",
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
          name="EditNetworkVideo"
          component={EditNetworkVideo}
          options={{
            title:"????????? ??????",
            headerBackTitleVisible:false,
            // headerBackButtonMenuEnabled:true,
            headerBackVisible:true
          }}
        />

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
        {/* ???????????? */}

        <Stack.Screen
          name="EditDiaryForTemporaryDiaryData"
          component={isUsingCache ? EditDiaryForTemporaryDiaryData : LocalDBEditDiaryForTemporaryDiaryData}
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
        
      </Stack.Navigator>
    // </SafeAreaContainer>
  )
};

export default UploadDiaryNav;