import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import FastImage from "react-native-fast-image";
import styled from "styled-components/native";
import { fromWhere } from "../../apollo";
import getFormatTimeToday from "../../logic/getFormatTimeToday";
import { FontAppliedBaseTextNeedFontSize } from "../../styled-components/FontAppliedComponents";
import { UploadDiaryTabStackParamsList } from "../../types/navigation/homeNavStackParamsList";
import { me_me_todayDiaries } from "../../__generated__/me";

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

const TodayDiaryListItem = ({item}:{item:me_me_todayDiaries | null}) => {

  if(!item) return null;
  
  const {
    id,
    title,
    thumbNail,
    body,
    createdAt,
  } = item;

  let bodyString = "";
  body.forEach((eachBody:string) => bodyString += eachBody + " ");

  const formatTime = getFormatTimeToday(createdAt);

  const navigation = useNavigation<NativeStackNavigationProp<UploadDiaryTabStackParamsList>>();

  const onPressDiary = () => {
    fromWhere("TodayDiary");
    navigation.navigate("MyDiaryDrawerNav",{
      screen: 'MyDiary1',
      params:{
        id,
        title,
        createdAt:formatTime,
      }
    });
  }

  return (
    <Container
      activeOpacity={0.4}
      onPress={onPressDiary}
    >
      {thumbNail && <FastImage
        source={{uri:thumbNail}}
        style={{
          // flex: 1,
          width: "100%",
          height: 300,
          marginBottom: 10,
        }}
      />}
      <TitleText fontSize={15}>{title}</TitleText>
      <BodyText
        numberOfLines={5}
        ellipsizeMode="tail"
      >{bodyString}</BodyText>
      <FontAppliedBaseTextNeedFontSize>{formatTime}</FontAppliedBaseTextNeedFontSize>
    </Container>
  );
};

export default TodayDiaryListItem;