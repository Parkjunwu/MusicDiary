import React from "react";
import { GestureResponderEvent } from "react-native";
import styled from "styled-components/native";
import { FontAppliedBaseTextLittlePaddingNeedFontSize, FontAppliedBoldTextLittlePaddingNeedFontSize } from "../../../styled-components/FontAppliedComponents";

const Container = styled.View`
  flex-direction: row;
  margin-left: 10px;
  margin-top: 3px;
`;
// const PayloadTextContainUserName = styled.Text`
//   color: ${props=>props.theme.textColor};
// `;
const PayloadTextContainUserName = styled(FontAppliedBaseTextLittlePaddingNeedFontSize)`
  /* background-color: red; */
`;

const UserNameContainer = styled.TouchableOpacity`
  position: relative;
  
`;
// const UserName = styled.Text`
//   color: ${props => props.theme.textColor};
//   font-weight: bold;
//   top: 3px;
//   /* 얘를 UserNameContainer 말고 여기 줘야 android 에서 작동 */
//   margin-right: 8px;
// `;
const UserName = styled(FontAppliedBoldTextLittlePaddingNeedFontSize)`
  top: -1px;
  /* 얘를 UserNameContainer 말고 여기 줘야 android 에서 작동 */
  margin-right: 8px;
  
`;

type UserNameAndPayloadContainerType = {
  onPressUserName: (event: GestureResponderEvent) => void;
  userName: string;
  payload: string;
}

const UserNameAndPayloadContainer = ({onPressUserName,userName,payload,}:UserNameAndPayloadContainerType) => {
  // payloadWidth 는 Comment 에서 한번만 계산하거나 아님 따로 전역 변수로 빼놔.
  return (
    <Container>
        <UserNameContainer onPress={onPressUserName}>
          <UserName fontSize={13}>{userName}</UserName>
        </UserNameContainer>
      <PayloadTextContainUserName fontSize={12}>
        {payload}
      </PayloadTextContainUserName>
      {/* <EditBtnIfCommentOwner id={idForCacheAndEdit} isMine={true} nowEditingIndex={nowEditingIndex} setNowEditingIndex={setNowEditingIndex} editMutation={editComment} deleteMutation={deleteComment} /> */}
    </Container>
  );
};

export default UserNameAndPayloadContainer;