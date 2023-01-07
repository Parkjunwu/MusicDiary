import { ProcessingManager } from 'react-native-video-processing';
import ImageSize from 'react-native-image-size';
// import ImageResizer from '@bam.tech/react-native-image-resizer';
import ImageResizer from 'react-native-image-resizer';
import { isAndroid } from '../../utils';

type FileType = {
  isVideo:boolean
  uri:string
}

const compressImageVideoFileByWidth = async(file:FileType) => {
  let uploadFileUri;
  if(file.isVideo) {

    // 비디오 사이즈 변경
    const { size } = await ProcessingManager.getVideoInfo(file.uri)
      // 시간 얼마 이상은 못넣어 이런것도 넣을 수 있겠군. duration
    const videoWidth = size.width;
    const videoHeight = size.height;
    // 최대 640 으로 사이즈 변경. 너무 구리면 높게
    // if(videoWidth > 640 || videoHeight > 640) {
    if(videoWidth > 640) {
      const widthHeightRatio = videoWidth/videoHeight;
      // const isWidthLargeThanHeight = !(widthHeightRatio < 1);

      const compressOption = {
        width: 640,
        height: Math.floor(640 / widthHeightRatio),
        bitrateMultiplier: 3, // 이게 뭐지?
        minimumBitrate: 300000,
      };

      const compressedVideo = await ProcessingManager.compress(file.uri, compressOption);
      
      // 안드로이드는 객체로 받음. source 안에 있음.
      uploadFileUri = isAndroid ? compressedVideo.source : compressedVideo;

    } else {
      uploadFileUri = file.uri;
    }
  } else {
    // 사진 사이즈 변경
    const { width, height } = await ImageSize.getSize(file.uri);

    // if(width>1080 || height>1080) {
    if(width>1080) {

      const imageHeightRatio = width/height;
      const imageHeight = width / imageHeightRatio;

      const resizedImage = await ImageResizer.createResizedImage(file.uri, 1080, imageHeight, "JPEG", 90, 0, null, false, {onlyScaleDown:true});
      console.log(resizedImage.size)
      uploadFileUri = resizedImage.uri;
    } else {
      uploadFileUri = file.uri;
    }
  }
  
  return uploadFileUri;
};

export default compressImageVideoFileByWidth;