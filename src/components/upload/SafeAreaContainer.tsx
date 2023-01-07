import React from "react";
import { SafeAreaInsetsContext } from "react-native-safe-area-context";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  background-color: ${props=>props.theme.backgroundColor};
`;
const InnerContainer = styled.View`
  flex: 1;
`;

const SafeAreaContainer = ({children}:{children:React.ReactNode}) => {
  return (
    <Container>
      <SafeAreaInsetsContext.Consumer>
        {insets => 
          <InnerContainer style={{flex:1,marginTop: insets?.top}}>
            {children}
          </InnerContainer>
        }
      </SafeAreaInsetsContext.Consumer>
    </Container>
  )
};

export default SafeAreaContainer;