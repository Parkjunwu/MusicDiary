import React, { useEffect } from "react";
import styled from "styled-components/native";
import client, { accessTokenVar, isLoggedInVar, REFRESH_TOKEN, moveDeleteAccountComplete } from "../../apollo";
import EncryptedStorage from 'react-native-encrypted-storage';
import { FontAppliedBaseTextNeedFontSize } from "../../styled-components/FontAppliedComponents";

const LogOutView = styled.View`
  flex: 1;
  background-color: ${props=>props.theme.backgroundColor};
  justify-content: center;
  align-items: center;
`;
const LogOutText = styled(FontAppliedBaseTextNeedFontSize)`
  
`;

const DeleteAccountCompletedView = () => {

  const deleteCache = async() => {
    await EncryptedStorage.removeItem(REFRESH_TOKEN);
    accessTokenVar('');
    isLoggedInVar(false);
    await client.resetStore();
  };

  useEffect(()=>{

    deleteCache();

    setTimeout(()=>{
      moveDeleteAccountComplete(false);
    },1000);

  },[]);

  return <LogOutView>
    <LogOutText fontSize={16}>계정이 정상적으로 삭제 되었습니다.</LogOutText>
  </LogOutView>
}

export default DeleteAccountCompletedView;