import { gql, useLazyQuery } from "@apollo/client";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { ListRenderItem, useWindowDimensions } from "react-native";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import useIsDarkMode from "../../hooks/useIsDarkMode";
import RootNavStackParamsList from "../../types/navigation/rootNavStackParamsList";
import { getNotifiedBoard, getNotifiedBoardVariables } from "../../__generated__/getNotifiedBoard";
import BoardFooterComponent from "../../components/boardNav/board/BoardFooterComponent";
import BoardHeaderComponent from "../../components/boardNav/board/BoardHeaderComponent";
import BoardVideoOrImage from "../../components/boardNav/board/BoardVideoOrImage";
import BodyText from "../../components/myDiary/BodyText";
import PushNotificationBoardFooterComponent from "../../components/rootNav/pushNotificationBoard/PushNotificationBoardFooterComponent";
import PushNotificationBoardListEmptyComponent from "../../components/rootNav/pushNotificationBoard/PushNotificationBoardListEmptyComponent";

const GET_NOTIFIED_BOARD = gql`
  query getNotifiedBoard(
    $boardId:Int!
  ) {
    getNotifiedBoard(
      boardId:$boardId
    ) {
      board {
        id
        user {
          id
          userName
          avatar
        }
        title
        body
        file
        createdAt
        # 얘네를 여기서 받아야 캐시 업데이트가 됨. route 로 받으면 받고 나서 업데이트 안됨.
        isMine
        likes
        commentNumber
        isLiked
      }
      error
    }
  }
`;

// UI 는 board 랑 비슷
const PushNotificationBoard = ({navigation,route}:NativeStackScreenProps<RootNavStackParamsList,"PushNotificationBoard">) => {

  const boardId = route.params.boardId;
  const commentId = route.params.commentId;
  const commentOfCommentId = route.params.commentOfCommentId;

  const [getNotifiedBoard,{data:boardData,loading,refetch:boardRefetch}] = useLazyQuery<getNotifiedBoard,getNotifiedBoardVariables>(GET_NOTIFIED_BOARD,{
    variables:{
      boardId,
    },
    fetchPolicy:"cache-and-network",
    nextFetchPolicy:"cache-first",
  });

  useEffect(()=>{
    if(!commentId){
      getNotifiedBoard();
    }
  },[boardId]);

  const { width:windowWidth } = useWindowDimensions();

  const isDarkMode = useIsDarkMode();

  const sortedData = boardData?.getNotifiedBoard.board?.body.map((bodyString,index) => ({body:bodyString,file:boardData.getNotifiedBoard.board.file[index]}));

  const renderItem:ListRenderItem<{body?:string,file?:string}> = ({item,index}) => {
    const file = item.file;
    const body = item.body;
    const fileWidth = windowWidth - 20;
    return (
      <>
        {body !== "" && <BodyText
          index={index}
          fontSize={16}
        >{body}</BodyText>}
        {file && <BoardVideoOrImage uri={file} fileWidth={fileWidth} />}
      </>
    );
  };

  return (
    <KeyboardAwareFlatList
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? "black" : "white",
        padding: 10,
      }}
        data={sortedData}
        renderItem={renderItem}
        keyExtractor={(item,index)=>index+""}
        // ListFooterComponent 만 빼기 그래서 걍 다 props에 집어넣음
        ListEmptyComponent={
          <PushNotificationBoardListEmptyComponent
            loading={loading}
            boardRefetch={boardRefetch}
          />
        }
        ListHeaderComponent={
          boardData ?
            <BoardHeaderComponent {...boardData.getNotifiedBoard.board}/>
          :
            null
        }
        // ListFooterComponent 를 따로 빼내면 게시물 보기 누를때 댓글이 날라감.
        ListFooterComponent={
          commentId ?
            <PushNotificationBoardFooterComponent
              boardId={boardId}
              commentId={commentId}
              commentOfCommentId={commentOfCommentId}
              {...boardData?.getNotifiedBoard.board}
            />
            :
            <BoardFooterComponent
              {...boardData?.getNotifiedBoard.board}
            />
        }
    />
  );
};

export default PushNotificationBoard;