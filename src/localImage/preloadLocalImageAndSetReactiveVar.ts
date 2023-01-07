import { Image, ImageSourcePropType } from 'react-native';
import FastImage from 'react-native-fast-image';
import localImages from '../js-assets/localImages';

let logoUri = "";
let noUserUri = "";

const preloadLocalImageUri = (image:ImageSourcePropType) => {
  return Image.resolveAssetSource(image).uri;
};

const preloadLocalImage = () => {
  const setLogoImage = () => {
    logoUri = preloadLocalImageUri(localImages.logo);
    return { uri: logoUri };
  };

  const setNoUserImage = () => {
    noUserUri = preloadLocalImageUri(localImages.no_user);
    return { uri: noUserUri };
  };
  
  const localImagesToLoad = [
    setLogoImage(),
    setNoUserImage(),
  ];

  FastImage.preload(localImagesToLoad);
};

export {
  logoUri,
  noUserUri,
  preloadLocalImage,
};