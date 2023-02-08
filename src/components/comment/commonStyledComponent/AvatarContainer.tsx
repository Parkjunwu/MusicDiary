import { GestureResponderEvent } from "react-native";
import FastImage from "react-native-fast-image";
import styled from "styled-components/native";
import { noUserUri } from "../../../localImage/preloadLocalImageAndSetReactiveVar";

const ImageContainer = styled.TouchableOpacity``;

type AvatarContainerType = {
  avatar?: string;
  onPressAvatar: (event: GestureResponderEvent) => void
};

const AvatarContainer = ({avatar,onPressAvatar}:AvatarContainerType) => {
  
  return (
    <ImageContainer onPress={onPressAvatar} >
      <FastImage
        style={{
          width: 30,
          height: 30,
          borderRadius: 15,
        }}
        // source={avatar ? {uri:avatar} : image.no_user}
        source={{uri : avatar ? avatar : noUserUri}}
      />
    </ImageContainer>
  );
};

export default AvatarContainer;