import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ApolloProvider } from "@apollo/client";
import client, { cache } from "./apollo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageWrapper, persistCache } from "apollo3-cache-persist";
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import setDevicePushNotification from "./pushNotification/setDevicePushNotification";
import BeforeSplashHide from "./BeforeSplashHide";
import CodePush, { CodePushOptions } from "react-native-code-push";


setDevicePushNotification();


const Apps = () => {

  const [appIsReady, setAppIsReady] = useState(false);
  
  // Apps 처음 말고 호출 안되서 useCallback 안써도 될듯

  const preload = async () => {
    // 걍 하나라서 이렇게. 여러개 쓰면 다시 await Promise.all
    await persistCache({
      cache,
      storage: new AsyncStorageWrapper(AsyncStorage),
    });
    // const toDoList = [
    //   // apollo 캐시 저장
    //   await persistCache({
    //     cache,
    //     storage: new AsyncStorageWrapper(AsyncStorage),
    //   }),
    //   // 음악 플레이어 세팅
    //   // await TrackPlayer.setupPlayer({
    //   //   maxBuffer:20,
    //   // }),
    //   // 이건 Apollo 받고 나서 해야할듯
    //   // await setFontFamily(),
    // ];

    // // 여기서 await Promise.all 로
    // await Promise.all(toDoList)
  };

  useEffect(() => {
    const prepare = async() => {
      try {
        await preload();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    };

    prepare();
  }, []);

  if (!appIsReady) {
    return null;
  }


  return (
    <SafeAreaProvider>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <BeforeSplashHide />
        </NavigationContainer>
      </ApolloProvider>
    </SafeAreaProvider>
  );
};


const codePushOptions: CodePushOptions = {
  checkFrequency: CodePush.CheckFrequency.MANUAL,
  // MANUAL 이면 useEffect 로 실행할 코드 적어줘야한대
  // 언제 업데이트를 체크하고 반영할지를 정한다.
  // ON_APP_RESUME은 Background에서 Foreground로 오는 것을 의미
  // ON_APP_START은 앱이 실행되는(켜지는) 순간을 의미
  installMode: CodePush.InstallMode.IMMEDIATE,
  mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
  // 업데이트를 어떻게 설치할 것인지 (IMMEDIATE는 강제설치를 의미) 거의 강제설치
};


export default process.env.NODE_ENV==="production" ? CodePush(codePushOptions)(Apps) : Apps;