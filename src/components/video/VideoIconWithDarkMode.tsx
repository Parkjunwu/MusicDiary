import React from "react";
import useIsDarkMode from "../../hooks/useIsDarkMode";
import VideoIconPositionAbsolute from "./VideoIconPositionAbsolute";
import { VideoIconProp } from "./videoIconType";

const VideoIconWithDarkMode = (props:VideoIconProp) => {
  const isDarkMode = useIsDarkMode();
  const iconColor = isDarkMode ? "white" : "black";
  return <VideoIconPositionAbsolute {...props} iconColor={iconColor} />
};

// class classComponentForAnimate extends React.Component<VideoIconProp> {
//   render() {
//     return <VideoIconWithDarkMode {...this.props} />
//   }
// }

// export default classComponentForAnimate;
export default VideoIconWithDarkMode;