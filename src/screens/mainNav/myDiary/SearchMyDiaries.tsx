import React, { useState } from "react";
import { FlatList, ListRenderItem, TouchableOpacity, useWindowDimensions } from "react-native";
import styled from "styled-components/native";
import Ionicons from "react-native-vector-icons/Ionicons";
// import { SafeAreaView } from 'react-native-safe-area-context';
import { gql, useLazyQuery } from "@apollo/client";
import DismissKeyboard from "../../../components/shared/DismissKeyboard";
import cursorPaginationFetchMore from "../../../logic/cursorPaginationFetchMore";
import DiarySummary from "../../../components/myDiaryList/DiarySummary";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MyDiaryListTabStackParamsList } from "../../../types/navigation/homeNavStackParamsList";
import { searchMyDiaries, searchMyDiariesVariables, searchMyDiaries_searchMyDiaries_diaries } from "../../../__generated__/searchMyDiaries";
import { FontAppliedBaseTextInputNeedFontSize } from "../../../styled-components/FontAppliedComponents";
import { fromWhere } from "../../../apollo";
import useColorsChangedByDarkMode from "../../../hooks/useColorsChangedByDarkMode";

const SEARCH_MY_DIARIES = gql`
  query searchMyDiaries($keyword:String!,$cursorId:Int) {
    searchMyDiaries(keyword:$keyword,cursorId:$cursorId) {
      cursorId
      hasNextPage
      diaries{
        id
        title
        # createdAt
        thumbNail
        dateTime
      }
      error
    }
  }
`;

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

type SearchMyDiariesProps = NativeStackScreenProps<MyDiaryListTabStackParamsList, 'SearchMyDiaries'>;

const SearchMyDiaries = ({navigation}:SearchMyDiariesProps) => {
  const {width} = useWindowDimensions();
  // const isDarkMode = useIsDarkMode();
  const [value,setValue] = useState("");

  const [searchMyDiaries,{data,fetchMore}] = useLazyQuery<searchMyDiaries,searchMyDiariesVariables>(SEARCH_MY_DIARIES,{
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  // ????????? ????????? ?????? ?????? ?????? ?????????. refetch ?????? ????????? ????????????. ????????? ?????????? ?????? ?????? ??? ???????
  const onVaild = async() => {
    await searchMyDiaries({
      variables:{
        keyword:value,
      },
    });
  };


  // ?????????????????? StatusBar ??? ??????. ????????? ????????? ????????? ???????????????
  // ?????? ??????????????????. ????????? StatusBar ?????? ?????? ???????????? ????????? ???????????? ?????????.
  // const statusBarHeight = StatusBar.currentHeight + 15;

  const setFromWhere = () => fromWhere("SearchMyDiaries");

  const renderItem:ListRenderItem<searchMyDiaries_searchMyDiaries_diaries> = ({item}) => {
    return <DiarySummary
      {...item}
      setFromWhere={setFromWhere}
    />
  };

  // infinite scroll
  const fetchMoreFn = async() => {
    if(data?.searchMyDiaries.hasNextPage) {
      await fetchMore({
        variables:{
          cursorId:data.searchMyDiaries.cursorId,
        },
      });
    }
  };

  const onEndReached = async() => {
    await cursorPaginationFetchMore(data?.searchMyDiaries,fetchMoreFn);
  };

  const {textColor,placeholderTextColor} = useColorsChangedByDarkMode();

  return (
  <WholeContainer>
    <DismissKeyboard>
      {/* <SafeAreaView style={{flex:1}}>
        {Platform.OS === "android" && <AndroidAvoidStatusBar height={statusBarHeight} />}

        <OptionContainer>
          <GoBackBtn onPress={navigation.goBack}>
            <Ionicons name="chevron-back" size={28} color={textColor} />
          </GoBackBtn>
        </OptionContainer> */}
        <>
        <HeaderContainer>
          <HeaderSearch width={width}>
            <TouchableOpacity onPress={onVaild}>
              <Ionicons name="search" size={30} color={textColor} />
            </TouchableOpacity>
            <HeaderInput
              fontSize={18}
              // placeholder={"?????? ??????"}
              placeholder={"???????????? ????????? ?????????."}
              placeholderTextColor={placeholderTextColor}
              autoCapitalize="none"
              returnKeyType="search"
              onChangeText={text => setValue(text)}
              autoCorrect={false}
              onSubmitEditing={onVaild}
            />
          </HeaderSearch>
        </HeaderContainer>

        <FlatList
          data={data?.searchMyDiaries.diaries}
          keyExtractor={(item)=>item?.id + ""}
          renderItem={renderItem}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
        />
        </>
      {/* </SafeAreaView> */}
    </DismissKeyboard>
  </WholeContainer>
  );
}
export default SearchMyDiaries;