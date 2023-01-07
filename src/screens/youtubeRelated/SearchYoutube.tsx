import { useRef, useState } from "react";
import BaseContainer from "../../components/shared/BaseContainer";
import Results_MyDiaryNav from "../../components/youtubeRelated/searchYoutube/Results_MyDiaryNav";
import Results_UploadAndEditDiary from "../../components/youtubeRelated/searchYoutube/Results_UploadAndEditDiary";
import SearchBar from "../../components/youtubeRelated/searchYoutube/SearchBar";

const SearchYoutube = ({route:{params:{routeFrom,diaryId}}}:{route:{params:{routeFrom:"UploadDiary" | "EditDiary" | "MyDiaryNav" | "EditDiaryForTemporaryDiaryData",diaryId?:number}}}) => {

  const routeFromMyDiaryNav = routeFrom === "MyDiaryNav";

  const [nowSearchingKeyword,setNowSearchingKeyword] = useState<string>("");

  const [searchData,setSearchData] = useState<Array<any>>([]);

  const pageToken = useRef("");

  return (
    <BaseContainer>
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
        routeFromMyDiaryNav ?
          <Results_MyDiaryNav
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
    </BaseContainer>
  );
};

export default SearchYoutube;