import { SEARCH_END_POINT } from "../../../youtubeAPI/constant";
import queryStringFromObj from "./queryStringFromObj";
import Config from "react-native-config";

type fetchSearchProps = {
  searchKeyword: string,
  setSearchData: React.Dispatch<React.SetStateAction<any[]>>,
  pageToken: React.MutableRefObject<string>,
  fetchState: "new" | "fetchMore",
};

const commonQueryObj = {
  videoEmbeddable: true,
  // videoSyndicated: true,
  part: 'snippet',
  maxResults: 10,
  type: 'video',
  videoDefinition: 'high',
  key: Config.YOUTUBE_API_KEY,
};

const fetchSearch = async({
  searchKeyword,
  setSearchData,
  pageToken,
  fetchState,
}: fetchSearchProps) => {

  const isFetchMore = fetchState === "fetchMore";

  const queryObj = {
    ...commonQueryObj,
    q: searchKeyword,
    ...(isFetchMore && { pageToken: pageToken.current }),
  };

  const query = queryStringFromObj(queryObj);

  return fetch(`${SEARCH_END_POINT}?${query}`)
    .then(stream => stream.json())
    .then(fetchData => {

      const nextPageToken = fetchData.nextPageToken;
      if(nextPageToken) {
        pageToken.current = nextPageToken;
      }

      // 여기서 필요한 애들만 뽑아서 넣어도 되겠네. 데이터 다 안넣고
      // const data = fetchData.items.map((item:{id:{videoId:string},key:string})=>{
      //   item.key = item.id.videoId
      //   return item;
      // });
      const data = fetchData.items.map((item:any)=>{
        const newObj = {
          title: item.snippet.title,
          image: item.snippet.thumbnails.high.url,
          vId: item.id.videoId,
          published: item.snippet.publishedAt,
          channelTitle: item.snippet.channelTitle,
        };
        return newObj;
      });

      setSearchData(prev=>{
        const newArr = isFetchMore ? [...prev,...data] : data;
        return newArr;
      });

    })
    .catch((error) => {
      // 에러 인 경우도 화면에 띄워줘야 하는데
      console.error("fetchSearch : "+error);
    });
  // setSearchData(prev=>{
  //   return [
  //     {
  //         "title":"행복 - J.W.P",
  //         "image":"/Users/a/Desktop/music-diary/MusicDiary/src/logic/upload/searchYoutube/1.jpg",
  //         "vId":"5rCoOGkBzY4",
  //         "published":"2022-10-28T08:59:04Z",
  //         "channelTitle":"우리의 인생에도 배경음악을 넣을 수 있다면"
  //     },
  //     {
  //         "title":"모두 행복해져라 얍 - 뚠뚠이",
  //         "image":"/Users/a/Desktop/music-diary/MusicDiary/src/logic/upload/searchYoutube/7.jpg",
  //         "vId":"OyYQJRK0QtY",
  //         "published":"2021-04-17T14:00:01Z",
  //         "channelTitle":"영화가 따로 없었을텐데"
  //     },
  //     {
  //         "title":"",
  //         "image":"/Users/a/Desktop/music-diary/MusicDiary/src/logic/upload/searchYoutube/3.jpg",
  //         "vId":"k3MvfCzfOYM",
  //         "published":"2022-02-18T16:45:05Z",
  //         "channelTitle":"브렌수호대DEBREN"
  //     },
  //   ]
  // });

};


export default fetchSearch;