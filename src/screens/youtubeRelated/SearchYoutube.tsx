import { useRef, useState } from "react";
// import BaseContainer from "../../components/shared/BaseContainer";
import UploadHorizontalEmptyLayoutForBigScreenNeedScreenWidth from "../../components/upload/UploadHorizontalEmptyLayoutForBigScreenNeedScreenWidth";
import Results_DrawerNav from "../../components/youtubeRelated/searchYoutube/Results_DrawerNav";
import Results_UploadAndEditDiary from "../../components/youtubeRelated/searchYoutube/Results_UploadAndEditDiary";
import SearchBar from "../../components/youtubeRelated/searchYoutube/SearchBar";

// const SearchYoutube = ({route:{params:{routeFrom,diaryId}}}:{route:{params:{routeFrom:"UploadDiary" | "EditDiary" | "MyDiaryNav" | "EditDiaryForTemporaryDiaryData",diaryId?:number}}}) => {
const SearchYoutube = ({route:{params:{routeFrom,diaryId}}}:{route:{params:{routeFrom:"UploadDiary" | "EditDiary" | "DrawerNav" | "EditDiaryForTemporaryDiaryData",diaryId?:number}}}) => {

  // const routeFromMyDiaryNav = routeFrom === "MyDiaryNav";
  const routeFromDrawerNav = routeFrom === "DrawerNav";

  const [nowSearchingKeyword,setNowSearchingKeyword] = useState<string>("");

  const [searchData,setSearchData] = useState<Array<any>>([]);

  const pageToken = useRef("");

  return (
    // <BaseContainer>
    <UploadHorizontalEmptyLayoutForBigScreenNeedScreenWidth>
      <SearchBar
        setSearchData={setSearchData}
        setNowSearchingKeyword={setNowSearchingKeyword}
        pageToken={pageToken}
      />
      {/* <Results
        searchData={searchData}
        setSearchData={setSearchData}
        nowSearchingKeyword={nowSearchingKeyword}
        pageToken={pageToken}
      /> */}
      {
        // routeFromMyDiaryNav ?
        routeFromDrawerNav ?
          // <Results_MyDiaryNav
          <Results_DrawerNav
            searchData={searchData}
            setSearchData={setSearchData}
            nowSearchingKeyword={nowSearchingKeyword}
            pageToken={pageToken}
            diaryId={diaryId}
          />
        :
          <Results_UploadAndEditDiary
            searchData={searchData}
            setSearchData={setSearchData}
            nowSearchingKeyword={nowSearchingKeyword}
            pageToken={pageToken}
            routeFrom={routeFrom}
          />
          
      }
    {/* </BaseContainer> */}
    </UploadHorizontalEmptyLayoutForBigScreenNeedScreenWidth>
  );
};

export default SearchYoutube;