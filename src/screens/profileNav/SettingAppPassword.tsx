import { useState } from "react";
import useHeaderRightToRouteNext from "../../hooks/profileDrawerNav/relatedPassword/useHeaderRightToRouteNext";
import useSetPasswordFn from "../../hooks/profileDrawerNav/relatedPassword/useSetPasswordFn";
import AppPasswordScreen from "../../components/profileDrawerNav/relatedPassword/AppPasswordScreen";

// type SettingAppPasswordProps = NativeStackScreenProps<ProfileListTabStackParamsList, "SettingAppPassword">;

// const SettingAppPassword = ({navigation}:SettingAppPasswordProps) => {
const SettingAppPassword = () => {

  const [password,setPassword] = useState<number[]>([]);

  // const onPressChangeOk = () => {
  //   if(password.length !== 6) {
  //     return Alert.alert("비밀번호 6자리를 입력해주세요.");
  //   }
  //   setPassword([]);
  //   return navigation.navigate("ConfirmAppPassword",{
  //     password,
  //   });
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
    whichComponent:"SettingAppPassword",
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
      whichComponent="SettingAppPassword"
    />
  );
};

export default SettingAppPassword;