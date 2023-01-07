import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import { deleteRealmDiary } from "../../realm";


const useLocalDBDeleteDiary = (diaryId:number) => {

  const navigation = useNavigation();

  const deleteDiary = async() => {

    await deleteRealmDiary({
      id:diaryId,
    });
    
    navigation.goBack();
    Alert.alert("삭제가 완료되었습니다.",undefined,[
      {
        text:"확인",
      }
    ]);
  };

  return deleteDiary;
};

export default useLocalDBDeleteDiary;