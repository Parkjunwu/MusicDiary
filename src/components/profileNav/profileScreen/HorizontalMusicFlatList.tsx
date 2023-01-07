import { FlatList, View } from "react-native";
import { youtubeType } from "../../../recommend/youtubeRecommendByFeeling/youtubeRecommendByFeeling";
import YoutubeRenderItem from "./YoutubeRenderItem";

const ItemSeparator = () => <View style={{width: 10}} />;

type HorizontalMusicFlatListProps = {
  data: youtubeType[],
  onPressItem: (youtubeId: string) => void
};

const HorizontalMusicFlatList = ({
  data,
  onPressItem,
}:HorizontalMusicFlatListProps) => {

  return (
    <FlatList
      data={data}
      renderItem={({item})=><YoutubeRenderItem item={item} onPressItem={onPressItem} />}
      horizontal={true}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={ItemSeparator}
      ListFooterComponent={ItemSeparator}
      showsHorizontalScrollIndicator={false}
      style={{
        flex: 1,
        marginTop: 5,
      }}
      onLayout={(e)=>{
        console.log(e.nativeEvent.layout.height)
      }}
    />
  )
};

export default HorizontalMusicFlatList;