import { ApolloCache, DefaultContext, FetchResult, MutationFunctionOptions } from "@apollo/client";
import { Alert } from "react-native";
import FastImage from "react-native-fast-image";
import styled from "styled-components/native";
import { colors } from "../../../js-assets/color";
import { noUserUri } from "../../../localImage/preloadLocalImageAndSetReactiveVar";
import { seeBlockUsers_seeBlockUsers_users } from "../../../__generated__/seeBlockUsers";


const Column = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Username = styled.Text`
  color: ${props=>props.theme.textColor};
  font-weight: 600;
  font-size: 17px;
`;
const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px 15px;
`;
const UnblockBtn = styled.TouchableOpacity`
  background-color: ${colors.blue};
  justify-content: center;
  padding: 5px 10px;
  border-radius: 5px;
`;
const UnblockText = styled.Text`
  color: white;
  font-weight: 600;
`;

type BlockUserRowType = {
  user:seeBlockUsers_seeBlockUsers_users;
  unblockUserNeedVariable:(options?: MutationFunctionOptions<unblockUser,unblockUserVariables, DefaultContext, ApolloCache<any>>) => Promise<FetchResult<unblockUser>>
};

const BlockUserRow = ({user,unblockUserNeedVariable}:BlockUserRowType) => {

  const id = user.id;
  const userName = user.userName;
  const avatar = user.avatar;

  const onPressUnblock = () => {
    Alert.alert(`${userName} 님의 차단을 해제하시겠습니까?`,undefined,[
      {
        text:"차단해제",
        onPress:()=>unblockUserNeedVariable({
          variables:{
            id,
          },
        }),
      },
      {
        text:"취소",
        style:"cancel"
      }
    ]);
  };

  return (
    <Wrapper>
      <Column>
        <FastImage
          style={{
            width: 34,
            height: 34,
            borderRadius: 17,
            marginRight: 10,
          }}
          source={{uri: avatar ? avatar : noUserUri}}
        />
        <Username>{userName}</Username>
      </Column>
      <UnblockBtn onPress={onPressUnblock}>
        <UnblockText>차단 해제</UnblockText>
      </UnblockBtn>
    </Wrapper>
  );
};

export default BlockUserRow;