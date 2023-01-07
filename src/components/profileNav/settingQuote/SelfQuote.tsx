import styled from "styled-components/native";
import { FontAppliedBaseTextInputNeedFontSize } from "../../../styled-components/FontAppliedComponents";
import Feather from 'react-native-vector-icons/Feather';
import usePlaceHolderColor from "../../../hooks/usePlaceHolderColor";
import useBackgroundColorAndTextColor from "../../../hooks/useBackgroundColorAndTextColor";
import { Alert } from "react-native";

const SelfFontTextInput = styled(FontAppliedBaseTextInputNeedFontSize)`
  background-color: ${props=>props.theme.textInputBackgroundColor};
  padding: 10px 20px;
  margin: 0px 10px 10px 10px;
  border-radius: 10px;
  /* font-size: 15px; */
`;
const PlusSelfQuoteContainer = styled.View`
  flex-direction: row;
  padding-left: 20px;
`;
const PlusSelfQuote = styled.TouchableOpacity`
  padding-right: 5px;
`;

type SelfQuoteProps = {
  selfQuoteLength: number;
  setSelfQuoteLength: React.Dispatch<React.SetStateAction<number>>;
  selfQuote: string[];
  setSelfQuote: React.Dispatch<React.SetStateAction<string[]>>;
};

const SelfQuote = ({
  selfQuoteLength,
  setSelfQuoteLength,
  selfQuote,
  setSelfQuote,
}: SelfQuoteProps) => {

  const placeholderTextColor = usePlaceHolderColor();
  const { textColor } = useBackgroundColorAndTextColor();

  const onPressPlusSelfQuote = () => setSelfQuoteLength(prev=>prev+1);
  const onPressMinusSelfQuote = () => {
    if(selfQuoteLength === 1) return;
    if(!selfQuote[selfQuote.length-1]) return setSelfQuoteLength(prev=>prev-1);
    return Alert.alert("작성된 문구 내용이 있습니다. 삭제하시겠습니까?",undefined,[
      {
        text:"삭제",
        onPress:()=>{
          setSelfQuoteLength(prev=>prev-1);
          setSelfQuote(prev=>{
            const newArr = [...prev];
            newArr.pop();
            return newArr;
          });
        },
      },
      {
        text:"취소",
        style:"cancel"
      },
    ]);
  };
  const arr = [];
  for(let i=0;i<selfQuoteLength;i++){
    arr.push(<SelfFontTextInput
      fontSize={15}
      key={i}
      value={selfQuote[i]}
      onChangeText={(text)=>setSelfQuote(prev=>{
        const newArr = [...prev];
        newArr[i] = text;
        return newArr;
      })}
      placeholder="내 문구"
      returnKeyType="done"
      autoCapitalize="none"
      autoCorrect={false}
      blurOnSubmit={false}
      placeholderTextColor={placeholderTextColor}
      multiline={true}
    />)
  }
  arr.push(<PlusSelfQuoteContainer key={selfQuoteLength}>
    <PlusSelfQuote onPress={onPressPlusSelfQuote}>
      <Feather name="plus-square" size={24} color={textColor} />
    </PlusSelfQuote>
    <PlusSelfQuote onPress={onPressMinusSelfQuote}>
      <Feather name="minus-square" size={24} color={textColor} />
    </PlusSelfQuote>
  </PlusSelfQuoteContainer>)
  // return arr;
  return (
    <>
      {arr}
    </>
  )
};


export default SelfQuote;