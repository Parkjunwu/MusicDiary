import { Alert } from "react-native";

const ifErrorThenBaseAlert = (error:string | null) => {
  return Alert.alert(
    error ?? "알 수 없는 오류가 발생하였습니다.",
    "지속적으로 같은 문제가 발생한다면 문의 주시면 감사드리겠습니다.",
    [
      {
        text:"확인",
      },
    ]
  );
};


export default ifErrorThenBaseAlert;