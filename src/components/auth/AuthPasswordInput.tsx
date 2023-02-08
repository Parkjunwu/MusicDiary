import { NativeSyntheticEvent, TextInputFocusEventData, TextInput, TextInputSubmitEditingEventData } from "react-native";
import { fontFamilyVar } from "../../apollo";
import { isAndroid } from "../../utils";
import Input from "./AuthShared";

// 근데 비밀번호만 얘로 하면 너무 튀어서 Input 에다가 줌. 그래서 안씀. 안쓰면 얘 지워

const isAndroidNotShowPasswordFont = () => {
  if(isAndroid) {
    const fontFamily = fontFamilyVar();
    return fontFamily === "Cafe24Syongsyong" || fontFamily === "Cafe24Ssukssuk";
  } else {
    return false;
  }
};

type AuthPasswordInputProps = {
  onBlur?: ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void) | undefined
  onChange?: ((text: string) => void) | undefined
  value: string;
  passwordRef?: React.Ref<TextInput> | undefined
  onSubmitEditing?: ((e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void) | undefined
  placeholderTextColor: string;
  lastOne: boolean;
};

const AuthPasswordInput = ({
  onBlur,
  onChange,
  value,
  passwordRef,
  onSubmitEditing,
  placeholderTextColor,
  lastOne,
}: AuthPasswordInputProps) => (
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
    lastOne={lastOne}
    onSubmitEditing={onSubmitEditing}
    blurOnSubmit={false}
    placeholderTextColor={placeholderTextColor}
    style={isAndroidNotShowPasswordFont() ? {fontFamily:"ChosunCentennial"} : undefined}
  />
);

export default AuthPasswordInput;