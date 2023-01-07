import { useColorScheme } from "react-native";

const useBackgroundColorAndTextColor = () => {
  const darkModeSubscription = useColorScheme();
  const isDarkMode = darkModeSubscription === "dark";
  const backgroundColor = isDarkMode ? "black" : "white";
  const textColor = isDarkMode ? "white" : "black";

  return {
    backgroundColor,
    textColor,
  }
};

export default useBackgroundColorAndTextColor;