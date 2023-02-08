import { CommentInput, CreateCommentBtn, CreateCommentBtnText, CreateCommentContainer } from "../CreateCommentStyledComponents";

const CreateCommentNotLogIn = () => {

  return (
    <CreateCommentContainer
      disabled={true}
    >
      <CommentInput placeholder="댓글 작성은 로그인 후 이용 가능합니다." editable={false} />
      <CreateCommentBtn
        disabled={true}
      >
        <CreateCommentBtnText>작성</CreateCommentBtnText>
      </CreateCommentBtn>
    </CreateCommentContainer>
  );
};

export default CreateCommentNotLogIn;