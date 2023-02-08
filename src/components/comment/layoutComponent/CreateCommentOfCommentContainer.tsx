import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import usePlaceHolderColor from "../../../hooks/usePlaceHolderColor";
import { FontAppliedBaseTextInputLittlePaddingNeedFontSize, FontAppliedBaseTextLittlePaddingNeedFontSize } from "../../../styled-components/FontAppliedComponents";

const Container = styled.View<{disabled:boolean}>`
  margin-left: 20px;
  flex-direction: row;
  /* multiline 하니까 높이가 안맞아져서 넣음. */
  position: relative;
  opacity: ${props => props.disabled ? 0.5 : 1};
`;
// const CreateCommentOfComment = styled.TextInput`
//   color: ${props => props.theme.textColor};
const CreateCommentOfComment = styled(FontAppliedBaseTextInputLittlePaddingNeedFontSize)`
  min-width: 40%;
  max-width: 70%;
`;
const CreateCommentOfCommentBtn = styled.TouchableOpacity`
  margin-left: 5px;
  /* multiline 하니까 높이가 안맞아져서 넣음. */
  /* top: 6px; */
`;
// const CreateCommentOfCommentBtnText = styled.Text`
//   color: ${props => props.theme.textColor};
const CreateCommentOfCommentBtnText = styled(FontAppliedBaseTextLittlePaddingNeedFontSize)`
  
`;

type Props = {
  onPressCreateCommentOfComment: (payload: string) => void,
  userWhichWriting:string|{userName:string},
  setUserWhichWriting: React.Dispatch<React.SetStateAction<string|{userName:string}>>,
  userName: string;
}

const CreateCommentOfCommentContainer = ({onPressCreateCommentOfComment,userWhichWriting,setUserWhichWriting,userName}:Props) => {

  const [commentOfCommentValue,setCommentOfCommentValue] = useState("");

  const onPressBtn = () => {
    onPressCreateCommentOfComment(commentOfCommentValue);
    setCommentOfCommentValue("");
  };

  const placeholderTextColor = usePlaceHolderColor();

  useEffect(()=>{
    if(commentOfCommentValue) {
      // setUserWhichWriting({userName:"commentOfComment"});
      setUserWhichWriting({userName});
    } else {
      setUserWhichWriting("comment");
    }
  },[commentOfCommentValue]);

  const disabled = userWhichWriting === "editComment";
  const placeholder = disabled ? "댓글 수정 중.." : "이 댓글에 댓글 달기"

  return(
    <Container disabled={disabled}>
      <CreateCommentOfComment
        fontSize={12}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        value={commentOfCommentValue}
        onChangeText={(text)=>setCommentOfCommentValue(text)}
        autoCapitalize="none"
        autoCorrect={false}
        // multiline 하니까 높이가 안맞아짐. 흠..
        multiline={true}
        editable={!disabled}
      />
      <CreateCommentOfCommentBtn disabled={disabled} onPress={onPressBtn}>
        <CreateCommentOfCommentBtnText
          fontSize={12}
        >작성</CreateCommentOfCommentBtnText>
      </CreateCommentOfCommentBtn>
    </Container>
  );
};

export default CreateCommentOfCommentContainer;