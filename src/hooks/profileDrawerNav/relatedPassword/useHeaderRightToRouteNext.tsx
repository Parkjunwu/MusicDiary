import { useNavigation, useRoute } from "@react-navigation/core";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { Alert } from "react-native";
import EncryptedStorage from "react-native-encrypted-storage";
import styled from "styled-components/native";
import { APP_PASSWORD } from "../../../appPassword";
import { FontAppliedBoldTextNeedFontSize } from "../../../styled-components/FontAppliedComponents";
import { ProfileListTabStackParamsList } from "../../../types/navigation/homeNavStackParamsList";

const OkBtn = styled.TouchableOpacity`

`;
const OkBtnText = styled(FontAppliedBoldTextNeedFontSize)`

`;

type useHeaderRightToRouteNextProps = {
  password: number[];
  setPassword: React.Dispatch<React.SetStateAction<number[]>>;
  whichComponent: "CheckAppPassword" | "SettingAppPassword" | "ConfirmAppPassword" | "CheckPasswordForAppStart";
};

type NavType = NativeStackScreenProps<ProfileListTabStackParamsList,"ConfirmAppPassword">;
type NavigationType = NavType["navigation"];
type RouteType = NavType["route"];


const useHeaderRightToRouteNext = ({
  password,
  setPassword,
  whichComponent,
}: useHeaderRightToRouteNextProps) => {

  const navigation = useNavigation<NavigationType>();
  const route = useRoute<RouteType>();

  const onPressWritePasswordOk = writePasswordOkFn[whichComponent];

  // const nextText = whichComponent === "ConfirmAppPassword" ? "완료" : "다음";
  let nextText:string;
  switch(whichComponent) {
    case "ConfirmAppPassword": 
    case "CheckPasswordForAppStart":
      nextText = "완료";
      break;
    default:
      nextText = "다음";
  }

  useEffect(()=>{
    navigation.setOptions({
      headerRight:()=><OkBtn onPress={()=>onPressWritePasswordOk({password,setPassword,navigation,route})}>
        <OkBtnText>{nextText}</OkBtnText>
      </OkBtn>
    });
  },[password]);
};

export default useHeaderRightToRouteNext;




// 이게 더 복잡한가? 그냥 onPressWritePasswordOk 를 받는게 나을듯?
const writePasswordOkFn: writePasswordOkFnType = {

  CheckAppPassword: ({password,setPassword,navigation}) => checkPasswordAndNavigate({password,setPassword,navigation,routeName:"SettingAppPassword"}),
  // {
  //   if(password.length !== 6) {
  //     return alertNotWriteFullPassword();
  //   }

  //   let invertedPassword = "";
  //   password.forEach(number=>invertedPassword += number);

  //   const storedPassword = await getStoredPassword();

  //   setPassword([]);
    
  //   return storedPassword === invertedPassword ?
  //     navigation.navigate("SettingAppPassword")
  //     :
  //     alertPasswordNotMatched();
  // },

  CheckPasswordForAppStart: ({password,setPassword,navigation}) => checkPasswordAndNavigate({password,setPassword,navigation,routeName:"SettingAppStartPassword"}),
  // {
  //   if(password.length !== 6) {
  //     return alertPasswordNotMatched();
  //   }

  //   let invertedPassword = "";
  //   password.forEach(number=>invertedPassword += number);

  //   const storedPassword = await getStoredPassword();

  //   setPassword([]);
    
  //   return storedPassword === invertedPassword ?
  //     navigation.navigate("SettingAppStartPassword")
  //     :
  //     alertPasswordNotMatched();
  // },

  SettingAppPassword: ({password,setPassword,navigation}) => {
    if(password.length !== 6) {
      return alertNotWriteFullPassword();
    }

    setPassword([]);
    return navigation.navigate("ConfirmAppPassword",{
      password,
    });
  },

  ConfirmAppPassword: ({password,navigation,route}) => {
    if(password.length !== 6) {
      return alertNotWriteFullPassword();
    }

    const prevPassword = route.params.password;

    let invertedPrevPassword = "";
    prevPassword.forEach(number=>invertedPrevPassword += number);
    let invertedPassword = "";
    password.forEach(number=>invertedPassword += number);

    if(invertedPrevPassword !== invertedPassword) {
      return alertPasswordNotMatched();
    } else {
      Alert.alert("비밀번호 설정을 완료하시겠습니까?","비밀번호 분실 시 찾을 수 없으니 유의하시기 바랍니다.",[
        {
          text:"완료",
          onPress:async() => {
            await EncryptedStorage.setItem(APP_PASSWORD,invertedPassword);
            Alert.alert("비밀번호가 변경되었습니다.");
            // navigation.navigate("ProfileDrawerNav");
            navigation.navigate("Security");
          },
        },
        {
          text:"취소",
          style:"cancel",
        }
      ]);
    };
  },

};


const alertNotWriteFullPassword = () => Alert.alert("비밀번호 6자리를 입력해주세요.");

const alertPasswordNotMatched = () => Alert.alert("비밀번호가 일치하지 않습니다.");

const getStoredPassword = () => EncryptedStorage.getItem(APP_PASSWORD);


type onPressWritePasswordOkProps = {
  navigation: NavigationType;
  route: RouteType;
  password: number[];
  setPassword: React.Dispatch<React.SetStateAction<number[]>>;
}

type writePasswordOkFnType = {
  CheckAppPassword: ({ password, setPassword, navigation }: onPressWritePasswordOkProps) => Promise<any>;
  SettingAppPassword: ({ password, setPassword, navigation }: onPressWritePasswordOkProps) => any;
  ConfirmAppPassword: ({ password, navigation, route }: onPressWritePasswordOkProps) => void;
  CheckPasswordForAppStart: ({ password, setPassword, navigation }: onPressWritePasswordOkProps) => Promise<any>;
}

type checkPasswordAndNavigateProps = {
  navigation: NavigationType;
  password: number[];
  setPassword: React.Dispatch<React.SetStateAction<number[]>>;
  routeName: "SettingAppStartPassword" | "SettingAppPassword"
}

const checkPasswordAndNavigate = async({password,setPassword,navigation,routeName}:checkPasswordAndNavigateProps) => {
  if(password.length !== 6) {
    return alertPasswordNotMatched();
  }

  let invertedPassword = "";
  password.forEach(number=>invertedPassword += number);

  const storedPassword = await getStoredPassword();

  setPassword([]);
  
  return storedPassword === invertedPassword ?
    navigation.navigate(routeName)
    :
    alertPasswordNotMatched();
};