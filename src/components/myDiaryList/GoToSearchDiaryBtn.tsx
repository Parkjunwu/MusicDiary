import { useNavigation } from "@react-navigation/core";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"
import { MyDiaryListTabStackParamsList } from "../../types/navigation/homeNavStackParamsList";

type MyDiaryListProps = NativeStackScreenProps<MyDiaryListTabStackParamsList, 'MyDiaryList'>;

const GoToSearchDiaryBtn = ({tintColor}:{tintColor:string|undefined}) => {

  const navigation = useNavigation<MyDiaryListProps["navigation"]>();

  return (
    <TouchableOpacity onPress={()=>navigation.navigate("SearchMyDiaries")}>
      <Ionicons name="ios-search" color={tintColor} size={30}/>
    </TouchableOpacity>
  );
};

export default GoToSearchDiaryBtn;