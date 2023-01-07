// import { View } from "react-native";
import YoutubeIframe, { YoutubeIframeProps } from "react-native-youtube-iframe";
// import { isAndroid } from "../../utils";

const BaseYoutubePlayer = (props:YoutubeIframeProps) => {

  // const { webViewStyle, ...rest } = props;
  // const newWebViewStyle = [ webViewStyle, isAndroid ? {opacity: 0.99} : undefined ];

  return <YoutubeIframe
    {...props}
    // {...rest}
    // webViewStyle={newWebViewStyle} // 안드로이드 크래시 때문에 넣음
    // webViewStyle={isAndroid ? {opacity: 0.99} : undefined}
    webViewStyle={{opacity: 0.99}}
  />
  // return <View renderToHardwareTextureAndroid={true}>
  //   <YoutubeIframe {...props} />
  // </View>
};

export default BaseYoutubePlayer;