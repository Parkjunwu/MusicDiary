import { useReactiveVar } from "@apollo/client";
import { fontFamilyVar, moveDeleteAccountComplete } from "./apollo";
import DeleteAccountCompletedView from "./screens/otherScreens/DeleteAccountCompletedView";
import RootNav from "./navigator/RootNav";
import { DefaultTheme, ThemeProvider } from "styled-components/native";
import useIsDarkMode from "./hooks/useIsDarkMode";
import { colors } from "./js-assets/color";
import getFontFamily from "./font/getFontFamily";

// 로그아웃도 얘로 바꾸거나 하는게 나을라나?
// DeleteAccountCompletedView 가 캐시 삭제하는 애임.
const RootView = () => {

  const isDeleteAccountComplete = useReactiveVar(moveDeleteAccountComplete);

  const isDarkMode = useIsDarkMode();

  // subscription 으로 받음
  const fontFamily = useReactiveVar(fontFamilyVar);
  const boldFontFamily = getFontFamily("Bold",fontFamily);
  const mediumFontFamily = getFontFamily("Medium",fontFamily);
  const lightFontFamily = getFontFamily("Light",fontFamily);

  const theme: DefaultTheme = {
    backgroundColor: isDarkMode ? 'black' :  'white',
    textColor: isDarkMode ? 'white' : 'black',
    textInputBackgroundColor: isDarkMode ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.08)',
    linkTextColor: isDarkMode ? colors.darkYellow : colors.yellow,
    boldFontFamily,
    mediumFontFamily,
    lightFontFamily,
  };
  
  return (
    <ThemeProvider theme={theme}>
      {isDeleteAccountComplete ? <DeleteAccountCompletedView/> : <RootNav />}
    </ThemeProvider>
  )
};

export default RootView;