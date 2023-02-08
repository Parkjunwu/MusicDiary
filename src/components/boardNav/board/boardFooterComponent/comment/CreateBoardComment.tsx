import { ApolloCache, DefaultContext, gql, MutationUpdaterFunction, useMutation } from "@apollo/client";
import { useState } from "react";
import { Alert } from "react-native";
import { UpdateSeeBoardCommentsQueryType } from "../../../../../types/board/updateQueryType";
// import { isAndroid } from "../../../../../utils";
import { createBoardComment, createBoardCommentVariables } from "../../../../../__generated__/createBoardComment";
import { CommentInput, CreateCommentBtn, CreateCommentBtnText, CreateCommentContainer } from "./CreateCommentStyledComponents";

const CREATE_BOARD_COMMENT = gql`
  mutation createBoardComment(
    $payload: String!
    $boardId: Int!
  ) {
    createBoardComment(
      payload: $payload
      boardId: $boardId
    ) {
      ok
      error
      totalCommentsNumber
      offsetComments {
        id
        user {
          id
          userName
          avatar
        }
        payload
        createdAt
        isMine
        totalLikes
        totalCommentOfComments
        isLiked
      }
    }
  }
`;


type CreateBoardCommentProps = {
  boardId: number;
  disabled: boolean;
  placeholder: string;
  // userWhichWriting: string | { userName: string };
  // setUserWhichWriting: React.Dispatch<React.SetStateAction<string | { userName: string}>>;
  updateSeeBoardCommentsQuery:(props:UpdateSeeBoardCommentsQueryType) => void;
  setNowCommentsBundleNumber:React.Dispatch<React.SetStateAction<number>>
};

const CreateBoardComment = ({boardId,disabled,placeholder,updateSeeBoardCommentsQuery,setNowCommentsBundleNumber}:CreateBoardCommentProps) => {

  const [comment,setComment] = useState("");

  // const meRef = useGetMeRef();
  // const {data:meData} = useMe();
  
  const updateCreateBoardComment:MutationUpdaterFunction<createBoardComment, createBoardCommentVariables, DefaultContext, ApolloCache<any>> = (cache,result) => {
    const resultData = result.data.createBoardComment;
    if(resultData.ok) {
      // 캐시변경
      // const uploadedBoardCommentId = resultData.id;

      // let prevCommentNumber;

      // cache.modify({
      //   id:`Board:${boardId}`,
      //   fields:{
      //     commentNumber(prev){
      //       prevCommentNumber = prev;
      //       return prev+1;
      //     },
      //   },
      // });

      // const newCacheData: seeBoardComments_seeBoardComments_comments = {
      //   __typename: "BoardComment",
      //   createdAt: new Date().getTime() + "",
      //   id: uploadedBoardCommentId,
      //   isLiked: false,
      //   isMine: true,
      //   payload: comment,
      //   user: meData.me,
      //   totalLikes: 0,
      //   totalCommentOfComments: 0,
      // };

      const totalCommentsNumber = resultData.totalCommentsNumber;

      cache.modify({
        id:`Board:${boardId}`,
        fields:{
          commentNumber(){
            return resultData.totalCommentsNumber;
          },
        },
      });

      const offsetComments = resultData.offsetComments;
      const uploadedBoardCommentId = offsetComments[offsetComments.length-1].id;

      // ref 를 직접 넣으니까 뭐 이상하게 됨. 데이터를 넣으니까 알아서 ref 로 변함. 신기하네
      // const madeBoardCommentRef = {"__ref":`BoardComment:${uploadedBoardCommentId}`};

      // 댓글 캐시에 작성
      // 이러니까 댓글을 안읽어온 상태에서 작성하면 처음게 refetch 되는듯. 캐시를 읽어와서 없으면 새로 만들까?
      // const queryName = `seeBoardComments({offset:0,boardId:${boardId}})`;
      // const readCache = cache.readFragment({
      //   id:"ROOT_QUERY",
      //   fragment: gql`
      //     fragment SeeBoardComments on Query {
      //       # 안됨 readQuery 써야 할듯
      //       # ${queryName}
      //     }
      //   `
      // });
      // const readCache = cache.readQuery({
      //   query: SEE_BOARD_COMMENTS,
      //   variables: {
      //     offset:0,
      //     boardId,
      //   },
      // });

      // console.log("readCache")
      // console.log(readCache)

      // if(readCache) {
        updateSeeBoardCommentsQuery({
          action:"createComment",
          boardCommentId: uploadedBoardCommentId,
          forCreateComment:{
            offsetComments,
            setNowCommentsBundleNumber,
            totalCommentsNumber,
          },
        });
      // } else {
      //   const writeQuery = cache.writeQuery({
      //     query: gql`
      //       query seeBoardComments(
      //         $boardId:Int!,
      //         $offset:Int!
      //       ) {
      //         seeBoardComments(
      //           boardId: $boardId,
      //           offset: $offset,
      //         ) {
      //           id
      //           user {
      //             id
      //             userName
      //             avatar
      //           }
      //           payload
      //           createdAt
      //           isMine
      //           totalLikes
      //           totalCommentOfComments
      //           isLiked
      //         }
      //       }`,
      //     data: { // Contains the data to write
      //       seeBoardComments: offsetComments,
      //     },
      //     variables: {
      //       boardId,
      //       offset:totalCommentsNumber - totalCommentsNumber%10,
      //     }
      //   });
      //   // 화면 렌더링이 안되네;;;
      //   console.log("writeQuery")
      //   console.log(writeQuery)
      // }
      
      setComment("");
    }
  };

  const [createBoardComment] = useMutation<createBoardComment,createBoardCommentVariables>(CREATE_BOARD_COMMENT,{
    update:updateCreateBoardComment,
  });

  const onPressCreateComment = async() => {
    if(!comment) {
      return Alert.alert("댓글을 작성해 주세요.");
    }
    await createBoardComment({
      variables:{
        boardId,
        payload:comment,
      },
    });
  };


  return (
    <CreateCommentContainer disabled={disabled}>
      <CommentInput
        placeholder={placeholder}
        value={comment}
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={(text)=>setComment(text)}
        editable={!disabled}
      />
      <CreateCommentBtn
        disabled={disabled}
        onPress={onPressCreateComment}
      >
        <CreateCommentBtnText>작성</CreateCommentBtnText>
      </CreateCommentBtn>
    </CreateCommentContainer>
  );
};

export default CreateBoardComment;