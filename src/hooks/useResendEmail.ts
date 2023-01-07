import useResendEmailBaseNeedIsWhenFirstCreateAccount from "./useResendEmailBaseNeedIsWhenFirstCreateAccount";

const useResendEmail = () => {

  const baseAlertResendEmailNeedEmail = useResendEmailBaseNeedIsWhenFirstCreateAccount(false);

  const alertResendEmailNeedEmail = (email:string) => {
    baseAlertResendEmailNeedEmail(email);
  };
  
  return alertResendEmailNeedEmail;
};

export default useResendEmail;