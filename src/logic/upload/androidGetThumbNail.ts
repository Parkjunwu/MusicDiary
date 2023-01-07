import { ProcessingManager } from 'react-native-video-processing';

const androidGetThumbNail = async(uri:string) => {
  const result = (await ProcessingManager.getPreviewForSecond(
    uri,
    0,
    { width: 200, height: 200 }
    , "JPEG"
  )).uri;
  // 얜 또 왜 uri 야
  return result;
};

export default androidGetThumbNail;

// 지금 안씀