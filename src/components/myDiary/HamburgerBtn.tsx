import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MyDiaryDrawerNavParamsList } from "../../types/navigation/homeNavStackParamsList";

const HamburgerBtn = ({tintColor} : {tintColor : string|undefined}) => {
  const navigation = useNavigation<DrawerNavigationProp<MyDiaryDrawerNavParamsList>>();

  const onPressHamburger = ()=> navigation.openDrawer()

  return (
    <TouchableOpacity onPress={onPressHamburger} style={{marginRight:5}} >
      <Ionicons name="reorder-three-outline" size={30} color={tintColor} />
    </TouchableOpacity>
  );
};

export default HamburgerBtn;