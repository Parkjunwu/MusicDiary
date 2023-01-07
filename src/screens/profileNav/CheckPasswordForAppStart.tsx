import { useState } from "react";
import useHeaderRightToRouteNext from "../../hooks/profileDrawerNav/relatedPassword/useHeaderRightToRouteNext";
import useSetPasswordFn from "../../hooks/profileDrawerNav/relatedPassword/useSetPasswordFn";
import PasswordInput from "../../components/profileDrawerNav/relatedPassword/PasswordInput";
import styled from "styled-components/native";
import { FontAppliedBoldTextNeedFontSize } from "../../styled-components/FontAppliedComponents";

const Container = styled.View`
  flex: 1;
  background-color: ${props=>props.theme.backgroundColor};
  padding: 0px 20px 20px 20px;
`;
const InfoContainer = styled.View`
  flex: 0.6;
  align-items: center;
  justify-content: center;
`;
const TitleText = styled(FontAppliedBoldTextNeedFontSize)`
  /* font-size: 18px; */
`;

const CheckPasswordForAppStart = () => {

  const [password,setPassword] = useState<number[]>([]);

  // const onPressChangeOk = () => {
  //   if(password.length !== 6) {
  //     return Alert.alert("비밀번호 6자리를 입력해주세요.");
  //   }

  //   let invertedPassword = "";
  //   password.forEach(number=>invertedPassword += number);

  //   const storedPassword = await EncryptedStorage.getItem(APP_PASSWORD);

  //   setPassword([]);
    
  //   return storedPassword === invertedPassword ?
  //     navigation.navigate("SettingAppStartPassword")
  //     :
  //     Alert.alert("비밀번호가 일치하지 않습니다.");
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
    whichComponent:"CheckPasswordForAppStart",
  });

  const {
    writePassword,
    deletePassword,
  } = useSetPasswordFn(setPassword);
  
  return (
    // <AppPasswordScreen
    //   password={password}
    //   writePassword={writePassword}
    //   deletePassword={deletePassword}
    //   whichComponent="CheckPasswordForAppStart"
    // />
    <Container>
      <InfoContainer>
        <TitleText fontSize={18}>현재 비밀번호를 입력해주세요.</TitleText>
      </InfoContainer>
      <PasswordInput
        password={password}
        writePassword={writePassword}
        deletePassword={deletePassword}
      />

    </Container>
  );
};

export default CheckPasswordForAppStart;