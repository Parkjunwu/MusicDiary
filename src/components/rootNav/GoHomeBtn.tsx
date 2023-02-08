import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import RootNavStackParamsList from "../../types/navigation/rootNavStackParamsList";

const GoHomeBtn = ({tintColor}:{tintColor:string}) => {

  const navigation = useNavigation<NativeStackNavigationProp<RootNavStackParamsList,"PushNotificationBoard">>();

  return (
    <TouchableOpacity onPress={()=>navigation.navigate("HomeNav")} >
      <Ionicons name="ios-home" size={22} color={tintColor} />
    </TouchableOpacity>
  );
};

export default GoHomeBtn;