import { css } from "styled-components/native";
import { fontFileName } from "./constant";

const getStyleSheetFontStyle = (fontFamily:fontFileName,fontSize:number=14) => {
  let letterSpacing: number|undefined = undefined;
  let lineHeight: number|undefined = undefined;
  // let margin = "";
  switch(fontFamily) {
    case "ChosunCentennial":
      // letterSpacing = "";
      break;
    case "GmarketSansTTFBold":
    case "GmarketSansTTFMedium":
    case "GmarketSansTTFLight": 
      letterSpacing = (0.03*fontSize)
      lineHeight = (fontSize*1.23)
      break;
    case "KITA": 
      letterSpacing = (0.05*fontSize)
      break;
    // case "YANGJIN": 
    //   letterSpacing = (0.04*fontSize)
    //   lineHeight = (fontSize*1.3)
    //   break;
    case "Cafe24Syongsyong": 
      fontSize += 3;
      break;
    case "Cafe24Ssukssuk": 
      lineHeight = (fontSize*1.3)
      fontSize += 2;
      break;
    case "RIDIBatang": 
      lineHeight = (fontSize*1.2)
      break;
  }

  return {
    fontFamily,
    fontSize,
    ...( letterSpacing && { letterSpacing }),
    ...( lineHeight && { lineHeight }),
  };
};

const getCSSFontStyle = (fontFamily:fontFileName,fontSize:number=14) => {
  let letterSpacing = "";
  let lineHeight = "";
  // let margin = "";
  switch(fontFamily) {
    case "ChosunCentennial":
      // letterSpacing = "";
      break;
    case "GmarketSansTTFBold":
    case "GmarketSansTTFMedium":
    case "GmarketSansTTFLight": 
      letterSpacing = (0.03*fontSize) + "px";
      lineHeight = (fontSize*1.23)+"px"
      break;
    case "KITA": 
      letterSpacing = (0.05*fontSize) + "px";
      break;
    // case "YANGJIN": 
    //   letterSpacing = (0.04*fontSize) + "px";
    //   lineHeight = (fontSize*1.3)+"px"
    //   break;
    case "Cafe24Syongsyong": 
      fontSize += 3;
      break;
    case "Cafe24Ssukssuk": 
      lineHeight = (fontSize*1.3)+"px"
      fontSize += 2;
      break;
    case "RIDIBatang": 
      lineHeight = (fontSize*1.2)+"px"
      break;
  }

  return css`
    font-family: ${fontFamily};
    font-size: ${fontSize}px;
    ${letterSpacing && `letter-spacing: ${letterSpacing};`}
    ${lineHeight && `line-height: ${lineHeight};`}
  `;
};

export {
  getStyleSheetFontStyle,
  getCSSFontStyle,
};



// 이건 크기조정 할 경우?

// import { Platform } from "react-native";

// const isPad = Platform.OS === "ios" && Platform.isPad;

// const getCSSFontStyle = (fontFamily:fontFileName,fontSize:number=14) => {
//   let letterSpacing = 0;
//   let lineHeight = 0;
//   // let margin = "";
//   switch(fontFamily) {
//     case "ChosunCentennial":
//       // letterSpacing = "";
//       break;
//     case "GmarketSansTTFBold":
//     case "GmarketSansTTFMedium":
//     case "GmarketSansTTFLight": 
//       letterSpacing = (0.03*fontSize)
//       lineHeight = (fontSize*1.23)
//       break;
//     case "KITA": 
//       letterSpacing = (0.05*fontSize)
//       break;
//     // case "YANGJIN": 
//     //   letterSpacing = (0.04*fontSize) + "px";
//     //   lineHeight = (fontSize*1.3)+"px"
//     //   break;
//     case "Cafe24Syongsyong": 
//       fontSize += 3;
//       break;
//     case "Cafe24Ssukssuk": 
//       lineHeight = (fontSize*1.3)
//       fontSize += 2;
//       break;
//     case "RIDIBatang": 
//       lineHeight = (fontSize*1.2)
//       break;
//   }

//   return css`
//     font-family: ${fontFamily};
//     font-size: ${isPad ? fontSize*2 : fontSize}px;
//     ${letterSpacing && `letter-spacing: ${isPad ? letterSpacing*2 : letterSpacing}px;`}
//     ${lineHeight && `line-height: ${isPad ? lineHeight*2 : lineHeight}px;`}
//   `;
// };