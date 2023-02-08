import { useState } from "react";
import { ActivityIndicator, Image, ImageStyle, View } from "react-native";
import VideoIconWithDarkMode from "../../video/VideoIconWithDarkMode";

const PetLogImageWithRealHeight = ({uri,fileWidth,imageStyle,thumbNail}:{uri:string,fileWidth:number,imageStyle?:ImageStyle,thumbNail?:string}) => {

  const [fileHeight,setImageHeight] = useState(0);

  // const getImageHeight = (width,height) => {
  //   return fileWidth * width / height;
  // }
  Image.getSize(thumbNail ?? uri,(width,height)=>setImageHeight(fileWidth * height / width));

  if(fileHeight === 0) {
    return <ActivityIndicator
      style={{
        width: fileWidth,
        height: fileWidth,
      }}
    />
  }
  
  return (
    <View
      style={{
        position: "relative",
      }}
    >
      <Image
        style={{
          width: fileWidth,
          height: fileHeight,
          ...imageStyle,
        }}
        source={{uri:thumbNail ?? uri}}
      />
      {thumbNail && <VideoIconWithDarkMode
        iconSize={25}
        top="8px"
        left="7px"
      />}
    </View>
  )
};

export default PetLogImageWithRealHeight;