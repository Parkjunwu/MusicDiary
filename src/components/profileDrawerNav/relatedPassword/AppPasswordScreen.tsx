
// import { useWindowDimensions } from "react-native";
// import { useState } from "react";
// import { OrientationType } from "react-native-orientation-locker";
// import styled from "styled-components/native";
import useCustomOrientationListener from "../../../hooks/useCustomOrientationListener";
// import useBackgroundColorAndTextColor from "../../../hooks/useBackgroundColorAndTextColor";
// import { FontAppliedBaseTextNeedFontSize, FontAppliedBoldTextNeedFontSize } from "../../../styled-components/FontAppliedComponents";
import ScrollViewWithoutBounce from "../../shared/ScrollViewWithoutBounce";
import BaseAppPasswordScreen from "./BaseAppPasswordScreen";
// import Feather from "react-native-vector-icons/Feather";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import PasswordInput from "./PasswordInput";

// const Container = styled.View`
//   flex: 1;
//   background-color: ${props=>props.theme.backgroundColor};
//   padding: 40px 20px 0px 20px;
// `;
// const WarningContainer = styled.View`
//   padding-bottom: 10px;
// `;
// const TextRowContainer = styled.Text`
//   padding-bottom: 10px;
// `;
// const TitleText = styled(FontAppliedBoldTextNeedFontSize)`
//   padding-bottom: 50px;
//   text-align: center;
//   /* font-size: 18px; */
// `;
// const MainText = styled(FontAppliedBaseTextNeedFontSize)`
//   /* font-size: 15px; */
// `;
// const StrongText = styled(FontAppliedBoldTextNeedFontSize)`
//   color: red;
//   /* font-size: 15px; */
//   font-weight: bold;
// `;


type AppPasswordScreen = {
  password: number[];
  writePassword: (nowNumber:number)=>void;
  deletePassword: ()=>void;
  whichComponent: "CheckAppPassword" | "SettingAppPassword" | "ConfirmAppPassword" | "CheckPasswordForAppStart";
};

const AppPasswordScreen = ({
  password,
  writePassword,
  deletePassword,
  whichComponent,
}: AppPasswordScreen) => {

  // const {width} = useWindowDimensions();
  // const widthMinusPadding = width - 40;
  // const passwordWidth = widthMinusPadding > 600 ? 600 : widthMinusPadding;

  // const showPasswordInput: boolean[] = [];

  // for(let i=0;i<6;i++) {
  //   showPasswordInput.push(typeof password[i] === "number");
  // }

  // const {textColor} = useBackgroundColorAndTextColor();

  let guideText: string;
  switch(whichComponent) {
    case "CheckAppPassword": 
    case "CheckPasswordForAppStart":
      guideText = "?????? ??????????????? ??????????????????.";
      break;
    case "SettingAppPassword": 
      guideText = "???????????? 6????????? ????????? ?????????.";
      break;
    case "ConfirmAppPassword": 
      guideText = "??????????????? ??? ??? ??? ??????????????????.";
      break;
  }

  // const { innerLayoutHeight } = useBottomTabGetHeaderHeightAndInnerLayout();

  const viewOrientation = useCustomOrientationListener();

  return (
    viewOrientation === "PORTRAIT" ? 
        <BaseAppPasswordScreen
          guideText={guideText}
          password={password}
          writePassword={writePassword}
          deletePassword={deletePassword}
        />
      :
        <ScrollViewWithoutBounce>
          <BaseAppPasswordScreen
            guideText={guideText}
            password={password}
            writePassword={writePassword}
            deletePassword={deletePassword}
          />
        </ScrollViewWithoutBounce>
    // <ScrollViewWithoutBounce>
    //   <Container>
    //     <WarningContainer>
    //       <TitleText fontSize={18}>??? ???????????? ?????? ??? ????????????</TitleText>
    //       <MainText fontSize={15}>??? ??? ??????????????? ?????? ???????????? ?????? ???????????? ???????????????. </MainText>
    //       <TextRowContainer>
    //         <MainText fontSize={15}>??? ???????????? ?????? ??? ??????????????? ???????????? ??? </MainText>
    //         <StrongText fontSize={15}>?????? ?????? ??? ?????????</StrongText>
    //         <MainText fontSize={15}> ?????? ?????????.</MainText>
    //       </TextRowContainer>
    //       <TextRowContainer>
    //         <MainText fontSize={15}>??? ????????? ??? ????????? ?????? ?????? ???????????? ???????????? ?????? ?????? ??? ???????????? </MainText>
    //         <StrongText fontSize={15}>?????? ???????????????.</StrongText>
    //         <MainText fontSize={15}>{"  (????????? ?????? ????????? ????????? ????????? ???????????????.)"}</MainText>
    //       </TextRowContainer>
    //       <TitleText fontSize={18}>{guideText}</TitleText>
    //     </WarningContainer>

    //     {/* <PasswordContainer passwordWidth={passwordWidth}>

    //       <ShowPasswordInputContainer>
    //         {showPasswordInput.map((isWrite,index) => (
    //           <Flex1Container key={index} >
    //             {isWrite ?
    //               <ShowPasswordInput>*</ShowPasswordInput>
    //               :
    //               <Ionicons name="remove-outline" size={50} color={textColor} />
    //             }
    //           </Flex1Container>
    //         ))}
    //       </ShowPasswordInputContainer>

    //       {[0,1,2].map(rowNumber=><PasswordRowContainer key={rowNumber}>
    //         {[1,2,3].map(columnNumber=>{
    //           const nowNumber = rowNumber * 3 + columnNumber;
    //           return <PasswordColumnContainer key={nowNumber}>
    //             <PasswordTouchable onPress={()=>writePassword(nowNumber)}>
    //               <PasswordText>{nowNumber}</PasswordText>
    //             </PasswordTouchable>
    //           </PasswordColumnContainer>
    //         })}
    //         </PasswordRowContainer>
    //       )}

    //       <PasswordRowContainer>
    //         <PasswordColumnContainer/>
    //         <PasswordColumnContainer>
    //           <PasswordTouchable onPress={()=>writePassword(0)}>
    //             <PasswordText>0</PasswordText>
    //           </PasswordTouchable>
    //         </PasswordColumnContainer>
    //         <PasswordColumnContainer>
    //           <PasswordTouchable onPress={deletePassword}>
    //             <Feather name="delete" size={28} color={textColor} />
    //           </PasswordTouchable>
    //         </PasswordColumnContainer>
    //       </PasswordRowContainer>
    //     </PasswordContainer> */}
    //     <PasswordInput
    //       password={password}
    //       writePassword={writePassword}
    //       deletePassword={deletePassword}
    //     />

    //   </Container>
    // </ScrollViewWithoutBounce>
  );
};

export default AppPasswordScreen;