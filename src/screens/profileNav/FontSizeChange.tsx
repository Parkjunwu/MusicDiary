import { useState } from "react";
import { Keyboard } from "react-native";
import styled from "styled-components/native";
import usePlaceHolderColor from "../../hooks/usePlaceHolderColor";
import { FontAppliedBaseTextNeedFontSize } from "../../styled-components/FontAppliedComponents";

const Container = styled.Pressable`
  background-color: ${props=>props.theme.backgroundColor};
  flex: 1;
`;
const TestTextInput = styled(FontAppliedBaseTextNeedFontSize)`
  padding: 20px;
  color: ${props=>props.theme.textColor};
  height: 200px;
  background-color: ${props=>props.theme.textInputBackgroundColor};
  margin: 20px 10px;
`;

const FontSizeChange = () => {

  const [value,setValue] = useState("");
  const placeHolderColor = usePlaceHolderColor();
  const dismissKeyboard = () => Keyboard.dismiss();

  return (
    <Container
      onPress={dismissKeyboard}
    >
      <TestTextInput
        fontSize={18}
        value={value}
        onChangeText={(text:string)=>setValue(text)}
        multiline={true}
        placeholder="이곳에 글을 써보세요!"
        placeholderTextColor={placeHolderColor}
        autoCapitalize="none"
        autoCorrect={false}
        blurOnSubmit={false}
      />
      
    </Container>
  )
};

export default FontSizeChange;