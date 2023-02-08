import { MarginTopBottomContainer } from "../logInUser/AndroidAndIOSStyledComponent";
import SingleCommentLayout from "../logInUser/SingleCommentLayout";

// notifiedComment 있으면 맨 위에 보여줌
// 얘인걸 알려줄라면 background color 로 애니메이션 줘도 되겠네.
const NotifiedCommentLayOut = ({
  commentId,
  data,
  notifiedCommentOfComment,
  nowEditingIndex,
  setNowEditingIndex,
  updateSeeCommentsQuery,
  userWhichWriting,
  setUserWhichWriting,
}) => {
  if(!commentId) {
    return null;
  }

  const comments = data?.seeComments?.comments;
  if(!comments || comments.length === 0) {
    return null;
  }
  
  return <MarginTopBottomContainer>
    <SingleCommentLayout
      // comment={comments[comments.length-1]}
      // 최신부터 받으므로
      comment={comments[0]}
      notifiedCommentOfComment={notifiedCommentOfComment?.getNotifiedCommentOfComment?.commentOfComment}
      nowEditingIndex={nowEditingIndex}
      setNowEditingIndex={setNowEditingIndex}
      updateSeeCommentsQuery={updateSeeCommentsQuery}
      userWhichWriting={userWhichWriting}
      setUserWhichWriting={setUserWhichWriting}
    />
  </MarginTopBottomContainer>
};

export default NotifiedCommentLayOut;