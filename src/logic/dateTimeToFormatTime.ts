
const dateTimeToFormatTime = (
  dateTime: number | null | undefined,
) => {

  if(!dateTime) return {};
  
  const diaryYear = Math.floor(dateTime/10000); 
  const diaryEmpty = dateTime - diaryYear*10000;
  const diaryMonth = Math.floor(diaryEmpty/100);
  const diaryDate = diaryEmpty - diaryMonth*100;
  
  const date = new Date();
  const nowYear = date.getFullYear();
  const isNowYear = nowYear === diaryYear;

  return { isNowYear, diaryYear, diaryMonth, diaryDate };
};

export default dateTimeToFormatTime;