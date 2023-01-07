import React from "react";
// import { Platform } from "react-native";
import styled from "styled-components/native";
import FastImage from 'react-native-fast-image'
// import { logoUriVar } from "../../apollo";
import { isIOS } from "../../utils";
import DismissKeyboard from "../shared/DismissKeyboard";
import { logoUri } from "../../localImage/preloadLocalImageAndSetReactiveVar";

const Container = styled.View`
  background-color: ${props=>props.theme.backgroundColor};
  flex:1;
  align-items: center;
  justify-content: center;
  padding: 0px 5%;
`;
// const Logo = styled.Image`
//   max-width:50%;
//   width: 100%;
//   height: 100px;
// `;
const KeyboardAvoidLayout = styled.KeyboardAvoidingView`
  width: 100%;
  align-items:center;
`;

// 얘 아래에 flex:1 인 View 있어야 함.
const AuthLayout = ({children}:{children:React.ReactNode}) => {
  
  return (
  <DismissKeyboard>
    <Container>
    <KeyboardAvoidLayout
      behavior={isIOS ? "padding" : "height"}
      keyboardVerticalOffset={30}  
    >
      <FastImage
        style={{
          maxWidth:"50%",
          width: "100%",
          height: 100,
        }}
        // source={require("../../../assets/logo.png")}
        // source={image.logo}
        // source={{uri:logoUriVar()}}
        source={{uri:logoUri}}
        resizeMode={FastImage.resizeMode.contain}
      />
        {children}
    </KeyboardAvoidLayout>
      </Container>
  </DismissKeyboard>
  );
};

export default AuthLayout;