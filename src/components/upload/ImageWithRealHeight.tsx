import { useState } from "react";
import { Alert, View } from "react-native";
import FastImage, { OnLoadEvent } from "react-native-fast-image";
import VideoIconWithDarkMode from "../video/VideoIconWithDarkMode";
import { ImageWithRealHeightProps } from "./ImageProps";

const ImageWithRealHeight = ({
  file,
  fileWidth,
  imageStyle,
  setFiles, // 불러오기 시 없는 경우를 위해
  setBody, // 불러오기 시 없는 경우를 위해
  index, // 불러오기 시 없는 경우를 위해
}:ImageWithRealHeightProps) => {

  const source = file.thumbNail ?? file.uri;

  const [fileHeight,setImageHeight] = useState(0);

  // Image.getSize(source,(width,height)=>setImageHeight(fileWidth * height / width));

  // if(fileHeight === 0) {
  //   return <ActivityIndicator
  //     style={{
  //       width: fileWidth,
  //       height: fileWidth,
  //     }}
  //   />;
  // }

  const onLoad = (e: OnLoadEvent) => {
    const { nativeEvent : { height, width } } = e;
    setImageHeight(fileWidth * height / width);
  };

  const onError = () => {
    console.log("get image error!!!")
    Alert.alert("파일을 불러오는 데 실패하였습니다.");
    
    if(setFiles && setBody) {
      // useDeletePhoto deletePhoto 에서 가져옴
      setBody(prev=>{
        const newArr = [...prev];
        if(newArr[index+1]){
          newArr[index] += newArr[index+1];
        }
        newArr.splice(index+1,1);
        
        return newArr;
      });
      setFiles(prev=>{
        const newArr = [...prev];
        // 이게 여러 개여도 index 잘 맞음. 안되면 filter 로 할랬는데 잘 되는군. 만약 filter 써야되면 setFiles 안에 setBody 를 써서 맞는 index 를 지워야 할듯
        newArr.splice(index,1);
        
        return newArr;
      });
    }
  };
  
  return (
    <View
      style={{
        position: "relative",
      }}
    >
      {/* <Image */}
      <FastImage
        style={{
          width: fileWidth,
          height: fileHeight,
          ...imageStyle,
        }}
        resizeMode={FastImage.resizeMode.contain}
        source={{uri:source}}
        onLoad={onLoad}
        // 이걸 수정?
        onError={onError}
      />
      {file.isVideo && <VideoIconWithDarkMode
        iconSize={25}
        top="8px"
        left="7px"
      />}
    </View>
  );
};

export default ImageWithRealHeight;