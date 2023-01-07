import React from "react";
import { Keyboard, Platform, TouchableWithoutFeedback } from "react-native";

// AccusePost 보고 만들어보면 될듯
const DismissKeyboard = ({ children }: { children: React.ReactNode }) => {
  return <TouchableWithoutFeedback
    onPress={() => Keyboard.dismiss()}
    style={{flex:1}}
    disabled={Platform.OS === "web" ? true : false}
    accessible={false}
    >
    {children}
  </TouchableWithoutFeedback>
};

export default DismissKeyboard;