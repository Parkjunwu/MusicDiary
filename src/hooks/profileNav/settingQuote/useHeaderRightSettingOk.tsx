import AsyncStorage from "@react-native-async-storage/async-storage";
import { CompositeScreenProps, useNavigation } from "@react-navigation/core";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { Alert } from "react-native";
import styled from "styled-components/native";
import { quoteType } from "../../../quote/quoteConstants";
import { FontAppliedBaseTextNeedFontSize } from "../../../styled-components/FontAppliedComponents";
import { ProfileDrawerNavParamsList, ProfileListTabStackParamsList } from "../../../types/navigation/homeNavStackParamsList";

const OkBtn = styled.TouchableOpacity`
  
`;
const OkBtnText = styled(FontAppliedBaseTextNeedFontSize)<{color:string}>`
  color: ${props=>props.color};
  /* font-size: 15px; */
`;

type SettingQuoteProp = CompositeScreenProps<
  NativeStackScreenProps<ProfileListTabStackParamsList,"SettingQuote">,
  DrawerScreenProps<ProfileDrawerNavParamsList,"ProfileScreen">
>;

type Props = {
  quote: quoteType;
  selectedIndexArr: number[],
  selfQuote: string[],
};

const useHeaderRightSettingOk = ({
  quote,
  selectedIndexArr,
  selfQuote,
}: Props) => {
  const navigation = useNavigation<SettingQuoteProp["navigation"]>();
  const onPressOk = async() => {
    // 변경 AsyncStorage 저장. 근데 arr 라서 JSON.stringify 써야함.
    await AsyncStorage.setItem(quote.QUOTE_INDEX_ARR, JSON.stringify(selectedIndexArr));
    const filteredSelfQuote = selfQuote.filter(quote=>quote);
    await AsyncStorage.setItem(quote.QUOTE_USER_INPUT_ARR, JSON.stringify(filteredSelfQuote));
    Alert.alert("변경되었습니다.");

    const selectedIndexArrLength = selectedIndexArr.length;

    if(selectedIndexArrLength === 0) {
      return navigation.navigate("ProfileScreen",{
        newQuote: "",
      });
    }

    const randomNumber = Math.floor(Math.random() * selectedIndexArr.length);
    const randomIndex = selectedIndexArr[randomNumber];
    const isSelfQuote = randomIndex === quote.allNameArrLength-1;
    const randomQuote = isSelfQuote ? selfQuote : quote.allArr[randomIndex];
    const randomQuoteNumber = Math.floor(Math.random() * randomQuote.length);
    const newQuote = randomQuote[randomQuoteNumber];
    
    navigation.navigate("ProfileScreen",{
      newQuote,
    })
  };

  useEffect(()=>{
    navigation.setOptions({
      // 뒤로 가는 것도 확인하고 하는걸로?
      headerRight:({tintColor})=><OkBtn onPress={onPressOk}>
        <OkBtnText fontSize={15} color={tintColor+""}>완료</OkBtnText>
      </OkBtn>
    })
  },[selectedIndexArr,selfQuote]);
};

export default useHeaderRightSettingOk;