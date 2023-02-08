import { ReactNode } from "react";
import { View } from "react-native";
import useGetWidthDealWithBigScreen from "../../hooks/forDealWithBigScreen/useGetWidthDealWithBigScreenNeedImageHorizontalEmptySpaceBase20";
import useColorsChangedByDarkMode from "../../hooks/useColorsChangedByDarkMode";

type UploadHorizontalEmptyLayoutForBigScreenNeedScreenWidthProps = {
  children: ReactNode;
};

const UploadHorizontalEmptyLayoutForBigScreenNeedScreenWidth = ({
  children,
}: UploadHorizontalEmptyLayoutForBigScreenNeedScreenWidthProps) => {

  const {layoutWidth} = useGetWidthDealWithBigScreen();
  
  const {
    // padEmptyScreenColor,
    backgroundColor,
  } = useColorsChangedByDarkMode();
  
  return (
    <View
      style={{
        flex: 1,
        // backgroundColor: padEmptyScreenColor,
        backgroundColor,
      }}
    >
      <View
        style={{
          flex: 1,
          width: layoutWidth,
          marginLeft:'auto',
          marginRight:'auto',
        }}
      >
        {children}
      </View>
    </View>
  );
};

export default UploadHorizontalEmptyLayoutForBigScreenNeedScreenWidth;