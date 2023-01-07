import { gql, useMutation } from "@apollo/client";
import { Alert } from "react-native";

const RESEND_EMAIL = gql`
  mutation resendEmail($email: String!) {
    resendEmail(email: $email) {
      ok
      error
    }
  }
`;

const useResendEmailBaseNeedIsWhenFirstCreateAccount = (isWhenFirstCreateAccount:boolean) => {

  const [resendEmail] = useMutation(RESEND_EMAIL);

  const titleMessage = isWhenFirstCreateAccount ? "이메일 인증을 완료하셨다면 로그인 후 서비스 이용이 가능합니다." : "인증되지 않은 상태의 같은 이메일이 존재합니다. 이메일을 확인해 가입을 완료해 주시기 바랍니다.";

  const subMessage = isWhenFirstCreateAccount ? "이메일을 받지 못하셨다면 재전송 버튼을 눌러주시기 바랍니다." : "이메일이 오지 않은 경우 재전송을 눌러주시기 바랍니다.";

  const baseAlertResendEmailNeedEmail = (email:string | undefined) => {
    if(!email) return;
    
    return Alert.alert(titleMessage,subMessage,[
      {
        text:"재전송",
        onPress:async()=>{
          await resendEmail({
            variables:{
              email
            },
            onCompleted:(data)=>{
              const titleMessage = data.resendEmail.ok ? "전송되었습니다." : "전송에 실패하였습니다."
              const subMessage = data.resendEmail.error;
              Alert.alert(titleMessage,subMessage);
            }
          })
        },
      },
      {
        text:"확인",
      },
    ]);
  };
  
  return baseAlertResendEmailNeedEmail;
};

export default useResendEmailBaseNeedIsWhenFirstCreateAccount;