
const logInUserThing = (userWhichWriting: string|{userName:string}) => {
  const placeholder = () => {
    if(userWhichWriting === "comment") {
      return "댓글을 작성해 주세요.";
    } else if (typeof userWhichWriting === "object") {
      return `${userWhichWriting.userName} 님의 댓글에 댓글 다는 중 ..`;
    } else if (userWhichWriting === "editComment") {
      return "댓글 수정중 ..";
    } else {
      return "";
    }
  };

  const disabled = () => userWhichWriting === "comment" ? false : true;

  return {placeholder,disabled};
};

export default logInUserThing;