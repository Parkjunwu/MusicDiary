import React from "react";
import { Platform, TextInput } from "react-native";
import { StyledComponent } from "styled-components";
import styled, { DefaultTheme } from "styled-components/native";
import { FontAppliedBaseTextInputNeedFontSize } from "../../styled-components/FontAppliedComponents";

interface IInputProps {
  lastOne?:boolean;
  isAndroid:boolean;
}

// export const AuthInput = styled.TextInput<IInputProps>`
export const AuthInput = styled(FontAppliedBaseTextInputNeedFontSize)<IInputProps>`
  background-color: ${props=>props.theme.textInputBackgroundColor};
  /* padding: 15px 8px; */
  padding: ${props=>props.isAndroid ? "8px 10px" : "15px 8px;"};
  border-radius: 20px;
  /* color: ${props=>props.theme.textColor}; */
  margin-bottom: ${props=>props.lastOne ? 17 : 8}px;
  width: 100%;
`;

// forwardRef 써야 ref 받아짐
const Input:StyledComponent<typeof TextInput, DefaultTheme, {lastOne?:boolean}, never> = React.forwardRef((props,ref) => {
  const isAndroid = Platform.OS === "android"
  return <AuthInput {...props} ref={ref} isAndroid={isAndroid}/>
});

export default Input;
