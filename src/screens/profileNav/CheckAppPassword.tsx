
import { useState } from "react";
import AppPasswordScreen from "../../components/profileDrawerNav/relatedPassword/AppPasswordScreen";
import useSetPasswordFn from "../../hooks/profileDrawerNav/relatedPassword/useSetPasswordFn";
import useHeaderRightToRouteNext from "../../hooks/profileDrawerNav/relatedPassword/useHeaderRightToRouteNext";

// type CheckAppPasswordProps = NativeStackScreenProps<ProfileListTabStackParamsList, "CheckAppPassword">;

// const CheckAppPassword = ({navigation}:CheckAppPasswordProps) => {
const CheckAppPassword = () => {

  const [password,setPassword] = useState<number[]>([]);

  // const onPressChangeOk = async() => {

  //   if(password.length !== 6) {
  //     return Alert.alert("비밀번호 6자리를 입력해주세요.");
  //   }

  //   let invertedPassword = "";
  //   password.forEach(number=>invertedPassword += number);

  //   const storedPassword = await EncryptedStorage.getItem(APP_PASSWORD);

  //   setPassword([]);
    
  //   return storedPassword === invertedPassword ?
  //     navigation.navigate("SettingAppPassword")
  //     :
  //     Alert.alert("비밀번호가 일치하지 않습니다.");
  // };

  // useEffect(()=>{
  //   navigation.setOptions({
  //     headerRight:()=><ChangeOkBtn onPress={onPressChangeOk}>
  //       <ChangeOkBtnText>다음</ChangeOkBtnText>
  //     </ChangeOkBtn>
  //   });
  // },[password]);

  useHeaderRightToRouteNext({
    password,
    setPassword,
    whichComponent:"CheckAppPassword",
  });

  const {
    writePassword,
    deletePassword,
  } = useSetPasswordFn(setPassword);
  
  return (
    <AppPasswordScreen
      password={password}
      writePassword={writePassword}
      deletePassword={deletePassword}
      whichComponent="CheckAppPassword"
    />
  );
};

export default CheckAppPassword;