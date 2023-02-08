import styled from "styled-components/native";
import { getCSSFontStyle } from "../font/getFontStyle";

// 글자가 짤리는 경우가 있어서 padding 도 아예 여기서 줄까?
// 근데 줘도 가서 뭐 있으면 안먹혀서 거기서 써야 하는듯

// 일단 ios 는 하나쓰고 font-weight 쓰면 맞음. 100~300, 400~600, 700~900 임. android 는 제일 얇은게 안받아짐. 걍 컴포넌트로 쓰는게 나을듯

const baseSharedStyle = `
  padding-bottom: 3px;
  padding-top: 3px;
`;
// 얘는 styled component 안에서 받아야 받아짐.
// color: ${props=>props.theme.textColor};


// 대충 원형
// const FontAppliedBoldText = styled.Text`
//   font-family: "GmarketSansTTFBold";
//   padding-bottom: 3px;
//   padding-top: 3px;
//   color: ${props=>props.theme.textColor};
// `;
const FontAppliedBoldTextNeedFontSize = styled.Text<{fontSize?:number}>`
  ${baseSharedStyle}
  color: ${props=>props.theme.textColor};
  /* font-family: ${props=>props.theme.boldFontFamily}; */
  ${props=>getCSSFontStyle(props.theme.boldFontFamily,props.fontSize)}
  /* ${props=>props.fontSize && `font-size:${props.fontSize}px`} */
`;
const FontAppliedBaseTextNeedFontSize = styled.Text<{fontSize?:number}>`
  ${baseSharedStyle}
  color: ${props=>props.theme.textColor};
  /* font-family: ${props=>props.theme.mediumFontFamily}; */
  ${props=>getCSSFontStyle(props.theme.mediumFontFamily,props.fontSize)}
  /* ${props=>props.fontSize && `font-size:${props.fontSize}px`} */
`;
const FontAppliedLightTextNeedFontSize = styled.Text<{fontSize?:number}>`
  ${baseSharedStyle}
  color: ${props=>props.theme.textColor};
  /* font-family: ${props=>props.theme.lightFontFamily}; */
  ${props=>getCSSFontStyle(props.theme.lightFontFamily,props.fontSize)}
  /* ${props=>props.fontSize && `font-size:${props.fontSize}px`} */
`;

const FontAppliedBoldTextInputNeedFontSize = styled.TextInput<{fontSize?:number}>`
  ${baseSharedStyle}
  color: ${props=>props.theme.textColor};
  /* font-family: ${props=>props.theme.boldFontFamily}; */
  ${props=>getCSSFontStyle(props.theme.boldFontFamily,props.fontSize)}
  /* ${props=>props.fontSize && `font-size:${props.fontSize}px`} */
`;
const FontAppliedBaseTextInputNeedFontSize = styled.TextInput<{fontSize?:number}>`
  ${baseSharedStyle}
  color: ${props=>props.theme.textColor};
  /* font-family: ${props=>props.theme.mediumFontFamily}; */
  ${props=>getCSSFontStyle(props.theme.mediumFontFamily,props.fontSize)}
  /* ${props=>props.fontSize && `font-size:${props.fontSize}px`} */
`;
const FontAppliedLightTextInputNeedFontSize = styled.TextInput<{fontSize?:number}>`
  ${baseSharedStyle}
  color: ${props=>props.theme.textColor};
  /* font-family: ${props=>props.theme.lightFontFamily}; */
  ${props=>getCSSFontStyle(props.theme.lightFontFamily,props.fontSize)}
  /* ${props=>props.fontSize && `font-size:${props.fontSize}px`} */
`;

const littlePaddingSharedStyle = `
  padding-bottom: 1px;
  padding-top: 1px;
`;
// 
const FontAppliedBoldTextLittlePaddingNeedFontSize = styled.Text<{fontSize?:number}>`
  ${littlePaddingSharedStyle}
  color: ${props=>props.theme.textColor};
  /* font-family: ${props=>props.theme.boldFontFamily}; */
  ${props=>getCSSFontStyle(props.theme.boldFontFamily,props.fontSize)}
  /* ${props=>props.fontSize && `font-size:${props.fontSize}px`} */
`;
const FontAppliedBaseTextLittlePaddingNeedFontSize = styled.Text<{fontSize?:number}>`
  ${littlePaddingSharedStyle}
  color: ${props=>props.theme.textColor};
  /* font-family: ${props=>props.theme.mediumFontFamily}; */
  ${props=>getCSSFontStyle(props.theme.mediumFontFamily,props.fontSize)}
  /* ${props=>props.fontSize && `font-size:${props.fontSize}px`} */
`;
const FontAppliedLightTextLittlePaddingNeedFontSize = styled.Text<{fontSize?:number}>`
  ${littlePaddingSharedStyle}
  color: ${props=>props.theme.textColor};
  /* font-family: ${props=>props.theme.lightFontFamily}; */
  ${props=>getCSSFontStyle(props.theme.lightFontFamily,props.fontSize)}
  /* ${props=>props.fontSize && `font-size:${props.fontSize}px`} */
`;

const FontAppliedBoldTextInputLittlePaddingNeedFontSize = styled.TextInput<{fontSize?:number}>`
  ${littlePaddingSharedStyle}
  color: ${props=>props.theme.textColor};
  /* font-family: ${props=>props.theme.boldFontFamily}; */
  ${props=>getCSSFontStyle(props.theme.boldFontFamily,props.fontSize)}
  /* ${props=>props.fontSize && `font-size:${props.fontSize}px`} */
`;
const FontAppliedBaseTextInputLittlePaddingNeedFontSize = styled.TextInput<{fontSize?:number}>`
  ${littlePaddingSharedStyle}
  color: ${props=>props.theme.textColor};
  /* font-family: ${props=>props.theme.mediumFontFamily}; */
  ${props=>getCSSFontStyle(props.theme.mediumFontFamily,props.fontSize)}
  /* ${props=>props.fontSize && `font-size:${props.fontSize}px`} */
`;
const FontAppliedLightTextInputLittlePaddingNeedFontSize = styled.TextInput<{fontSize?:number}>`
  ${littlePaddingSharedStyle}
  color: ${props=>props.theme.textColor};
  /* font-family: ${props=>props.theme.lightFontFamily}; */
  ${props=>getCSSFontStyle(props.theme.lightFontFamily,props.fontSize)}
  /* ${props=>props.fontSize && `font-size:${props.fontSize}px`} */
`;


export {
  FontAppliedBoldTextNeedFontSize,
  FontAppliedBaseTextNeedFontSize,
  FontAppliedLightTextNeedFontSize,
  FontAppliedBoldTextInputNeedFontSize,
  FontAppliedBaseTextInputNeedFontSize,
  FontAppliedLightTextInputNeedFontSize,
  FontAppliedBoldTextLittlePaddingNeedFontSize,
  FontAppliedBaseTextLittlePaddingNeedFontSize,
  FontAppliedLightTextLittlePaddingNeedFontSize,
  FontAppliedBoldTextInputLittlePaddingNeedFontSize,
  FontAppliedBaseTextInputLittlePaddingNeedFontSize,
  FontAppliedLightTextInputLittlePaddingNeedFontSize,
};