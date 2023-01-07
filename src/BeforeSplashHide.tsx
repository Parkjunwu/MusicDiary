import { useCallback, useEffect, useState } from "react";
import SplashScreen from "react-native-splash-screen";
import { ApolloCache, DefaultContext, FetchResult, gql, MutationFunctionOptions, MutationUpdaterFunction, useMutation } from "@apollo/client";
import { ME_FRAGMENT } from "./gql/fragment";
import { autoLogin, autoLoginVariables, autoLogin_autoLogin_loggedInUser } from "./__generated__/autoLogin";
import useLogOut from "./hooks/useLogOut";
import EncryptedStorage from 'react-native-encrypted-storage';
import { isLoggedInVar, REFRESH_TOKEN, accessTokenVar, fontFamilyVar } from "./apollo";
import { preloadLocalImage } from "./localImage/preloadLocalImageAndSetReactiveVar";
import RootView from "./RootView";
import { getRealmAllDiaries } from "./realm";
import NetInfo from "@react-native-community/netinfo";
import updateMeCache from "./cache/updateMeCache";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FONT_FAMILY } from "./font/constant";
import { USE_APP_START_PASSWORD } from "./appPassword";
import StartPasswordScreen from "./StartPasswordScreen";
import updateThisMonthCalendarData from "./cache/updateThisMonthCalendarData";
import useOnFirstOrBackground30MinuteThenVersionCheckAndCodePush from "./appVersionCheck/useOnFirstOrBackground30MinuteThenVersionCheckAndCodePush";

const AUTO_LOGIN = gql`
  mutation autoLogin($token: String!) {
    autoLogin(token:$token) {
      ok
      error
      # LogInUser 타입 새로 만듦
      loggedInUser {
        # id
        # userName
        # totalUnreadNotification
        # todayDiaries {
        #   id
        #   title
        #   thumbNail
        #   body #body 추가
        #   createdAt #createdAt 추가
        # }
        ...MeFragment
      }
      accessToken
    }
  }
  ${ME_FRAGMENT}
`;


// ApolloProvider 받은 이후에 해야 하는 애들
const BeforeSplashHide = () => {

  const [autoLogin] = useMutation<autoLogin,autoLoginVariables>(AUTO_LOGIN,{
    fetchPolicy:"network-only",
  });

  const logOut = useLogOut();

  const [needPassword,setNeedPassword] = useState(false);
  
  const preload = useCallback(
    async() => {
      // 얘는 동기함수임. 얘를 autoLogin 보다 먼저 받아야 네트워크 안된 상태에서도 실행됨. 뒤에 놓으면 에러떠서 실행이 안됨.
      preloadLocalImage();
      const toDoList = [
        await setFontFamily(),
        await setPasswordScreenOrRootView(setNeedPassword),
      ];
      
      // setLogInAndDBSettingByNetworkState 가 연결 안되있으면 에러 뜨고 안받아짐. allSettled 도 마찬가지라 걍 마지막으로 따로 뺌.
      await Promise.all(toDoList);

      await setLogInAndDBSettingByNetworkState(autoLogin,logOut)
    },
    []
  );

  const [appIsReady, setAppIsReady] = useState(false);
  

  useEffect(() => {
    const prepare = async() => {
      try {
        await preload();
      } catch (e:any) {
        // e message 있는지 체크 해야하나?
        const isNetworkError = e.message === "Network request failed";
        console.error("BeforeSplashHide : " + (isNetworkError ? "autoLogin : 네트워크 연결 오류" : e));
      } finally {
        setAppIsReady(true);
        SplashScreen.hide();
      }
    };

    prepare();
  }, []);

  useOnFirstOrBackground30MinuteThenVersionCheckAndCodePush();

  if(!appIsReady) return null;

  return needPassword ? <StartPasswordScreen setNeedPassword={setNeedPassword}/> : <RootView/>;
};

export default BeforeSplashHide;



const setFontFamily = async() => {
  const fontFamily = await AsyncStorage.getItem(FONT_FAMILY);
  if(fontFamily) {
    fontFamilyVar(fontFamily);
  }
};

const setPasswordScreenOrRootView = async (setNeedPassword: React.Dispatch<React.SetStateAction<boolean>>) => {
  const isUse = await AsyncStorage.getItem(USE_APP_START_PASSWORD);
  setNeedPassword(Boolean(isUse));
};

const getIsNetworkConnected = async () => (await NetInfo.fetch()).isConnected;

const getRefreshToken = () => EncryptedStorage.getItem(REFRESH_TOKEN);
const removeRefreshToken = () => EncryptedStorage.removeItem(REFRESH_TOKEN);


type autoLoginType = (
  options?: MutationFunctionOptions<autoLogin, autoLoginVariables, DefaultContext, ApolloCache<any>>
) => Promise<FetchResult<autoLogin>>;
type logOutType = () => Promise<void>;

const setLogInAndDBSettingByNetworkState = async(
  autoLogin: autoLoginType,
  logOut: logOutType,
) => {
  const token = await getRefreshToken();
  const disconnected = !await getIsNetworkConnected();
  // 기본으로 세팅. 데이터 연결이 안되든 서버 연결이 안되든 일단 이전 로그인 상태 유지
  isLoggedInVar(Boolean(token));
  if(disconnected) {
    await ifTokenThenUseCacheElseLocalDB(token);
  } else {
    await ifTokenThenAutoLoginElseGetRealmNeedLogOut(token,autoLogin,logOut);
  };
};


// const ifTokenThenUseCacheElseLocalDB = (isToken:string | null) => isToken ? setIsUseLocalDBAndReturnState(false) : getRealmAllDiaries();
const ifTokenThenUseCacheElseLocalDB = (isToken:string | null) => isToken && getRealmAllDiaries();


const ifTokenThenAutoLoginElseGetRealmNeedLogOut = async (
  token: string | null,
  autoLogin: autoLoginType,
  logOut: logOutType,
) => {
  if(token) {
    // 얜 안써도 될듯
    // setIsUseLocalDBAndReturnState(false);
    // autoLogin 은 연결 안되면 에러가 뜸. 그래서 onCompleted, update 실행 안됨.
    await autoLogin({
      variables:{
        token,
      },
      onCompleted: updateByAutoLoginResult,
      update: ifLogInOkThenUpdateMeCacheElseLogOut(logOut),
    });
  }
  else {
    await getRealmAllDiaries();
  }
};

const updateByAutoLoginResult = async(data:autoLogin) => {
  const result = data.autoLogin;
  if(result.ok){
    accessTokenVar(result.accessToken + "");
    // isLoggedInVar(true);
  } else {
    isLoggedInVar(false);
    await removeRefreshToken();
  }
};

type updateType = MutationUpdaterFunction<autoLogin, autoLoginVariables, DefaultContext, ApolloCache<any>>;

type ifLogInOkThenUpdateMeCacheElseLogOutType = (
  logOut: logOutType,
) => updateType;

// 여기서 Calendar 도 업데이트 하면 좋을 거 같은데
// Calendar id 로 ref 만들고 ref 들을 getCalendarMonthlyData({"month":11,"year":2022}) 에 넣어. 없으면 null Calendar:328
const ifLogInOkThenUpdateMeCacheElseLogOut: ifLogInOkThenUpdateMeCacheElseLogOutType = (logOut) => {
  const returnFn: updateType = async(cache,data) => {
    const logInResult = data.data?.autoLogin;
    // logInResult?.ok ? updateMeCache(cache,logInResult.loggedInUser) : await logOut();
    logInResult?.ok ? updateCache(cache,logInResult.loggedInUser) : await logOut();
  };
  
  return returnFn;
};

const updateCache = (cache:ApolloCache<any>,loggedInUser:autoLogin_autoLogin_loggedInUser | null) => {
  updateMeCache(cache,loggedInUser);
  updateThisMonthCalendarData(cache,loggedInUser);
};