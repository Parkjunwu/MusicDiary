import { useColorScheme } from "react-native";

const useIsDarkMode = () => {
  const darkModeSubscription = useColorScheme();
  return darkModeSubscription === "dark";
};

export default useIsDarkMode;