import styled from "styled-components/native";
import { colors } from "../../../../../js-assets/color";
import { FontAppliedBaseTextInputLittlePaddingNeedFontSize, FontAppliedBoldTextLittlePaddingNeedFontSize } from "../../../../../styled-components/FontAppliedComponents";
import { isAndroid } from "../../../../../utils";

const CreateCommentContainer = styled.View<{disabled:boolean}>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  opacity:${props => props.disabled ? 0.5 : 1};
`;
// const CommentInput = styled.TextInput`
const CommentInput = styled(FontAppliedBaseTextInputLittlePaddingNeedFontSize)`
  background-color: ${props=>props.theme.textInputBackgroundColor};
  padding: ${isAndroid ? "7px 10px" : "10px"};
  border-radius: ${isAndroid ? "5px" : "3px"};
  width: 85%;
`;
const CreateCommentBtn = styled.TouchableOpacity`
  border-radius: ${isAndroid ? "5px" : "3px"};
  background-color: ${colors.yellow};
`;
// const CreateCommentBtnText = styled.Text`
//   font-size: 15px;
//   font-weight: 600;
const BaseCommentBtnText = styled(FontAppliedBoldTextLittlePaddingNeedFontSize)`
  padding: ${isAndroid ? "8px" : "10px"};
  color: black;
`;
const CreateCommentBtnText = ({children}:{children: React.ReactNode}) => <BaseCommentBtnText>{children}</BaseCommentBtnText>

export { CreateCommentContainer, CommentInput,
CreateCommentBtn, CreateCommentBtnText, }