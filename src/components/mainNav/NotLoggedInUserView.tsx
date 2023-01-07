import { useNavigation } from "@react-navigation/native";
import React from "react";
import styled from "styled-components/native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from "../../js-assets/color";
import { FontAppliedBaseTextNeedFontSize } from "../../styled-components/FontAppliedComponents";
import useIsDarkMode from "../../hooks/useIsDarkMode";
// import { getRealmAllDiaries, createRealmDiary } from "../../realm";

const Container = styled.View`
  background-color: ${props=>props.theme.backgroundColor};
  flex:1;
  justify-content: center;
  align-items: center;
`;
// const AttractText = styled.Text`
//   color: ${props=>props.theme.textColor};
//   font-size: 17px;
//   margin-bottom: 20px;
// `;
const AttractText = styled(FontAppliedBaseTextNeedFontSize)`
  /* font-size: 17px; */
  margin-bottom: 20px;
`;
const GoToLink = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;
// const LinkText = styled.Text`
//   color: ${props=>props.theme.linkTextColor};
//   font-weight: 600;
// `;
// const LinkText = styled.Text`
//   color: ${props=>props.theme.linkTextColor};
// `
const LinkText = styled(FontAppliedBaseTextNeedFontSize)<{isDarkMode:boolean}>`
  color: ${props=>props.isDarkMode ? colors.yellow : colors.darkYellow};
  /* font-weight: bold; */
`;

const NotLoggedInUserView = () => {
  const navigation = useNavigation();

  const isDarkMode = useIsDarkMode();

  const onPressNavigate = () => navigation.navigate("AuthNav");

  // const createAndRead = async () => {
  //   await createRealmDiary({
  //     title: "title",
  //     body: "body",
  //     // youtubeId: "youtubeId",
  //     dateTime: 20221012,
  //   });
  //   // console.log("getRealmAllDiaries")
  //   // console.log(getRealmAllDiaries)
  // };
  
  // const isFocused = useIsFocused();

  // useEffect(()=>{
  //   createAndRead();
  // },[isFocused]);

  return (
    <Container>
      {/* <AttractText>회원가입 하고 나와 잘 맞는 유저들과 소통하세요!</AttractText> */}
      <AttractText fontSize={17}>회원가입 하고 일기를 저장하세요!</AttractText>
      <GoToLink onPress={onPressNavigate}>
        <LinkText isDarkMode={isDarkMode}>로그인 / 회원가입 페이지로 이동 </LinkText>
        <MaterialCommunityIcons name="login" size={22} color={isDarkMode ? colors.yellow : colors.darkYellow} />
      </GoToLink>
    </Container>
  )
};

export default NotLoggedInUserView;