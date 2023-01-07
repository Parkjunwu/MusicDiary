import { Linking } from 'react-native';
import { InAppBrowser } from 'react-native-inappbrowser-reborn'

const linkToBrowser = async(url:string) => {
  try {
    if (await InAppBrowser.isAvailable()) {
      await InAppBrowser.open(url);
    }
    else {
      Linking.openURL(url);
    }
  } catch (error: any) {
    console.error(error.message);
  }
};

export default linkToBrowser;