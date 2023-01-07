import { useState } from "react";
import { Alert } from "react-native";
import EncryptedStorage from "react-native-encrypted-storage";
import styled from "styled-components/native";
import { APP_PASSWORD } from "./appPassword";
import PasswordInput from "./components/profileDrawerNav/relatedPassword/PasswordInput";
import SafeAreaContainer from "./components/upload/SafeAreaContainer";
import { getCSSFontStyle } from "./font/getFontStyle";
import useSetPasswordFn from "./hooks/profileDrawerNav/relatedPassword/useSetPasswordFn";
import useGetFontFamily from "./hooks/useGetFontFamily";
import useIsDarkMode from "./hooks/useIsDarkMode";

const PaddingContainer = styled.View`
  padding: 20px;
  flex: 1;
`;
const TopContainer = styled.View`
  flex: 2;
  align-items: flex-end;
`;
const MiddleContainer = styled.View`
  flex: 3;
  align-items: center;
`;
const BottomContainer = styled.View`
  flex: 8;
`;
const OkBtn = styled.TouchableOpacity`

`;
// 여기는 아직 Provider 전이라 FontAppliedBaseText 못씀.
const OkBtnText = styled.Text<{fontFamily:string,fontSize:number,isDarkMode:boolean}>`
  ${props=>getCSSFontStyle(props.fontFamily,props.fontSize)}
  color: ${props=>props.isDarkMode ? "white" : "black"};
`;
const InfoText = styled(OkBtnText)`

`;

type StartPasswordScreenProps = {
  setNeedPassword: React.Dispatch<React.SetStateAction<boolean>>;
};

const StartPasswordScreen = ({
  setNeedPassword,
}:StartPasswordScreenProps) => {

  const [password,setPassword] = useState<number[]>([]);

  const fontFamily = useGetFontFamily("Medium");
  const isDarkMode = useIsDarkMode();

  const {
    writePassword,
    deletePassword,
  } = useSetPasswordFn(setPassword);

  const onPressOk = async() => {
    if(password.length !== 6) {
      return Alert.alert("비밀번호 6자리를 입력해주세요.");
    }

    let invertedPassword = "";
    password.forEach(number=>invertedPassword += number);

    const appPassword = await EncryptedStorage.getItem(APP_PASSWORD);

    setPassword([]);
    
    return appPassword === invertedPassword ?
      setNeedPassword(false)
      :
      Alert.alert("비밀번호가 일치하지 않습니다.");
  };

  return (
    <SafeAreaContainer>
      <PaddingContainer>
        <TopContainer>
          <OkBtn onPress={onPressOk}>
            <OkBtnText
              fontFamily={fontFamily}
              fontSize={17}
              isDarkMode={isDarkMode}  
            >완료</OkBtnText>
          </OkBtn>
        </TopContainer>
        <MiddleContainer>
          <InfoText
            fontFamily={fontFamily}
            fontSize={20}
            isDarkMode={isDarkMode}  
          >비밀번호를 입력해 주세요.</InfoText>
        </MiddleContainer>
        <BottomContainer>
          <PasswordInput
            password={password}
            writePassword={writePassword}
            deletePassword={deletePassword}
          />
        </BottomContainer>
      </PaddingContainer>
    </SafeAreaContainer>
  );
};

export default StartPasswordScreen;