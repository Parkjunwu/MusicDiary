import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useWindowDimensions } from "react-native";
// import FastImage from "react-native-fast-image";
// import styled from "styled-components/native";
import useMe from "../../hooks/useMe";
// import { colors } from "../../js-assets/color";
// import { FontAppliedBaseTextNeedFontSize, FontAppliedBoldTextNeedFontSize } from "../../styled-components/FontAppliedComponents";
import { ProfileListTabStackParamsList } from "../../types/navigation/homeNavStackParamsList";
// import { noUserUri } from "../../localImage/preloadLocalImageAndSetReactiveVar";
import useIsDarkMode from "../../hooks/useIsDarkMode";
import ScrollViewWithoutBounce from "../../components/shared/ScrollViewWithoutBounce";
import BaseAboutAccount from "../../components/profileNav/aboutAccount/BaseAboutAccount";
import useCustomOrientationListener from "../../hooks/useCustomOrientationListener";

// const Container = styled.View<{backgroundColor:string}>`
//   background-color: ${props=>props.backgroundColor};
// const Container = styled.View`
//   flex: 1;
//   position: relative;
// `;
// const ImageContainer = styled.View<{left:number,imageContainerWidth:number}>`
//   width: ${props=>props.imageContainerWidth}px;
//   height: ${props=>props.imageContainerWidth}px;
//   border-radius: 100px;
//   top: ${props=>props.imageContainerWidth/2}px;
//   left: ${props=>props.left}px;
//   position: absolute;
//   z-index: 10;
//   background-color: ${props=>props.theme.backgroundColor};
//   align-items: center;
//   justify-content: center;
//   /* border-style: dashed; */
//   /* border-width: 2px; */
//   /* border-color: ${props=>props.theme.textColor}; */
// `;
// const MainContainer = styled.View<{paddingTop:number}>`
//   margin-top: 130px;
//   padding-top: ${props=>props.paddingTop}px;
//   background-color: ${props=>props.theme.backgroundColor};
//   border-top-left-radius: 50px;
//   border-top-right-radius: 50px;
//   flex: 1;
//   padding-bottom: 50px;
// `;
// const UserName = styled(FontAppliedBaseTextNeedFontSize)`
//   text-align: center;
//   font-weight: 600;
//   /* font-size: 16px; */
// `;
// const BtnContainer = styled.View`
//   align-items: center;
//   margin-top: 20px;
// `;
// const Btn = styled.TouchableOpacity`
//   padding: 3px 0px;
//   width: 60%;
//   background-color: ${colors.blue};
//   border-radius: 3px;
// `;
// const BtnText = styled(FontAppliedBoldTextNeedFontSize)`
//   text-align: center;
//   color: white;
//   /* font-weight: 700; */
// `;

// 이메일, 비밀번호 변경, 나중에는 프로필, 닉네임 변경
// 총 일기 갯수, 이번주 일기 갯수
// 일기 쓰는 시간, 뭐 등등

type NavigationProps = NativeStackNavigationProp<ProfileListTabStackParamsList>;

const AboutAccount = () => {

  const {data:meData} = useMe();

  const navigation = useNavigation<NavigationProps>();

  const onPressGoWithDrawal = ()=> navigation.navigate("WithdrawalAccount");

  const onPressEditProfile = () => navigation.navigate("EditProfile");
  
  const onPressSeeBlockUsers = () => navigation.navigate("SeeBlockUsers");

  const imageSize = 100;
  const imageContainerWidth = 130;
  const { width } = useWindowDimensions();
  const left = (width - imageContainerWidth)/2;
  const avoidImagePaddingTop = imageContainerWidth/2 + 20;

  const isDarkMode = useIsDarkMode();
  const backgroundColor = isDarkMode ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.08)'

  const viewOrientation = useCustomOrientationListener();

  return (
    viewOrientation === "PORTRAIT" ?
      <BaseAboutAccount
        imageContainerWidth={imageContainerWidth}
        left={left}
        imageSize={imageSize}
        meData={meData}
        avoidImagePaddingTop={avoidImagePaddingTop}
        onPressEditProfile={onPressEditProfile}
        onPressGoWithDrawal={onPressGoWithDrawal}
        onPressSeeBlockUsers={onPressSeeBlockUsers}
        backgroundColor={backgroundColor}
      />
      :
      <ScrollViewWithoutBounce
        style={{
          backgroundColor,
        }}
      >
        <BaseAboutAccount
          imageContainerWidth={imageContainerWidth}
          left={left}
          imageSize={imageSize}
          meData={meData}
          avoidImagePaddingTop={avoidImagePaddingTop}
          onPressEditProfile={onPressEditProfile}
          onPressGoWithDrawal={onPressGoWithDrawal}
          onPressSeeBlockUsers={onPressSeeBlockUsers}
        />
      </ScrollViewWithoutBounce>
  //   <ScrollViewWithoutBounce
  //     style={{
  //       backgroundColor,
  //       // position: "relative"
  //     }}
  //   >
  //     <Container
  //       // backgroundColor={backgroundColor}
  //     >
  //       {/* <FontAppliedBaseText>
  //         이메일, 비밀번호 변경, 나중에는 프로필, 닉네임 변경
  // 총 일기 갯수, 이번주 일기 갯수
  // 일기 쓰는 시간, 뭐 등등
  //       </FontAppliedBaseText> */}
  //       <ImageContainer
  //         imageContainerWidth={imageContainerWidth}
  //         left={left}
  //       >
  //         <FastImage
  //           style={{
  //             height: imageSize,
  //             width: imageSize,
  //             borderRadius: imageSize,
  //           }}
  //           source={{
  //             uri: meData?.me.avatar ? meData.me.avatar : noUserUri
  //           }}
  //         />
  //       </ImageContainer>
  //       <MainContainer
  //         paddingTop={avoidImagePaddingTop}
  //       >
  //         <UserName fontSize={16}>{meData?.me.userName} 님</UserName>
  //         <BtnContainer>
  //           <Btn onPress={onPressEditProfile}>
  //             <BtnText>프로필 편집</BtnText>
  //           </Btn>
  //           <TouchableOpacity onPress={onPressGoWithDrawal}>
  //             <FontAppliedBaseTextNeedFontSize>
  //               회원 탈퇴
  //             </FontAppliedBaseTextNeedFontSize>
  //           </TouchableOpacity>
  //         </BtnContainer>
  //       </MainContainer>
  //     </Container>
  //   </ScrollViewWithoutBounce>
  );
};

export default AboutAccount;