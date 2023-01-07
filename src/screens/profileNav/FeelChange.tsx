import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import styled from "styled-components/native";
import useBackgroundColorAndTextColor from "../../hooks/useBackgroundColorAndTextColor";
import { FontAppliedBaseTextNeedFontSize } from "../../styled-components/FontAppliedComponents";
import { ProfileDrawerNavParamsList, ProfileListTabStackParamsList } from "../../types/navigation/homeNavStackParamsList";
import useBottomTabGetHeaderHeightAndInnerLayout from "../../hooks/useBottomTabGetHeaderHeightAndInnerLayout"
import ScrollPicker from "../../components/calendar/ScrollViewPicker";
import { feelingNameArr } from "../../recommend/youtubeRecommendByFeeling/youtubeRecommendByFeeling";
import { CompositeScreenProps } from "@react-navigation/core";
import { DrawerScreenProps } from "@react-navigation/drawer";

type ProfileScreenType = CompositeScreenProps<
NativeStackScreenProps<ProfileListTabStackParamsList, "FeelChange">,
  DrawerScreenProps<ProfileDrawerNavParamsList>
>;;


const Container = styled.View<{headerHeight:number}>`
  margin-top: ${props=>props.headerHeight}px;
  padding: 0px 20px;
  flex: 1;
  background-color: ${props=>props.theme.backgroundColor};
`;
const OkBtn = styled.TouchableOpacity`

`;
const OkBtnText = styled(FontAppliedBaseTextNeedFontSize)<{tintColor:string}>`
  color: ${props=>props.tintColor};
  /* font-size: 16px; */
`;
const SelectText = styled(FontAppliedBaseTextNeedFontSize)`

`;

const FeelChange = ({navigation,route}:ProfileScreenType) => {

  // const feeling = route.params.feeling;
  // console.log(feeling);
  const [feeling,setFeeling] = useState(route.params.feeling);

  const currentFeelingIndex = feelingNameArr.findIndex(feelingName=>feelingName === feeling);

  const onPressOk = () => navigation.navigate("ProfileScreen",{
    newFeeling: feeling,
  });

  useEffect(()=>{
    navigation.setOptions({
      headerRight:({tintColor})=><OkBtn onPress={onPressOk}>
        <OkBtnText fontSize={16} tintColor={tintColor+""}>완료</OkBtnText>
      </OkBtn>
    })
  },[feeling])
  
  const {backgroundColor} = useBackgroundColorAndTextColor();

  const {headerHeight,innerLayoutHeight} = useBottomTabGetHeaderHeightAndInnerLayout();

  return (
    <Container
      headerHeight={headerHeight}
      // 크래시 위한 애?
      // renderToHardwareTextureAndroid={true}
      // style={{
      //   opacity: 0.99, overflow: 'hidden',
      // }}
    >
      <ScrollPicker
        dataSource={feelingNameArr}
        selectedIndex={currentFeelingIndex}
        renderItem={(data, index) => <SelectText>{data}</SelectText>}
        onValueChange={(data, selectedIndex) => setFeeling(data)}
        wrapperHeight={innerLayoutHeight}
        // wrapperWidth={150}
        wrapperColor={backgroundColor}
        itemHeight={50}
        highlightColor='#d8d8d8'
        highlightBorderWidth={2}
      />
    </Container>
  );
};

export default FeelChange;