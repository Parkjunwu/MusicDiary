import { GET_SINGLE_VIDEO_END_POINT } from "../../youtubeAPI/constant";

const getYoutubeMetaData = async(youtubeIdArr:string[]) => {

  const youtubeIdListWithComma = youtubeIdArr.toString();
  // items 에서 id, title, thumbnails 만 받도록 한거. thumbnails/default 가 제일 작은 썸네일. 그리고 혹시라도 없을 수 있어서 id 도 같이 받음.
  const fetchUrl = `${GET_SINGLE_VIDEO_END_POINT}?id=${youtubeIdListWithComma}&key=AIzaSyCcKIhVVKArTVQfv8EsHepaGX946cOe_d4&fields=items(id,snippet(title,thumbnails(default(url))))&part=snippet`;
  try {
    const { items }: fetchResultType = await (await fetch(fetchUrl)).json();

    // { items: [] } 이렇게 나옴.
    // if(items.length === 0) return { error:"해당 유튜브 영상이 존재하지 않습니다." };
    if(items.length === 0) return "해당 유튜브 영상이 존재하지 않습니다.";

    const cleanUpArray = items.map(ytData => {
      // 얘는 thumbnails 로 받음. 그걸 thumbNail 로 보내니까 혹시 이상하면 이거 확인
      const { id, snippet: { title, thumbnails: { default: { url } } } } = ytData;
      return {
        id,
        title,
        thumbNail: url,
      };
    });

    // return { result:cleanUpArray };
    return cleanUpArray;

  } catch(e) {
    console.error("getYoutubeMetaData 에러 : "+e);
    // return { error:"유튜브 정보를 받지 못하였습니다." };
    return "유튜브 정보를 받지 못하였습니다.";
  }
};

export default getYoutubeMetaData;


type eachYoutubeDataType = {
  id: string,
  snippet:{
    title: string,
    thumbnails: {
      default: {
        url: string,
      }
    }
  }
};

type fetchResultType = {
  items: eachYoutubeDataType[]
};

// 결과물
// https://www.googleapis.com/youtube/v3/videos?id=kqAzZKp0Ylc,dfNKc1eCHMc&key=AIzaSyCcKIhVVKArTVQfv8EsHepaGX946cOe_d4&fields=items(id,snippet(title,thumbnails(default(url))))&part=snippet
// {
//   items: [
//     {
//       id: "kqAzZKp0Ylc",
//       snippet: {
//         title: "런닝맨급발진",
//         thumbnails: {
//           default: {
//             url: "https://i.ytimg.com/vi/kqAzZKp0Ylc/default.jpg"
//           }
//         }
//       }
//     },
//     {
//       id: "dfNKc1eCHMc",
//       snippet: {
//         title: "이렇게하는거맞아?",
//         thumbnails: {
//           default: {
//             url: "https://i.ytimg.com/vi/dfNKc1eCHMc/default.jpg"
//           }
//         }
//       }
//     }
//   ]
// }