import { quoteArr, quoteNameArr } from "./quoteArray";

const QUOTE_INDEX_ARR = "quoteIndexArr";
const QUOTE_USER_INPUT_ARR = "userQuoteInputArr";

// const quoteArr = [
//   "일기추천",
//   "음악",
//   "행복",
//   "감사",
//   "일상",
//   "철학",
//   "꾸준함",
//   "목표",
//   "인생",
//   "소중함",
//   "위로",
//   "추억",
//   "반성",
//   "일기",
//   // 이것도 넣어야 하나?
//   "직접 작성"
// ];

const quoteNameArrLength = quoteNameArr.length;

const quoteIndexArr: number[] = [];

for(let i=0;i<quoteNameArrLength;i++){
  quoteIndexArr.push(i);
}

const quoteDivide3Number = Math.ceil(quoteNameArrLength / 3);

const quoteRowArray: number[] = [];

for(let i=0;i<quoteDivide3Number;i++){
  quoteRowArray.push(i);
}

const quote = {
  QUOTE_INDEX_ARR,
  QUOTE_USER_INPUT_ARR,
  allArr: quoteArr,
  allNameArr: quoteNameArr,
  allNameArrLength: quoteNameArrLength,
  indexArr: quoteIndexArr,
  divide3Number: quoteDivide3Number,
  rowArray: quoteRowArray,
};

// export {
//   quoteArr,
//   quoteNameArrLength,
//   quoteIndexArr,
//   quoteDivide3Number,
//   quoteRowArray,
// };
export default quote;

export type quoteType = {
  QUOTE_INDEX_ARR: string;
  QUOTE_USER_INPUT_ARR: string;
  allArr: string[][];
  allNameArr: string[];
  allNameArrLength: number;
  indexArr: number[];
  divide3Number: number;
  rowArray: number[];
};
// export {
//   QUOTE_INDEX_ARR,
//   QUOTE_USER_INPUT_ARR,
// }