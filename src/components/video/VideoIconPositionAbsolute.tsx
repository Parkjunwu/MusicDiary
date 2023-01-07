import styled, { css } from "styled-components/native";
import Entypo from 'react-native-vector-icons/Entypo';
import { VideoIconContainerType, VideoIconPositionAbsoluteProp } from "./videoIconType";

const VideoIconContainer = styled.View<VideoIconContainerType>`
  position: absolute;
  ${(props)=>(props.top || props.top === 0) && css`top: ${props.top}`};
  ${(props)=>(props.bottom || props.bottom === 0) && css`bottom: ${props.bottom}`};
  ${(props)=>(props.left || props.left === 0) && css`left: ${props.left}`};
  ${(props)=>(props.right || props.right === 0) && css`right: ${props.right}`};
`;

const VideoIconPositionAbsolute = ({iconSize,top,bottom,left,right,iconColor = "white"}:VideoIconPositionAbsoluteProp) => {
  return (
    <VideoIconContainer top={top} bottom={bottom} left={left} right={right} >
      <Entypo name="video-camera" size={iconSize} color={iconColor} />
    </VideoIconContainer>
  )
};

export default VideoIconPositionAbsolute;