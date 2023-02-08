import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import { DELETE_BOARD } from "../../gql/manyWriteQuery";
import { deleteBoard, deleteBoardVariables } from "../../__generated__/deleteBoard";

const useDeleteBoard = (boardId:number) => {

  const navigation = useNavigation();

  const [deleteBoard] = useMutation<deleteBoard,deleteBoardVariables>(DELETE_BOARD,{
    variables:{
      id:boardId,
    },
    update:(cache,data)=>{
      if(data.data?.deleteBoard.ok){
        cache.evict({ id: `Board:${boardId}` });
        // cache.gc();
        navigation.goBack();
        Alert.alert("삭제가 완료되었습니다.",undefined,[
          {
            text:"확인",
          }
        ]);
      } else if (data.data?.deleteBoard.error === "post not found") {
        Alert.alert("존재하지 않는 게시물입니다.","같은 오류가 지속적으로 발생 시 문의 주시면 감사드리겠습니다.",[
          {
            text:"확인",
          }
        ]);
      } else if (data.data?.deleteBoard.error === "Not authorized") {
        Alert.alert("다른 유저의 게시물을 삭제할 수 없습니다.",undefined,[
          {
            text:"확인",
          }
        ]);
      }
    }
  });

  return deleteBoard;
};

export default useDeleteBoard;