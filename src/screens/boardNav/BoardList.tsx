import { FlatList, ListRenderItem } from "react-native";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { seeNewBoardList, seeNewBoardListVariables, seeNewBoardList_seeNewBoardList_boards } from "../../__generated__/seeNewBoardList";
import BoardSummary from "../../components/boardNav/BoardSummary";
import cursorPaginationFetchMore from "../../logic/cursorPaginationFetchMore";
import GoToSearchBoardBtn from "../../components/boardNav/boardList/GoToSearchBoardBtn";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BoardTabStackParamsList } from "../../types/navigation/homeNavStackParamsList";
import BaseContainer from "../../components/shared/BaseContainer";
import { SEE_NEW_BOARD_LIST } from "../../gql/forCodeGen";

type NewBoardListProps = NativeStackScreenProps<BoardTabStackParamsList,"BoardDrawerNav">;

const NewBoardList = ({navigation}:NewBoardListProps) => {

  useEffect(()=>{
    navigation.setOptions({
    // SearchTab 말고 Search 따로 빼서 거기로 가게
      headerLeft:({tintColor})=><GoToSearchBoardBtn
        tintColor={tintColor + ""}
        navigation={navigation}
      />,
      // headerRight:()=><GoToUploadBoardBtn
      //   navigation={navigation}
      // />
    });
  },[]);

  const { loading, error, data, refetch, fetchMore } = useQuery<seeNewBoardList,seeNewBoardListVariables>(SEE_NEW_BOARD_LIST, {
    // fetchPolicy: 'network-only', 이 pagination 에 걸릴 수 있음. 만약 그러면 걍 refetch.
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });

  // useEffect(()=>{
  //   refetch();
  // },[])
  
  // const quoteWord = randomGoodWord.quote;
  // const quotePersonName = randomGoodWord.name;

  const [refreshing,setRefreshing] = useState(false);
  const onRefresh = async() => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  // infinite scroll
  const fetchMoreFn = async() => {
    await fetchMore({
      variables:{
        cursorId:data?.seeNewBoardList.cursorId,
      },
    });
  };
  const onEndReached = async() => {
    await cursorPaginationFetchMore(data?.seeNewBoardList,fetchMoreFn);
  };

  const renderItem:ListRenderItem<seeNewBoardList_seeNewBoardList_boards> = ({item}) => {
    return <BoardSummary {...item} />
  };
  
  return (
    <BaseContainer>
      <FlatList
        style={{flex: 9}}
        data={data?.seeNewBoardList.boards}
        renderItem={renderItem}
        keyExtractor={(item:seeNewBoardList_seeNewBoardList_boards)=>item.id+""}
        onRefresh={onRefresh}
        refreshing={refreshing}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
      />
      {/* <QuoteContainer>
        <Quote>
          <QuoteWordText>
            {quoteWord}
          </QuoteWordText>
          <QuotePersonNameText>
            - {quotePersonName}
          </QuotePersonNameText>
        </Quote>
      </QuoteContainer> */}
    </BaseContainer>
  );
};

export default NewBoardList;