import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import SharedStackNav from "./SharedStackNav";


// 로그인 안했을 때 설정은 MainNav 에 있음.

// 다른 컴포넌트 갔다가 돌아오면 Notification 화면으로 보여줌
const NotificationStackNav = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  useEffect(()=>{
    console.log("isFocused")
    console.log(isFocused)
    if(isFocused) {
      navigation.navigate("Notification");
    }
  },[isFocused]);

  return <SharedStackNav screenName="Notification"/>;
};

export default NotificationStackNav;