import React from "react";
import { StyleProp, TextStyle } from "react-native";
import styled from "styled-components/native";
import { FontAppliedBaseTextNeedFontSize } from "../../../styled-components/FontAppliedComponents";

type RenderCustomDayProps = {
  styleArray: StyleProp<TextStyle>[],
  day: number,
  // dayParam: string,
  dayParam: number,
}

const Container = styled.View`

`;
const DotContainer = styled.View`
  height: 2px;
  flex-direction: row;
  justify-content: center;
`;
// <{key:number}> 는 안받아짐.
const Dot = styled.View<{index:number}>` 
  height: 5px;
  width: 5px;
  border-radius: 6px;
  background-color: tomato;
  margin-left: ${props=>props.index ? 1 : 0}px; 
`;

const maxDotNumber = 3;

const getMultiDot = (number:number) => {
  const renderDotArr = [];
  number = number > maxDotNumber ? maxDotNumber : number;
  for(let i = 0; i<number; i++){
    renderDotArr.push(<Dot key={i} index={i}/>)
  }
  return renderDotArr;
};

const RenderCustomDay = ({
  styleArray,
  day,
  dayParam,
}: RenderCustomDayProps) => {

  // const hasParams = Boolean(dayParam);
  // const diaryNumber = Number(dayParam);
  // console.log("dayParam : "+ typeof dayParam)
  // if(diaryNumber){
  //   for(let i = 0; i<diaryNumber; i++){
      
  //   }
  // }

  return <Container>
      <FontAppliedBaseTextNeedFontSize style={styleArray}>
        { day }
      </FontAppliedBaseTextNeedFontSize>
      <DotContainer>
        {getMultiDot(dayParam)}
      </DotContainer>
    </Container>
  // return hasParams ? 
  //   <FontAppliedBaseText style={styleArray}>
  //     {/* sexy */}
  //     {dayParam}
  //   </FontAppliedBaseText>
  //   :
  //   <FontAppliedBaseText style={styleArray}>
  //     { day }
  //   </FontAppliedBaseText>
};

export default RenderCustomDay;