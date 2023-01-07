
const isImage = (uri:string) => {
  // 일단 확장자로 동영상인지 구분. 근데 이거는 여러개일 수 있어서 파일 타입이 video 인지로 구분해야 할듯. DB 에도 저장해야 함.
  const length = uri.length;
  const type = uri.substring(length-3,length);
  return type === "mp4" || type === "3u8" ? false : true;
};

export default isImage;