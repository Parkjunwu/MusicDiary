import { TouchableOpacity, View } from "react-native";
import ImageWithRealHeight from "./ImageWithRealHeight";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RealHeightImageWithDeleteBtnProps } from "./ImageProps";
import React from "react";

const RealHeightImageWithDeleteBtn = (props:RealHeightImageWithDeleteBtnProps) => {

  console.log("RealHeightImageWithDeleteBtn")

  const {
    // onPressDeletePhoto,
    deletePhoto,
    index,
    ...rest
  } = props;

  return (
    <View
      style={{
        position: "relative",
      }}
    >
      <ImageWithRealHeight
        index={index}
        {...rest}
      />
      <TouchableOpacity
        // onPress={onPressDeletePhoto}
        onPress={()=>deletePhoto(index)}
        style={{
          position: "absolute",
          top: 5,
          right: 5,
          zIndex: 5,
        }}
      >
        <Ionicons name="close" color="rgba(255,0,0,0.7)" size={30} />
      </TouchableOpacity>
    </View>
  );
};

// memo 로 만들까? 그럼 좋지 않을라나?
// export default RealHeightImageWithDeleteBtn;
export default React.memo(
  RealHeightImageWithDeleteBtn,
  (prevProps,nextProps)=>(
    // prevProps.file.uri === nextProps.file.uri
    prevProps.file.uri === nextProps.file.uri &&
    // prevProps.fileWidth === nextProps.fileWidth &&
    // prevProps.onPressDeletePhoto === nextProps.onPressDeletePhoto
    prevProps.index === nextProps.index
  )
);