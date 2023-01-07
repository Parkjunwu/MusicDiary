import { ApolloCache } from "@apollo/client";
import { GET_CALENDAR_MONTHLY_DATA } from "../gql/manyWriteQuery";
import { autoLogin_autoLogin_loggedInUser } from "../__generated__/autoLogin";

const updateThisMonthCalendarData = (cache:ApolloCache<any>,loggedInUser:autoLogin_autoLogin_loggedInUser | null) => {
  // 근데 지금은 받았으니까 캐시가 있을라나? 아님 아직 없을라나? 없어도 ref 형식으로 넣으면 알아서 받아질라나?
  // 글고 modify 는 기존에 캐시가 없으면 안써지지 않나? 뭐 근데 그래봐야 얼마 안되기는 하는데.
  // 아 writeQuery 를 쓰면 되겠구나. 이거였네. me 도 그냥 writeQuery 써도 됬었군.
  const date = new Date();
  const nowYear = date.getFullYear();
  const nowMonth = date.getMonth()+1;
  const writeResult = cache.writeQuery({
    query: GET_CALENDAR_MONTHLY_DATA,
    data: { // Contains the data to write
      getCalendarMonthlyData: loggedInUser?.thisMonthData
    },
    variables: {
      year: nowYear,
      month: nowMonth,
    },
  });
  // console.log("writeResult : "+JSON.stringify(writeResult));
  // console.log("loggedInUser?.thisMonthData  : "+ JSON.stringify(loggedInUser?.thisMonthData))
};

export default updateThisMonthCalendarData;