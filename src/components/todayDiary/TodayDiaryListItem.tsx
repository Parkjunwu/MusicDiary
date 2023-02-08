import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import FastImage, { OnLoadEvent } from "react-native-fast-image";
import styled from "styled-components/native";
import { fromWhere } from "../../apollo";
import getFormatTimeToday from "../../logic/getFormatTimeToday";
import { FontAppliedBaseTextNeedFontSize } from "../../styled-components/FontAppliedComponents";
import { UploadDiaryTabStackParamsList } from "../../types/navigation/homeNavStackParamsList";
import { me_me_todayDiaries } from "../../__generated__/me";

// ${({marginHorizontal}) => marginHorizontal} 은 ${props => props.marginHorizontal} 랑 같음
const Container = styled.TouchableOpacity<{marginHorizontal:number,paddingHorizontal:number,maxWidth:number}>`
  margin: 3px ${({marginHorizontal})=>marginHorizontal}px; 
  border-radius: 5px;
  padding: 10px ${({paddingHorizontal})=>paddingHorizontal}px;
  background-color: ${props=>props.theme.textInputBackgroundColor};
  max-width: ${({maxWidth})=>maxWidth}px;
  align-self: center;
`;

const TitleText = styled(FontAppliedBaseTextNeedFontSize)`
  /* font-size: 15px; */
`;
const BodyText = styled(FontAppliedBaseTextNeedFontSize)`
  margin: 3px;
`;

type TodayDiaryListItemProps = {
  item: me_me_todayDiaries | null;
  imageWidth: number;
  imageMarginHorizontal: number;
  imagePaddingHorizontal: number;
  maxWidth: number;
};

const TodayDiaryListItem = ({
  item,
  imageWidth,
  imageMarginHorizontal,
  imagePaddingHorizontal,
  maxWidth,
}: TodayDiaryListItemProps) => {

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
  };


  const [imageHeight,setImageHeight] = useState(0);
  const onLoad = (e: OnLoadEvent) => {
    const { nativeEvent : { height, width } } = e;
    setImageHeight(imageWidth * height / width);
  };

  return (
    <Container
      activeOpacity={0.4}
      onPress={onPressDiary}
      marginHorizontal={imageMarginHorizontal}
      paddingHorizontal={imagePaddingHorizontal}
      maxWidth={maxWidth}
    >
      {thumbNail && <FastImage
        source={{uri:thumbNail}}
        style={{
          // flex: 1,
          // width: "100%",
          // height: 300,
          width: imageWidth,
          height: imageHeight,
          marginBottom: 10,
        }}
        onLoad={onLoad}
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