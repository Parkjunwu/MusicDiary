
import React, { useEffect, useState } from "react";
import { Alert, Keyboard, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import Ionicons from "react-native-vector-icons/Ionicons"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from "@react-navigation/native";
import { ApolloCache, DefaultContext, MutationFunctionOptions, OperationVariables } from "@apollo/client";
import { colors } from "../../../js-assets/color";
import { isAndroid } from "../../../utils";
import useColorsChangedByDarkMode from "../../../hooks/useColorsChangedByDarkMode";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BoardTabStackParamsList } from "../../../types/navigation/homeNavStackParamsList";
import { FontAppliedBaseTextInputLittlePaddingNeedFontSize, FontAppliedBaseTextLittlePaddingNeedFontSize } from "../../../styled-components/FontAppliedComponents";

const DismissKeyboardContainer = styled.TouchableWithoutFeedback`
  flex: 1;
  background-color: ${props=>props.theme.backgroundColor};
`;
const Container = styled.View`
  background-color: ${props=>props.theme.backgroundColor};
  flex: 1;
`;
// const Title = styled.Text`
//   color: ${props=>props.theme.textColor};
const Title = styled(FontAppliedBaseTextLittlePaddingNeedFontSize)`
  margin-top: 25px;
  margin-bottom: 10px;
  text-align: center;
`;
const ReasonContainer = styled.TouchableOpacity`
  border-bottom-width: 1px;
  border-bottom-color: grey;
  justify-content: space-between;
  flex-direction: row;
  padding: 8px 20px;
`;
// const ReasonText = styled.Text`
//   font-size: 20px;
//   color: ${props=>props.theme.textColor};
const ReasonText = styled(FontAppliedBaseTextLittlePaddingNeedFontSize)`
  font-weight: ${isAndroid ? 'bold' : 600};
`;
const DetailContainer = styled.View`
  height: 120px;
  border-bottom-color: grey;
  border-bottom-width: 1px;
`;
// const Detail = styled.TextInput`
//   color: ${props=>props.theme.textColor};
//   font-size: 18px;
const Detail = styled(FontAppliedBaseTextInputLittlePaddingNeedFontSize)`
  padding: 20px;
`;
const SubmitContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 100px;
`;
const SubmitBtn = styled.TouchableOpacity`
  background-color: ${colors.yellow};
  padding: 9px 20px;
  border-radius: 5px;
`;
// const SubmitBtnText = styled.Text`
//   font-size: 15px;
const SubmitBtnText = styled(FontAppliedBaseTextLittlePaddingNeedFontSize)`
  color:${colors.darkYellow};
  font-weight: ${isAndroid ? 'bold' : 600};
`;

type AccuseLayoutProps = {
  accuseFn:(options?: MutationFunctionOptions<any, OperationVariables, DefaultContext, ApolloCache<any>>) => Promise<any>,
  accuseThingId:number,
};

const AccuseLayout = ({accuseFn,accuseThingId}:AccuseLayoutProps) => {

  const navigation = useNavigation<NativeStackNavigationProp<BoardTabStackParamsList, "AccuseBoard">>();
  
  useEffect(()=>{
    navigation.setOptions({
      headerLeft:({tintColor})=><TouchableOpacity onPress={()=>navigation.goBack()}>
        <Ionicons name="chevron-back" color={tintColor} size={30} />
      </TouchableOpacity>
    });
  },[]);

  const reasons = [
    "????????? ??????",
    "??????????????? ??????",
    "??????, ?????? ??????",
    "?????? ????????? ??????",
    "????????? ????????? ??????",
    "??????",
  ];

  const [reasonIndex,setReasonIndex] = useState<number | null>(null);
  const [detail,setDetail] = useState<string>("");

  const onPressReason = (reason:string,index:number) => {
    Keyboard.dismiss();
    if(reason === "??????") {
      setReasonIndex(0);
    } else {
      setReasonIndex(index+1);
    }
  };

  // const darkModeSubscription = useColorScheme();
  // const isDarkMode = darkModeSubscription === "dark";
  // const isDarkMode = useIsDarkMode();
  // const isAndroid = Platform.OS === "android"
  const { textColor, placeholderTextColor } = useColorsChangedByDarkMode();

  const RenderReasonList = () => {
    return (
      <>
        {reasons.map((reason,index) => <ReasonContainer activeOpacity={0.5} key={index} onPress={()=>onPressReason(reason,index)}>
          <ReasonText fontSize={18}>{reason}</ReasonText>
          {(reasonIndex === index+1 || (reasonIndex === 0 && reason === "??????")) && <Ionicons name="ios-checkmark-sharp" size={22} color={textColor} />}
        </ReasonContainer>
        )}
      </>
    );
  };

  // const [accusePost] = useMutation<accusePost,accusePostVariables>(ACCUSE_POST,{
  //   onCompleted:(data)=>{
  //     if(data.accusePost?.ok || data.accusePetLog?.ok) {
  //       Alert.alert("?????? ???????????? ?????? ????????? ?????????????????????.");
  //       navigation.goBack();
  //     }
  //   },
  // });

  const onPressSubmit = () => {
    if(reasonIndex === null) {
      return Alert.alert("??????????????? ?????? ????????? ????????? ?????????.");
    }
    Alert.alert("????????? ???????????? ?????? ???????????? ?????????????????????????",undefined,[
      {
        text:"??????",
        onPress:async() => {
          await accuseFn({
            variables:{
              id:accuseThingId,
              reason:reasonIndex,
              ...(detail && {detail}),
            },
            onCompleted:(data)=>{
              // ????????? ???????????? ?????? ??????
              if(data.accusePost?.ok || data.accusePetLog?.ok) {
                Alert.alert("?????? ???????????? ?????? ????????? ?????????????????????.");
                navigation.goBack();
              }
            },
          });
        },
      },
      {
        text:"??????",
        style:"cancel",
      },
    ]);
  };

  const onPressCancel = () => Alert.alert("?????? ???????????????????",undefined,[
    {
      text:"???",
      onPress:async() => {
        navigation.goBack();
      }
    },
    {
      text:"?????????",
      style:"cancel",
    },
  ]);

  return (
    <DismissKeyboardContainer
      onPress={() => Keyboard.dismiss()}
      accessible={false}
    >
      <Container>
        <KeyboardAwareScrollView>
          <Title>??????????????? ????????? ????????? ?????????.</Title>
          <RenderReasonList/>
          <DetailContainer>
          <Detail
            fontSize={16}
            placeholder="????????? 60??? ????????? ????????? ?????????"
            placeholderTextColor={placeholderTextColor}
            autoCapitalize="none"
            autoCorrect={false}
            multiline={true}
            maxLength={60}
            numberOfLines={3}
            value={detail}
            onChangeText={(text)=>setDetail(text)}
          />
          </DetailContainer>
          <SubmitContainer>
            <SubmitBtn onPress={onPressSubmit}>
              <SubmitBtnText>??????</SubmitBtnText>
            </SubmitBtn>
            <SubmitBtn onPress={onPressCancel}>
              <SubmitBtnText>??????</SubmitBtnText>
            </SubmitBtn>
          </SubmitContainer>
        </KeyboardAwareScrollView>
      </Container>
    </DismissKeyboardContainer>
  );
};

export default AccuseLayout;
