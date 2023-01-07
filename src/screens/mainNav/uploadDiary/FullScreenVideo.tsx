import { useEffect } from 'react';
import { View } from 'react-native';
import HeaderBackBtn from '../../../components/shared/HeaderBackBtn';
import { useIsFocused } from '@react-navigation/native';
import Video from 'react-native-video';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { UploadDiaryTabStackParamsList } from '../../../types/navigation/homeNavStackParamsList';

type FullScreenVideoType = NativeStackScreenProps<UploadDiaryTabStackParamsList,"FullScreenVideo">;

const FullScreenVideo = ({navigation,route}:FullScreenVideoType) => {
  
  const uri:string = route.params.uri;
  const paramTitle = route.params.title;

  console.log("route")
  console.log(route)
  
  useEffect(()=>{
    const title = paramTitle ?? "선택한 동영상";
    navigation.setOptions({
      title:title,
      headerLeft:({tintColor})=><HeaderBackBtn tintColor={tintColor} />
    });
  },[route]);

  const isFocused = useIsFocused();

  return (
    // <VideoView uri={uri} />
    <View style={{flex:1}}>
      {isFocused ? <Video
        source={{uri}}
        style={{flex:1}}
        controls={true}
        fullscreen={false}
        resizeMode="contain"
      /> : null}
      {/* View 를 넣어야 이상하게 안됬나? 확인 필요 */}
      <View/>
    </View>
  );
};

export default FullScreenVideo;