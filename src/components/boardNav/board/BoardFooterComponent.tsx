import styled from "styled-components/native";
import { isLoggedInVar } from "../../../apollo";
import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import UserAndInfoContainer from "./boardFooterComponent/UserAndInfoContainer";
import CommentListContainer from "./boardFooterComponent/CommentContainer";
import makeBundleIndexPressable from "./boardFooterComponent/makeBundleIndexPressable";
import logInUserThing from "../../comment/forLogInUser/logInUserThing";
import useIsDarkMode from "../../../hooks/useIsDarkMode";
import { SEE_BOARD_COMMENTS } from "../../../gql/manyWriteQuery";
import CreateBoardComment from "./boardFooterComponent/comment/CreateBoardComment";
import { makeUpdateSeeBoardCommentsQuery } from "../../../logic/board/makeUpdateSeeBoardCommentsQuery";
import { BoardFooterComponentProps } from "../../../types/board/boardFooterComponentProps";
import { seeBoardComments, seeBoardCommentsVariables } from "../../../__generated__/seeBoardComments";
import CreateCommentNotLogIn from "./boardFooterComponent/comment/forNotLogInUser/CreateCommentNotLoggedIn";

const Container = styled.View<{isDarkMode:boolean}>`
  margin-top: 10px;
  border-top-color: rgba(100,100,100,0.4);
  border-top-width: ${props=>props.isDarkMode ? "0px" : "1px"};
  padding: 15px 10px 20px 10px;
  /* flex: 1; */
`;
const CommentContainer = styled.View`
  margin-top: 12px;
`;

const BoardFooterComponent = (props:BoardFooterComponentProps) => {

  const {id,isLiked,likes,commentNumber,user} = props;

  // update 를 해야하나? 안해도 될거같은데?
  const [seeBoardComments,{data,updateQuery}] = useLazyQuery<seeBoardComments,seeBoardCommentsVariables>(SEE_BOARD_COMMENTS,{
    fetchPolicy:"cache-and-network",
    nextFetchPolicy:"cache-first",
  });

  const isDarkMode = useIsDarkMode();

  // 변경
  // const onPressSeeComments = async() => await refetch();
  useEffect(()=>{
    seeBoardComments({
      variables: {
        boardId: id,
        offset: 0,
      },
    });
  },[])


  // seeBoardComments 캐시 변경 로직. 겹치는게 많은데 하나하나 너무 길어서 몰아 놓음.
  // NotificationBoard 에서도 써야 해서 함수 반환 함수로 만듦. 헷갈리면 SingleCommentLayout 에 있는거 보고 이해하도록
  const updateSeeBoardCommentsQuery = makeUpdateSeeBoardCommentsQuery(updateQuery);

  // CommentForLogInUser 보고 댓글 작성 거의 만드는 중.
  // 대댓글 작성 / 댓글 수정일 때 Comment 의 댓글 작성 뷰 안보이도록
  const [userWhichWriting,setUserWhichWriting] = useState<string|{userName:string}>("comment");
  
  const { placeholder, disabled } = logInUserThing(userWhichWriting);

  const [nowEditingIndex,setNowEditingIndex] = useState("");

  const isLoggedIn = isLoggedInVar();

  const [nowCommentsBundleNumber,setNowCommentsBundleNumber] = useState(1);

  const take = 10;

  // await 안써도 될듯
  const onPressBundleNumber = (bundleNumber:number) => {
    if(nowCommentsBundleNumber !== bundleNumber){
      setNowCommentsBundleNumber(bundleNumber);
      // refetch 말고 seeBoardComments 를 쓸라니까 뭐가 이상함.
      // refetch({
      //   boardId: id,
      //   offset: (bundleNumber-1) * take,
      // });
      seeBoardComments({
        variables:{
          boardId: id,
          offset: (bundleNumber-1) * take,
        },
      });
    }
  };
  
  const bundleIndexPressable = () => { 
    return makeBundleIndexPressable(
      commentNumber,
      onPressBundleNumber,
      nowCommentsBundleNumber,
      isDarkMode
    );
  };

  // console.log("data?.seeBoardComments")
  // console.log(data?.seeBoardComments.map(comment=>comment.id))

  return (
    <Container isDarkMode={isDarkMode} >

      <UserAndInfoContainer
        id={id}
        isLiked={isLiked}
        likes={likes}
        commentNumber={commentNumber}
        user={user}
        isDarkMode={isDarkMode}
      />

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
            boardId={props.id}
            seeBoardComments={seeBoardComments}
          />
        }

        {isLoggedIn ?
          <CreateBoardComment
            boardId={id}
            disabled={disabled()}
            placeholder={placeholder()}
            updateSeeBoardCommentsQuery={updateSeeBoardCommentsQuery}
            setNowCommentsBundleNumber={setNowCommentsBundleNumber}
          />
        :
          <CreateCommentNotLogIn />
        }
      </CommentContainer>

    </Container>
  );
};

export default BoardFooterComponent;
