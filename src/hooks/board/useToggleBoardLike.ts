import { gql, useMutation } from "@apollo/client";
import { Alert } from "react-native";
import { isLoggedInVar } from "../../apollo";

const TOOGLE_BOARD_LIKE = gql`
  mutation toggleBoardLike($id:Int!) {
    toggleBoardLike(id:$id) {
      ok
      error
    }
  }
`;

const useToggleBoardLike = (boardId:number) => {
  const [toggleBoardLike] = useMutation(TOOGLE_BOARD_LIKE,{
    variables:{
      id:boardId,
    },
    update:(cache,result) => {
      const resultData = result.data?.toggleBoardLike;
      const ok = resultData.ok;
      const error = resultData.error;
      if(result.data?.toggleBoardLike.ok) {
        const id = `Board:${boardId}`;

        const prevBoardCache: {isLiked:boolean,likes:number} | null =
        cache.readFragment({
          id,
          fragment: gql`
            fragment PrevBoard on Board {
              isLiked
              likes
            }
          `
        });

        if(!prevBoardCache) return; // 타입체크

        const prevLikes = prevBoardCache.likes;
        const prevIsLiked = prevBoardCache.isLiked;

        cache.modify({
          id,
          fields:{
            isLiked() {
              return !prevIsLiked;
            },
            likes() {
              return prevIsLiked ? prevLikes-1 : prevLikes+1;
            },
          },
        });
      } else {
        return Alert.alert(error);
      }
    },
  });

  const toggleBoardLikeFn = () => isLoggedInVar() ? toggleBoardLike() : Alert.alert("로그인 후 이용 가능합니다.")

  return toggleBoardLikeFn;
};

export default useToggleBoardLike;