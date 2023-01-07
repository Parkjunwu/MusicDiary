import React, { useEffect } from "react";
import styled from "styled-components/native";
import { FontAppliedBaseTextNeedFontSize } from "../../styled-components/FontAppliedComponents";

const LogOutView = styled.View`
  flex: 1;
  background-color: ${props=>props.theme.backgroundColor};
  justify-content: center;
  align-items: center;
`;
const LogOutText = styled(FontAppliedBaseTextNeedFontSize)`
  
`;

const LogOutCompletedView = ({navigation}) => {
  useEffect(()=>{
    setTimeout(()=>{
      navigation.navigate("UploadDiaryTab",{
        screen:"TodayDiary",
      });
    },1000)
  },[]);
  return <LogOutView>
    <LogOutText fontSize={16}>정상적으로 로그아웃 되었습니다.</LogOutText>
  </LogOutView>
}

export default LogOutCompletedView;