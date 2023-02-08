import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Alert, TouchableOpacity, BackHandler } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styled from "styled-components/native";
import usePlaceHolderColor from "../../hooks/usePlaceHolderColor";
import { colors } from "../../js-assets/color";
import { FontAppliedBaseTextNeedFontSize, FontAppliedBaseTextInputNeedFontSize } from "../../styled-components/FontAppliedComponents";
import { ProfileListTabStackParamsList } from "../../types/navigation/homeNavStackParamsList";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { gql, useMutation } from "@apollo/client";
import { requestEmailToAdmin, requestEmailToAdminVariables } from "../../__generated__/requestEmailToAdmin";
import { isAndroid } from "../../utils";
import UploadHorizontalEmptyLayoutForBigScreenNeedScreenWidth from "../../components/upload/UploadHorizontalEmptyLayoutForBigScreenNeedScreenWidth";

const REQUSET_EMAIL_TO_ADMIN = gql`
  mutation requestEmailToAdmin(
    $text: String!
  ) {
    requestEmailToAdmin(
      text: $text
    ) {
      ok
      error
    }
  }
`;

const Container = styled.View`
  /* background-color: ${props=>props.theme.backgroundColor}; */
  flex: 1;
  padding: 20px 10px;
`;
const Title = styled(FontAppliedBaseTextNeedFontSize)`
  margin-bottom: 10px;
  text-align: center;
  /* font-size: 17px; */
`;
const InputContainer = styled.View`
  /* height: 120px; */
  min-height: 300px;
  border-bottom-color: grey;
  border-bottom-width: 1px;
`;
const Input = styled(FontAppliedBaseTextInputNeedFontSize)`
  padding: 20px 10px;
  /* font-size: 16px; */
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
const SubmitBtnText = styled(FontAppliedBaseTextNeedFontSize)`
  color:${colors.darkYellow};
  /* font-size: 15px; */
`;

type RequestProp = NativeStackScreenProps<ProfileListTabStackParamsList,"RequestEmailToAdministrator">;

const RequestEmailToAdministrator = ({navigation}:RequestProp) => {

  const placeholderTextColor = usePlaceHolderColor();
  const [value,setValue] = useState("");

  const [requestEmailToAdmin] = useMutation<requestEmailToAdmin,requestEmailToAdminVariables>(REQUSET_EMAIL_TO_ADMIN);

  const onPressSubmit = () => {
    if(!value) return Alert.alert("내용이 없습니다.");
    Alert.alert("작성한 내용을 전송하시겠습니까?",undefined,[
      {
        text:"전송",
        onPress:async() => {
          await requestEmailToAdmin({
            variables:{
              text:value,
            },
            onCompleted:(data)=>{
              if(data.requestEmailToAdmin.ok) {
                Alert.alert("의견을 작성해 주셔서 진심으로 감사드립니다. 소중한 의견 반영해서 빠른 시일 내에 해결하고 더 나은 어플이 되도록 만들겠습니다.");
                navigation.goBack();
              } else {
                Alert.alert("전송에 실패하였습니다.","같은 문제가 지속적으로 발생한다면 문의 주시면 감사드리겠습니다.");
              }
            },
          });
        },
      },
      {
        text:"취소",
        style:"cancel",
      }
    ]);
  };

  const onPressCancel = () => {
    if(!value) {
      navigation.goBack();
    } else {
      Alert.alert("작성중인 내용이 있습니다. 이전 페이지로 돌아가시겠습니까?","작성 중인 내용은 유실됩니다.",[
        {
          text:"예",
          onPress:async() => {
            navigation.goBack();
          },
        },
        {
          text:"아니오",
          style:"cancel",
        },
      ]);
    }
    return true;
  };

  useEffect(()=>{
    navigation.setOptions({
      headerLeft:({tintColor})=><TouchableOpacity onPress={onPressCancel}>
        <Ionicons name="chevron-back" size={24} color={tintColor} />
      </TouchableOpacity>
    });
  },[value]);

  const isWriteSomething = Boolean(value);
  useEffect(() => {
    const backHandler = isAndroid ?
        BackHandler.addEventListener(
          "hardwareBackPress",
          onPressCancel
        )
      :
        null;

    return () => backHandler?.remove();
  }, [isWriteSomething]);

  return (
    <UploadHorizontalEmptyLayoutForBigScreenNeedScreenWidth>
    <Container>
      <KeyboardAwareScrollView>
          <Title fontSize={17}>버그, 앱 작동 문제, 추가했으면 하는 기능, 이 앱의 장점, 단점, 보완할 점, 부족한 점 등 무엇이든 저희에게 보내주시면 감사한 마음으로 받겠습니다.</Title>
          <InputContainer>
            <Input
              fontSize={16}
              placeholder="이곳에 작성해 주세요."
              placeholderTextColor={placeholderTextColor}
              autoCapitalize="none"
              autoCorrect={false}
              multiline={true}
              value={value}
              onChangeText={(text)=>setValue(text)}
            />
          </InputContainer>
          <SubmitContainer>
            <SubmitBtn onPress={onPressSubmit}>
              <SubmitBtnText fontSize={15}>전송</SubmitBtnText>
            </SubmitBtn>
            <SubmitBtn onPress={onPressCancel}>
              <SubmitBtnText fontSize={15}>취소</SubmitBtnText>
            </SubmitBtn>
          </SubmitContainer>
        </KeyboardAwareScrollView>
    </Container>
    </UploadHorizontalEmptyLayoutForBigScreenNeedScreenWidth>
  );
};

export default RequestEmailToAdministrator;