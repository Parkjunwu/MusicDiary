import { useNavigation } from "@react-navigation/core";
import { Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styled from "styled-components/native";
import useIsDarkMode from "../../../hooks/useIsDarkMode";
import useLogOut from "../../../hooks/useLogOut";
import { FontAppliedBaseTextNeedFontSize } from "../../../styled-components/FontAppliedComponents";

const Container = styled.View`
  flex: 1;
  /* background-color: yellow; */
  align-items: flex-end;
  justify-content: flex-end;
`;
const PressContainer = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: flex-end;
  /* background-color: red; */
  width: 50%;
  padding: 3px;
`;

const LogOutBtn = () => {

  const logOut = useLogOut();
  const navigation = useNavigation();
  const isDarkMode = useIsDarkMode();
  const onPressLogOut = async() => {
    Alert.alert("로그아웃 하시겠습니까?",undefined,[
      {
        text: "로그아웃",
        onPress: async() => {
          await logOut();
          navigation.navigate("LogOutCompletedView");
        }
      },
      {
        text: "취소",
        style: 'destructive'
      },
    ])
  };

  return (
    <Container>
      <PressContainer onPress={onPressLogOut}>
        <FontAppliedBaseTextNeedFontSize>로그아웃 </FontAppliedBaseTextNeedFontSize>
        <Ionicons name="log-out-outline" size={24} color={isDarkMode ? "white" : "black"} />
      </PressContainer>
    </Container>
  )
};

export default LogOutBtn;