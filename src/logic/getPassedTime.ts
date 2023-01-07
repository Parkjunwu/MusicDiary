const getPassedTime = (timestamp) => {
  // subscription 은 시간이 이상하게 들어옴. 그거 변환.
  const time = timestamp.substring(timestamp.length-1, timestamp.length) === "Z" ? new Date(timestamp).getTime() : timestamp;
  // 현재 시간
  const now = new Date().getTime();
  // 계산할 시간
  const passedByTime = now - time
  if(passedByTime > 31536000000) {
    // 년 이상일 경우 몇년
    return Math.floor(passedByTime/31536000000)+"년전"
  } else if (passedByTime > 2592000000){
    // 달 이상일 경우 몇달
    return Math.floor(passedByTime/2592000000)+"달전"
  } else if (passedByTime > 604800000){
    // 주 이상일 경우 몇주
    return Math.floor(passedByTime/604800000)+"주전"
  } else if (passedByTime > 86400000){
    // 일 이상일 경우 몇일
    return Math.floor(passedByTime/86400000)+"일전"
  } else if (passedByTime > 3600000){
    // 시간 이상일 경우 몇시간
    return Math.floor(passedByTime/3600000)+"시간전"
  } else {
    // 몇분
    return Math.floor(passedByTime/60000)+"분전"
  }
};

export default getPassedTime;