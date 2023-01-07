import React from "react";
import { ActivityIndicator } from "react-native";
import BaseContainer from "./BaseContainer";

interface IScreenProps {
  loading: boolean,
  children: React.ReactNode,
}

const ScreenLayout: React.FC<IScreenProps> = ({loading, children}) => {
  return <BaseContainer>
    {loading ? <ActivityIndicator color="white" /> : children}
  </BaseContainer>;
}
export default ScreenLayout;