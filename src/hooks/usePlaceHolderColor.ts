import useIsDarkMode from "./useIsDarkMode";

const usePlaceHolderColor = () => {
  // const darkModeSubscription = useColorScheme();
  // const isDarkMode = darkModeSubscription === "dark";
  const isDarkMode = useIsDarkMode();
  const placeholderTextColor = isDarkMode ? "rgba(255,255,255,0.5)" : "grey";
  return placeholderTextColor;
};

export default usePlaceHolderColor;