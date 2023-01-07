import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, Linking } from "react-native";
import CodePush from "react-native-code-push";
import InAppBrowser from "react-native-inappbrowser-reborn";
import VersionCheck from "react-native-version-check";
import { isAndroid } from "../utils";
import { ALREADY_CHECKED_VERSION } from "./constants";

const versionCheckAndCodePush = () => storeVersionCheck()
  .then(async(result) => {
    // console.log("check : "+JSON.stringify(result));
    const { isNeeded, storeUrl, currentVersion, latestVersion } = result;
    const needUpdateMandatory = currentVersion.split('.')[0] !== latestVersion.split('.')[0];
    // console.log("isNeeded : "+ isNeeded)
    // console.log(currentVersion)
    // console.log(latestVersion)
    // console.log(currentVersion.split('.'))
    // console.log(latestVersion.split('.'))
    // console.log("needUpdateMandatory : "+ needUpdateMandatory)
    const checkedVersion = await AsyncStorage.getItem(ALREADY_CHECKED_VERSION);
    const isAlreadyCheck = checkedVersion === currentVersion;

    // console.log("versionCheckAndCodePush isAlreadyCheck : "+isAlreadyCheck);

    if (isNeeded && !isAlreadyCheck) {
    // if (isNeeded) {
      const isMandatoryOrJustNew = needUpdateMandatory ? "필수" : "새로운"
      const storeName = isAndroid ? "플레이스토어" : "앱스토어";
      const titleMessage = `${isMandatoryOrJustNew} 업데이트가 있습니다. ${storeName}에서 앱을 업데이트 해주시면 감사드리겠습니다.`;
      const warningMessage = needUpdateMandatory ? "업데이트 하지 않고 사용하시면 앱이 제대로 동작하지 않을 수 있습니다." : undefined;

      Alert.alert( titleMessage, warningMessage, [
        {
          text:`${storeName}로 이동`,
          onPress:async()=>{
            const canOpen = storeUrl && await Linking.canOpenURL(storeUrl);
            // 시뮬레이터에는 앱스토어가 없어서 실기기 확인해야함
            canOpen ? await Linking.openURL(storeUrl) : await InAppBrowser.open(storeUrl);
            getCodePush(); // 가기만 하고 설치 안하면 코드푸시 하는데 좀 이상하긴 하군
          },
        },
        {
          text:"다음에",
          style:"destructive",
          onPress:()=>{
            // 여기도 코드푸시 업데이트는 또 해주는데 좀 이상하긴 하군.
            getCodePush();
            AsyncStorage.setItem(ALREADY_CHECKED_VERSION,currentVersion);
          }
        },
      ]);
    } else { 
      // 코드푸시
      getCodePush();
      // if(currentVersion === latestVersion){
      //   AsyncStorage.removeItem(ALREADY_CHECKED_VERSION);
      // }
    }

    return true; // Promise then 쓰기 위함
  });


export default versionCheckAndCodePush;


// const storeVersionCheck = () => VersionCheck.needUpdate({
//   depth: 1,
//   // currentVersion: "1.0",
//   // latestVersion: "2.0",
//   // forceUpdate: true,
// });
const storeVersionCheck = () => {
  console.log("storeVersionCheck")
  // return VersionCheck.needUpdate({depth: 1});
  return VersionCheck.needUpdate({depth: 2});
  // node_modules/react-native-version-check/src/needUpdate.js 에서 semver.gt 를 semver.lt 로 바꾸면 개발중에도 확인됨. 여기는 현재 버전이 높아서
}

// fetchCodePush 끝나고 editDiary 있는지 확인 로직
const getCodePush = () => CodePush.sync({
  // installMode: CodePush.InstallMode.IMMEDIATE,
  installMode: CodePush.InstallMode.ON_NEXT_SUSPEND, // 얘는 이걸로
  minimumBackgroundDuration: 600, // 10분 백그라운드 있으면 적용
  mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
  updateDialog: {
    mandatoryUpdateMessage:
      '필수 업데이트가 있어 설치 후 앱을 재시작합니다.',
    mandatoryContinueButtonLabel: '재시작',
    optionalUpdateMessage: '업데이트가 있습니다. 설치하시겠습니까?', // 얘랑
    optionalIgnoreButtonLabel: '나중에', // 예랑
    optionalInstallButtonLabel: '재시작', // 얘랑
    title: '업데이트 안내', // 얘들은 ON_NEXT_SUSPEND 로 해서 필요 없을듯?
  },
},status => {
  console.log(`Changed ${status}`);
  // Alert.alert("status : "+status)
});


// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Alert, Linking } from "react-native";
// import CodePush from "react-native-code-push";
// import InAppBrowser from "react-native-inappbrowser-reborn";
// import VersionCheck from "react-native-version-check";
// // import { LOCAL_DB_TEMPORARY_EDIT_DIARY, TEMPORARY_EDIT_DIARY } from "../temporaryDiary/constant";
// import { isAndroid } from "../utils";
// import { ALREADY_CHECKED_VERSION } from "./constants";

// const versionCheckAndCodePush = () => VersionCheck.needUpdate({
//   depth: 1,
//   // currentVersion: "1.0",
//   // latestVersion: "2.0",
//   // forceUpdate: true,
// })
//   .then(async(result) => {
//     // console.log("check : "+JSON.stringify(result));
//     const { isNeeded, storeUrl, currentVersion, latestVersion } = result;
//     const checkedVersion = await AsyncStorage.getItem(ALREADY_CHECKED_VERSION);
//     const isAlreadyCheck = checkedVersion === currentVersion;

//     if (isNeeded && !isAlreadyCheck) {
//       const storeName = isAndroid ? "플레이스토어" : "앱스토어";
//       Alert.alert(`필수 업데이트가 있습니다. ${storeName}에서 앱을 업데이트 해주시면 감사드리겠습니다.`,"업데이트 하지 않고 사용하시면 앱이 제대로 동작하지 않을 수 있습니다.",[
//         {
//           text:`${storeName}로 이동`,
//           onPress:async()=>{
//             const canOpen = storeUrl && await Linking.canOpenURL(storeUrl);
//             canOpen ? Linking.openURL(storeUrl) : InAppBrowser.open(storeUrl);
//             // 근데 가기만 하고 설치 안하면 코드푸시 를 해줘야 하는데 그건.. 못만들듯?
//             // 여긴 setItem 안해도 될듯
//           }
//         },
//         {
//           text:"다음에",
//           style:"destructive",
//           onPress:()=>{
//             // 여기서 코드푸시 업데이트는 또 해주는데 좀 이상하긴 하군.
//             fetchCodePush();
//             AsyncStorage.setItem(ALREADY_CHECKED_VERSION,currentVersion);
//           }
//         },
//       ]);
//     } else { 
//       // 코드푸시
//       fetchCodePush();
//       // if(currentVersion === latestVersion){
//       //   AsyncStorage.removeItem(ALREADY_CHECKED_VERSION);
//       // }
//     }
//   });


// const fetchCodePush = () => CodePush.sync({
//   installMode: CodePush.InstallMode.IMMEDIATE,
//   mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
//   updateDialog: {
//     mandatoryUpdateMessage:
//       '필수 업데이트가 있어 설치 후 앱을 재시작합니다.',
//     mandatoryContinueButtonLabel: '재시작',
//     optionalUpdateMessage: '업데이트가 있습니다. 설치하시겠습니까?',
//     optionalIgnoreButtonLabel: '나중에',
//     optionalInstallButtonLabel: '재시작',
//     title: '업데이트 안내',
//   },
// },status => {
//   console.log(`Changed ${status}`);
//   // Alert.alert("status : "+status)
// })
//   .then(status => {
//     console.log(`CodePush ${status}`);
//     // Alert.alert("then status : "+status)
//   });

  
// // // fetchCodePush 끝나고 editDiary 있는지 확인 로직
// // const codePushAndCheckEditDiary = async() => {
// //   const codePushResult = await CodePush.sync({
// //     installMode: CodePush.InstallMode.IMMEDIATE,
// //     mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
// //     updateDialog: {
// //       mandatoryUpdateMessage:
// //         '필수 업데이트가 있어 설치 후 앱을 재시작합니다.',
// //       mandatoryContinueButtonLabel: '재시작',
// //       optionalUpdateMessage: '업데이트가 있습니다. 설치하시겠습니까?',
// //       optionalIgnoreButtonLabel: '나중에',
// //       optionalInstallButtonLabel: '재시작',
// //       title: '업데이트 안내',
// //     },
// //   },status => {
// //     console.log(`Changed ${status}`);
// //     // Alert.alert("status : "+status)
// //   });

// //   if(codePushResult) {
// //     const isLocalDBEditDiary = await AsyncStorage.getItem(LOCAL_DB_TEMPORARY_EDIT_DIARY)
// //     const isEditDiary = await AsyncStorage.getItem(TEMPORARY_EDIT_DIARY)
// //     if(isLocalDBEditDiary || isEditDiary) {
// //       navigation
// //     }
// //   }
// // }

//   export default versionCheckAndCodePush;