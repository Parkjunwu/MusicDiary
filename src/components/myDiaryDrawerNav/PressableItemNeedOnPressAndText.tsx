import styled from "styled-components/native";
import { FontAppliedBaseTextNeedFontSize } from "../../styled-components/FontAppliedComponents";

const PressableItem = styled.TouchableOpacity`

`;
const ItemText = styled(FontAppliedBaseTextNeedFontSize)`
  padding: 13px 15px;
`;


const PressableItemNeedOnPressAndText = ({onPress,text}:{onPress:()=>void,text:string}) => {
  return (
    <PressableItem onPress={onPress}>
      <ItemText>{text}</ItemText>
    </PressableItem>
  );
};

export default PressableItemNeedOnPressAndText;