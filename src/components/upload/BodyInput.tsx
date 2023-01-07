import React, { useCallback, useRef } from "react";
import { TextInput } from "react-native";
import { getStyleSheetFontStyle } from "../../font/getFontStyle";

type BodyInputType = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string[]>>;
  placeholderTextColor: string;
  textColor: string;
  inputIndex: number;
  setFileAddingPosition: React.Dispatch<React.SetStateAction<{fileIndex:number,insertFront:boolean}>>;
  fontFamily: string,
};

const BodyInput = ({
  value,
  setValue,
  placeholderTextColor,
  textColor,
  inputIndex,
  setFileAddingPosition,
  fontFamily,
}:BodyInputType) => {

  console.log("BodyInput")

  const onPressIn = useCallback(() => {
      setFileAddingPosition({
        fileIndex: inputIndex,
        insertFront: true,
      });
    },
    [inputIndex]
  );

  const onChangeText = useCallback((text:string) => {
      setValue(prev=>{
        const newArr = [...prev];
        newArr[inputIndex] = text;
        return newArr;
      });
    },
    // inputIndex 를 넣어야 이미지 위치 바꿔도 안바뀜
    [inputIndex]
  );

  const fontStyle = useRef(getStyleSheetFontStyle(fontFamily,16)).current;

  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
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
        // fontFamily,
        ...fontStyle,
      }}
      onPressIn={onPressIn}
      returnKeyType="default"
      autoCapitalize="none"
      autoCorrect={false}
      blurOnSubmit={false}
      scrollEnabled={false}
    />
  );
};

// memo 해서 value,placeholderTextColor,textColor, inputIndex 바뀌는 경우로 만들까?
// export default BodyInput;
export default React.memo(
  BodyInput,
  (prevProps, nextProps) => (
    prevProps.value === nextProps.value &&
    prevProps.placeholderTextColor === nextProps.placeholderTextColor &&
    prevProps.textColor === nextProps.textColor &&
    prevProps.inputIndex === nextProps.inputIndex &&
    prevProps.fontFamily === nextProps.fontFamily
  )
);