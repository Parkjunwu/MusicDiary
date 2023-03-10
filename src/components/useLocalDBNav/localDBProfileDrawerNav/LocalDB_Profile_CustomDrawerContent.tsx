import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { Alert } from "react-native";
// import EncryptedStorage from "react-native-encrypted-storage";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";
import useIsDarkMode from "../../../hooks/useIsDarkMode";
import useMaterialTabGetInnerLayoutHeight from "../../../hooks/useMaterialTabGetInnerLayoutHeight";
// import { allRealmDiariesVar } from "../../../apollo";
// import { getRealmAllDiaries } from "../../../realm";
import { LocalProfileListTabStackParamsList } from "../../../types/navigation/homeNavStackParamsList";
import PressableItemNeedOnPressAndText from "../../myDiaryDrawerNav/PressableItemNeedOnPressAndText";
import ScrollViewWithoutBounce from "../../shared/ScrollViewWithoutBounce";
import GoToAuthBtn from "./localDB_Profile_CustomDrawerContent/GoToAuthBtn";

const ForBackgroundColorContainer = styled.View<{isDarkMode:boolean}>`
  ${props=>props.isDarkMode ? "background-color: rgb(60,60,60)" : ""}
  flex: 1;
`;
// const Container = styled.View<{marginTop:number}>`
//   margin: ${props=>props.marginTop}px 15px 10px 15px;
//   /* background-color: red; */
//   flex: 1;
//   justify-content: space-between;
// `;
const Container = styled.View<{marginTop:number,minHeight:number}>`
  margin: ${props=>props.marginTop}px 15px 10px 15px;
  flex: 1;
  min-height: ${props=>props.minHeight}px;
`;
const OptionBtnContainer = styled.View`

`;
const DivideLine = styled.View`
  height: 1px;
  background-color: rgba(192,192,192,0.7);
`;

type Profile_CustomDrawerContentType = {
  
};

type ThisNavigationProp = NativeStackNavigationProp<LocalProfileListTabStackParamsList>;

const LocalDB_Profile_CustomDrawerContent = ({
  
}:Profile_CustomDrawerContentType) => {

  const {top} = useSafeAreaInsets();
  const navigation = useNavigation<ThisNavigationProp>();

  // const isDarkMode = useIsDarkMode();

  // const onPressSetPassword = async () => {
  //   const storedPassword = await EncryptedStorage.getItem(APP_PASSWORD);
  //   // console.log("storedPassword  : "+storedPassword)
  //   navigation.navigate(storedPassword ? "CheckAppPassword" : "SettingAppPassword");
  // };

  // const onPressSyncDiaries = async() => {
  //   await getRealmAllDiaries();
  //   const allDiaryNumber = allRealmDiariesVar().length;
  //   if(allDiaryNumber === 0) {
  //     return Alert.alert("?????? ????????? ????????? ????????? ????????????.");
  //   }
  //   navigation.navigate("SyncDiaries",{
  //     allDiaryNumber,
  //   });
  // };

  // ???????????? ??????
  // ?????? ??????
  // ????????? ?????? / ?????? ?????? ?????? / ????????????
  // ?????? ?????????
  // ?????? ????????? ??????
  // ???????????? ????????? ?????????
  // ????????????
  // ????????????

  const minHeight = useMaterialTabGetInnerLayoutHeight();
  const isDarkMode = useIsDarkMode();

  return (
    <ScrollViewWithoutBounce>
      <ForBackgroundColorContainer isDarkMode={isDarkMode}>
        <Container marginTop={top} minHeight={minHeight}>
          <OptionBtnContainer>
            <PressableItemNeedOnPressAndText
              onPress={()=>navigation.navigate("FontChange")}
              text={"?????? ??????"}
            />
            <DivideLine/>
            <PressableItemNeedOnPressAndText
              // ???????????? ????????? ???????????? SettingAppPassword / CheckPassword ??? ??????
              // onPress={onPressSetPassword}
              // text={"??? ???????????? ??????"}
              onPress={()=>navigation.navigate("Security")}
              text={"??????"}
            />
            <DivideLine/>
            <PressableItemNeedOnPressAndText
              onPress={()=>navigation.navigate("SettingQuote")}
              text={"?????? ??????"}
            />
            <DivideLine/>
            {/* <PressableItemNeedOnPressAndText
              onPress={onPressSyncDiaries}
              text={"?????? ?????????"}
            />
            <DivideLine/> */}
            <PressableItemNeedOnPressAndText
              onPress={()=>navigation.navigate("SettingPushNotification")}
              text={"??? ?????? ??????"}
            />
            <DivideLine/>
            <PressableItemNeedOnPressAndText
              onPress={()=>navigation.navigate("RequestEmailToAdministrator")}
              text={"???????????? ????????? ?????????"}
            />
            <DivideLine/>
            {/* <PressableItemNeedOnPressAndText
              onPress={()=>navigation.navigate("AboutAccount")}
              text={"?????? ??????"}
            />
            <DivideLine/> */}
          </OptionBtnContainer>
          {/* <LogOutBtn/> */}
          {/* ????????? ?????? ??????????????? */}
          <GoToAuthBtn/>
        </Container>
      </ForBackgroundColorContainer>
    </ScrollViewWithoutBounce>
  );
};

export default LocalDB_Profile_CustomDrawerContent;
