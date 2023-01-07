import { useEffect, useState } from "react";
import styled from "styled-components/native";
import { FontAppliedBoldTextNeedFontSize } from "../../styled-components/FontAppliedComponents";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import useBackgroundColorAndTextColor from "../../hooks/useBackgroundColorAndTextColor";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USE_APP_START_PASSWORD } from "../../appPassword";
import { ProfileListTabStackParamsList } from "../../types/navigation/homeNavStackParamsList";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
// import EncryptedStorage from "react-native-encrypted-storage";

const Container = styled.View`
  flex: 1;
  background-color: ${props=>props.theme.backgroundColor};
  padding: 0px 15px;
`;
const Btn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;
const BtnText = styled(FontAppliedBoldTextNeedFontSize)`
  padding: 10px;
  /* font-size: 18px; */
`;
const BtnDivideContainer = styled.View`
  background-color: rgba(144,144,144,0.3);
  height: 2px;
`;

type SettingAppStartPasswordProps = NativeStackScreenProps<ProfileListTabStackParamsList, "SettingAppStartPassword">;

const SettingAppStartPassword = ({navigation}:SettingAppStartPasswordProps) => {

  const [use,setUse] = useState(false);

  useEffect(()=>{
    navigation.setOptions({
      headerLeft:({tintColor})=><Btn onPress={()=>navigation.navigate("Security")}>
        <Ionicons name="chevron-back" size={28} color={tintColor} />
      </Btn>
    });

    // 처음 들어왔을 때 세팅 받음
    const setPrevSetting = async() => {
      const prevSetting = await AsyncStorage.getItem(USE_APP_START_PASSWORD);
      setUse(Boolean(prevSetting));
    };

    setPrevSetting();
  },[]);

  // 혹시 모르니 loading 넣음
  const [loading,setLoading] = useState(false);
  const { textColor } = useBackgroundColorAndTextColor();
  
  const onPressUse = async() => {
    if(loading) return;
    setLoading(true);
    setUse(true);
    await AsyncStorage.setItem(USE_APP_START_PASSWORD,"ok");
    setLoading(false);
  };

  const onPressNotUse = async() => {
    if(loading) return;
    setLoading(true);
    setUse(false);
    await AsyncStorage.removeItem(USE_APP_START_PASSWORD);
    // await EncryptedStorage.removeItem(APP_PASSWORD);
    setLoading(false);
  };

  return (
    <Container>
      <Btn onPress={onPressUse}>
        <MaterialIcons name={use ? "radio-button-on" : "radio-button-off"} size={24} color={textColor} />
        <BtnText fontSize={18}>사용</BtnText>
      </Btn>
      <BtnDivideContainer/>
      <Btn onPress={onPressNotUse}>
        <MaterialIcons name={use ? "radio-button-off" : "radio-button-on"} size={24} color={textColor} />
        <BtnText fontSize={18}>사용 안함</BtnText>
      </Btn>
      <BtnDivideContainer/>
    </Container>
  )
};

export default SettingAppStartPassword;