import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { quoteType } from "../../../quote/quoteConstants";

type Props = {
  quote: quoteType;
  setSelectedIndexArr: React.Dispatch<React.SetStateAction<number[]>>;
  setSelfQuote: React.Dispatch<React.SetStateAction<string[]>>;
  setSelfQuoteLength: React.Dispatch<React.SetStateAction<number>>;
}

const useGetQuoteSettingAndSet = ({
  quote,
  setSelectedIndexArr,
  setSelfQuote,
  setSelfQuoteLength,
}: Props) => {

  useEffect(()=>{
    const setPrevSetting = async() => {
      const prevIndexArr = await AsyncStorage.getItem(quote.QUOTE_INDEX_ARR);
      const prevUserInputArr = await AsyncStorage.getItem(quote.QUOTE_USER_INPUT_ARR);
      // if(prevIndexArr) setSelectedIndexArr(JSON.parse(prevIndexArr));
      setSelectedIndexArr(JSON.parse(prevIndexArr) ?? quote.indexArr); // 처음에는 선택 안되있어서 null 임. 이때는 전체 다 선택으로
      if(prevUserInputArr) {
        const parsedPrevUserInputArr: string[] = JSON.parse(prevUserInputArr);
        setSelfQuote(parsedPrevUserInputArr);
        setSelfQuoteLength(parsedPrevUserInputArr.length);
      }
    };

    setPrevSetting();
  },[]);
  
};

export default useGetQuoteSettingAndSet;