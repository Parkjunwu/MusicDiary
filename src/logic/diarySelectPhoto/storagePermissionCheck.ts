import { PermissionsAndroid, Platform } from "react-native";

const storagePermissionCheck = async() => {
  if (Platform.OS === "android") {

    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) return true;

    const status = await PermissionsAndroid.request(permission);
    if(status === 'granted') return true;

    else return false;

  } else return true;
};

export default storagePermissionCheck;