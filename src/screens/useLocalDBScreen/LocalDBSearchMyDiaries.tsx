import React, { useState } from "react";
import { FlatList, ListRenderItem, TouchableOpacity, useWindowDimensions } from "react-native";
import styled from "styled-components/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import DismissKeyboard from "../../components/shared/DismissKeyboard";
import DiarySummary from "../../components/myDiaryList/DiarySummary";
import useIsDarkMode from "../../hooks/useIsDarkMode";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MyDiaryListTabStackParamsList } from "../../types/navigation/homeNavStackParamsList";
import { FontAppliedBaseTextInputNeedFontSize } from "../../styled-components/FontAppliedComponents";
import { fromWhere } from "../../apollo";
import { searchDiaries } from "../../realm";
import { realmDiaryType } from "../../types/realm/realmDiaryType";

const WholeContainer = styled.View`
  flex:1;
  background-color: ${props => props.theme.backgroundColor};
`;
// const SafeAreaView = styled.SafeAreaView`
//   flex:1;
// `;
// const AndroidAvoidStatusBar = styled.View<{height:number}>`
//   height: ${props=>props.height}px;
// `;
const HeaderContainer = styled.View`
  background-color: ${props => props.theme.backgroundColor};
  align-items: center;
  margin-bottom: 10px;
`;

// const OptionContainer = styled.View`
//   flex-direction: row;
// `;
// const GoBackBtn = styled.TouchableOpacity`
//   flex: 1;
//   /* margin-left: 10px; */
// `;
const HeaderSearch = styled.View<{width:number}>`
  background-color: ${props => props.theme.textInputBackgroundColor};
  padding: 10px 10px;
  border-radius: 25px;
  flex-direction: row;
  align-items: center;
  width: ${props=>props.width-30}px;
`;
// const HeaderInput = styled.TextInput`
//   font-size: 20px;
//   width: 80%;
//   color: ${props=>props.theme.textColor};
//   margin-left: 4px;
// `;
const HeaderInput = styled(FontAppliedBaseTextInputNeedFontSize)`
  /* font-size: 18px; */
  width: 80%;
  margin-left: 4px;
`;

type LocalDBSearchMyDiariesProps = NativeStackScreenProps<MyDiaryListTabStackParamsList, 'SearchMyDiaries'>;

const LocalDBSearchMyDiaries = ({navigation}:LocalDBSearchMyDiariesProps) => {
  const {width} = useWindowDimensions();
  const isDarkMode = useIsDarkMode();
  const [keyword,setKeyword] = useState("");

  const [data,setData] = useState<realmDiaryType[]>([]);

  // ?????? {diary, which, stringIndex} ????????? ??????. which, stringIndex ??? ?????? ?????? ????????? ?????? ???.
  const onVaild = () => setData(searchDiaries(keyword).map(diaryInfo => diaryInfo.diary));


  // ?????????????????? StatusBar ??? ??????. ????????? ????????? ????????? ???????????????
  // ?????? ??????????????????. ????????? StatusBar ?????? ?????? ???????????? ????????? ???????????? ?????????.
  // const statusBarHeight = StatusBar.currentHeight + 15;

  const setFromWhere = () => fromWhere("SearchMyDiaries");

  const renderItem:ListRenderItem<realmDiaryType> = ({item}) => {
    // ?????? ????????? ???????????? ???.
    return <DiarySummary
      {...item}
      setFromWhere={setFromWhere}
    />
  };

  return (
  <WholeContainer>
    <DismissKeyboard>
      {/* <SafeAreaView style={{flex:1}}>
        {Platform.OS === "android" && <AndroidAvoidStatusBar height={statusBarHeight} />}

        <OptionContainer>
          <GoBackBtn onPress={navigation.goBack}>
            <Ionicons name="chevron-back" size={28} color={isDarkMode ? "white" : "black" } />
          </GoBackBtn>
        </OptionContainer> */}
        <>
        <HeaderContainer>
          <HeaderSearch width={width}>
            <TouchableOpacity onPress={onVaild}>
              <Ionicons name="search" size={30} color={isDarkMode ? "white" : "black" } />
            </TouchableOpacity>
            <HeaderInput
              fontSize={18}
              // placeholder={"?????? ??????"}
              placeholder={"????????? ??????"}
              placeholderTextColor={isDarkMode ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"}
              autoCapitalize="none"
              returnKeyType="search"
              value={keyword}
              onChangeText={text => setKeyword(text)}
              autoCorrect={false}
              onSubmitEditing={onVaild}
            />
          </HeaderSearch>
        </HeaderContainer>

        <FlatList
          data={data}
          keyExtractor={(item)=>item.id + ""}
          renderItem={renderItem}
        />
        </>
      {/* </SafeAreaView> */}
    </DismissKeyboard>
  </WholeContainer>
  );
}
export default LocalDBSearchMyDiaries;