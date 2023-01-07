import { gql, useMutation } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Alert, Keyboard, TextInput, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import AuthButton from "../../components/auth/AuthButton";
import AuthLayout from "../../components/auth/AuthLayout";
import Input from "../../components/auth/AuthShared";
import { emailCheck, passwordCheck, userNameCheck } from "../../logic/userInfoFormCheck";
import { createAccount, createAccountVariables } from "../../__generated__/createAccount";
import usePlaceHolderColor from "../../hooks/usePlaceHolderColor";
import LoginLink from "../../components/auth/LoginLink";
import { colors } from "../../js-assets/color";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import useResendEmail from "../../hooks/useResendEmail";
import useIsDarkMode from "../../hooks/useIsDarkMode";
import linkToBrowser from "../../logic/linkToBrowser";
import { FontAppliedBaseTextNeedFontSize, FontAppliedBoldTextNeedFontSize } from "../../styled-components/FontAppliedComponents";

const AlertText = styled(FontAppliedBaseTextNeedFontSize)`
  padding-top: 0px;
  padding-bottom: 8px;
`;
const AgreeContainer = styled.View`
  flex-direction: row;
  margin-bottom: 14px;
  align-items: center;
`;
const IsNotCheckAgreeBaseText = styled(FontAppliedBaseTextNeedFontSize)`
  color: tomato;
`;
const IsNotCheckAgreeText = styled(IsNotCheckAgreeBaseText)`
  padding-right: 1px;
  font-weight: bold;
`;
const IsNotCheckAgreeMark = styled(IsNotCheckAgreeBaseText)`
  margin-right: 4px;
`;
const AgreeBtn = styled.TouchableOpacity<{isDarkMode:boolean,isNotCheckAgree:boolean}>`
  margin-right: 7px;
  width: 17px;
  height: 17px;
  border-radius: 3px;
  border: ${props=>props.isNotCheckAgree ? "3px" : "1px"};
  border-color: ${props => props.isNotCheckAgree ? "tomato" :
    props.isDarkMode ? "white" : "black"
  };
  background-color: ${props=>props.isDarkMode? "rgba(255,255,255,0.8)" : "white"};
  align-items: center;
  justify-content: center;
`;
const AgreeText = styled(FontAppliedBaseTextNeedFontSize)`
  
`;
const AgreeLink = styled.TouchableOpacity`

`;
const AgreeLinkText = styled(FontAppliedBoldTextNeedFontSize)<{isDarkMode:boolean}>`
  color: ${props=>props.isDarkMode ? colors.yellow : colors.darkYellow};
`;

type RouteParams = {
  email: string;
  password: string;
}

type RootStackParamList = {
  Welcome: undefined;
  LogIn: RouteParams | undefined;
  CreateAccount: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

type FormData = {
  email: string;
  password: string;
  userName: string;
  // realName?: string;
  // birth?: string;
  // gender?: boolean;
}

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $email: String!,
    $password: String!
    $userName: String!,
    # $realName: String,
    # # 여기선 String 으로 받고 백엔드에서 Int 로 저장
    # $birth: String,
    # $gender: Boolean
  ) { createAccount(
    email: $email,
    password: $password
    userName: $userName,
    # realName: $realName,
    # birth: $birth,
    # gender: $gender
  ){
    ok
    errorCode
  }}
`;

const CreateAccount = ({navigation:{navigate,replace}}:Props) => {

  const {handleSubmit, getValues, control, formState:{errors}, setError} = useForm<FormData>();

  console.log("errors")
  console.log(errors)
  
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const userNameRef = useRef<TextInput>(null);
  // const realNameRef = useRef<TextInput>(null);
  // const birthRef = useRef<TextInput>(null);

  // const [gender,setGender] = useState<"남"|"여"|null>(null);
  
  // const onPressGender = (gender:"남"|"여"|null) => {
  //   setGender(prev => (prev === gender) ? null : gender)
  // };

  const alertResendEmailNeedEmail = useResendEmail();

  const onCompleted = (data:createAccount) => {
    console.log("data.createAccount");
    console.log(data.createAccount);
    const {createAccount:{ok, errorCode}} = data;
    const {email} = getValues();
    if(ok){
      // navigate 로 하면 다시 create 로 돌아와서 replace 로 함.
      replace("LogIn", {
        email,
      });
    } else {
      
      if(errorCode === "UNKNOWN") {
        Alert.alert("계정을 생성하지 못하였습니다.","알 수 없는 오류가 발생하였습니다. 같은 문제가 지속적으로 발생 시 문의 주시면 감사드리겠습니다.")
      } else if ( errorCode === "EMAIL") {
        Alert.alert("같은 이메일의 계정이 존재합니다.","다른 이메일로 가입해 주시면 감사드리겠습니다.");
        setError("email",{
          // 걍 에러메세지 보여줄라고 타입 넣은거. shouldUnregister 는 상관없음
          type:"shouldUnregister"
        });
        emailRef.current?.focus();
      } else if ( errorCode === "ALREADY_TOKEN") {
        alertResendEmailNeedEmail(email);
      } else if ( errorCode === "INVALID_INPUT") {
        // 이게 나올일은 없겠지만? 여기서 형식 검증했는데 백에서 형식이 안맞다 하는 거임.
        Alert.alert("잘못된 값을 입력하셨습니다.","해당 오류가 지속해서 발생 시 문의주시면 감사드리겠습니다.");
      } else {
        Alert.alert("같은 닉네임의 계정이 존재합니다.","다른 이름으로 가입해 주시면 감사드리겠습니다.");
        // 걍 에러메세지 보여줄라고 타입 넣은거. shouldUnregister 는 상관없음
        setError("userName",{
          type:"shouldUnregister"
        });
        userNameRef.current?.focus();
      }
    }
  };

  const [createAccountMutation,{loading,data}] = useMutation<createAccount,createAccountVariables>(CREATE_ACCOUNT_MUTATION);

  const onNext = (nextOne:React.RefObject<TextInput>) => {
    nextOne.current?.focus();
  };

  const goToLogIn = () => navigate("LogIn");

  const [isAgree,setIsAgree] = useState(false);
  const [isNotCheckAgree,setIsNotCheckAgree] = useState(false);

  const onPressAgree = () => {
    setIsAgree(prev=>!prev);
    setIsNotCheckAgree(false);
  };

  const onPressTermsOfService = async () => {
    await linkToBrowser('https://effulgent-klepon-5dde0b.netlify.app/');
  };
  const onPressPrivacy = async () => {
    await linkToBrowser('https://stellular-pony-89a2f5.netlify.app/');
  };

  

  const onValid: SubmitHandler<FormData> = (data) => {
    if(!isAgree) {
      Alert.alert("이용약관 및 개인정보처리방침에 동의하셔야 합니다.");
      return setIsNotCheckAgree(true);
    }
    if(loading) return;

    // const { birth, gender:formGender, ...rest } = data;
    // // const typeNumberBirth = birth && Number(birth);
    // let typeBooleanGender = null;
    // if(gender === "남") {
    //   typeBooleanGender = true;
    // } else if (gender === "여") {
    //   typeBooleanGender = false;
    // }
    createAccountMutation({
      variables:{
        // ...rest,
        // ...(birth && { birth }),
        // ...(typeBooleanGender !== null && { gender: typeBooleanGender }),
        ...data,
      },
      onCompleted,
    });
  };

  const placeholderTextColor = usePlaceHolderColor();
  // const isAndroid = Platform.OS === "android";
  // const darkModeSubscription = useColorScheme();
  // const isDarkMode = darkModeSubscription === "dark";
  const isDarkMode = useIsDarkMode();

  const createAccountResultOk = data?.createAccount.ok;
  const disabled = loading || Boolean(createAccountResultOk);
  const createAccountText = createAccountResultOk ? "done!" : "Create Account";

  return <AuthLayout>
    <Controller
      control={control}
      rules={{
        required: true,
        validate:(value)=>emailCheck(value),
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <Input
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          placeholder="이메일"
          keyboardType="email-address"
          returnKeyType="next"
          autoCapitalize="none"
          autoCorrect={false}
          ref={emailRef}
          onSubmitEditing={()=>onNext(passwordRef)}
          blurOnSubmit={false}
          placeholderTextColor={placeholderTextColor}
        />
      )}
      name="email"
    />
    {errors.email?.type === "required" && <AlertText fontSize={13}>이메일은 필수 항목 입니다.</AlertText>}
    {errors.email?.type === "validate" && <AlertText fontSize={13}>이메일 형식이 맞지 않습니다.</AlertText>}
    {/* 이메일 겹칠때 보여주는거. shouldUnregister 는 상관없음 내가 setError 로 지정함. */}
    {errors.email?.type === "shouldUnregister" && <AlertText fontSize={13}>같은 이메일의 계정이 존재합니다.</AlertText>}
    <Controller
      control={control}
      rules={{
        required: true,
        validate:(value)=>passwordCheck(value),
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <Input
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          placeholder="비밀번호"
          secureTextEntry={true}
          returnKeyType="next"
          autoCapitalize="none"
          autoCorrect={false}
          ref={passwordRef}
          onSubmitEditing={()=>onNext(userNameRef)}
          blurOnSubmit={false}
          placeholderTextColor={placeholderTextColor}
        />
      )}
      name="password"
    />
    {errors.password?.type === "required" && <AlertText fontSize={13}>비밀번호를 작성해 주세요.</AlertText>}
    {errors.password?.type === "validate" && <AlertText fontSize={13}>비밀번호 형식은 숫자+영문+특수문자 조합의 8~25 자 이어야 합니다.</AlertText>}
    <Controller
      control={control}
      rules={{
        required: true,
        validate:(value)=>userNameCheck(value),
        // userName 규정?
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <Input
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          placeholder="앱에서 사용할 닉네임"
          returnKeyType="next"
          autoCapitalize="none"
          autoCorrect={false}
          ref={userNameRef}
          // onSubmitEditing={()=>onNext(realNameRef)}
          onSubmitEditing={()=>Keyboard.dismiss()}
          blurOnSubmit={false}
          placeholderTextColor={placeholderTextColor}
        />
      )}
      name="userName"
    />
    {errors.userName?.type === "required" && <AlertText fontSize={13}>닉네임은 필수 항목 입니다.</AlertText>}
    {errors.userName?.type === "validate" && <AlertText fontSize={13}>닉네임에는 20자 이하의 영어, 한글, 숫자만 사용 가능합니다.</AlertText>}
    {/* 닉네임 겹칠때 보여주는거. shouldUnregister 는 상관없음 내가 setError 로 지정함. */}
    {errors.userName?.type === "shouldUnregister" && <AlertText fontSize={13}>같은 닉네임의 계정이 존재합니다.</AlertText>}
    {/* <Controller
      control={control}
      rules={{
        // 이름규정?
        validate:(value)=>realNameCheck(value),
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <Input
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          placeholder="(선택사항) 이름"
          returnKeyType="next"
          autoCapitalize="none"
          autoCorrect={false}
          ref={realNameRef}
          onSubmitEditing={()=>onNext(birthRef)}
          blurOnSubmit={false}
          placeholderTextColor={placeholderTextColor}
        />
      )}
      name="realName"
    />
    {errors.realName && <AlertText>이름 형식이 맞지 않습니다.</AlertText>}
    <Controller
      control={control}
      rules={{
        // 생년월일규정. 혹은 아예 생년월일 컴포넌트 쓰는게 나을듯. 헷갈릴 수 있으니.
        validate:(value)=>birthCheck(value),
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <Input
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          placeholder="(선택사항) 생년월일 ex)19991231"
          keyboardType="number-pad"
          returnKeyType="done"
          autoCapitalize="none"
          autoCorrect={false}
          ref={birthRef}
          onSubmitEditing={()=>Keyboard.dismiss()}
          blurOnSubmit={false}
          placeholderTextColor={placeholderTextColor}
        />
      )}
      name="birth"
    />
    {errors.birth && <AlertText>생년월일 형식이 맞지 않습니다.</AlertText>}
    <GenderContainer>
      <GenderGuideText isAndroid={isAndroid} placeholderTextColor={placeholderTextColor}>(선택사항) 성별</GenderGuideText>
      <GenderChooseBtn selectedGender={gender} onPressGender={onPressGender}/>
    </GenderContainer> */}
    <AgreeContainer>
      {isNotCheckAgree && <><IsNotCheckAgreeText fontSize={15}>!</IsNotCheckAgreeText>
      <IsNotCheckAgreeMark fontSize={13}>필수</IsNotCheckAgreeMark></>
      }
      <AgreeBtn onPress={onPressAgree} isDarkMode={isDarkMode} isNotCheckAgree={isNotCheckAgree} >
        {isAgree && <FontAwesome name="check" size={15} color={colors.darkYellow} />}
      </AgreeBtn>
      <AgreeText fontSize={13}>음악일기의 </AgreeText>
      <AgreeLink onPress={onPressTermsOfService} >
        <AgreeLinkText fontSize={13} isDarkMode={isDarkMode} >이용약관</AgreeLinkText>
      </AgreeLink>
      <AgreeText fontSize={13}>, </AgreeText>
      <AgreeLink onPress={onPressPrivacy} >
        <AgreeLinkText fontSize={13} isDarkMode={isDarkMode} >개인정보처리방침</AgreeLinkText>
      </AgreeLink>
      <AgreeText fontSize={13}> 에 동의합니다.</AgreeText>
    </AgreeContainer>
    <AuthButton text={createAccountText} onPress={handleSubmit(onValid)} disabled={disabled} loading={loading}/>
    <TouchableOpacity onPress={goToLogIn}>
      <LoginLink>Log In</LoginLink>
    </TouchableOpacity>
  </AuthLayout>;
};

export default CreateAccount;