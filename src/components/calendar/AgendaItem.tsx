import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Octicons from 'react-native-vector-icons/Octicons';
import styled from "styled-components/native";
import { fromWhere } from "../../apollo";
import useBackgroundColorAndTextColor from "../../hooks/useBackgroundColorAndTextColor";
import { FontAppliedBaseTextNeedFontSize, FontAppliedBoldTextNeedFontSize } from "../../styled-components/FontAppliedComponents";
import { MyDiaryListTabStackParamsList } from "../../types/navigation/homeNavStackParamsList";

const Container = styled.TouchableOpacity`
  padding: 20px 0px;
  border-bottom-width: 1px;
  border-bottom-color: lightgrey;
  flex-direction: row;
`;
const LeftContainer= styled.View`
  justify-content: center;
  padding: 0px 20px;
`;
const CenterContainer= styled.View`
  flex: 1;
`;
const TitleText = styled(FontAppliedBoldTextNeedFontSize)`
  /* font-size: 16px; */
`;
const SummaryBodyText = styled(FontAppliedBaseTextNeedFontSize)`
  padding-left: 5px;
  padding-right: 5px;
`;

type ItemProps = {
  id: number,
  // date: number,
  title: string,
  summaryBody: string|null,
}

const AgendaItem = (props: ItemProps) => {
  const {id,title,summaryBody} = props;

  const navigation = useNavigation<NativeStackNavigationProp<MyDiaryListTabStackParamsList, "Calendar">>();

  // isFromCalendarVar 지정해서 MyDiary 에서 뒤로가기 하면 Calendar 로 오도록
  const onPressItem = () => {
    // isFromCalendarVar(true);
    fromWhere("Calendar");
    navigation.navigate("MyDiaryDrawerNav",{
      screen: 'MyDiary1',
      params: {
        id,
      },
    });
  };

  const {textColor} = useBackgroundColorAndTextColor();

  return (
    <Container
      onPress={onPressItem}
    >
      <LeftContainer>
        <Octicons name="square" size={17} color={textColor} />
      </LeftContainer>
      <CenterContainer>
        <TitleText fontSize={16}>{title}</TitleText>
        <SummaryBodyText>{summaryBody}</SummaryBodyText>
      </CenterContainer>
      {/* <View style={styles.itemButtonContainer}>
        <Button color={"grey"} title={"Info"}/>
      </View> */}
    </Container>
  );
};


// const styles = StyleSheet.create({
//   item: {
//     padding: 20,
//     // backgroundColor: "white",
//     borderBottomWidth: 1,
//     borderBottomColor: "lightgrey",
//     flexDirection: "row"
//   },
//   // itemHourText: {
//   //   color: "black"
//   // },
//   itemDurationText: {
//     color: "grey",
//     fontSize: 12,
//     marginTop: 4,
//     marginLeft: 4
//   },
//   itemTitleText: {
//     // color: "black",
//     marginLeft: 16,
//     fontWeight: "bold",
//     fontSize: 16
//   },
//   itemButtonContainer: {
//     flex: 1,
//     alignItems: "flex-end"
//   },
//   emptyItem: {
//     paddingLeft: 20,
//     height: 52,
//     justifyContent: "center",
//     borderBottomWidth: 1,
//     borderBottomColor: "lightgrey"
//   },
//   emptyItemText: {
//     color: "lightgrey",
//     fontSize: 14
//   }
// });

export default AgendaItem;