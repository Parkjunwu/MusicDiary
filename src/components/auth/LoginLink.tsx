import React from "react";
// import { Platform } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../js-assets/color";
import { FontAppliedBoldTextNeedFontSize } from "../../styled-components/FontAppliedComponents";

// const LoginLinkText = styled.Text<{isAndroid:boolean}>`
//   color: ${colors.brown};
//   font-weight: ${props=>props.isAndroid ? 'bold' : 600};
//   margin-top: 10px;
// `;
const LoginLinkText = styled(FontAppliedBoldTextNeedFontSize)`
  color: ${colors.brown};
  margin-top: 10px;
  /* font-size: 13px; */
`;

const LoginLink = ({children}:{children:React.ReactNode}) => {
  // const isAndroid = Platform.OS === "android";
  return (
    // <LoginLinkText isAndroid={isAndroid}>
    <LoginLinkText fontSize={13}>
      {children}
    </LoginLinkText>
  );
};

export default LoginLink;