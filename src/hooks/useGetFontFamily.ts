import { useReactiveVar } from "@apollo/client";
import { fontFamilyVar } from "../apollo";

// 폰트 별로 확인해야함. GmarketSansTTF 는 세개 있음.
// 근데 이건지 styled Component 인지 한번 만들어지면 다시 안받는듯. 훅 넣어야 하나?
const useGetFontFamily = (fontWeight: "Bold" | "Medium" | "Light") => {
  // 이걸 전역으로 받아야 겠네. use 뭐시기에 써야함.
  const getFontFamily = useReactiveVar(fontFamilyVar);
  // const getFontFamily = fontFamilyFileName ?? fontFamilyVar();
  // const getFontFamily = fontFamilyFileName ?? localFont;
  if(getFontFamily === "GmarketSansTTF") {
    return getFontFamily + fontWeight;
  } else {
    return getFontFamily;
  }
};

export default useGetFontFamily;