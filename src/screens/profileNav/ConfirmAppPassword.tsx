import { useState } from "react";
import useHeaderRightToRouteNext from "../../hooks/profileDrawerNav/relatedPassword/useHeaderRightToRouteNext";
import AppPasswordScreen from "../../components/profileDrawerNav/relatedPassword/AppPasswordScreen";
import useSetPasswordFn from "../../hooks/profileDrawerNav/relatedPassword/useSetPasswordFn";


// type ConfirmAppPasswordProps = NativeStackScreenProps<ProfileListTabStackParamsList, "ConfirmAppPassword">;

// const ConfirmAppPassword = ({navigation,route}:ConfirmAppPasswordProps) => {
const ConfirmAppPassword = () => {

  const [password,setPassword] = useState<number[]>([]);

  // const onPressChangeOk = () => {

  //   if(password.length !== 6) {
  //     return Alert.alert("비밀번호 6자리를 입력해주세요.");
  //   }

  //   const prevPassword = route.params.password;

  //   let invertedPrevPassword = "";
  //   prevPassword.forEach(number=>invertedPrevPassword += number);
  //   let invertedPassword = "";
  //   password.forEach(number=>invertedPassword += number);

  //   if(invertedPrevPassword !== invertedPassword) {
  //     return Alert.alert("비밀번호가 일치하지 않습니다.");
  //   } else {
  //     Alert.alert("비밀번호 설정을 완료하시겠습니까?","비밀번호 분실 시 찾을 수 없으니 유의하시기 바랍니다.",[
  //       {
  //         text:"완료",
  //         onPress:async() => {
  //           await EncryptedStorage.setItem(APP_PASSWORD,invertedPassword);
  //           Alert.alert("비밀번호가 변경되었습니다.");
  //           navigation.navigate("ProfileDrawerNav");
  //         },
  //       },
  //       {
  //         text:"취소",
  //         style:"cancel",
  //       }
  //     ]);
  //   };
  // };

  // useEffect(()=>{
  //   navigation.setOptions({
  //     headerRight:()=><ChangeOkBtn onPress={onPressChangeOk}>
  //       <ChangeOkBtnText>완료</ChangeOkBtnText>
  //     </ChangeOkBtn>
  //   });
  // },[password]);

  useHeaderRightToRouteNext({
    password,
    setPassword,
    whichComponent:"ConfirmAppPassword",
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
      whichComponent="ConfirmAppPassword"
    />
  );
};

export default ConfirmAppPassword;