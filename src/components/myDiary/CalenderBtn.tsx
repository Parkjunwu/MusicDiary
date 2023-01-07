import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"
import { MyDiaryListTabStackParamsList } from "../../types/navigation/homeNavStackParamsList";

const CalenderBtn = ({tintColor}:{tintColor:string|undefined}) => {

  const navigation = useNavigation<NativeStackNavigationProp<MyDiaryListTabStackParamsList, "MyDiaryList">>();

  const onPressCalenderBtn = () => {
    navigation.navigate("Calendar");
  };

  return (
    <TouchableOpacity onPress={onPressCalenderBtn}>
      <Ionicons name="ios-calendar-sharp" color={tintColor} size={30} />
    </TouchableOpacity>
  );
};

export default CalenderBtn;