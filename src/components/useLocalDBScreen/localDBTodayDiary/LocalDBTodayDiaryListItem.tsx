import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import styled from "styled-components/native";
import { realmDiaryType } from "../../../types/realm/realmDiaryType";
import { fromWhere } from "../../../apollo";
import { FontAppliedBaseTextNeedFontSize } from "../../../styled-components/FontAppliedComponents";
import { UploadDiaryTabStackParamsList } from "../../../types/navigation/homeNavStackParamsList";

const Container = styled.TouchableOpacity`
  margin: 3px 6px;
  border-radius: 5px;
  padding: 10px 20px;
  background-color: ${props=>props.theme.textInputBackgroundColor};
`;

const TitleText = styled(FontAppliedBaseTextNeedFontSize)`
  /* font-size: 15px; */
`;
const BodyText = styled(FontAppliedBaseTextNeedFontSize)`
  margin: 3px;
`;

const LocalDBTodayDiaryListItem = ({item}:{item:realmDiaryType | null}) => {

  if(!item) return null;
  
  const {
    id,
    title,
    body,
    dateTime,
  } = item;

  const navigation = useNavigation<NativeStackNavigationProp<UploadDiaryTabStackParamsList>>();

  const onPressDiary = () => {
    fromWhere("TodayDiary");
    navigation.navigate("MyDiaryDrawerNav",{
      screen: 'MyDiary1',
      params:{
        id,
        title,
        createdAt:dateTime+"",
      }
    });
  }

  return (
    <Container
      activeOpacity={0.4}
      onPress={onPressDiary}
    >
      <TitleText fontSize={15}>{title}</TitleText>
      <BodyText
        numberOfLines={5}
        ellipsizeMode="tail"
      >{body}</BodyText>
      {/* <FontAppliedBaseText>{formatTime}</FontAppliedBaseText> */}
    </Container>
  );
};

export default LocalDBTodayDiaryListItem;