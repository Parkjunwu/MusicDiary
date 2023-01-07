import { TouchableOpacity } from "react-native";
import FastImage from "react-native-fast-image";
import { youtubeType } from "../../../recommend/youtubeRecommendByFeeling/youtubeRecommendByFeeling";
import { FontAppliedBaseTextNeedFontSize } from "../../../styled-components/FontAppliedComponents";

type YoutubeRenderItemProps = {
  item: youtubeType,
  onPressItem: (youtubeId: string) => void
};

const YoutubeRenderItem = ({
  item,
  onPressItem,
}:YoutubeRenderItemProps) => {
  const imageSize = 130;
  const maxWidth = imageSize + 30;
  
  return (
    <TouchableOpacity
      style={{
        alignItems: "center",
        maxWidth,
      }}
      onPress={()=>onPressItem(item.id)}
    >
      <FastImage
        source={{
          uri:item.thumbNail
        }}
        style={{
          height: imageSize,
          width: imageSize,
        }}
      />
      <FontAppliedBaseTextNeedFontSize
        numberOfLines={1}
        ellipsizeMode="tail"
      >{item.title}</FontAppliedBaseTextNeedFontSize>
    </TouchableOpacity>
  );
};

export default YoutubeRenderItem;