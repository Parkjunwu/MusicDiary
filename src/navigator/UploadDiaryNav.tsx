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

const Stack = createNativeStackNavigator<UploadDiaryTabStackParamsList>();

// UploadStackNavGeneratorNeedWhichComponent 에서 isUploadDiary 부분만 뺌

type UploadDiaryNavProps = {
  isUsingCache: boolean;
  numberOfUnreadIfZeroIsNull?: number|null;
};

const UploadDiaryNav = ({isUsingCache,numberOfUnreadIfZeroIsNull}:UploadDiaryNavProps) => {

  const isDarkMode = useIsDarkMode();
  const fontFamily = useGetFontFamily("Medium");
  // 지금 UploadDiaryNav 는 MainNav 에서 isUsingCache 을 useReactiveVar 로 받고 있어서 여기서도 굳이 useReactiveVar 인 useIsUsingCache 로 쓸 필요는 없을듯. 아님 props 로 isUsingCache 를 받아도 되고. 좀 복잡해지지만
  // const isUsingCache = isLoggedInVar();
  // const isUsingCache = useIsUsingCache();

  return (
    // SafeAreaContainer 를 쓰면 MyDiaryDrawerNav 헤더가 안맞음. TodayDiary 로 옮김. 
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

        <Stack.Screen
          name={"Notification"}
          component={Notification} 
          options={{
            title:"알림"
          }}
        />
        <Stack.Screen
          name={"NotificationDiary"}
          component={NotificationDiary}
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
                { title: "일기 작성" }
            ),
            headerBackVisible:false,
          }}
        />
        
        {/* 안드로이드는 cameraRoll 을 써야 외부 저장소 파일을 받을 수 있음. ios 는 expo MediaLibrary 써야 localUri 받고 얘로 받아야 FastImage 에 나옴. cameraRoll 에서 localUri 는 바로 못 받고 따로 다시 받아야함. */}
        <Stack.Screen
          name={"DiarySelectPhotoAndVideo"}
          component={DiarySelectPhotoAndVideo}
          options={{
            headerLeft:({tintColor})=><UploadGoBackBtn tintColor={tintColor ?? ""} whichComponent="SelectPhoto" />,
            // headerBackVisible:false,
            // headerBackTitle:"",
            title:"사진 선택",
            headerBackVisible:false,
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

        {/* {uploadRelatedScreens} */}

        <Stack.Screen
          name="SearchYoutube"
          component={SearchYoutube}
          options={{
            title:"음악 선택",
            headerBackVisible:false,
          }}
        />
        <Stack.Screen
          name="WatchYoutube"
          component={WatchYoutube}
          options={{
            title:"유튜브 영상 보기",
            headerBackVisible:false,
          }}
        />

        <Stack.Screen
          name="RequestSong"
          component={RequestSong}
          options={{
            title:"음악 추천",
            // headerShown:false,
            headerBackVisible:false,
          }}
        />
        
        {/* 추가. UploadDiaryNav 가 isUsingCache 랑 numberOfUnreadIfZeroIsNull 를 받아서 Shared 에 안넣엇는데 그냥 추가 시켜도 됨.*/}
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
              { title: "일기 수정" }
            ),
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
          name="RequestSongChange"
          component={RequestSongChange}
          options={{
            title:"음악 변경 신청",
          }}
        />
        <Stack.Screen
          name="ChangeYoutubeSong"
          component={SearchYoutube}
          options={{
            title:"유튜브 찾기",
            headerBackVisible:false,
          }}
        />
        {/* 여기까지 */}

        <Stack.Screen
          name="EditDiaryForTemporaryDiaryData"
          component={isUsingCache ? EditDiaryForTemporaryDiaryData : LocalDBEditDiaryForTemporaryDiaryData}
          options={{
            headerBackVisible:false,
            ...(isUsingCache ? {
                title: "",
              }
            :
              { title: "일기 수정" }
            ),
          }}
        />
        
      </Stack.Navigator>
    // </SafeAreaContainer>
  )
};

export default UploadDiaryNav;