type BaseResultsProps = {
  searchData: any,
  setSearchData: React.Dispatch<React.SetStateAction<any[]>>,
  nowSearchingKeyword: string,
  pageToken: React.MutableRefObject<string>,
  diaryId?: number,
};

type ResultsUploadAndEditDiaryProps = {
  routeFrom: "UploadDiary" | "EditDiary" | "EditDiaryForTemporaryDiaryData",
} & BaseResultsProps;

// 실제로는 {youtubeId: string, youtubeTitle: string} 나 {diaryId: number,youtubeId: string | null} 들어감
type OnFinishSelectionType = (props: {
  diaryId: any,
  youtubeId: any,
  youtubeTitle: any,
}) => Promise<boolean> | boolean


type ResultsProps = {
  onFinishSelection: OnFinishSelectionType,
} & BaseResultsProps;

export {
  BaseResultsProps,
  ResultsUploadAndEditDiaryProps,
  ResultsProps,
  OnFinishSelectionType
};