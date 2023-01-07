const emailCheck = (email:string) => { 
  const reg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  return reg.test(email);
};

const passwordCheck = (password:string) => { 
  const reg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*\-\(\)+=])(?=.*[0-9]).{8,25}$/;
// !/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/.test(password)
  return reg.test(password);
};

const userNameCheck = (userName:string) => { 
  // 20 자 미만도 추가
  // const reg = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;
  const reg = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{1,20}$/g;
  return reg.test(userName);
};

const birthCheck = (birth:string) => {
  if(!birth) return true;
  if(birth?.length !== 8) return false;
  const reg = /^[0-9]+$/;
  if(!reg.test(birth)) return false;
  // 혹시라도 엄청나게 오래 쓰면 얘를 현재 년도에서 -1 이런식으로 계산
  const year = Number(birth.substring(0,4));
  if(year < 1900 || year > 2022) return false;
  const month = Number(birth.substring(4,6));
  if(month === 0 || month > 12) return false;
  // 날은 월따라 달라서.. 나중에 변경?
  const day = Number(birth.substring(6,8));
  if(day === 0 || day > 31) return false;
  return true;
};

const realNameCheck = (realName:string) => {
  if(!realName) return true;
  // 외국인일수도?
  const regKorean = /^[가-힣]+$/
  // 영어 + 띄어쓰기 포함
  const regEnglish = /^[a-zA-Z\s]+$/
  return regKorean.test(realName) || regEnglish.test(realName);
};


export { emailCheck, passwordCheck, userNameCheck, birthCheck, realNameCheck };