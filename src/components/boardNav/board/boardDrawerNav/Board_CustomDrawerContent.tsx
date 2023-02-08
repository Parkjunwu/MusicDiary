import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";
import useIsDarkMode from "../../../../hooks/useIsDarkMode";
import useMaterialTabGetInnerLayoutHeight from "../../../../hooks/useMaterialTabGetInnerLayoutHeight";
import { BoardTabStackParamsList } from "../../../../types/navigation/homeNavStackParamsList";
import PressableItemNeedOnPressAndText from "../../../myDiaryDrawerNav/PressableItemNeedOnPressAndText";
import ScrollViewWithoutBounce from "../../../shared/ScrollViewWithoutBounce";

const ForBackgroundColorContainer = styled.View<{isDarkMode:boolean}>`
  ${props=>props.isDarkMode ? "background-color: rgb(60,60,60)" : ""}
  flex: 1;
`;
const Container = styled.View<{marginTop:number,minHeight:number}>`
  margin: ${props=>props.marginTop}px 15px 10px 15px;
  flex: 1;
  /* justify-content: space-between; */
  min-height: ${props=>props.minHeight}px;
`;
const OptionBtnContainer = styled.View`

`;
const DivideLine = styled.View`
  height: 1px;
  background-color: rgba(192,192,192,0.7);
`;

// type Board_CustomDrawerContentType = {
  
// };

type ThisNavigationProp = NativeStackNavigationProp<BoardTabStackParamsList>;

const Board_CustomDrawerContent = () => {

  const {top} = useSafeAreaInsets();
  const navigation = useNavigation<ThisNavigationProp>();

  const minHeight = useMaterialTabGetInnerLayoutHeight();
  // console.log("Profile Drawer minHeight "+ minHeight)
  const isDarkMode = useIsDarkMode();

  return (
    <ScrollViewWithoutBounce>
      <ForBackgroundColorContainer isDarkMode={isDarkMode}>
        <Container marginTop={top} minHeight={minHeight}>
          <OptionBtnContainer>
            <PressableItemNeedOnPressAndText
              onPress={()=>navigation.navigate("UploadBoard")}
              text={"글 작성"}
            />
            <DivideLine/>
            <PressableItemNeedOnPressAndText
              onPress={()=>navigation.navigate("MyBoardList")}
              text={"내 게시물 목록"}
            />
            <DivideLine/>
          </OptionBtnContainer>
        </Container>
      </ForBackgroundColorContainer>
    </ScrollViewWithoutBounce>
  );
};

export default Board_CustomDrawerContent;
