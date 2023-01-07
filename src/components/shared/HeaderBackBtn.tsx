import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styled from "styled-components/native";

const BackBtn = styled.TouchableOpacity`
  padding-right: 10px;
`;

const HeaderBackBtn = ({tintColor}:{tintColor:string|undefined}) => {

  const navigation = useNavigation();
  const onPressGoBack = () => navigation.goBack();

  return (
    <BackBtn onPress={onPressGoBack}>
      <Ionicons name="chevron-back" color={tintColor} size={30} />
    </BackBtn>
  );
};

export default HeaderBackBtn;