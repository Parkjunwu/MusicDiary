import { useNavigation } from "@react-navigation/core";
import { TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const GoBackBtn = ({tintColor}:{tintColor:string|undefined}) => {

  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={()=>navigation.goBack()}>
      <Ionicons name="chevron-back-sharp" color={tintColor} size={30} />
    </TouchableOpacity>
  );
};

export default GoBackBtn;