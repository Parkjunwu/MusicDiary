import { useState } from "react";
import { Alert } from "react-native";
import styled from "styled-components/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { gql, useMutation } from "@apollo/client";
import { colors } from "../../js-assets/color";
import useIsDarkMode from "../../hooks/useIsDarkMode";
import { moveDeleteAccountComplete } from "../../apollo";
import { deleteAccount } from "../../__generated__/deleteAccount";
import ScrollViewWithoutBounce from "../../components/shared/ScrollViewWithoutBounce";
import UploadHorizontalEmptyLayoutForBigScreenNeedScreenWidth from "../../components/upload/UploadHorizontalEmptyLayoutForBigScreenNeedScreenWidth";

const DELETE_ACCOUNT = gql`
  mutation deleteAccount {
    deleteAccount {
      ok
    }
  }
`;

const Container = styled.View`
  flex: 1;
  /* background-color: ${props=>props.theme.backgroundColor}; */
  padding: 40px 20px;
`;
const TitleText = styled.Text`
  color: ${props=>props.theme.textColor};
  padding-bottom: 50px;
  text-align: center;
  font-size: 18px;
  color: red;
  font-weight: bold;
`;
const MainText = styled.Text`
  color: ${props=>props.theme.textColor};
  padding-bottom: 10px;
  font-size: 15px;
`;
const StrongText = styled.Text`
  color: red;
  padding-bottom: 10px;
  font-size: 15px;
  font-weight: bold;
`;
const AgreeContainer = styled.View`
  margin-top: 60px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const AgreeBtn = styled.TouchableOpacity<{isDarkMode:boolean,isCheckAgree:boolean}>`
  margin-right: 7px;
  width: 17px;
  height: 17px;
  border-radius: 3px;
  border: ${props=>props.isCheckAgree ?  "1px" : "3px"};
  border-color: ${props => props.isCheckAgree ?
    props.isDarkMode ? "white" : "black" : "tomato"
  };
  background-color: ${props=>props.isDarkMode? "rgba(255,255,255,0.8)" : "white"};
  align-items: center;
  justify-content: center;
`;
const AgreeText = styled.Text`
  color: ${props=>props.theme.textColor};
  font-size: 15px;
`;
const WithDrawalBtn = styled.TouchableOpacity<{isCheckAgree:boolean}>`
  background-color: tomato;
  border-radius: 5px;
  margin-top: 30px;
  opacity: ${props=>props.isCheckAgree ?  1 : 0.5 };
`;
const WithDrawalBtnText = styled.Text`
  color: ${props=>props.theme.textColor};
  font-size: 15px;
  text-align: center;
  padding: 10px 30px;
  font-weight: bold;
  font-size: 16px;
`;

const WithdrawalAccount = () => {

  const [deleteAccount] = useMutation<deleteAccount>(DELETE_ACCOUNT,{
    onCompleted:async(result)=>{
      if(result.deleteAccount.ok){
        
        // console.log(1)
        // await EncryptedStorage.removeItem(REFRESH_TOKEN);
        // console.log(2)
        // accessTokenVar('');
        // console.log(3)
        // await client.resetStore();
        // console.log(4)
        // isLoggedInVar(false);
        // console.log(5)
        // navigation.navigate("DeleteAccountCompletedView");
        moveDeleteAccountComplete(true);
      }
    }
  });
  
  const [isCheckAgree,setIsCheckAgree] = useState(false);
  // const darkModeSubscription = useColorScheme();
  // const isDarkMode = darkModeSubscription === "dark";
  const isDarkMode = useIsDarkMode();

  const onPressAgree = () => {
    setIsCheckAgree(prev=>!prev);
  };

  const onPressAccountWithDrawal = () => {
    Alert.alert("계정 삭제 후엔 어떠한 경우에도 데이터 복구가 불가능 합니다. 이를 충분히 숙지하지 못하여 발생하는 불이익에 대한 모든 책임은 회원님에게 있습니다.","정말로 탈퇴하시겠습니까?",[
      {
        text:"삭제",
        style:"destructive",
        onPress: async() => {
          await deleteAccount();
        },
      }
      ,
      {
        text:"취소",
        style:"cancel",
      }
    ])
    
  };

  return (<UploadHorizontalEmptyLayoutForBigScreenNeedScreenWidth>
    <ScrollViewWithoutBounce>
      <Container>
        <TitleText>회원 탈퇴 시 주의사항</TitleText>
        <MainText>◦ 회원정보 및 개인의 데이터는 지체없이 파기 절차가 진행되어 <StrongText>절대로</StrongText> 복구할 수 없습니다.</MainText>
        <MainText>◦ 개인정보 및 게시물, 댓글, 좋아요 등 모든 자료가 삭제됩니다.</MainText>
        <MainText>◦ 같은 이메일로 재가입 하더라도 데이터는 복구되지 않습니다.</MainText>
        <AgreeContainer>
          <AgreeBtn onPress={onPressAgree} isDarkMode={isDarkMode} isCheckAgree={isCheckAgree} >
            {isCheckAgree && <FontAwesome name="check" size={15} color={colors.darkYellow} />}
          </AgreeBtn>
          <AgreeText>모든 정보를 삭제하는 것에 동의합니다.</AgreeText>
        </AgreeContainer>
        <WithDrawalBtn isCheckAgree={isCheckAgree} onPress={onPressAccountWithDrawal} disabled={!isCheckAgree}>
          <WithDrawalBtnText>회원탈퇴</WithDrawalBtnText>
        </WithDrawalBtn>
      </Container>
    </ScrollViewWithoutBounce>
    </UploadHorizontalEmptyLayoutForBigScreenNeedScreenWidth>
  );
};

export default WithdrawalAccount;