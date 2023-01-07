import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MyDiaryDrawerNavParamsList } from "../../types/navigation/homeNavStackParamsList";

type MyDiaryHeaderComponentProps = {
  prevDiaryId?: number,
  nextDiaryId?: number,
  createdAt: number,
  ScreenNumber: number,
}

const MyDiaryHeaderComponent = ({
  prevDiaryId,
  nextDiaryId,
  createdAt,
  ScreenNumber,
}:MyDiaryHeaderComponentProps) => {

  const navigation = useNavigation<NativeStackNavigationProp<MyDiaryDrawerNavParamsList>>();
  
  const navigateScreen = ScreenNumber === 1 ? "MyDiary2" : "MyDiary1";

  const onPressPrev = () => {
    prevDiaryId && navigation.navigate(navigateScreen,{
      id:prevDiaryId,
    });
  };

  const onPressNext = () => {
    nextDiaryId && navigation.navigate(navigateScreen,{
      id:nextDiaryId,
    });
  };

};

export default MyDiaryHeaderComponent;