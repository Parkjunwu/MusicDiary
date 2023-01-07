import { LayoutChangeEvent } from "react-native";
import styled from "styled-components/native";
import useIsDarkMode from "../../../hooks/useIsDarkMode";
import usePlaceHolderColor from "../../../hooks/usePlaceHolderColor";

const Input = styled.TextInput<{opacityForAnimation:boolean}>`
  padding: 20px 5px;
  line-height: 18px;
  color: ${props=>props.theme.textColor};
  opacity: ${props=>props.opacityForAnimation ? 0 : 1};
  z-index: 10;
`;

type BodyInputType = {
  value: string[];
  setValue: React.Dispatch<React.SetStateAction<string[]>>;
  setFileAddingPosition: React.Dispatch<React.SetStateAction<{fileIndex:number,insertFront:boolean}>>;
  inputIndex: number;
  setComponentPositionY: React.Dispatch<React.SetStateAction<number[][]>>;
  setEachLineTextLength: React.Dispatch<React.SetStateAction<number[][]>>;
  nowChangingInputIndex: number;
  setNowChangingInputIndex: React.Dispatch<React.SetStateAction<number>>;
  opacityForAnimation?: boolean;
};

const BodyInput = ({value,setValue,setFileAddingPosition,inputIndex,setComponentPositionY,setEachLineTextLength,nowChangingInputIndex,setNowChangingInputIndex,opacityForAnimation}:BodyInputType) => {

  // const onSelectionChange:(e: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => void = ({ nativeEvent: { selection: { end } } }) => {
  //   // if(inputIndex === 10) {
  //   //   return Alert.alert("사진을 10장 이상 업로드 하실 수 없습니다.");
  //   // }
  //   setFileAddingPosition({
  //     inputIndex,
  //     stringIndex:end
  //   });
  // };
  const onPressIn = () => {
    setFileAddingPosition({
      fileIndex:inputIndex,
      insertFront:true,
    });
  };

  const placeholderTextColor = usePlaceHolderColor();

  const onChangeText = (text:string) => {
    setNowChangingInputIndex(inputIndex);
    setValue(prev=>{
      const newArr = [...prev];
      newArr[inputIndex] = text;
      return newArr;
    });
  };
  
  const onLayout:(event: LayoutChangeEvent) => void = (event) => {
    console.log("BodyInput onLayout")
    // console.log(event.nativeEvent.layout)
    const componentIndex = inputIndex * 2;
    const onLayoutValue = event.nativeEvent.layout;
    const nowComponentBottomY = onLayoutValue.height + onLayoutValue.y;
    // 아마 setValue 변경 -> 걔를 보고 TextInput 의 UI 변경 -> 변경된게 onLayout 호출 이런 식 아닐까? eachLineTextLength 도 받을라면 setValue 된거 이후에 되는게 보장되야 하는데 확인 해봐야함.
    // 얜 근데 글을 붙여넣기 해서 여러줄 한번에 늘었을 때, 즁간에 띄어쓰기 있어서 띄어쓰기 이후가 통째로 넘어갔을 때, 여러줄을 한번에 지웠을 때는 안됨.
    // line-height 쓰면 몇줄인 지는 알 수 있는데 한줄에 몇자 있는지를 모름. 걍 이게 나을듯.
    
    setComponentPositionY(prev=>{
      const newArr = [...prev];
      // const newArr = prev ? [...prev] : [];
      const prevInputIndexValue = newArr[componentIndex];
      // 처음에 그냥 넣음
      if(!prevInputIndexValue) {
        newArr[componentIndex] = [nowComponentBottomY];
      // 현재 쓰는 input 의 줄이 변경됬을 때. 늘어난거면 변한 값을 같이 배열로 넣고 아니면 마지막 뺌.
      } else if (nowChangingInputIndex === inputIndex) {
        const heightChange = nowComponentBottomY - prevInputIndexValue[prevInputIndexValue.length-1];
        if (heightChange > 0){
          newArr[componentIndex] = [...prevInputIndexValue,nowComponentBottomY];
          setEachLineTextLength(prev=>{
            const wholeStringLength = value[inputIndex].length - 1;
            let beforeLineStringLength = wholeStringLength;
            for(let i = 0; i < prev[inputIndex]?.length ?? 0; i++) {
              beforeLineStringLength -= prev[inputIndex][i]
            }
            // prev 가 없어도 이게 될라나?
            const copiedPrevArr = [...prev];
            copiedPrevArr[inputIndex] ? copiedPrevArr[inputIndex].push(beforeLineStringLength) : copiedPrevArr[inputIndex] = [beforeLineStringLength];
            return copiedPrevArr;
          })
        } else if (heightChange < 0) {
          // pop() 이 마지막 요소 제거하는거임.
          // newArr[componentIndex].splice(prevInputIndexValue.length-1,1);
          newArr[componentIndex].pop();
          setEachLineTextLength(prev=>{
            const copiedPrevArr = [...prev];
            copiedPrevArr[inputIndex]?.pop();
            // 근데 이럼 처음에는 아예 copiedPrevArr[inputIndex] 에 empty 였다가 다시 지우면 [] 이 됨. 나중에 이상하면 바꿔
            return copiedPrevArr;
          })
        }
      // 현재 쓰는 input 의 아래에 있는 줄.
      } else if (nowChangingInputIndex < inputIndex) {
        const addYPosition = nowComponentBottomY - prevInputIndexValue[prevInputIndexValue.length-1];
        const addedValueArr = prevInputIndexValue.map(value=>value + addYPosition);
        newArr[componentIndex] = addedValueArr;
      }
      // 그 외엔 건들거 없음.
      return newArr;
    });
  };

  // 만약 되면 UploadDiary 에 넣고 받는걸로.
  const isDarkMode = useIsDarkMode();

  return (
    <Input
    // <TextInput
    //   style={{
    //     paddingVertical: 20,
    //     paddingHorizontal: 5,
    //     lineHeight: 18,
    //     color: isDarkMode ? "white" : "black",
    //     opacity: opacityForAnimation ? 0 : 1,
    //     zIndex: 10,
    //   }}
      // onSelectionChange={onSelectionChange}
      onPressIn={onPressIn}
      value={value[inputIndex]}
      onChangeText={onChangeText}
      placeholder="본문"
      returnKeyType="done"
      autoCapitalize="none"
      autoCorrect={false}
      blurOnSubmit={false}
      placeholderTextColor={placeholderTextColor}
      multiline={true}
      onLayout={onLayout}
      opacityForAnimation={opacityForAnimation}
    />
  );
};

export default BodyInput;


