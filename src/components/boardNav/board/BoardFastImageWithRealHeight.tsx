import { useState } from "react";
import { ActivityIndicator, Image } from "react-native";
import FastImage from "react-native-fast-image";

const PetLogFastImageWithRealHeight = ({uri,fileWidth}:{uri:string,fileWidth:number}) => {

  const [fileHeight,setImageHeight] = useState(0);

  // const getImageHeight = (width,height) => {
  //   return fileWidth * width / height;
  // }
  Image.getSize(uri,(width,height)=>setImageHeight(fileWidth * height / width));

  if(fileHeight === 0) {
    return <ActivityIndicator
      style={{
        width: fileWidth,
        height: fileWidth,
      }}
    />
  }
  
  return (
    <FastImage
      style={{
        width: fileWidth,
        height: fileHeight,
      }}
      source={{uri}}
      resizeMode={FastImage.resizeMode.contain}
    />
  )
};

export default PetLogFastImageWithRealHeight;