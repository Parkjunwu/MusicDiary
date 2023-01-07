import { useState } from "react";
// import { ActivityIndicator, Image } from "react-native";
import FastImage, { OnLoadEvent } from "react-native-fast-image";

const DiaryFastImageWithRealHeight = ({uri,fileWidth}:{uri:string,fileWidth:number}) => {

  const [fileHeight,setImageHeight] = useState(0);

  // const getImageHeight = (width,height) => {
  //   return fileWidth * width / height;
  // }
  // Image.getSize(uri,(width,height)=>setImageHeight(fileWidth * height / width));
  const onLoad = (e: OnLoadEvent) => {
    const { nativeEvent : { height, width } } = e;
    setImageHeight(fileWidth * height / width);
  };

  // if(fileHeight === 0) {
  //   return <ActivityIndicator
  //     style={{
  //       width: fileWidth,
  //       height: fileWidth,
  //     }}
  //   />
  // }
  
  return (
    <FastImage
      style={{
        width: fileWidth,
        height: fileHeight,
      }}
      source={{uri}}
      resizeMode={FastImage.resizeMode.contain}
      onLoad={onLoad}
    />
  )
};

export default DiaryFastImageWithRealHeight;