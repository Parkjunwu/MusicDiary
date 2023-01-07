import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import styled from "styled-components/native";
import useIsDarkMode from "../../../../hooks/useIsDarkMode";
import { FontAppliedBaseTextNeedFontSize } from "../../../../styled-components/FontAppliedComponents";
import RootNavStackParamsList from "../../../../types/navigation/rootNavStackParamsList";

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

type RootNavProps = NativeStackNavigationProp<RootNavStackParamsList>;

const GoToAuthBtn = () => {

  const navigation = useNavigation<RootNavProps>();
  const isDarkMode = useIsDarkMode();

  const onPressBtn = () => navigation.navigate("AuthNav");

  return (
    <Container>
      <PressContainer onPress={onPressBtn}>
        <FontAppliedBaseTextNeedFontSize>로그인/회원가입 </FontAppliedBaseTextNeedFontSize>
        <Ionicons name="log-out-outline" size={24} color={isDarkMode ? "white" : "black"} />
      </PressContainer>
    </Container>
  )
};

export default GoToAuthBtn;