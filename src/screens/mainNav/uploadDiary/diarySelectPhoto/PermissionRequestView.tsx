import { Platform } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../../../js-assets/color";
import linkToBrowser from "../../../../logic/linkToBrowser"
import { FontAppliedBaseTextNeedFontSize } from "../../../../styled-components/FontAppliedComponents";

const PermissionContainer = styled.View`
  flex:1;
  background-color: ${props=>props.theme.backgroundColor};
  justify-content: center;
  align-items: center;
`;
// const AttractText = styled.Text<{isAndroid:boolean}>`
//   font-weight: ${props=>props.isAndroid ? 'bold' : 600};
//   color: ${props=>props.theme.textColor};
//   text-align: center;
//   font-size: 17px;
// `;
const AttractText = styled(FontAppliedBaseTextNeedFontSize)`
  text-align: center;
  /* font-size: 17px; */
`;
const PermissionRequestBtn = styled.TouchableOpacity`
  background-color: ${colors.yellow};
  border-radius: 5px;
  margin-top: 20px;
`;
// const PermissionRequestBtnText = styled.Text<{isAndroid:boolean}>`
//   font-weight: ${props=>props.isAndroid ? 'bold' : 600};
//   font-size: 15px;
//   padding: 10px 20px;
//   text-align: center;
// `;
const PermissionRequestBtnText = styled(FontAppliedBaseTextNeedFontSize)`
  color: black;
  /* font-size: 15px; */
  padding: 10px 20px;
  text-align: center;
`;


const PermissionRequestView = ({permissionKind}:{permissionKind:string}) => {
  const isAndroid = Platform.OS === "android"

  const onPressRequestPermission = async() => {
    await linkToBrowser(isAndroid ? 'https://support.google.com/android/answer/9431959?hl=ko' : 'https://support.apple.com/ko-kr/guide/iphone/iph251e92810/ios');
  };

  return (
    <PermissionContainer>
      <AttractText fontSize={17}>{`권한이 거부되어
${permissionKind}에 접근할 수 없습니다.`}</AttractText>
      <PermissionRequestBtn onPress={onPressRequestPermission} >
        <PermissionRequestBtnText fontSize={15}>{`권한 허용하는 방법
보러가기`}</PermissionRequestBtnText>
      </PermissionRequestBtn>
    </PermissionContainer>
  );
};

export default PermissionRequestView;