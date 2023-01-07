import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { Alert, TouchableOpacity, BackHandler } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { isAndroid } from "../../utils";

type UploadGoBackBtnProps = {
  tintColor: string;
  whichComponent: string;
  alertCheck?: boolean;
  // alertCheck?: ()=>boolean;
};

// 변경 필요

const UploadGoBackBtn = ({tintColor,whichComponent,alertCheck}:UploadGoBackBtnProps) => {

  const navigation = useNavigation();
  const goBack = () => navigation.goBack();
  
  const isUploadDiary = whichComponent === "UploadDiary";
  
  const alertMainText = isUploadDiary ? "일기 업로드를 취소하시겠습니까?" : "일기 수정을 취소하시겠습니까?";
  const alertSubText = isUploadDiary ? "작성하신 내용은 모두 유실됩니다." : "변경 중이었던 내용은 모두 유실됩니다.";

  const onPressBtn = () => {
    // if(isUploadDiary) {
      if(alertCheck) {
      // if(alertCheck && alertCheck()) {
        Alert.alert(
          alertMainText,
          alertSubText,
          [
            {
              text:"취소하고 뒤로가기",
              onPress:()=>goBack(),
              style:"destructive"
            },
            {
              text:"계속 작성",
            }
          ]  
        )
      } else {
        goBack();
      }
    // } else {
    //   return navigation.goBack();
    // }
    return true;
  };

  useEffect(() => {
    const backHandler = isAndroid ?
        BackHandler.addEventListener(
          "hardwareBackPress",
          onPressBtn
        )
      :
        null;

    return () => backHandler?.remove();
  }, [alertCheck]);

  return (
    <TouchableOpacity onPress={onPressBtn}>
      <Ionicons name={isUploadDiary ? "chevron-back" : "close"} size={24} color={tintColor}/>
    </TouchableOpacity>
  );
};

export default UploadGoBackBtn;