// import original module declarations
import 'styled-components/native';
;

type boldFontFamilyName = "ChosunCentennial" | "KITA" | "YANGJIN" | "GmarketSansTTFBold";
type mediumFontFamilyName = "ChosunCentennial" | "KITA" | "YANGJIN" | "GmarketSansTTFMedium";
type lightFontFamilyName = "ChosunCentennial" | "KITA" | "YANGJIN" | "GmarketSansTTFLight";

// and extend them!
declare module 'styled-components/native' {
  export interface DefaultTheme {
    backgroundColor: string;
    textColor: string;
    textInputBackgroundColor: string;
    linkTextColor: string;
    // boldFontFamily: string;
    // mediumFontFamily: string;
    // lightFontFamily: string;
    boldFontFamily: boldFontFamilyName;
    mediumFontFamily: mediumFontFamilyName;
    lightFontFamily: lightFontFamilyName;
  }
}