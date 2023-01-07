import { useState } from "react";
import { Keyboard, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { fontFamilyVar } from "../../apollo";
import Fontisto from 'react-native-vector-icons/Fontisto';
import getFontFamily from "../../font/getFontFamily";
import usePlaceHolderColor from "../../hooks/usePlaceHolderColor";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fontArray, fontFileNameArray, FONT_FAMILY } from "../../font/constant";
import useBackgroundColorAndTextColor from "../../hooks/useBackgroundColorAndTextColor";
import { getCSSFontStyle } from "../../font/getFontStyle";
import ScrollViewWithoutBounce from "../../components/shared/ScrollViewWithoutBounce";


const Container = styled.Pressable`
  background-color: ${props=>props.theme.backgroundColor};
  flex: 1;
`;
const EachFontContainer = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`;
const SelectContainer = styled.View`
  width: 70px;
  /* background-color: yellow; */
  align-items: center;
  justify-content: center;
`;
const EachFontText = styled.Text<{fontFamily:string,fontSize:number}>`
  padding-bottom: 3px;
  padding-top: 3px;
  font-family: ${props=>props.fontFamily};
  color: ${props=>props.theme.textColor};
  /* letter-spacing: 1px; */
  ${props=>getCSSFontStyle(props.fontFamily,props.fontSize)}
`;
const FontName = styled(EachFontText)<{fontFamily:string,fontSize:number}>`
  /* font-size: 18px; */
  ${props=>getCSSFontStyle(props.fontFamily,props.fontSize)}
`;
const TestTextInput = styled.TextInput<{fontSize:number}>`
  /* font-family: ${props=>props.theme.mediumFontFamily}; */
  /* font-size: 18px; */
  ${props=>getCSSFontStyle(props.theme.mediumFontFamily,props.fontSize)}
  padding: 20px;
  color: ${props=>props.theme.textColor};
  /* min-height: 150px; */
  height: 200px;
  background-color: ${props=>props.theme.textInputBackgroundColor};
  margin: 20px 10px;
  /* letter-spacing: 1px; */
  /* letter-spacing: 3px; */
`;


const FontChange = () => {
//   const showText = `이 폰트 예쁘죠? ><
// Is this font pretty?`;
  const [selectedFontIndex,setSelectedFontIndex] = useState(fontFileNameArray.findIndex(font => font === fontFamilyVar()));

  const [value,setValue] = useState("");

  const placeHolderColor = usePlaceHolderColor();

  const {textColor} = useBackgroundColorAndTextColor();

  const dismissKeyboard = () => Keyboard.dismiss();
  
  const onPressSelectFont = (index:number) => {
    dismissKeyboard();
    setSelectedFontIndex(index);
    const newFontFileName = fontFileNameArray[index];
    // console.log("newFontFileName : "+ newFontFileName)
    fontFamilyVar(newFontFileName);
    AsyncStorage.setItem(FONT_FAMILY,newFontFileName);
  };

  return (
    
    // <PaddingScrollView
    //   showsVerticalScrollIndicator={false}
    //   // ios 위아래 더 멀리 안움직이는거
    //   bounces={false}
    //   // android 위아래 더 멀리 안움직이는거
    //   overScrollMode={'never'}
    // >
    <ScrollViewWithoutBounce>
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
        {fontArray.map((font:string,index:number)=>{
          
          const isSelected = index === selectedFontIndex;
          const nowFontFamily = getFontFamily("Medium",fontFileNameArray[index]);

          return (
            <EachFontContainer
              key={index}
            >
              <SelectContainer>
                <TouchableOpacity
                  onPress={()=>onPressSelectFont(index)}
                >
                  <Fontisto name={isSelected ? "checkbox-active" : "checkbox-passive"} size={24} color={textColor} />
                </TouchableOpacity>
              </SelectContainer>
              <TouchableOpacity
                onPress={()=>onPressSelectFont(index)}
              >
                <FontName
                  fontFamily={nowFontFamily}
                  fontSize={18}
                >
                  {font}
                </FontName>
                <EachFontText
                  fontFamily={nowFontFamily}
                  fontSize={14}
                >
                  {`이 폰트 예쁘죠? ><
Is this font pretty?`}
                </EachFontText>
              </TouchableOpacity>
            </EachFontContainer>
            )
          }
        )}
      </Container>
    </ScrollViewWithoutBounce>
    // </PaddingScrollView>
  );
};

export default FontChange;