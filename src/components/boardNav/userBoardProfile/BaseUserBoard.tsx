import FastImage from "react-native-fast-image";
import styled from "styled-components/native";
import { noUserUri } from "../../../localImage/preloadLocalImageAndSetReactiveVar";
import { FontAppliedBaseTextNeedFontSize } from "../../../styled-components/FontAppliedComponents";
import { seeProfile_seeProfile_user } from "../../../__generated__/seeProfile";
import UserBoardFlatList from "./UserBoardFlatList";

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
  /* padding-bottom: 50px; */
`;
const UserName = styled(FontAppliedBaseTextNeedFontSize)`
  text-align: center;
  font-weight: 600;
  /* font-size: 16px; */
`;

type BaseUserBoardType = {
  imageContainerWidth: number;
  left: number;
  imageSize: number;
  avoidImagePaddingTop: number;
  backgroundColor?: string
  user: seeProfile_seeProfile_user | null | undefined;
};

const BaseUserBoard = ({
  imageContainerWidth,
  left,
  imageSize,
  avoidImagePaddingTop,
  backgroundColor,
  user,
}: BaseUserBoardType) => {

  return (
    <Container
      backgroundColor={backgroundColor}
    >
      {/* <FontAppliedBaseText>
        ?????????, ???????????? ??????, ???????????? ?????????, ????????? ??????
??? ?????? ??????, ????????? ?????? ??????
?????? ?????? ??????, ??? ??????
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
            uri: user?.avatar ?? noUserUri,
          }}
        />
      </ImageContainer>
      <MainContainer
        paddingTop={avoidImagePaddingTop}
      >
        <UserName fontSize={16}>{user?.userName} ???</UserName>
        {user && <UserBoardFlatList user={user}/>}
      </MainContainer>
    </Container>
  );
};

export default BaseUserBoard;