import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { FontAppliedBaseTextNeedFontSize } from "../../../styled-components/FontAppliedComponents";
import Fontisto from 'react-native-vector-icons/Fontisto';
// import useBackgroundColorAndTextColor from "../../../hooks/useBackgroundColorAndTextColor";

const justifyContentByColumnNumber: {[key:string]: string} = {
  "0": "flex-start",
  "1": "center",
  "2": "flex-end",
};

const ColumnContainer = styled.View<{columnNumber:number}>`
  flex: 1;
  flex-direction: row;
  align-items: center;
  /* 패드 맞추려고 추가 */
  justify-content: ${({columnNumber})=>justifyContentByColumnNumber[columnNumber+""]}; 
`;
const SelectContainer = styled.View`
  align-items: center;
  justify-content: center;
`;
const EachFontText = styled(FontAppliedBaseTextNeedFontSize)`
  padding-left: 10px;
  /* 패드 맞추려고 추가. 73px 은 그냥 화면보고 대충 넣은 값 */
  width: 73px;
`;

type SelectOptionProps = {
  isSelected: boolean;
  onPressFn: () => void;
  textColor: string;
  showingText: string;
  columnNumber: number;
};

const SelectOption = ({
  isSelected,
  onPressFn,
  textColor,
  showingText,
  columnNumber,
}: SelectOptionProps) => (
  <ColumnContainer columnNumber={columnNumber}>
    <SelectContainer>
      <TouchableOpacity
        onPress={onPressFn}
      >
        <Fontisto name={isSelected ? "checkbox-active" : "checkbox-passive"} size={24} color={textColor} />
      </TouchableOpacity>
    </SelectContainer>
    <TouchableOpacity
      onPress={onPressFn}
    >
      <EachFontText>
        {showingText}
      </EachFontText>
    </TouchableOpacity>
  </ColumnContainer>
);


export default SelectOption;