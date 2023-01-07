import React, { useEffect } from "react";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TouchableOpacity } from "react-native";
import AuthLayout from "../../components/auth/AuthLayout";
import AuthButton from "../../components/auth/AuthButton";
import Entypo from "react-native-vector-icons/Entypo"
import LoginLink from "../../components/auth/LoginLink";

type RouteParams = {
  userName: string;
  password: string;
}

type RootStackParamList = {
  Welcome: undefined;
  LogIn: RouteParams | undefined;
  CreateAccount: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

const Welcome = ({navigation:{navigate,setOptions,goBack},route:{params}}:Props) => {
  const goToCreateAccount = () => navigate("CreateAccount");
  const goToLogIn = () => navigate("LogIn")
  
  useEffect(()=>{
    setOptions({
      headerRight:({tintColor})=><TouchableOpacity onPress={()=>goBack()}>
        <Entypo name="cross" size={30} color={tintColor} />
      </TouchableOpacity>
    })
  },[]);

  return <AuthLayout>
    <AuthButton onPress={goToCreateAccount} disabled={false} text="Create New Account" loading={false}/>
    <TouchableOpacity onPress={goToLogIn}>
      <LoginLink>Log In</LoginLink>
    </TouchableOpacity>
  </AuthLayout>
};

export default Welcome;