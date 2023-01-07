
const getFormatTime = (timestamp:string) => {
  // if(timestamp.substring(timestamp.length-1, timestamp.length) === "Z") {
  const dateConstructor = new Date(+timestamp);
  const year = dateConstructor.getFullYear();
  const month = dateConstructor.getMonth() + 1;
  const date = dateConstructor.getDate();
  const hour24 = dateConstructor.getHours();
  const minute = dateConstructor.getMinutes();
  // const second = dateConstructor.getSeconds();
  
  const halfDay = hour24 > 11 ? "오후" : "오전";
  // const hour = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
  const hour = () => {
    if(hour24 === 0) {
      return 12;
    } else if (hour24 > 12) {
      return hour24 - 12;
    } else {
      return hour24;
    }
  };

  return `${year}년 ${month}월 ${date}일 ${halfDay} ${hour()}시 ${minute}분`
};

export default getFormatTime;