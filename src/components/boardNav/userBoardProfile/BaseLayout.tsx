import { useNavigation } from "@react-navigation/core";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { Alert, useWindowDimensions } from "react-native";
// import useCustomOrientationListener from "../../../hooks/useCustomOrientationListener";
import useIsDarkMode from "../../../hooks/useIsDarkMode";
import { BoardTabStackParamsList } from "../../../types/navigation/homeNavStackParamsList";
import { seeProfile } from "../../../__generated__/seeProfile";
// import ScrollViewWithoutBounce from "../../shared/ScrollViewWithoutBounce";
import BaseUserBoard from "./BaseUserBoard";

type NavigationProps = NativeStackScreenProps<BoardTabStackParamsList,"UserBoardProfile">;

type BaseLayoutProps = {
  userData: seeProfile | undefined;
};

const BaseLayout = ({userData}: BaseLayoutProps) => {

  const navigation = useNavigation<NavigationProps["navigation"]>();
  // const route = useRoute<NavigationProps["route"]>();
  // const userId = route.params.id;

  useEffect(()=>{
    if(userData?.seeProfile.error) {
      Alert.alert(userData?.seeProfile.error,undefined,[{text:"확인"}]);
      navigation.goBack();
    }
  },[userData])

  const imageSize = 100;
  const imageContainerWidth = 130;
  const { width } = useWindowDimensions();
  const left = (width - imageContainerWidth)/2;
  const avoidImagePaddingTop = imageContainerWidth/2 + 20;

  const isDarkMode = useIsDarkMode();
  const backgroundColor = isDarkMode ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.08)'

  // const viewOrientation = useCustomOrientationListener();

  return (
    // viewOrientation === "PORTRAIT" ?
      <BaseUserBoard
        imageContainerWidth={imageContainerWidth}
        left={left}
        imageSize={imageSize}
        avoidImagePaddingTop={avoidImagePaddingTop}
        backgroundColor={backgroundColor}
        user={userData?.seeProfile.user}
      />
      // :
      // // FlatList 에서 HeaderComponent 로 줘야 하나?
      // <ScrollViewWithoutBounce
      //   style={{
      //     backgroundColor,
      //   }}
      // >
      //   <BaseUserBoard
      //     imageContainerWidth={imageContainerWidth}
      //     left={left}
      //     imageSize={imageSize}
      //     avoidImagePaddingTop={avoidImagePaddingTop}
      //     user={userData?.seeProfile.user}
      //   />
      // </ScrollViewWithoutBounce>
  );
};

export default BaseLayout;



