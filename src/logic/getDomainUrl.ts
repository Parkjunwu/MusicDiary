const getDomainUrl = (email:string) => {
  const domain = email.substring(email.indexOf("@")+1,email.indexOf("."));
  const fullDomain = email.substring(email.indexOf("@")+1,email.length);
  switch (domain) {
    case 'gmail':
    case 'googlemail':
      return "https://www.google.com/"
    case 'hanmail':
      return "https://www.daum.net/"
    case 'kakao':
      return "https://mail.kakao.com/"
    default:
      return `https://www.${fullDomain}`;
  }
};

export default getDomainUrl;