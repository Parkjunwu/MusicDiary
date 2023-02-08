import { ListRenderItem } from "react-native";
import { useWindowDimensions } from 'react-native';
import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { seeBoard, seeBoardVariables } from "../../__generated__/seeBoard";
import BoardDropDown from "../../components/boardNav/board/BoardDropDown";
import BoardLoading from "../../components/boardNav/board/BoardLoading";
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import useColorsChangedByDarkMode from "../../hooks/useColorsChangedByDarkMode";
import BodyText from "../../components/myDiary/BodyText";
import BoardHeaderComponent from "../../components/boardNav/board/BoardHeaderComponent";
import BoardFooterComponent from "../../components/boardNav/board/BoardFooterComponent";
import BoardVideoOrImage from "../../components/boardNav/board/BoardVideoOrImage";
import { BoardTabStackParamsList } from "../../types/navigation/homeNavStackParamsList";
import { isLoggedInVar } from "../../apollo";

const SEE_BOARD = gql`
  query seeBoard($id: Int!) {
    seeBoard(id: $id) {
      id
      # 유저 정보는 걍 List 에서 상속받으면 될듯
      # user
      body
      file
      title # 여기서 받아야 수정했을 때 반영됨..
      # createdAt
      # 얘네를 여기서 받아야 캐시 업데이트가 됨. route 로 받으면 받고 나서 업데이트 안됨.
      isMine
      likes
      commentNumber
      isLiked
      # comments
      # accused
    }
  }
`;

const Board = ({navigation,route}:NativeStackScreenProps<BoardTabStackParamsList,"Board">) => {

  // 이게 navigate 로 param 받은거라 캐시 업데이트가 안됨. 여기서 또 받든지 아님 캐시에서 받든지 근데 캐시에서 받은 애를 또 state 에 넣으니까 똑같이 또 안받아져. 걍 여기서 받자
  // const id = route.params.id;
  const title = route.params.title;
  // const isLiked = route.params.isLiked;
  const createdAt = route.params.createdAt;
  const user = route.params.user;
  // const likes = route.params.likes;
  // const commentNumber = route.params.commentNumber;

  useEffect(()=>{
    navigation.setOptions({
      title,
    });
  },[]);

  const { loading, error, data } = useQuery<seeBoard,seeBoardVariables>(SEE_BOARD, {
    // fetchPolicy: 'network-only', 이 pagination 에 걸릴 수 있음. 만약 그러면 걍 refetch. 얘는 근데 pagination 안쓰니 괜찮을듯.
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-first',
    variables: {
      id: route.params.id,
    },
  });
  // console.log(data)
  
  useEffect(()=>{
    if(data){
      const boardInfo = data.seeBoard;
      boardInfo && navigation.setOptions({
        headerRight:()=>isLoggedInVar() && <BoardDropDown
          boardId={boardInfo.id}
          isMine={boardInfo.isMine}
          file={boardInfo.file}
          body={boardInfo.body}
          title={boardInfo.title}
        />,
        title:boardInfo.title,
      });
    }
  },[data]);
  
  const { width:windowWidth } = useWindowDimensions();

  const { backgroundColor } = useColorsChangedByDarkMode();

  if(loading) {
    return <BoardLoading {...route.params} />;
  }

  const seeBoardData = data?.seeBoard;
  const sortedData = seeBoardData?.body.map((bodyString,index) => ({body:bodyString,file:seeBoardData.file[index]}));


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
        backgroundColor,
        padding: 10,
      }}
        data={sortedData}
        renderItem={renderItem}
        keyExtractor={(item,index)=>index+""}
        // ListHeaderComponent={<BoardHeaderComponent {...seeBoardData} title={title} user={user} createdAt={createdAt} />} // title 수정하면 반영이 안되서
        ListHeaderComponent={<BoardHeaderComponent {...seeBoardData} user={user} createdAt={createdAt} />}
        ListFooterComponent={<BoardFooterComponent {...seeBoardData} user={user} />}
    />
  );
};

export default Board;