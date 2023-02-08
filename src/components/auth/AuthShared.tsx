import React from "react";
import { TextInput } from "react-native";
import { StyledComponent } from "styled-components";
import styled, { DefaultTheme } from "styled-components/native";
import { fontFamilyVar } from "../../apollo";
import { FontAppliedBaseTextInputNeedFontSize } from "../../styled-components/FontAppliedComponents";
import { isAndroid } from "../../utils";

interface IInputProps {
  lastOne?:boolean;
}

// export const AuthInput = styled.TextInput<IInputProps>`
export const AuthInput = styled(FontAppliedBaseTextInputNeedFontSize)<IInputProps>`
  background-color: ${props=>props.theme.textInputBackgroundColor};
  /* padding: 15px 8px; */
  padding: ${isAndroid ? "8px 10px" : "15px 8px;"};
  border-radius: 20px;
  /* color: ${props=>props.theme.textColor}; */
  margin-bottom: ${props=>props.lastOne ? 17 : 8}px;
  width: 100%;
`;

// 비번만 하면 뭔가 안맞아서 Input 에 넣음
const isAndroidNotShowPasswordFont = () => {
  if(isAndroid) {
    const fontFamily = fontFamilyVar();
    return fontFamily === "Cafe24Syongsyong" || fontFamily === "Cafe24Ssukssuk";
  } else {
    return false;
  }
};

// forwardRef 써야 ref 받아짐
const Input:StyledComponent<typeof TextInput, DefaultTheme, {lastOne?:boolean}, never> = React.forwardRef((props,ref) => <AuthInput {...props} ref={ref} style={isAndroidNotShowPasswordFont() ? {fontFamily:"ChosunCentennial"} : undefined}/>);

export default Input;
