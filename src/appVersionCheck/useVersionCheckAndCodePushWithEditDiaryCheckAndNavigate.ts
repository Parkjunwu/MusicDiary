import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";
import { Alert, Linking } from "react-native";
import CodePush from "react-native-code-push";
import InAppBrowser from "react-native-inappbrowser-reborn";
import VersionCheck from "react-native-version-check";
import { isLoggedInVar } from "../apollo";
import { LOCAL_DB_TEMPORARY_EDIT_DIARY, TEMPORARY_EDIT_DIARY } from "../temporaryDiary/constant";
import { isAndroid } from "../utils";
import { ALREADY_CHECKED_VERSION } from "./constants";

// const useVersionCheckAndCodePush = () => {

  const versionCheckAndCodePush = () => storeVersionCheck()
    .then(async(result) => {
      // console.log("check : "+JSON.stringify(result));
      const { isNeeded, storeUrl, currentVersion, latestVersion } = result;
      const checkedVersion = await AsyncStorage.getItem(ALREADY_CHECKED_VERSION);
      const isAlreadyCheck = checkedVersion === currentVersion;

      if (isNeeded && !isAlreadyCheck) {
        const storeName = isAndroid ? "플레이스토어" : "앱스토어";
        Alert.alert(`필수 업데이트가 있습니다. ${storeName}에서 앱을 업데이트 해주시면 감사드리겠습니다.`,"업데이트 하지 않고 사용하시면 앱이 제대로 동작하지 않을 수 있습니다.",[
          {
            text:`${storeName}로 이동`,
            onPress:async()=>{
              const canOpen = storeUrl && await Linking.canOpenURL(storeUrl);
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
    // .catch((res)=>console.error(res))

//   return versionCheckAndCodePush;
// };


// export default useVersionCheckAndCodePush;
export default versionCheckAndCodePush;


const storeVersionCheck = () => VersionCheck.needUpdate({
    depth: 1,
    // currentVersion: "1.0",
    // latestVersion: "2.0",
    // forceUpdate: true,
  });

// fetchCodePush 끝나고 editDiary 있는지 확인 로직
const getCodePush = () => CodePush.sync({
    // installMode: CodePush.InstallMode.IMMEDIATE,
    installMode: CodePush.InstallMode.ON_NEXT_SUSPEND, // 얘는 이걸로?
    minimumBackgroundDuration: 600, // 10분 백그라운드 있으면 적용
    mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
    updateDialog: {
      mandatoryUpdateMessage:
        '필수 업데이트가 있어 설치 후 앱을 재시작합니다.',
      mandatoryContinueButtonLabel: '재시작',
      optionalUpdateMessage: '업데이트가 있습니다. 설치하시겠습니까?', // 얘
      optionalIgnoreButtonLabel: '나중에', // 예
      optionalInstallButtonLabel: '재시작', // 얘
      title: '업데이트 안내', // 얘들은 ON_NEXT_SUSPEND 로 해서 필요 없을듯?
    },
  },status => {
    console.log(`Changed ${status}`);
    // Alert.alert("status : "+status)
  });
// const useCodePush = () => {

//   const codePush = async() => {
//     const codePushResult = await CodePush.sync({
//       installMode: CodePush.InstallMode.IMMEDIATE,
//       mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
//       updateDialog: {
//         mandatoryUpdateMessage:
//           '필수 업데이트가 있어 설치 후 앱을 재시작합니다.',
//         mandatoryContinueButtonLabel: '재시작',
//         optionalUpdateMessage: '업데이트가 있습니다. 설치하시겠습니까?',
//         optionalIgnoreButtonLabel: '나중에',
//         optionalInstallButtonLabel: '재시작',
//         title: '업데이트 안내',
//       },
//     },status => {
//       console.log(`Changed ${status}`);
//       // Alert.alert("status : "+status)
//     });

//     // // 얘가 0으로 찍히네...
//     // console.log("codePushResult : "+ JSON.stringify(codePushResult))

//     // // if(codePushResult) {
//     //   const isLocalDBEditDiary = await AsyncStorage.getItem(LOCAL_DB_TEMPORARY_EDIT_DIARY)
//     //   const isEditDiary = await AsyncStorage.getItem(TEMPORARY_EDIT_DIARY)
//     //   console.log("isLocalDBEditDiary : "+ isLocalDBEditDiary)
//     //   console.log("isEditDiary : "+ isEditDiary)
//     //   if(isLocalDBEditDiary && isEditDiary) {
//     //     console.error("isLocalDBEditDiary 랑 isEditDiary 둘 다 있음. 로직 확인 필요");
//     //   }
//     //   // 지금 이게 TodayDiary 에 있으니 된다는 상황으로 놓고 쓰는 거라 navigation 이 되는지 안되는지 확인을 안함. 지금은 되는데 혹시 처음 스크린을 변경하거나 다른 화면에 있는 경우면 안될 수 있으니 나중에 안되면 체크.
//     //   // 이게 30분 마다 실행되면 다른 navigation 에서도 되려나?
//     //   // 아님 처음만 실행되도록. 로직을 빼던가 처음인걸 확인하는 로직 추가
//     //   if(isLocalDBEditDiary && !isUseCache()) {
//     //     const navigateParams = JSON.parse(isLocalDBEditDiary);
//     //     return Alert.alert("수정 중인 일기가 있습니다. 불러오시겠습니까?","취소 시 임시 저장된 내용은 삭제됩니다.",[
//     //       {
//     //         text:"이동",
//     //         onPress:()=>navigation.navigate("EditDiary",{
//     //           ...navigateParams,
//     //         }),
//     //       },
//     //       {
//     //         text:"취소",
//     //         onPress:()=>AsyncStorage.removeItem(LOCAL_DB_TEMPORARY_EDIT_DIARY),
//     //       },
//     //     ]);
//     //   }
//     //   if(isEditDiary && isUseCache()) {
//     //     // navigation.navigate("EditDiary")
//     //     // 얘도 어디로 보낼지. 새로 만들지 정해
//     //     const navigateParams = JSON.parse(isEditDiary);
//     //     return Alert.alert("수정 중인 일기가 있습니다. 불러오시겠습니까?","취소 시 임시 저장된 내용은 삭제됩니다.",[
//     //       {
//     //         text:"이동",
//     //         onPress:()=>navigation.navigate("EditDiary",{
//     //           ...navigateParams,
//     //         }),
//     //       },
//     //       {
//     //         text:"취소",
//     //         onPress:()=>AsyncStorage.removeItem(TEMPORARY_EDIT_DIARY),
//     //       },
//     //     ]);
//     //   }
//     // // }
//   };
//   return codePush;
// };

const useEditDiaryCheckAndNavigate = () => {

  const navigation = useNavigation();
  const isUseCache = () => isLoggedInVar();

  const editDiaryCheckAndNavigate = async() => {
    const isLocalDBEditDiary = await AsyncStorage.getItem(LOCAL_DB_TEMPORARY_EDIT_DIARY)
    const isEditDiary = await AsyncStorage.getItem(TEMPORARY_EDIT_DIARY)
    console.log("isLocalDBEditDiary : "+ isLocalDBEditDiary)
    console.log("isEditDiary : "+ isEditDiary)
    if(isLocalDBEditDiary && isEditDiary) {
      console.error("isLocalDBEditDiary 랑 isEditDiary 둘 다 있음. 로직 확인 필요");
    }
    // 지금 이게 TodayDiary 에 있으니 된다는 상황으로 놓고 쓰는 거라 navigation 이 되는지 안되는지 확인을 안함. 지금은 되는데 혹시 처음 스크린을 변경하거나 다른 화면에 있는 경우면 안될 수 있으니 나중에 안되면 체크.
    // 이게 30분 마다 실행되면 다른 navigation 에서도 되려나?
    // 아님 처음만 실행되도록. 로직을 빼던가 처음인걸 확인하는 로직 추가
    if(isLocalDBEditDiary && !isUseCache()) {
      const navigateParams = JSON.parse(isLocalDBEditDiary);
      return Alert.alert("수정 중인 일기가 있습니다. 불러오시겠습니까?","취소 시 임시 저장된 내용은 삭제됩니다.",[
        {
          text:"이동",
          onPress:()=>navigation.navigate("EditDiary",{
            ...navigateParams,
          }),
        },
        {
          text:"취소",
          onPress:()=>AsyncStorage.removeItem(LOCAL_DB_TEMPORARY_EDIT_DIARY),
        },
      ]);
    }
    if(isEditDiary && isUseCache()) {
      // navigation.navigate("EditDiary")
      // 얘도 어디로 보낼지. 새로 만들지 정해
      const navigateParams = JSON.parse(isEditDiary);
      return Alert.alert("수정 중인 일기가 있습니다. 불러오시겠습니까?","취소 시 임시 저장된 내용은 삭제됩니다.",[
        {
          text:"이동",
          onPress:()=>navigation.navigate("EditDiary",{
            ...navigateParams,
          }),
        },
        {
          text:"취소",
          onPress:()=>AsyncStorage.removeItem(TEMPORARY_EDIT_DIARY),
        },
      ]);
    }
  };

  return editDiaryCheckAndNavigate;
};