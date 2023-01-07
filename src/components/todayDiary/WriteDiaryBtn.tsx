import styled from "styled-components/native";
import { colors } from "../../js-assets/color";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { UploadDiaryTabStackParamsList } from "../../types/navigation/homeNavStackParamsList";

const WriteDiary = styled.TouchableOpacity`
  width: 150px;
  height: 150px;
  border-radius: 75px;
  background-color: ${colors.beige};
  margin: 0px auto auto auto;
  justify-content: center;
  align-items: center;
  /* 그림자 */
  /* box-shadow: 1px 1px 5px rgba(0,0,0,0.5); */
  box-shadow: 1px 1px 5px rgba(192,132,87,0.8);
  elevation: 5;
`;
const SmallWriteDiary = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: ${colors.beige};
  margin: 20px auto ;
  justify-content: center;
  align-items: center;
  /* 그림자 */
  /* box-shadow: 1px 1px 5px rgba(0,0,0,0.5); */
  box-shadow: 1px 1px 5px rgba(192,132,87,0.8);
  elevation: 5;
`;

type WriteDiaryBtnProps ={
  size: "small" | "big",
};

const WriteDiaryBtn = ({
  size,
}: WriteDiaryBtnProps) => {

  const navigation = useNavigation<NativeStackNavigationProp<UploadDiaryTabStackParamsList>>();

  const onPressWriteBtn = () => {
    navigation.navigate("UploadDiary");
  };

  return (
    size === "big" ?
      <WriteDiary onPress={onPressWriteBtn}>
        {/* react-native-vector-icons 가 가운데 안옴. 그래서 style 넣음. 안드로이드 확인 */}
        <Ionicons name="add-outline" size={150} color={colors.brown} style={{width:150,height:150,marginLeft:10,marginBottom:9}}/>
      </WriteDiary>
    :
      <SmallWriteDiary onPress={onPressWriteBtn}>
        {/* react-native-vector-icons 가 가운데 안옴. 그래서 style 넣음. 안드로이드 확인 */}
        <Ionicons name="add-outline" size={50} color={colors.brown} style={{width:50,height:50,marginLeft:4,marginBottom:4}}/>
      </SmallWriteDiary>
  )
};

export default WriteDiaryBtn;