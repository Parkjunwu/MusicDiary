import React from "react";
import styled from "styled-components/native";
import usePlaceHolderColor from "../../hooks/usePlaceHolderColor";
import { FontAppliedBaseTextInputNeedFontSize } from "../../styled-components/FontAppliedComponents";

// const Input = styled.TextInput<{opacityForAnimation:boolean}>`
//   /* background-color: yellow; */
//   color: ${props=>props.theme.textColor};
//   padding: 20px 10px;
//   font-size: 16px;
//   font-weight: bold;
//   border-bottom-color: rgba(140,140,140,0.5);
//   border-bottom-width: 1px;
//   opacity: ${props=>props.opacityForAnimation ? 0 : 1};
// `;
// 근데 얘는 memo 라서 fontFamily 변경됬는지를 받아야 하지 않나? 만약 그러면 Edit Upload 에서 받고 의존성 넣어 BodyInput 처럼
const Input = styled(FontAppliedBaseTextInputNeedFontSize)`
  padding: 20px 10px;
  /* font-size: 16px; */
  border-bottom-color: rgba(140,140,140,0.5);
  border-bottom-width: 1px;
`;

type TitleInputType = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

const TitleInput = ({value,setValue}:TitleInputType) => {

  const placeholderTextColor = usePlaceHolderColor();
  console.log("TitleInput")

  return (
    <Input
      fontSize={17}
    // <TextInput
    //   style={{
    //     paddingVertical: 20,
    //     paddingHorizontal: 5,
    //     color: isDarkMode ? "white" : "black",
    //     opacity: opacityForAnimation ? 0 : 1,
    //     fontSize: 16,
    //     fontWeight: "bold",
    //     borderBottomColor: "rgba(140,140,140,0.5)",
    //     borderBottomWidth: 1,
    //   }}
      value={value}
      onChangeText={setValue}
      placeholder="제목"
      // keyboardType="email-address"
      returnKeyType="done"
      autoCapitalize="none"
      autoCorrect={false}
      // ref={emailRef}
      // onSubmitEditing={onEmailSubmit}
      blurOnSubmit={false}
      placeholderTextColor={placeholderTextColor}
      multiline={true}
      // opacityForAnimation={opacityForAnimation}
    />
  );
};

// export default TitleInput;
export default React.memo(
  TitleInput,
  (prevProps, nextProps) => prevProps.value === nextProps.value
);