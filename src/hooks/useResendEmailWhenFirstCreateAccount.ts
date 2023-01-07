import useResendEmailBaseNeedIsWhenFirstCreateAccount from "./useResendEmailBaseNeedIsWhenFirstCreateAccount";

const useResendEmailWhenFirstCreateAccountNeedEmail = (email:string|undefined) => {

  const baseAlertResendEmailNeedEmail = useResendEmailBaseNeedIsWhenFirstCreateAccount(true);

  const alertResendEmailWhenFirstCreateAccount = () => {
    baseAlertResendEmailNeedEmail(email);
  };
  
  return alertResendEmailWhenFirstCreateAccount;
};

export default useResendEmailWhenFirstCreateAccountNeedEmail;