import { ProcessingManager } from 'react-native-video-processing';
import resizeImageNeedUriWidthHeight from './resizeImageNeedUriWidthHeight';

const getOrResizeThumbNail = async(file:{uri:string,thumbNail?:string}) => {
  const uri = file.uri;
  const thumbNail = file.thumbNail;

  let result;

  // 800 으로 해상도 변경
  if(thumbNail) {
    result = await resizeImageNeedUriWidthHeight(thumbNail,800,800);
  } else {
    result = (await ProcessingManager.getPreviewForSecond(
      uri,
      0,
      { width: 800, height: 800 }
      , "JPEG"
    )).uri;
  }
  
  return result;
};

export default getOrResizeThumbNail;