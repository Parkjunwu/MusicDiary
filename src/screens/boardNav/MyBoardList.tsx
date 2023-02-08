import { useQuery } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ListRenderItem } from "react-native";
import styled from "styled-components/native";
import SingleBoard from "../../components/boardNav/userBoardProfile/SingleUserBoard";
import { GET_MY_BOARD_LIST } from "../../gql/forCodeGen";
import useColorsChangedByDarkMode from "../../hooks/useColorsChangedByDarkMode";
import useMe from "../../hooks/useMe";
import cursorPaginationFetchMore from "../../logic/cursorPaginationFetchMore";
import { BoardTabStackParamsList } from "../../types/navigation/homeNavStackParamsList";
import { getMyBoardList, getMyBoardListVariables, getMyBoardList_getMyBoardList_boards } from "../../__generated__/getMyBoardList";

type MyBoardListProps = NativeStackScreenProps<BoardTabStackParamsList, 'MyBoardList'>;

const BoardContainer = styled.FlatList`
  flex: 1;
  background-color: ${props=>props.theme.backgroundColor};
`;

const MyBoardList = ({navigation}:MyBoardListProps) => {

  // const navigation = useNavigation<NavigateProps["navigation"]>();
  
  // useEffect(()=>{
  //   console.log("jumpTo")
  //   navigation.jumpTo('Profile');
  // },[])

  // Board 들 역시 가져옴
  const { data:userBoardData, fetchMore } = useQuery<getMyBoardList,getMyBoardListVariables>(GET_MY_BOARD_LIST,{
    // variables:{
    //   userId:user?.id,
    // },
    fetchPolicy:"cache-and-network",
    nextFetchPolicy:"cache-first",
  });

  // user 가 아직 안들어온 경우가 있어서 의존성줌 refetch
  // useEffect(()=>{
  //   if(user){
  //     getMyBoardList();
  //   }
  // },[user]);

  // infinite scroll
  const fetchMoreFn = async() => {
    await fetchMore({
      variables:{
        cursorId:userBoardData?.getMyBoardList.cursorId,
      },
    });
  };

  const onEndReached = async() => {
    await cursorPaginationFetchMore(userBoardData?.getMyBoardList,fetchMoreFn);
  };

  const { textColor } = useColorsChangedByDarkMode();

  const { data:meData } = useMe();

  const renderItem:ListRenderItem<getMyBoardList_getMyBoardList_boards> = ({item}) => <SingleBoard
    {...item}
    user={meData?.me}
    navigation={navigation}
    textColor={textColor}
  />

  return (
    <BoardContainer
      data={userBoardData?.getMyBoardList.boards}
      renderItem={renderItem}
      keyExtractor={(item:getMyBoardList_getMyBoardList_boards)=>item.id + ""}
      // numColumns={numColumns}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
    />
  );
};

export default MyBoardList;