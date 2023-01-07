import styled from "styled-components/native";
import { FontAppliedBaseTextNeedFontSize, FontAppliedBoldTextNeedFontSize } from "../../../styled-components/FontAppliedComponents";
import PasswordInput from "./PasswordInput";

const Container = styled.View`
  flex: 1;
  background-color: ${props=>props.theme.backgroundColor};
  padding: 40px 20px 0px 20px;
`;
const WarningContainer = styled.View`
  padding-bottom: 10px;
`;
const TextRowContainer = styled.Text`
  padding-bottom: 10px;
`;
const TitleText = styled(FontAppliedBoldTextNeedFontSize)`
  padding-bottom: 50px;
  text-align: center;
  /* font-size: 18px; */
`;
const MainText = styled(FontAppliedBaseTextNeedFontSize)`
  /* font-size: 15px; */
`;
const StrongText = styled(FontAppliedBoldTextNeedFontSize)`
  color: red;
  /* font-size: 15px; */
  font-weight: bold;
`;

type BaseAppPasswordScreenType = {
  guideText: string;
  password: number[];
  writePassword: (nowNumber:number)=>void;
  deletePassword: ()=>void;
};

const BaseAppPasswordScreen = ({
  guideText,
  password,
  writePassword,
  deletePassword,
}: BaseAppPasswordScreenType) => {
  return (
    <Container>
      <WarningContainer>
        <TitleText fontSize={18}>앱 비밀번호 설정 시 주의사항</TitleText>
        <MainText fontSize={15}>◦ 앱 비밀번호는 현재 설정하고 있는 기기에만 적용됩니다. </MainText>
        <TextRowContainer>
          <MainText fontSize={15}>◦ 비밀번호 설정 후 비밀번호를 잊어버릴 시 </MainText>
          <StrongText fontSize={15}>앱을 삭제 후 재설치</StrongText>
          <MainText fontSize={15}> 해야 합니다.</MainText>
        </TextRowContainer>
        <TextRowContainer>
          <MainText fontSize={15}>◦ 재설치 시 로그인 하지 않은 상태에서 작성했던 모든 일기 및 데이터는 </MainText>
          <StrongText fontSize={15}>모두 삭제됩니다.</StrongText>
          <MainText fontSize={15}>{"  (로그인 하여 작성한 일기는 그대로 유지됩니다.)"}</MainText>
        </TextRowContainer>
        <TitleText fontSize={18}>{guideText}</TitleText>
      </WarningContainer>

      {/* <PasswordContainer passwordWidth={passwordWidth}>

        <ShowPasswordInputContainer>
          {showPasswordInput.map((isWrite,index) => (
            <Flex1Container key={index} >
              {isWrite ?
                <ShowPasswordInput>*</ShowPasswordInput>
                :
                <Ionicons name="remove-outline" size={50} color={textColor} />
              }
            </Flex1Container>
          ))}
        </ShowPasswordInputContainer>

        {[0,1,2].map(rowNumber=><PasswordRowContainer key={rowNumber}>
          {[1,2,3].map(columnNumber=>{
            const nowNumber = rowNumber * 3 + columnNumber;
            return <PasswordColumnContainer key={nowNumber}>
              <PasswordTouchable onPress={()=>writePassword(nowNumber)}>
                <PasswordText>{nowNumber}</PasswordText>
              </PasswordTouchable>
            </PasswordColumnContainer>
          })}
          </PasswordRowContainer>
        )}

        <PasswordRowContainer>
          <PasswordColumnContainer/>
          <PasswordColumnContainer>
            <PasswordTouchable onPress={()=>writePassword(0)}>
              <PasswordText>0</PasswordText>
            </PasswordTouchable>
          </PasswordColumnContainer>
          <PasswordColumnContainer>
            <PasswordTouchable onPress={deletePassword}>
              <Feather name="delete" size={28} color={textColor} />
            </PasswordTouchable>
          </PasswordColumnContainer>
        </PasswordRowContainer>
      </PasswordContainer> */}
      <PasswordInput
        password={password}
        writePassword={writePassword}
        deletePassword={deletePassword}
      />

    </Container>
  );
};

export default BaseAppPasswordScreen;