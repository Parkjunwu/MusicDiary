import styled from "styled-components/native";
import { colors } from "../../../js-assets/color";
import { FontAppliedBaseTextInputLittlePaddingNeedFontSize, FontAppliedBoldTextLittlePaddingNeedFontSize, FontAppliedBaseTextLittlePaddingNeedFontSize } from "../../../styled-components/FontAppliedComponents";
import { isAndroid } from "../../../utils";

const Container = styled.View`
  background-color: ${props => props.theme.backgroundColor};
  flex:1;
`;
const CreateCommentContainer = styled.View<{disabled:boolean}>`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: auto 20px;
  opacity:${props => props.disabled ? 0.5 : 1};
`;
// const CommentInput = styled.TextInput`
// background-color: ${props=>props.theme.textInputBackgroundColor};
const CommentInput = styled(FontAppliedBaseTextInputLittlePaddingNeedFontSize)`
  padding: ${isAndroid ? "7px 10px" : "10px"};
  border-radius: ${isAndroid ? "5px" : "3px"};
  width: 85%;
`;
const CreateCommentBtn = styled.TouchableOpacity`
  border-radius: ${isAndroid ? "5px" : "3px"};
  /* background-color: rgba(255,0,0,0.8); */
  background-color: ${colors.yellow};
`;
// const CreateCommentBtnText = styled.Text`
//   padding: ${isAndroid ? "8px" : "10px"};
//   font-size: 15px;
//   font-weight: 600;
// `;
const BaseCreateCommentBtnText = styled(FontAppliedBoldTextLittlePaddingNeedFontSize)`
  padding: ${isAndroid ? "8px" : "10px"};
  /* font-size: 15px; */
  color: black;
`;
const CreateCommentBtnText = ({children}:{children: React.ReactNode}) => <BaseCreateCommentBtnText fontSize={13}>{children}</BaseCreateCommentBtnText>;

// const NoCommentText = styled.Text`
//   text-align: center;
//   padding-top: 30px;
//   color: ${props=>props.theme.textColor};
// `;
const BaseNoCommentText = styled(FontAppliedBaseTextLittlePaddingNeedFontSize)`
  text-align: center;
  padding-top: 30px;
`;
const NoCommentText = ({children}:{children: React.ReactNode}) => <BaseNoCommentText fontSize={12}>{children}</BaseNoCommentText>;

// const LoadingText = styled(NoCommentText)``;
const LoadingText = NoCommentText;

const FlatListContainer = styled.View`
  flex: 12;
`;
const MarginTopBottomContainer = styled.View`
  margin-top: 12px;
  padding-top: 3px;
  margin-bottom: 35px;
  padding-bottom: 15px;
  background-color: rgba(249,224,118,0.3);
`;
const LoadingView = () => (
  <Container>
    <LoadingText>Loading...</LoadingText>
  </Container>
);

const NoDataView = () => (
  <Container>
    <NoCommentText>댓글이 없습니다.</NoCommentText>
  </Container>
);

export {
  Container,
  CreateCommentContainer,
  CommentInput,
  CreateCommentBtn,
  CreateCommentBtnText,
  NoCommentText,
  FlatListContainer,
  MarginTopBottomContainer,
  LoadingView,
  NoDataView,
};