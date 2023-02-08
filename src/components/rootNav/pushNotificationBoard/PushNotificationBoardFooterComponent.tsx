import styled from "styled-components/native";
import useIsDarkMode from "../../../hooks/useIsDarkMode";
import { isLoggedInVar } from "../../../apollo";
import { gql, useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { makeUpdateSeeBoardCommentsQuery } from "../../../logic/board/makeUpdateSeeBoardCommentsQuery";
import logInUserThing from "../../comment/forLogInUser/logInUserThing";
import makeBundleIndexPressable from "../../boardNav/board/boardFooterComponent/makeBundleIndexPressable";
import UserAndInfoContainer from "../../boardNav/board/boardFooterComponent/UserAndInfoContainer";
import CommentListContainer from "../../boardNav/board/boardFooterComponent/CommentContainer";
import CreateBoardComment from "../../boardNav/board/boardFooterComponent/comment/CreateBoardComment";
import CreateCommentNotLoggedIn from "../../boardNav/board/boardFooterComponent/comment/forNotLogInUser/CreateCommentNotLoggedIn";
import { SEE_BOARD_COMMENTS } from "../../../gql/manyWriteQuery";
import { seeBoardComments, seeBoardCommentsVariables } from "../../../__generated__/seeBoardComments";
import { getNotifiedBoardComment, getNotifiedBoardCommentVariables } from "../../../__generated__/getNotifiedBoardComment";
import { getNotifiedBoardCommentOfComment, getNotifiedBoardCommentOfCommentVariables } from "../../../__generated__/getNotifiedBoardCommentOfComment";

const GET_NOTIFIED_BOARD_COMMENT = gql`
  query getNotifiedBoardComment(
    $boardCommentId:Int!,
    $boardId:Int!
  ) {
    getNotifiedBoardComment(
      boardCommentId:$boardCommentId,
      boardId:$boardId
    ) {
      offset
      totalComments
      error
    }
  }
`;

const GET_NOTIFIED_BOARD_COMMENT_OF_COMMENT = gql`
  query getNotifiedBoardCommentOfComment(
    $boardCommentOfCommentId:Int!
  ) {
    getNotifiedBoardCommentOfComment(
      boardCommentOfCommentId:$boardCommentOfCommentId
    ) {
      boardCommentOfComment {
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
        isLiked
      }
      error
    }
  }
`;

const Container = styled.View<{isDarkMode:boolean}>`
  margin-top: 10px;
  border-top-color: rgba(100,100,100,0.4);
  border-top-width: ${props=>props.isDarkMode ? "0px" : "1px"};
  padding: 15px 10px 20px 10px;
`;
const CommentContainer = styled.View`
  margin-top: 12px;
`;

type PushNotificationBoardFooterComponentProps = {
  id: number;
  // userId: number;
  user: {
    id: number,
    userName: string,
    avatar: string,
  };
  isLiked: boolean;
  likes: number;
  commentNumber: number;
  boardId:number;
  commentId: number;
  commentOfCommentId?: number;
};

const PushNotificationBoardFooterComponent = ({
  id,
  isLiked,
  likes,
  commentNumber,
  user,
  boardId,
  commentId,
  commentOfCommentId,
}:PushNotificationBoardFooterComponentProps) => {

  const [getNotifiedBoardCommentOfComment,{data:getNotifiedBoardCommentOfCommentData,}] = useLazyQuery<getNotifiedBoardCommentOfComment,getNotifiedBoardCommentOfCommentVariables>(GET_NOTIFIED_BOARD_COMMENT_OF_COMMENT,{
    variables:{
      boardCommentOfCommentId:commentOfCommentId,
    },
  });

  useEffect(()=>{
    if(getNotifiedBoardCommentOfCommentData?.getNotifiedBoardCommentOfComment.error) {
      // 에러 시 화면에 띄움
      Alert.alert(getNotifiedBoardCommentOfCommentData.getNotifiedBoardCommentOfComment.error)
    }
  },[getNotifiedBoardCommentOfCommentData])

  const [seeBoardComments,{data,updateQuery}] = useLazyQuery<seeBoardComments,seeBoardCommentsVariables>(SEE_BOARD_COMMENTS, {
    fetchPolicy:"cache-and-network",
    nextFetchPolicy:"cache-first",
  });

  const [nowCommentsBundleNumber,setNowCommentsBundleNumber] = useState(1);

  const [getNotifiedBoardComment,{data:getNotifiedBoardCommentData,}] = useLazyQuery<getNotifiedBoardComment,getNotifiedBoardCommentVariables>(GET_NOTIFIED_BOARD_COMMENT, {
    fetchPolicy:"cache-and-network",
    nextFetchPolicy:"cache-first",
    onCompleted: async(data) => {
      const getData = data.getNotifiedBoardComment;
      const error = getData.error;
      console.log("getData : "+ JSON.stringify(getData))
      // 에러 시 화면에 띄움
      if(error) {
        Alert.alert(error);
      } else {
        const offset = getData.offset;
        const bundleIndex = Math.floor(offset/10) + 1;
        setNowCommentsBundleNumber(bundleIndex);

        await seeBoardComments({
          variables:{
            boardId,
            offset,
          },
        });

        if(commentOfCommentId) {
          await getNotifiedBoardCommentOfComment();
        }
      }
    },
  });

  // console.log("getNotifiedBoardCommentData")
  // console.log(getNotifiedBoardCommentData)
  // console.log("boardId")
  // console.log(boardId)
  // console.log("commentId")
  // console.log(commentId)
  // console.log("getNotifiedBoardCommentData?.getNotifiedBoardComment")
  // console.log(getNotifiedBoardCommentData?.getNotifiedBoardComment)
  // console.log("seeBoardComments?.seeBoardComments")
  // console.log(data?.seeBoardComments)

  // 게시물 보기 하면 얘가 날라감.. props 바뀌면서 다른 컴포넌트 되는건가? 우째하지?
  useEffect(()=>{
    if(commentId) {
      getNotifiedBoardComment({
        variables:{
          boardCommentId: commentId,
          boardId,
        },
      });
    }
  },[commentId]);


  const isDarkMode = useIsDarkMode();

  const updateSeeBoardCommentsQuery = makeUpdateSeeBoardCommentsQuery(updateQuery);

  // CommentForLogInUser 보고 댓글 작성 거의 만드는 중.
  // 대댓글 작성 / 댓글 수정일 때 Comment 의 댓글 작성 뷰 안보이도록
  const [userWhichWriting,setUserWhichWriting] = useState<string|{userName:string}>("comment");
  
  const { placeholder, disabled } = logInUserThing(userWhichWriting);

  const [nowEditingIndex,setNowEditingIndex] = useState("");

  const isLoggedIn = isLoggedInVar();

  const take = 10;

  // await 안써도 될듯
  const onPressBundleNumber = (bundleNumber:number) => {
    if(nowCommentsBundleNumber !== bundleNumber){
      setNowCommentsBundleNumber(bundleNumber);
      // refetch 말고 seeBoardComments 를 쓸라니까 뭐가 이상함.
      // seeBoardCommentsRefetch({
      //   boardId,
      //   offset: (bundleNumber-1) * take,
      // });
      seeBoardComments({
        variables:{
          boardId,
          offset: (bundleNumber-1) * take,
        },
      });
    }
  };

  
  const bundleIndexPressable = () => { 
    return makeBundleIndexPressable(
      getNotifiedBoardCommentData?.getNotifiedBoardComment.totalComments,
      onPressBundleNumber,
      nowCommentsBundleNumber,
      isDarkMode,
    );
  };

  return (
    <Container isDarkMode={isDarkMode} >

      {user && <UserAndInfoContainer
          id={id}
          isLiked={isLiked}
          likes={likes}
          commentNumber={commentNumber}
          user={user}
          isDarkMode={isDarkMode}
        />
      }

      <CommentContainer>
        {data?.seeBoardComments && <CommentListContainer
          dataDotSeeBoardComments={data.seeBoardComments}
          isLoggedIn={isLoggedIn}
          nowEditingIndex={nowEditingIndex}
          setNowEditingIndex={setNowEditingIndex}
          updateSeeBoardCommentsQuery={updateSeeBoardCommentsQuery}
          userWhichWriting={userWhichWriting}
          setUserWhichWriting={setUserWhichWriting}
          bundleIndexPressable={bundleIndexPressable}
          commentId={commentId}
          notifiedCommentOfComment={getNotifiedBoardCommentOfCommentData?.getNotifiedBoardCommentOfComment.boardCommentOfComment}
          boardId={boardId}
        />}

        {isLoggedIn ?
          // <CreateComment
          <CreateBoardComment
            boardId={boardId}
            disabled={disabled()}
            placeholder={placeholder()}
            updateSeeBoardCommentsQuery={updateSeeBoardCommentsQuery}
            setNowCommentsBundleNumber={setNowCommentsBundleNumber}
          />
        :
          <CreateCommentNotLoggedIn />
        }
      </CommentContainer>

    </Container>
  );
};

export default PushNotificationBoardFooterComponent;