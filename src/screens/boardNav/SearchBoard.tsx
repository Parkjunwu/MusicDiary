import React, { useState } from "react";
import { FlatList, ListRenderItem, TouchableOpacity, useWindowDimensions, View } from "react-native";
import styled from "styled-components/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { gql, useLazyQuery } from "@apollo/client";
import cursorPaginationFetchMore from "../../logic/cursorPaginationFetchMore";
import DismissKeyboard from "../../components/shared/DismissKeyboard";
import useColorsChangedByDarkMode from "../../hooks/useColorsChangedByDarkMode";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BoardTabStackParamsList } from "../../types/navigation/homeNavStackParamsList";
import BoardSummary from "../../components/boardNav/BoardSummary";
import { searchBoards, searchBoardsVariables, searchBoards_searchBoards_boards } from "../../__generated__/searchBoards";
import { FontAppliedBaseTextInputNeedFontSize } from "../../styled-components/FontAppliedComponents";

const SEARCH_BOARDS = gql`
  query searchBoards($keyword:String!,$cursorId:Int) {
    searchBoards(keyword:$keyword,cursorId:$cursorId) {
      cursorId
      hasNextPage
      boards{
        id
        user{
          id
          userName
          avatar
        }
        title
        createdAt
        thumbNail
        likes
        commentNumber
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
const HeaderSearch = styled.View<{width:number}>`
  background-color: ${props => props.theme.textInputBackgroundColor};
  padding: 10px 10px;
  border-radius: 25px;
  flex-direction: row;
  align-items: center;
  width: ${props=>props.width-30}px;
`;
// const HeaderInput = styled.TextInput`
const HeaderInput = styled(FontAppliedBaseTextInputNeedFontSize)`
  /* font-size: 20px; */
  width: 80%;
  color: ${props=>props.theme.textColor};
  margin-left: 4px;
`;

type SearchBoardProps = NativeStackScreenProps<BoardTabStackParamsList,"SearchBoard">;

const SearchBoard = ({navigation}:SearchBoardProps) => {

  const {width} = useWindowDimensions();
  
  const [value,setValue] = useState("");

  const [searchBoards,{data,fetchMore}] = useLazyQuery<searchBoards,searchBoardsVariables>(SEARCH_BOARDS,{
    fetchPolicy:"network-only"
  });

  const onVaild = async() => {
    await searchBoards({
      variables:{
        keyword:value,
      },
    });
  };


  // 안드로이드는 StatusBar 에 겹쳐. 그래서 얘보다 아래에 렌더링되게
  // 얘가 왔다갔다하네. 언제는 StatusBar 보다 밑에 그려지고 언제는 무시하고 그려짐.
  // const statusBarHeight = (StatusBar.currentHeight ?? 0) + 15;

  const renderItem:ListRenderItem<searchBoards_searchBoards_boards> = ({item}) => {
    return <BoardSummary {...item} />
  };

  // infinite scroll
  const fetchMoreFn = async() => {
    if(data?.searchBoards.hasNextPage) {
      await fetchMore({
        variables:{
          cursorId:data.searchBoards.cursorId,
        },
      });
    }
  };

  const onEndReached = async() => {
    await cursorPaginationFetchMore(data?.searchBoards,fetchMoreFn);
  };

  const {textColor,placeholderTextColor} = useColorsChangedByDarkMode();

  return (
  <WholeContainer>
    <DismissKeyboard>
      <View style={{flex:1}}>
        <HeaderContainer>
          <HeaderSearch width={width}>
            <TouchableOpacity onPress={onVaild}>
              <Ionicons name="search" size={30} color={textColor} />
            </TouchableOpacity>
            <HeaderInput
              fontSize={18}
              placeholder={"키워드를 입력해 주세요."}
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
          data={data?.searchBoards.boards}
          keyExtractor={(item)=>item?.id + ""}
          renderItem={renderItem}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
        />
      </View>
    </DismissKeyboard>
  </WholeContainer>
  );
}
export default SearchBoard;