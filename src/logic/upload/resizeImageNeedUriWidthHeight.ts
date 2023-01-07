// import ImageResizer from "@bam.tech/react-native-image-resizer";
import ImageResizer from 'react-native-image-resizer';

const resizeImageNeedUriWidthHeight = async(uri:string,width:number,height:number) => {
  const resizedImageObj = await ImageResizer.createResizedImage(uri, width, height, "JPEG", 90, 0, null, false, {onlyScaleDown:true});

  return resizedImageObj.uri;
};

export default resizeImageNeedUriWidthHeight;