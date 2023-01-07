import { gql, useMutation } from "@apollo/client";
import messaging from '@react-native-firebase/messaging';
import client, { isLoggedInVar, REFRESH_TOKEN, accessTokenVar, cache } from "../apollo";
import EncryptedStorage from 'react-native-encrypted-storage';
import { registerPushNotiToken, registerPushNotiTokenVariables } from "../__generated__/registerPushNotiToken";
// import useMe from "./useMe";
import { login_login_loggedInUser } from "../__generated__/login";
import updateMeCache from "../cache/updateMeCache";
import updateThisMonthCalendarData from "../cache/updateThisMonthCalendarData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOCAL_DB_TEMPORARY_EDIT_DIARY } from "../temporaryDiary/constant";
// import { PUSH_NOTIFICATION_TOKEN } from "../pushNotification/setDevicePushNotification";


const REGISTER_PUSH_NOTI_TOKEN = gql`
  mutation registerPushNotiToken( $deviceToken: String! ) {
    registerPushNotiToken( deviceToken: $deviceToken ){
      ok
      error
    }
  }
`;

type logInSettingFnType = (props:{
  accessToken: string,
  refreshToken: string,
  loggedInUser: login_login_loggedInUser | null,
}) => Promise<void>;

const useLogIn = () => {
  const [register] = useMutation<registerPushNotiToken,registerPushNotiTokenVariables>(REGISTER_PUSH_NOTI_TOKEN);

  // const registerPushNotiToken = useRegisterPushNotiToken();
  
  const logInSettingNeedTokenAndUserInfo: logInSettingFnType = async({
    accessToken,
    refreshToken,
    loggedInUser,
  }) => {

    await client.resetStore();
    
    await EncryptedStorage.setItem(REFRESH_TOKEN,refreshToken);
    
    // isLoggedInVar 를 먼저 변경해서? me 받고 로그아웃됨.? accessTokenVar 를 먼저 받아봄. 일단 되긴 하는데.
    accessTokenVar(accessToken);

    // refetch 말고 me 캐시 변경. 걍 캐시를 받음.
    // await refetch();
    updateMeCache(cache,loggedInUser);
    updateThisMonthCalendarData(cache,loggedInUser);
    
    isLoggedInVar(true);

    AsyncStorage.removeItem(LOCAL_DB_TEMPORARY_EDIT_DIARY); // 추가

    try {
      // 디바이스가 등록이 안되어 있으면 등록. 처음 설치했을때만 실행됨.
      if (!messaging().isDeviceRegisteredForRemoteMessages) {
        await messaging().registerDeviceForRemoteMessages();
      }
        // 토큰 받음
      const deviceToken = await messaging().getToken();
      // const deviceToken = PUSH_NOTIFICATION_TOKEN;
      // console.log("PUSH_NOTIFICATION_TOKEN : "+PUSH_NOTIFICATION_TOKEN);
      console.log("deviceToken : "+deviceToken);

        // 토큰 백엔드 업로드
      const isRegisterOk = await register({
        variables:{
          deviceToken
        }
      });
      if(!isRegisterOk.data?.registerPushNotiToken.ok) {
        console.log("useLogIn 의 registerPushNotiToken / 토큰 등록 실패")
        console.log(isRegisterOk.data?.registerPushNotiToken.error);
      }
    } catch (error) {
      console.log("useLogIn / 토큰 받기 or 등록 실패");
      console.error(error);
    }
    // registerPushNotiToken();

  };
  return logInSettingNeedTokenAndUserInfo;
};

export default useLogIn;



// export const useRegisterPushNotiToken = () => {
//   const [register] = useMutation<registerPushNotiToken,registerPushNotiTokenVariables>(REGISTER_PUSH_NOTI_TOKEN);

//   const registerPushNotiToken = async() => {
//     try {
//       // 디바이스가 등록이 안되어 있으면 등록. 처음 설치했을때만 실행됨.
//       if (!messaging().isDeviceRegisteredForRemoteMessages) {
//         await messaging().registerDeviceForRemoteMessages();
//       }
//         // 토큰 받음
//       const deviceToken = await messaging().getToken();
//       // const deviceToken = PUSH_NOTIFICATION_TOKEN;
//       // console.log("PUSH_NOTIFICATION_TOKEN : "+PUSH_NOTIFICATION_TOKEN);
//       console.log("deviceToken : "+deviceToken);

//         // 토큰 백엔드 업로드
//       const isRegisterOk = await register({
//         variables:{
//           deviceToken,
//         },
//       });
//       if(!isRegisterOk.data?.registerPushNotiToken.ok) {
//         console.log("useLogIn 의 registerPushNotiToken / 토큰 등록 실패")
//         console.log(isRegisterOk.data?.registerPushNotiToken.error);
//       }
//     } catch (error) {
//       console.log("useLogIn / 토큰 받기 or 등록 실패");
//       console.error(error);
//     }
//   };

//   return registerPushNotiToken;
// };