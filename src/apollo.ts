import { ApolloClient, InMemoryCache, makeVar, split, fromPromise } from "@apollo/client";
import EncryptedStorage from 'react-native-encrypted-storage';
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from "@apollo/client/utilities";
import {onError} from "@apollo/client/link/error"
import { createUploadLink } from "apollo-upload-client";
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { cursorPaginationForSearchNeedDataFieldName, cursorPaginationPreventCacheDouble, cursorPaginationPreventCacheDoubleWithIsNotFetchMore, editedCursorPaginationWithIsNotFetchMore } from "./cursorPagination";
import { realmDiaryType } from "./types/realm/realmDiaryType";
import Config from "react-native-config";

// 토큰 상수
export const REFRESH_TOKEN = "refreshToken"

// 유저 로그인 여부
export const isLoggedInVar = makeVar(false);
// 토큰의 여부. 걍 변수로 써도 될듯.
export const accessTokenVar = makeVar<string>("");

export const moveDeleteAccountComplete = makeVar<boolean>(false);

// Calendar 에서 MyDiary 들어왔을 경우 뒤로가면 다시 Calendar 로 가기 위함.
// export const isFromCalendarVar = makeVar<boolean>(false);
// 얘도 근데 변수로 써도 될듯
export type fromWhereType = "Calendar"|"MyDiaryList"|"SearchMyDiaries"|"TodayDiary";

export const fromWhere = makeVar<fromWhereType>("MyDiaryList");

// 폰트. "GmarketSansTTF" 를 그냥 기본값으로 넣음.
// export const fontFamilyVar = makeVar<string>("GmarketSansTTF");
export const fontFamilyVar = makeVar<string>("Cafe24Ssukssuk");


// realm 데이터. state 로 써서 변경 되면 자동으로 업데이트 되게 만들어야 할듯
export const allRealmDiariesVar = makeVar<realmDiaryType[]>([]);

// upload 쓸 때 httpLink
const uploadHttpLink = createUploadLink({
  uri: Config.BACKEND_URL,
});


// 신버전 subscription Link
const wsLink = new GraphQLWsLink(createClient({
  url: Config.BACKEND_WEB_SOCKET_URL,

  connectionParams: () => ({
    // http 헤더는 대문자로 보내도 소문자로 받아짐.
    accesstoken: accessTokenVar(),
  }),
}));


// 인증, 로그인을 위한 Link
const authLink = setContext((_,{headers})=>{
  return {
    headers:{
      ...headers,
      // http 헤더는 대문자로 보내도 소문자로 받아짐. accessToken 으로 보내면 서버의 헤더에선 accesstoken 로 받아짐. 그래서 그냥 안헷갈리게 accesstoken 로 써
      accesstoken:accessTokenVar(),
    }
  }
});


// 쿠키 말고 header 로 쓰면 이렇게 받아야 하나봄.
const getNewToken = async () => {
  try {
    const fetchUrl = Config.REFRESH_URL;
    
    return await fetch(fetchUrl, {
      method: 'GET',
      headers: {
        // Authorization: `Bearer ${getAccessToken()}`,
        'refreshtoken': await EncryptedStorage.getItem(REFRESH_TOKEN) ?? ""
      }
    })
    .then(res => res.json())
    .then(res => {
      console.log("getNewToken : " + res);
      // console.log(res);
      accessTokenVar(res);
      return res
    });

  } catch (error) {
    console.log(error);
  }
};


// 에러 링크. 에러 종류에 따라 콘솔에 표시
const onErrorLink = onError(({graphQLErrors, networkError, operation, forward})=>{
  if (graphQLErrors) {
    console.log("Network Error ",graphQLErrors);
    for (let err of graphQLErrors) {
      switch (err.extensions.code) {
        case "UNAUTHENTICATED":
          return fromPromise(
            getNewToken().catch((error) => {
              // Handle token refresh errors e.g clear stored tokens, redirect to login
              console.error("refreshtoken 에러 : "+error);
              return;
            })
          )
            .filter((value) => Boolean(value))
            .flatMap((accessToken) => {
              console.log("getNewAccessToken : " + accessToken)
              const oldHeaders = operation.getContext().headers;
              // modify the operation context with a new token
              operation.setContext({
                headers: {
                  ...oldHeaders,
                  accessToken
                },
              });
              // console.log("안 된 쿼리 : " + operation.query.definitions)
              return forward(operation);
            });
      }
    }
  }
  if(networkError){
    console.error("Network Error ",networkError)
    // 뺏음. 서버랑 연결 상태보다는 그냥 와이파이, 데이터 연결을 확인하는게 나을듯.
    // Alert.alert("네트워크 연결을 확인해 주시기 바랍니다.")
  }
});


// 캐시
export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        // seeNewPostFeed: offsetLimitPagination(),
        // seeFollowersFeed: offsetLimitPagination(),
        // // 얘는 Pagination 필요 없을 듯
        // // seePetLogComments: offsetLimitPagination(["petLogId"]),
        // // isNotFetchMore 있는 애. 다른 쿼리 들어올 수 있는 애
        // getRoomMessages: cursorPaginationCanGetAnotherQueryNeedDataFieldNameAndKeyArgsIfHave("messages","roomId"),
        // seeRooms:cursorPaginationCanGetAnotherQueryNeedDataFieldNameAndKeyArgsIfHave("rooms"),
        // seePostLikes:cursorPaginationCanGetAnotherQueryNeedDataFieldNameAndKeyArgsIfHave("likeUsers","id"),
        // seeCommentLikes:cursorPaginationCanGetAnotherQueryNeedDataFieldNameAndKeyArgsIfHave("likeUsers","commentId"),
        // seeCommentOfCommentLikes:cursorPaginationCanGetAnotherQueryNeedDataFieldNameAndKeyArgsIfHave("likeUsers","commentOfCommentId"),
        // seeFollowers:cursorPaginationCanGetAnotherQueryNeedDataFieldNameAndKeyArgsIfHave("followers","id"),
        // seeFollowing:cursorPaginationCanGetAnotherQueryNeedDataFieldNameAndKeyArgsIfHave("following","id"),
        // seeUserNotificationList:cursorPaginationCanGetAnotherQueryNeedDataFieldNameAndKeyArgsIfHave("notification"),
        // // 얘는 이유는 모르겠는데 refetch 가 existing 을 받음. 그래서 따로 만듦
        // seeComments:cursorPaginationForSeeComments(),
        // seeCommentOfComments:cursorPaginationCanGetAnotherQueryNeedDataFieldNameAndKeyArgsIfHave("commentOfComments","commentId"),
        // // offsetPagination 으로
        // // seePetLogComments:cursorPaginationCanGetAnotherQueryNeedDataFieldNameAndKeyArgsIfHave("comments","petLogId"),
        // seeNewPetLogList:cursorPaginationCanGetAnotherQueryNeedDataFieldNameAndKeyArgsIfHave("petLogs"),
        // seePetLogCommentOfComments:cursorPaginationCanGetAnotherQueryNeedDataFieldNameAndKeyArgsIfHave("commentOfComments","petLogCommentId"),
        // getMePetLogs:cursorPaginationCanGetAnotherQueryNeedDataFieldNameAndKeyArgsIfHave("petLogs"),

        // // 이걸로 바꾸고 local only field 넣어. 근데 그냥 쓰던거 쓰는게 나을듯.
        // seeBlockUsers:forSeeBlockUsers("users"),

        // // isNotFetchMore 없는 애. 다른 쿼리 못들어옴
        // getUserPosts:cursorPaginationNeedDataFieldNameAndKeyArgsIfHave("posts","userId"),
        // getUserPetLogs:cursorPaginationNeedDataFieldNameAndKeyArgsIfHave("petLogs","userId"),
        // getMePosts:cursorPaginationNeedDataFieldNameAndKeyArgsIfHave("posts"),
        // // getMePetLogs:cursorPaginationNeedDataFieldNameAndKeyArgsIfHave("petLogs"),
        // seeHashTag:cursorPaginationNeedDataFieldNameAndKeyArgsIfHave("posts","name"),
        // searchPosts:cursorPaginationNeedDataFieldNameAndKeyArgsIfHave("posts","keyword"),

        // seeUserNotificationList:cursorPaginationCanGetAnotherQueryNeedDataFieldNameAndKeyArgsIfHave("notification"),
        // getMyDiaryList:cursorPaginationCanGetAnotherQueryNeedDataFieldNameAndKeyArgsIfHave("diaries"),
        // searchMyDiaries:cursorPaginationNeedDataFieldNameAndKeyArgsIfHave("diaries","keyword"),
        
        // seeUserNotificationList:cursorPaginationPreventCacheDoubleWithIsNotFetchMore("seeUserNotificationList","notification"),
        seeUserNotificationList:editedCursorPaginationWithIsNotFetchMore("notification"),
        getMyDiaryList:cursorPaginationPreventCacheDoubleWithIsNotFetchMore("getMyDiaryList","diaries"),
        // seeNewBoardList:cursorPaginationPreventCacheDoubleWithIsNotFetchMore("seeNewBoardList","boards"),
        seeNewBoardList:editedCursorPaginationWithIsNotFetchMore("boards"),
        // search 는 따로 만듦
        searchMyDiaries:cursorPaginationForSearchNeedDataFieldName("diaries"),
        searchBoards:cursorPaginationForSearchNeedDataFieldName("boards"),
        // seeBoardComments:cursorPaginationPreventCacheDoubleWithIsNotFetchMore("seeBoardComments","boards","boardId"), // 얘는 pagination 필요가 없네 딱 페이지만 보여주니까
        seeBoardCommentOfComments:cursorPaginationPreventCacheDoubleWithIsNotFetchMore("seeBoardCommentOfComments","commentOfComments","boardCommentId"),
        getMyBoardList:editedCursorPaginationWithIsNotFetchMore("boards"),
        getUserPostList:cursorPaginationPreventCacheDouble("getUserPostList","boards"),
        seeBlockUsers:cursorPaginationPreventCacheDoubleWithIsNotFetchMore("seeBlockUsers","users"),
        // seeBoardLikes:cursorPaginationPreventCacheDoubleWithIsNotFetchMore("seeBoardLikes","likeUsers"), // 지금은 안씀
        // seeBoardCommentLikes:cursorPaginationPreventCacheDoubleWithIsNotFetchMore("seeBoardCommentLikes","likeUsers"), // 지금은 안씀
        // seeBoardCommentOfCommentLikes:cursorPaginationPreventCacheDoubleWithIsNotFetchMore("seeBoardCommentOfCommentLikes","likeUsers"), // 지금은 안씀
      }
    }
  }
});

// 링크들을 묶어서 하나로
const httpLinks = authLink.concat(onErrorLink).concat(uploadHttpLink)

// subscription 인지 아닌지에 따라 링크 선택해주는 애
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLinks,
);

// client
const client = new ApolloClient({
  link:splitLink,
  cache,
});

export default client;