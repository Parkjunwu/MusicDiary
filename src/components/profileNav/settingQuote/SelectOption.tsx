import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { FontAppliedBaseTextNeedFontSize } from "../../../styled-components/FontAppliedComponents";
import Fontisto from 'react-native-vector-icons/Fontisto';
// import useBackgroundColorAndTextColor from "../../../hooks/useBackgroundColorAndTextColor";

const ColumnContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;
const SelectContainer = styled.View`
  align-items: center;
  justify-content: center;
`;
const EachFontText = styled(FontAppliedBaseTextNeedFontSize)`
  padding-left: 10px;
`;

type SelectOptionProps = {
  isSelected: boolean;
  onPressFn: () => void;
  textColor: string;
  showingText: string;
};

const SelectOption = ({
  isSelected,
  onPressFn,
  textColor,
  showingText,
}: SelectOptionProps) => (
  <ColumnContainer>
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