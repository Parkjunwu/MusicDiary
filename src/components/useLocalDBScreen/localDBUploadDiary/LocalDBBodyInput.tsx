import React from "react";
import { TextInput } from "react-native";

type BodyInputType = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholderTextColor: string;
  textColor: string;
  fontFamily: string,
};

const BodyInput = ({
  value,
  setValue,
  placeholderTextColor,
  textColor,
  fontFamily,
}:BodyInputType) => {

  return (
    <TextInput
      value={value}
      onChangeText={setValue}
      placeholder="본문"
      multiline={true}
      placeholderTextColor={placeholderTextColor}
      style={{
        paddingHorizontal: 5,
        // paddingVertical 로 하니까 paddingTop 이 안먹음
        paddingTop: 20,
        paddingBottom: 20,
        lineHeight: 18,
        color: textColor,
        flex: 1,
        fontFamily,
      }}
      returnKeyType="done"
      autoCapitalize="none"
      autoCorrect={false}
      blurOnSubmit={false}
    />
  );
};

// 얜 뭐 굳이.. 거의 얘만 쓸거라
export default BodyInput;
// export default React.memo(
//   BodyInput,
//   (prevProps, nextProps) => (
//     prevProps.value === nextProps.value &&
//     prevProps.placeholderTextColor === nextProps.placeholderTextColor &&
//     prevProps.textColor === nextProps.textColor &&
//     prevProps.inputIndex === nextProps.inputIndex &&
//     prevProps.fontFamily === nextProps.fontFamily
//   )
// );