import FastImage from "react-native-fast-image";
import styled from "styled-components/native";
import { colors } from "../../../js-assets/color";
import { noUserUri } from "../../../localImage/preloadLocalImageAndSetReactiveVar";
import { FontAppliedBaseTextNeedFontSize, FontAppliedBoldTextNeedFontSize } from "../../../styled-components/FontAppliedComponents";
import { me } from "../../../__generated__/me";

// const Container = styled.View`
const Container = styled.View<{backgroundColor?:string}>`
  flex: 1;
  position: relative;
  ${props=>props.backgroundColor ? `background-color: ${props.backgroundColor}` : ""};
`;
const ImageContainer = styled.View<{left:number,imageContainerWidth:number}>`
  width: ${props=>props.imageContainerWidth}px;
  height: ${props=>props.imageContainerWidth}px;
  border-radius: 100px;
  top: ${props=>props.imageContainerWidth/2}px;
  left: ${props=>props.left}px;
  position: absolute;
  z-index: 10;
  background-color: ${props=>props.theme.backgroundColor};
  align-items: center;
  justify-content: center;
  /* border-style: dashed; */
  /* border-width: 2px; */
  /* border-color: ${props=>props.theme.textColor}; */
`;
const MainContainer = styled.View<{paddingTop:number}>`
  margin-top: 130px;
  padding-top: ${props=>props.paddingTop}px;
  background-color: ${props=>props.theme.backgroundColor};
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  flex: 1;
  padding-bottom: 50px;
`;
const UserName = styled(FontAppliedBaseTextNeedFontSize)`
  text-align: center;
  font-weight: 600;
  /* font-size: 16px; */
`;
const BtnContainer = styled.View`
  align-items: center;
  margin-top: 20px;
`;
const AccentBtn = styled.TouchableOpacity`
  padding: 3px 0px;
  width: 60%;
  background-color: ${colors.blue};
  border-radius: 3px;
  margin-bottom: 7px;
`;
const AccentBtnText = styled(FontAppliedBoldTextNeedFontSize)`
  text-align: center;
  color: white;
  /* font-weight: 700; */
`;
const NotImportantBtn = styled.TouchableOpacity`
  padding: 1px 0px;
  width: 60%;
  margin-top: 1px;
`;
const NotImportantBtnText = styled(FontAppliedBaseTextNeedFontSize)`
  text-align: center;
`;

type BaseAboutAccountType = {
  imageContainerWidth: number;
  left: number;
  imageSize: number;
  meData: me | undefined;
  avoidImagePaddingTop: number;
  onPressEditProfile: () => void;
  onPressGoWithDrawal: () => void;
  onPressSeeBlockUsers: () => void;
  backgroundColor?: string
};

const BaseAboutAccount = ({
  imageContainerWidth,
  left,
  imageSize,
  meData,
  avoidImagePaddingTop,
  onPressEditProfile,
  onPressGoWithDrawal,
  onPressSeeBlockUsers,
  backgroundColor,
}: BaseAboutAccountType) => {

  return (
    <Container
      backgroundColor={backgroundColor}
    >
      {/* <FontAppliedBaseText>
        이메일, 비밀번호 변경, 나중에는 프로필, 닉네임 변경
총 일기 갯수, 이번주 일기 갯수
일기 쓰는 시간, 뭐 등등
      </FontAppliedBaseText> */}
      <ImageContainer
        imageContainerWidth={imageContainerWidth}
        left={left}
      >
        <FastImage
          style={{
            height: imageSize,
            width: imageSize,
            borderRadius: imageSize,
          }}
          source={{
            uri: meData?.me?.avatar ? meData.me.avatar : noUserUri
          }}
        />
      </ImageContainer>
      <MainContainer
        paddingTop={avoidImagePaddingTop}
      >
        <UserName fontSize={16}>{meData?.me?.userName} 님</UserName>
        <BtnContainer>
          <AccentBtn onPress={onPressEditProfile}>
            <AccentBtnText>프로필 편집</AccentBtnText>
          </AccentBtn>
          <NotImportantBtn onPress={onPressSeeBlockUsers}>
            <NotImportantBtnText>
              차단한 유저 보기
            </NotImportantBtnText>
          </NotImportantBtn>
          <NotImportantBtn onPress={onPressGoWithDrawal}>
            <NotImportantBtnText>
              회원 탈퇴
            </NotImportantBtnText>
          </NotImportantBtn>
        </BtnContainer>
      </MainContainer>
    </Container>
  );
};

export default BaseAboutAccount;