import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Alert } from "react-native";
import EncryptedStorage from "react-native-encrypted-storage";
import styled from "styled-components/native";
import { APP_PASSWORD } from "../../appPassword";
import ScrollViewWithoutBounce from "../../components/shared/ScrollViewWithoutBounce";
import { FontAppliedBaseTextNeedFontSize, FontAppliedBoldTextNeedFontSize } from "../../styled-components/FontAppliedComponents";
import { ProfileListTabStackParamsList } from "../../types/navigation/homeNavStackParamsList";

const Container = styled.View`
  flex: 1;
  background-color: ${props=>props.theme.backgroundColor};
  padding: 30px 15px;
`;
const Btn = styled.TouchableOpacity`

`;
const BtnText = styled(FontAppliedBoldTextNeedFontSize)`
  /* padding-left: 20px;
  padding-bottom: 20px; */
  padding: 15px 20px;
  /* font-size: 18px; */
`;
const BtnDivideContainer = styled.View`
  background-color: rgba(144,144,144,0.3);
  height: 2px;
`;
const WarningContainer = styled.View`
  /* padding-bottom: 10px; */
  padding: 120px 10px;
`;
const TextRowContainer = styled.Text`
  padding-bottom: 10px;
`;
// const TitleText = styled(FontAppliedBoldText)`
//   padding-bottom: 50px;
//   text-align: center;
//   font-size: 18px;
// `;
const MainText = styled(FontAppliedBaseTextNeedFontSize)`
  /* font-size: 15px; */
  padding-bottom: 13px;
`;
// const StrongText = styled(FontAppliedBoldText)`
//   color: red;
//   font-size: 15px;
//   font-weight: bold;
// `;

type SecurityProps = NativeStackScreenProps<ProfileListTabStackParamsList, "Security">;

const Security = ({navigation}:SecurityProps) => {

  const onPressSetPassword = async () => {
    const storedPassword = await EncryptedStorage.getItem(APP_PASSWORD);
    navigation.navigate(storedPassword ? "CheckAppPassword" : "SettingAppPassword");
  };

  const onPressSetAppStart = async () => {
    const storedPassword = await EncryptedStorage.getItem(APP_PASSWORD);
    storedPassword ? navigation.navigate("CheckPasswordForAppStart") : Alert.alert("비밀번호가 설정되어 있지 않습니다.","비밀번호 설정 화면으로 이동하시겠습니까?",[
      {
        text:"이동",
        onPress:()=>navigation.navigate("SettingAppPassword"),
      },
      {
        text:"취소",
        style:"cancel",
      },
    ]);
  };

  return (
    <ScrollViewWithoutBounce>
      <Container>
        <BtnDivideContainer/>
        <Btn onPress={onPressSetPassword}>
          <BtnText fontSize={18}>앱 비밀번호 지정</BtnText>
        </Btn>
        <BtnDivideContainer/>
        <Btn onPress={onPressSetAppStart}>
          <BtnText fontSize={18}>앱 시작시 비밀번호 사용 설정</BtnText>
        </Btn>
        <BtnDivideContainer/>
        <WarningContainer>
          <MainText fontSize={15}>◦ 앱 비밀번호는 현재 설정하고 있는 기기에만 적용됩니다.</MainText>
          <MainText fontSize={15}>◦ 로그인 하지 않은 상태에서 작성했던 일기를 동기화 할 때 비밀번호가 필요합니다.</MainText>
          {/*  이전에 비밀번호 설정을 하지 않았는데 비밀번호가 설정되어 있는 경우 타인이 동기화 했을 가능성이 있습니다. */}
          <TextRowContainer>
            <MainText fontSize={15}>◦ 비밀번호 분실 시 앱을 삭제 후 재설치 해야 하며 재설치시 로그인 하지 않은 상태에서 작성했던 모든 일기는 삭제되니 주의해 주시기 바랍니다.</MainText>
          </TextRowContainer>
        </WarningContainer>
      </Container>
    </ScrollViewWithoutBounce>
  );
};

export default Security;