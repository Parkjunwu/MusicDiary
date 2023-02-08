import styled from "styled-components/native";
import { FontAppliedBoldTextNeedFontSize } from "../../styled-components/FontAppliedComponents";
import useBackgroundColorAndTextColor from "../../hooks/useBackgroundColorAndTextColor";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import quote from "../../quote/quoteConstants";
import SelfQuote from "../../components/profileNav/settingQuote/SelfQuote";
import SelectOption from "../../components/profileNav/settingQuote/SelectOption";
import useHeaderRightSettingOk from "../../hooks/profileNav/settingQuote/useHeaderRightSettingOk";
import useGetQuoteSettingAndSet from "../../hooks/profileNav/settingQuote/useGetQuoteSettingAndSet";

const TitleText = styled(FontAppliedBoldTextNeedFontSize)`
  /* font-size: 17px; */
  text-align: center;
  margin-top: 20px;
`;
const QuoteContainer = styled.View`
  padding: 20px;
`;
const RowContainer = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
`;
const EmptyContainer = styled.View`
  flex: 1;
`;

// navigation 타입은 useHeaderRightSettingOk 에 있음. 쓸거면 가져와

const SettingQuote = () => {
  
  const { textColor, backgroundColor } = useBackgroundColorAndTextColor();

  const [selfQuoteLength,setSelfQuoteLength] = useState(1);
  const [selfQuote,setSelfQuote] = useState([""]);

  const [selectedIndexArr,setSelectedIndexArr] = useState<number[]>([]);

  useGetQuoteSettingAndSet({
    quote,
    setSelectedIndexArr,
    setSelfQuote,
    setSelfQuoteLength,
  })

  useHeaderRightSettingOk({
    quote,
    selectedIndexArr,
    selfQuote,
  });

  const onPressSelectQuote = (isSelected:boolean,nowNumber:number) => setSelectedIndexArr(prevArr=>{
    const newArr = isSelected ? prevArr.filter(prevIndex=>prevIndex !== nowNumber) : [...prevArr,nowNumber];
    return newArr;
  });

  const nowSelectIndexNumber = selectedIndexArr.length;
  const isAllSelected = nowSelectIndexNumber === quote.allNameArrLength;
  const onPressAllSelect = () => setSelectedIndexArr(isAllSelected ? [] : quote.indexArr);

  const quoteArr = quote.allNameArr;

  return (
    <KeyboardAwareScrollView
      style={{
        flex: 1,
        backgroundColor,
      }}
      // ios 위아래 더 멀리 안움직이는거
      bounces={false}
      // android 위아래 더 멀리 안움직이는거
      overScrollMode={'never'}
    >
      <TitleText fontSize={17}>프로필 화면에 보여줄 문구 종류를 지정합니다.</TitleText>

      <QuoteContainer>
        <RowContainer>
          <SelectOption
            isSelected={isAllSelected}
            onPressFn={onPressAllSelect}
            textColor={textColor}
            showingText="전체 선택"
            columnNumber={0}
          />
        </RowContainer>

        {quote.rowArray.map(rowNumber=><RowContainer key={rowNumber}>
          {[0,1,2].map(columnNumber=>{
            const nowNumber = rowNumber * 3 + columnNumber;
            const isSelected = selectedIndexArr.includes(nowNumber);
            const nowQuote = quoteArr[nowNumber];
            if(!nowQuote) return <EmptyContainer key={nowNumber}/>;
            return <SelectOption
              key={nowNumber}
              isSelected={isSelected}
              onPressFn={()=>onPressSelectQuote(isSelected,nowNumber)}
              textColor={textColor}
              showingText={nowQuote}
              columnNumber={columnNumber}
            />
          })}
        </RowContainer>
      )}
      </QuoteContainer>
      
      <SelfQuote
        selfQuoteLength={selfQuoteLength}
        setSelfQuoteLength={setSelfQuoteLength}
        selfQuote={selfQuote}
        setSelfQuote={setSelfQuote}
      />

    </KeyboardAwareScrollView>
  );
};

export default SettingQuote;


// 일기 종류 추천
// 행복 관련 한줄
// 감사 관련 한줄
// 일상 관련 한줄
// 철학 관련 한줄
// 꾸준함 관련 한줄
// 목표 관련 한줄
// 기분에 맞춰 나오기
// 인생 관련 한줄
// 소중함 관련 한줄
// 위로의 말
// 랜덤
// 직접 작성


// import {
//   일기추천,
//   음악,
//   행복,
//   감사,
//   일상,
//   철학,
//   꾸준함,
//   목표,
//   인생,
//   소중함,
//   위로,
//   추억,
//   반성,
//   일기,
// } from "../../quote/quoteArray"


// console.log("일기추천 : "+일기추천.length)
// console.log("음악 : "+음악.length)
// console.log("행복 : "+행복.length)
// console.log("감사 : "+감사.length)
// console.log("일상 : "+일상.length)
// console.log("철학 : "+철학.length)
// console.log("꾸준함 : "+꾸준함.length)
// console.log("목표 : "+목표.length)
// console.log("인생 : "+인생.length)
// console.log("소중함 : "+소중함.length)
// console.log("위로 : "+위로.length)
// console.log("추억 : "+추억.length)
// console.log("반성 : "+반성.length)
// console.log("일기 : "+일기.length)