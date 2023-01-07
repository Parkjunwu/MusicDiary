import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";
import { Alert } from "react-native";
import { isLoggedInVar } from "../apollo";
import { LOCAL_DB_TEMPORARY_EDIT_DIARY, TEMPORARY_EDIT_DIARY } from "../temporaryDiary/constant";

const useEditDiaryCheckAndNavigate = () => {

  const navigation = useNavigation();
  // const isUseCache = () => isLoggedInVar();

  const editDiaryCheckAndNavigate = async() => {
    const isLocalDBEditDiary = await AsyncStorage.getItem(LOCAL_DB_TEMPORARY_EDIT_DIARY);
    const isEditDiary = await AsyncStorage.getItem(TEMPORARY_EDIT_DIARY);

    console.log("isLocalDBEditDiary : "+ isLocalDBEditDiary);
    console.log("isEditDiary : "+ isEditDiary);

    if(isLocalDBEditDiary && isEditDiary) {
      console.error("isLocalDBEditDiary 랑 isEditDiary 둘 다 있음. 로직 확인 필요");
    }
    // 지금 이게 TodayDiary 에 있으니 된다는 상황으로 놓고 쓰는 거라 navigation 이 되는지 안되는지 확인을 안함. 지금은 되는데 혹시 처음 스크린을 변경하거나 다른 화면에 있는 경우면 안될 수 있으니 나중에 안되면 체크.
    // 이게 30분 마다 실행되면 다른 navigation 에서도 되려나?
    // 아님 처음만 실행되도록. 로직을 빼던가 처음인걸 확인하는 로직 추가
    const isUseCache = isLoggedInVar();

    console.log("isUseCache  : "+ isUseCache)
    console.log("isLocalDBEditDiary && !isUseCache  : "+ (isLocalDBEditDiary && !isUseCache))

    if(isLocalDBEditDiary && !isUseCache) {
      const navigateParams = JSON.parse(isLocalDBEditDiary);
      return Alert.alert("수정 중인 일기가 있습니다. 불러오시겠습니까?","취소 시 임시 저장된 내용은 삭제됩니다.",[
        {
          text:"이동",
          onPress:()=>navigation.navigate("EditDiaryForTemporaryDiaryData",{
            ...navigateParams,
          }),
        },
        {
          text:"취소",
          onPress:()=>AsyncStorage.removeItem(LOCAL_DB_TEMPORARY_EDIT_DIARY),
        },
      ]);
    }
    if(isEditDiary && isUseCache) {
      // navigation.navigate("EditDiary")
      // 얘도 어디로 보낼지. 새로 만들지 정해
      const navigateParams = JSON.parse(isEditDiary);
      return Alert.alert("수정 중인 일기가 있습니다. 불러오시겠습니까?","취소 시 임시 저장된 내용은 삭제됩니다.",[
        {
          text:"이동",
          onPress:()=>navigation.navigate("EditDiaryForTemporaryDiaryData",{
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

export default useEditDiaryCheckAndNavigate;


// const isUseCache = () => isLoggedInVar();