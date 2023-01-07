
// 폰트 별로 확인해야함. GmarketSansTTF 는 세개 있음.
const getFontFamily = (fontWeight: "Bold" | "Medium" | "Light", fontFamilyFileName: string) => {

  if(fontFamilyFileName === "GmarketSansTTF") {
    return fontFamilyFileName + fontWeight;
  } else {
    return fontFamilyFileName;
  }
};

export default getFontFamily;