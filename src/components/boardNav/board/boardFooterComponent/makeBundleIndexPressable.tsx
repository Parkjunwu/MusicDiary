import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import Ionicons from 'react-native-vector-icons/Ionicons';

// 얘는 bold 없는 애들이 많아서 이걸로 써야할듯
const CommentBundleNumber = styled.Text<{isNowBundleNumber:boolean}>`
  color: ${props=>props.theme.textColor};
  font-weight: ${props=>props.isNowBundleNumber ? "bold" : "normal"};
`;

const makeBundleIndexPressable = (
  commentNumber: number,
  onPressBundleNumber: Function,
  nowCommentsBundleNumber: number,
  isDarkMode: boolean
) => {

  const bundleNumberPressable = [];
  const lastBundleNumber = Math.ceil(commentNumber/10);

  let firstRenderBundleNumber:number;
  let lastRenderBundleNumber:number;

  const hasMoreComments = {
    before:false,
    after:false,
  };

  if(lastBundleNumber > 7){
    if(nowCommentsBundleNumber < 5){
      firstRenderBundleNumber = 1;
      lastRenderBundleNumber = 7;
      hasMoreComments.after = true;
    } else if (nowCommentsBundleNumber > lastBundleNumber - 4) {
      firstRenderBundleNumber = lastBundleNumber - 6;
      lastRenderBundleNumber = lastBundleNumber;
      hasMoreComments.before = true;
    } else {
      firstRenderBundleNumber = nowCommentsBundleNumber - 3;
      lastRenderBundleNumber = nowCommentsBundleNumber + 3;
      hasMoreComments.before = true;
      hasMoreComments.after = true;
    }
  } else {
    firstRenderBundleNumber = 1;
    lastRenderBundleNumber = lastBundleNumber;
  }

  if(hasMoreComments.before) {
    bundleNumberPressable.push(<Ionicons key={0} name="ellipsis-horizontal" size={9} color={isDarkMode ? "white" : "black"} />)
  }

  for(let i=firstRenderBundleNumber; i < lastRenderBundleNumber+1; i++) {
    bundleNumberPressable.push(
      <TouchableOpacity
        key={i}
        onPress={()=>onPressBundleNumber(i)}
      >
        <CommentBundleNumber isNowBundleNumber={i === nowCommentsBundleNumber} > {i} </CommentBundleNumber>
      </TouchableOpacity>
    );
  }

  if(hasMoreComments.after) {
    bundleNumberPressable.push(<Ionicons key={lastRenderBundleNumber+1} name="ellipsis-horizontal" size={9} color={isDarkMode ? "white" : "black"} />)
  }

  return bundleNumberPressable;
};

export default makeBundleIndexPressable;