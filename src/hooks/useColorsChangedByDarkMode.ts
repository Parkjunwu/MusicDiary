import { useMemo } from "react";
import { colors } from "../js-assets/color";
import useIsDarkMode from "./useIsDarkMode";

type colorList = {
  placeholderTextColor: string;
  backgroundColor: string;
  textColor: string;
  padEmptyScreenColor: string;
  headerTintColor: string;
};

type useColorsChangedByDarkModeType = () => colorList;

const useColorsChangedByDarkMode: useColorsChangedByDarkModeType = () => {

  const isDarkMode = useIsDarkMode();

  // useMemo 쓰던지
  const colors = useMemo(
    () => getColorsChangedByDarkMode(isDarkMode),
    [isDarkMode]
  );
  
  return colors;
};

export default useColorsChangedByDarkMode;


type getColorsChangedByDarkModeType = (isDarkMode:boolean) => colorList;

const getColorsChangedByDarkMode: getColorsChangedByDarkModeType = (isDarkMode) => isDarkMode ?
    {
      placeholderTextColor: "rgba(255,255,255,0.5)",
      backgroundColor: "black",
      textColor: "white",
      padEmptyScreenColor: "rgba(0,0,0,0.8)",
      headerTintColor: "white",
    }
  :
    {
      placeholderTextColor: "rgba(0,0,0,0.5)",
      backgroundColor: "white",
      textColor: "black",
      padEmptyScreenColor: "rgba(255,255,255,0.5)",
      headerTintColor: colors.darkYellow,
    };