const getFormatTimeToday = (timestamp:string) => {
  
  const dateConstructor = new Date(+timestamp);
  const hour24 = dateConstructor.getHours();
  const minute = dateConstructor.getMinutes();
  
  const halfDay = hour24 > 11 ? "오후" : "오전";
  
  const hour = () => {
    if(hour24 === 0) {
      return 12;
    } else if (hour24 > 12) {
      return hour24 - 12;
    } else {
      return hour24;
    }
  };

  return `${halfDay} ${hour()}시 ${minute}분`
};

export default getFormatTimeToday;