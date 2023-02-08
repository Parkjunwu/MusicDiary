import { gql, useLazyQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { ListRenderItem } from "react-native";
import styled from "styled-components/native";
import useColorsChangedByDarkMode from "../../../hooks/useColorsChangedByDarkMode";
import cursorPaginationFetchMore from "../../../logic/cursorPaginationFetchMore";
import { BoardTabStackParamsList } from "../../../types/navigation/homeNavStackParamsList";
import { getUserBoardList, getUserBoardListVariables, getUserBoardList_getUserBoardList_boards } from "../../../__generated__/getUserBoardList";
import { seeProfile_seeProfile_user } from "../../../__generated__/seeProfile";
import SingleBoard from "./SingleUserBoard";

const GET_USER_BOARD_LIST = gql`
  query getUserBoardList($userId:Int!,$cursorId:Int) {
    getUserBoardList(userId:$userId,cursorId:$cursorId) {
      cursorId
      hasNextPage
      boards {
        id
        title
        thumbNail
        createdAt
        # 필요하면 받아
        likes
        commentNumber
        # isLiked
      }
      error
    }
  }
`;


type NavigateProps = NativeStackScreenProps<BoardTabStackParamsList, 'UserBoardProfile'>;

const BoardContainer = styled.FlatList`
  flex: 1;
  background-color: ${props=>props.theme.backgroundColor};
`;

const UserBoardFlatList = ({user}:{user:seeProfile_seeProfile_user}) => {

  const navigation = useNavigation<NavigateProps["navigation"]>();
  
  // useEffect(()=>{
  //   console.log("jumpTo")
  //   navigation.jumpTo('Profile');
  // },[])

  // Board 들 역시 가져옴
  const [getUserBoardList,{data:userBoardData,fetchMore}] = useLazyQuery<getUserBoardList,getUserBoardListVariables>(GET_USER_BOARD_LIST,{
    variables:{
      userId:user?.id,
    },
    fetchPolicy:"cache-and-network",
    nextFetchPolicy:"cache-first",
  });

  // user 가 아직 안들어온 경우가 있어서 의존성줌 refetch
  useEffect(()=>{
    if(user){
      getUserBoardList();
    }
  },[user]);

  // infinite scroll
  const fetchMoreFn = async() => {
    await fetchMore({
      variables:{
        cursorId:userBoardData?.getUserBoardList.cursorId,
      },
    });
  };

  const onEndReached = async() => {
    await cursorPaginationFetchMore(userBoardData?.getUserBoardList,fetchMoreFn);
  };

  const {textColor} = useColorsChangedByDarkMode();

  const renderItem:ListRenderItem<getUserBoardList_getUserBoardList_boards> = ({item}) => <SingleBoard
    {...item}
    user={user}
    navigation={navigation}
    textColor={textColor}
  />

  return (
    <BoardContainer
      data={userBoardData?.getUserBoardList.boards}
      renderItem={renderItem}
      keyExtractor={(item:getUserBoardList_getUserBoardList_boards)=>item.id + ""}
      // numColumns={numColumns}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
    />
  );
};

export default UserBoardFlatList;