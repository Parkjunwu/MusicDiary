import { ProcessingManager } from 'react-native-video-processing';
import ImageSize from 'react-native-image-size';
// import ImageResizer from '@bam.tech/react-native-image-resizer';
import ImageResizer from 'react-native-image-resizer';
import { isAndroid } from '../../utils';

type FileType = {
  isVideo:boolean
  uri:string
}

const compressImageVideoFile = async(file:FileType) => {
  let uploadFileUri;
  if(file.isVideo) {

    // 비디오 사이즈 변경
    const { size } = await ProcessingManager.getVideoInfo(file.uri)
      // 시간 얼마 이상은 못넣어 이런것도 넣을 수 있겠군. duration
    const videoWidth = size.width;
    const videoHeight = size.height;
    // 최대 640 으로 사이즈 변경. 너무 구리면 높게
    // 이상해. 1000 x 6000 뭐 이런애면 110 x 640 이런식으로 됨.
    // 둘 다 640 보다 크면 작은애를 640 에 맞춰야겠다
    if(videoWidth > 640 && videoHeight > 640) {
      const widthHeightRatio = videoWidth/videoHeight;
      const isWidthLargeThanHeight = !(widthHeightRatio < 1);
      const compressOption = {
        // Math.floor 로 소수점 버려야 되는 듯. ios 받는게 Double 이라(?) 못받는듯
        width: isWidthLargeThanHeight ? Math.floor(640 * widthHeightRatio) : 640,
        height: isWidthLargeThanHeight ? 640 : Math.floor(640 / widthHeightRatio),
        bitrateMultiplier: 3, // 이게 뭐지?
        minimumBitrate: 300000,
      };
      // if(videoWidth > 640 || videoHeight > 640) {
      //   const widthHeightRatio = videoWidth/videoHeight;
      //   const isWidthLargeThanHeight = !(widthHeightRatio < 1);
  
        // const compressOption = {
        //   width: isWidthLargeThanHeight ? 640 : 640 * widthHeightRatio,
        //   height: isWidthLargeThanHeight ? 640 / widthHeightRatio : 640,
        //   bitrateMultiplier: 3, // 이게 뭐지?
        //   minimumBitrate: 300000,
        // };
  
        const compressedVideo = await ProcessingManager.compress(file.uri, compressOption);
        
        // 안드로이드는 객체로 받음. source 안에 있음.
        uploadFileUri = isAndroid ? compressedVideo.source : compressedVideo;
  
      // }
    } else {
      uploadFileUri = file.uri;
    }
  } else {
    // 사진 사이즈 변경
    const { width, height } = await ImageSize.getSize(file.uri);

      // 이미지 안자른 애는.. 그냥 올려야겠군. 자를 수 있으면 잘라
      // 얘도 사이즈 바꿈. 1000 x 6000 뭐 이런애면 110 x 640 이런식으로 되서.

    // if(width>1080 || height>1080) {
    if(width>1080 || height>1080) {

      // const resizedImage = await ImageResizer.createResizedImage(file.uri, 1080, 1080, "JPEG", 90, 0, null, false, {onlyScaleDown:true});
      const widthHeightRatio = width/height;
      const isWidthLargeThanHeight = !(widthHeightRatio < 1);

      const compressedWidth = isWidthLargeThanHeight ? 1080 * widthHeightRatio : 1080;
      const compressedHeight = isWidthLargeThanHeight ? 1080 : 1080 / widthHeightRatio;

      const resizedImage = await ImageResizer.createResizedImage(
        file.uri,
        compressedWidth,
        compressedHeight,
        "JPEG",
        90,
        0,
        null,
        false,
        {
          onlyScaleDown:true
        }
      );

      uploadFileUri = resizedImage.uri;
    } else {
      uploadFileUri = file.uri;
    }
  }
  
  return uploadFileUri;
};

export default compressImageVideoFile;