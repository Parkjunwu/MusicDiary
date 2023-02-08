// import { Reference } from "@apollo/client";

import { FieldPolicy } from "@apollo/client";

export const cursorPaginationCanGetAnotherQueryNeedDataFieldNameAndKeyArgsIfHave = (dataFieldName:string,keyArgs?:string) => {
  return {
    // keyArgs 를 지정하면 얘를 기준으로 캐시 저장할 수 있음. keyArgs 가 다른 여러개로 나눠서 저장 가능. 나눌 필요 없는 애면 없고.
    ...(keyArgs && {keyArgs:[keyArgs]}),
    merge(existing, incoming) {
      // fetchMore 말고 subscription 이나 댓글 작성시
      if(incoming.isNotFetchMore) {
        return incoming;
      }
      // 무조건 type 형식이 맞아야함.... ㅅㅂ 안되서 개삽질했네. ...incomingRest 이걸로 맞춰라 바꿀꺼 빼고
      const { [dataFieldName]:data, ...incomingRest } = incoming;
      const mergedData = (existing && existing[dataFieldName]) ? [ ...existing[dataFieldName], ...data ] : [ ...data ];
      return {
        [dataFieldName]:mergedData,
        ...incomingRest,
      };
    },

    read(existing) {
      if (existing) {
        return { ...existing };
      }
    },
  }
};


// interface seeComments_seeComments {
//   __typename: "SeeCommentsResponse";
//   cursorId: number | null;
//   hasNextPage: boolean | null;
//   comments: (Reference | null)[] | null;
//   error: string | null;
//   isNotFetchMore: boolean;
// };
// // 얘는 얘는 이유는 모르겠는데 refetch 가 existing 을 받음. 그래서 따로 만듦 
// export const cursorPaginationForSeeComments = () => {
//   return {
//     keyArgs: ["postId"],
//     merge(existing:seeComments_seeComments, incoming:seeComments_seeComments) {
//       // fetchMore 말고 subscription 이나 댓글 작성시 , 이전 캐시 없을 시
//       if(incoming.isNotFetchMore || !existing || existing.comments.length === 0) {
//         return incoming;
//       }
//       const { comments:incomingComments, ...incomingRest } = incoming;
//       const { comments:existingComments, ...existingRest } = existing;

//       // 겹치는 애 뺌
//       const notOverlapData = incomingComments.filter((incomingComment) => !(existingComments.find(existingComment=> existingComment.__ref === incomingComment.__ref)));

//       const mergedData = [ ...existing.comments, ...notOverlapData ];
      
//       return {
//         comments:mergedData,
//         ...incomingRest,
//       };
//     },

//     read(existing) {
//       if (existing) {
//         return { ...existing };
//       }
//     },
//   };
// };

// export const forSeeBlockUsers = (dataFieldName:string,keyArgs?:string) => {
//   return {
//     // keyArgs 를 지정하면 얘를 기준으로 캐시 저장할 수 있음. keyArgs 가 다른 여러개로 나눠서 저장 가능. 나눌 필요 없는 애면 없고.
//     ...(keyArgs && {keyArgs:[keyArgs]}),
//     merge(existing, incoming) {
//       // fetchMore 말고 subscription 이나 댓글 작성시
//       if(incoming.isNotFetchMore) {
//         return incoming;
//       }
//       // 무조건 type 형식이 맞아야함.... ㅅㅂ 안되서 개삽질했네. ...incomingRest 이걸로 맞춰라 바꿀꺼 빼고
//       const { [dataFieldName]:data, ...incomingRest } = incoming;
//       const mergedData = (existing && existing[dataFieldName]) ? [ ...existing[dataFieldName], ...data ] : [ ...data ];
//       return {
//         [dataFieldName]:mergedData,
//         ...incomingRest,
//       };
//     },

//     read(existing) {
//       if (existing) {
//         // isNotFetchMore 를 넣어줘야함. local only field 에도 넣고
//         return { ...existing, isNotFetchMore:Boolean(existing.isNotFetchMore) };
//       }
//     },
//   }
// };

// mutation, subscription 을 받아서 고치고 싶어. 그러면 typePolicies 를 cursorPaginationCanGetAnotherQueryNeedDataFieldNameAndKeyArgsIfHave 로 바꾸고 백엔드에 resolver 에서 response 에 isNotFetchMore:() => false 추가. gql 에도 isNotFetchMore 추가.
// 위에꺼 그대로 써도 되긴 함. 어차피 incoming.isNotFetchMore 만 확인하는 건데 여기도 없음.
export const cursorPaginationNeedDataFieldNameAndKeyArgsIfHave = (dataFieldName:string,keyArgs?:string) => {
  return {
    // keyArgs 를 지정하면 얘를 기준으로 캐시 저장할 수 있음. keyArgs 가 다른 여러개로 나눠서 저장 가능. 나눌 필요 없는 애면 없고.
    ...(keyArgs && {keyArgs:[keyArgs]}),
    merge(existing, incoming) {
      // 무조건 type 형식이 맞아야함.... ㅅㅂ 안되서 개삽질했네. ...incomingRest 이걸로 맞춰라 바꿀꺼 빼고
      const { [dataFieldName]:data, ...incomingRest } = incoming;
      const mergedData = (existing && existing[dataFieldName]) ? [ ...existing[dataFieldName], ...data ] : [ ...data ];
      return {
        [dataFieldName]:mergedData,
        ...incomingRest,
      };
    },

    read(existing) {
      if (existing) {
        return { ...existing };
      }
    },
  }
};

// 원래는
// getRoomMessages: {
//   // keyArgs 를 지정하면 각 방마다 캐시 저장할 수 있음. 안하면 마지막에 들어갔던 방만 유지. 아닌듯? 걍해도 되네?
//   keyArgs: ["roomId"],
//   merge(existing, incoming) {
//     // fetchMore 말고 subscription 이나 댓글 작성시
//     if(incoming.isNotFetchMore) {
//       return incoming;
//     }
//     // 무조건 type 형식이 맞아야함.... ㅅㅂ 안되서 개삽질했네. ...incomingRest 이걸로 맞춰라 바꿀꺼 빼고
//     const { messages:incomingMessages, ...incomingRest } = incoming;
//     const messages = existing?.messages ? [ ...existing.messages, ...incomingMessages ] : [ ...incomingMessages ];
//     return {
//       messages,
//       ...incomingRest,
//     };
//   },

//   read(existing) {
//     if (existing) {
//       return { ...existing };
//     }
//   },
// }






// cursorPagination 쓰는 query 목록
// // SyncDiary 에서 getMyDiaryList 바꿔야해서 export 함.
// export const isFirstFetchMap: {[key:string]:boolean} = {
//   getMyDiaryList: true,
//   seeUserNotificationList: true,
//   searchMyDiaries: true, // 얘 keyArgs
//   // board
//   seeNewBoardList: true,
//   searchBoards: true, // 얘 keyArgs
//   seeBoardCommentOfComments: true, // 얘 keyArgs
//   getMyBoardList: true,
//   getUserPostList: true,
//   seeBlockUsers: true,
//   seeBoardLikes: true,
//   seeBoardCommentLikes: true,
//   seeBoardCommentOfCommentLikes: true,
// };

export const alreadyFetchedQuerySet = new Set();

// search, CommentOfComments 같은거는 키워드 따라서 pagination 이 달라야 하는데

// 이건 쓸일 없을 듯? 로그아웃 하면 캐시가 다 리셋되니까
// export const setAllIsFirstFetchToTrue = () => {
//   for (const key in isFirstFetchMap) {
//     isFirstFetchMap[key] = true;
//   }
// };

// 그리고 board 는 로그아웃/로그인 해도 유지되는게 좋긴 한데
// read 에서 isNotFetchMore 넣어야 되서 하나로 합치는건 안될듯.

type cursorPaginationPreventCacheDoubleType = (
  queryName: string,
  dataFieldName: string,
  keyArgs?: string,
) => FieldPolicy<any>

export const cursorPaginationPreventCacheDouble: cursorPaginationPreventCacheDoubleType = (
  queryName,
  dataFieldName,
  keyArgs,
) => {
  return {
    // keyArgs 를 지정하면 얘를 기준으로 캐시 저장할 수 있음. keyArgs 가 다른 여러개로 나눠서 저장 가능. 나눌 필요 없는 애면 없고.
    ...(keyArgs && {keyArgs:[keyArgs]}),
    merge(existing, incoming, { args }) {
      // if(isFirstFetchMap[queryName]) {
      //   isFirstFetchMap[queryName] = false;
      //   return incoming;
      // }
      const firstFetchSearchName = keyArgs ? queryName + "-" + args?.[keyArgs] : queryName;
      if(!alreadyFetchedQuerySet.has(firstFetchSearchName)){
        alreadyFetchedQuerySet.add(firstFetchSearchName);
        return incoming;
      }
      // // 추가. seeUserNotificationList 위해서
      // if(incoming.isNotFetchMore) {
      //   return incoming;
      // } // 여기까지

      // 무조건 type 형식이 맞아야함.... ㅅㅂ 안되서 개삽질했네. ...incomingRest 이걸로 맞춰라 바꿀꺼 빼고
      const { [dataFieldName]:data, ...incomingRest } = incoming;
      const mergedData = (existing && existing[dataFieldName]) ? [ ...existing[dataFieldName], ...data ] : [ ...data ];
      return {
        [dataFieldName]:mergedData,
        ...incomingRest,
      };
    },

    read(existing) {
      if (existing) {
        return { ...existing };
      }
    },
  }
};

export const cursorPaginationPreventCacheDoubleWithIsNotFetchMore: cursorPaginationPreventCacheDoubleType = (
  queryName,
  dataFieldName,
  keyArgs,
) => {
  return {
    // keyArgs 를 지정하면 얘를 기준으로 캐시 저장할 수 있음. keyArgs 가 다른 여러개로 나눠서 저장 가능. 나눌 필요 없는 애면 없고.
    ...(keyArgs && {keyArgs:[keyArgs]}),
    merge(existing, incoming, { args }) {
      // 추가. isNotFetchMore 로 들어오면 그대로.
      // 순서를 위로 놓음. 처음에 list 안받고 업로드 하면 쿼리 받은게 아니라
      if(incoming.isNotFetchMore) {
        return incoming;
      } // 여기까지

      // if(isFirstFetchMap[queryName]) {
      //   isFirstFetchMap[queryName] = false;
      //   return incoming;
      // }
      const firstFetchSearchName = keyArgs ? queryName + "-" + args?.[keyArgs] : queryName;
      if(!alreadyFetchedQuerySet.has(firstFetchSearchName)){
        alreadyFetchedQuerySet.add(firstFetchSearchName);
        return incoming;
      }

      // 무조건 type 형식이 맞아야함.... ㅅㅂ 안되서 개삽질했네. ...incomingRest 이걸로 맞춰라 바꿀꺼 빼고
      const { [dataFieldName]:data, ...incomingRest } = incoming;
      const mergedData = (existing && existing[dataFieldName]) ? [ ...existing[dataFieldName], ...data ] : [ ...data ];
      return {
        [dataFieldName]:mergedData,
        ...incomingRest,
      };
    },

    read(existing) {
      if (existing) {
        // return { ...existing };
        // isNotFetchMore 를 넣어줘야함. local only field 에도 넣고
        return { ...existing, isNotFetchMore: Boolean(existing.isNotFetchMore) };
      }
    },
  }
};


type editedCursorPaginationWithIsNotFetchMoreType = (dataFieldName: string, keyArgs?: string) => FieldPolicy<any>

// getMyBoardList 용. 근데 이걸로 해야할듯?
export const editedCursorPaginationWithIsNotFetchMore: editedCursorPaginationWithIsNotFetchMoreType = (
  dataFieldName,
  keyArgs,
) => {
  return {
    // keyArgs 를 지정하면 얘를 기준으로 캐시 저장할 수 있음. keyArgs 가 다른 여러개로 나눠서 저장 가능. 나눌 필요 없는 애면 없고.
    ...(keyArgs && {keyArgs:[keyArgs]}),
    merge(existing, incoming, { args }) {
      // 추가. isNotFetchMore 로 들어오면 그대로.
      // 순서를 위로 놓음. 처음에 list 안받고 업로드 하면 쿼리 받은게 아니라
      if(incoming.isNotFetchMore) {
        return incoming;
      } // 여기까지

      // const firstFetchSearchName = keyArgs ? queryName + "-" + args?.[keyArgs] : queryName;
      // if(!alreadyFetchedQuerySet.has(firstFetchSearchName)){
      //   alreadyFetchedQuerySet.add(firstFetchSearchName);
      //   return incoming;
      // }

      // 무조건 type 형식이 맞아야함.... ㅅㅂ 안되서 개삽질했네. ...incomingRest 이걸로 맞춰라 바꿀꺼 빼고
      if(!args.cursorId) {
        return incoming;
      } else {
        const { [dataFieldName]:data, ...incomingRest } = incoming;
        const mergedData = (existing && existing[dataFieldName]) ? [ ...existing[dataFieldName], ...data ] : [ ...data ];
        return {
          [dataFieldName]:mergedData,
          ...incomingRest,
        };
      }
    },

    read(existing) {
      if (existing) {
        // return { ...existing };
        // isNotFetchMore 를 넣어줘야함. local only field 에도 넣고
        return { ...existing, isNotFetchMore: Boolean(existing.isNotFetchMore) };
      }
    },
  }
};

// Search 용
type cursorPaginationForSearchNeedDataFieldNameType = (
  dataFieldName: string,
) => FieldPolicy<any>

export const cursorPaginationForSearchNeedDataFieldName: cursorPaginationForSearchNeedDataFieldNameType = (
  dataFieldName,
) => {
  return {
    // keyArgs 를 지정하면 얘를 기준으로 캐시 저장할 수 있음. keyArgs 가 다른 여러개로 나눠서 저장 가능. 나눌 필요 없는 애면 없고.
    keyArgs:["keyword"],
    merge(existing, incoming, { args: { cursorId }}) {

      if(!cursorId) {
        return incoming;
      } else {
        // 무조건 type 형식이 맞아야함.... ㅅㅂ 안되서 개삽질했네. ...incomingRest 이걸로 맞춰라 바꿀꺼 빼고
        const { [dataFieldName]:data, ...incomingRest } = incoming;
        const mergedData = (existing && existing[dataFieldName]) ? [ ...existing[dataFieldName], ...data ] : [ ...data ];
        return {
          [dataFieldName]:mergedData,
          ...incomingRest,
        };
      }
    },

    read(existing) {
      if (existing) {
        return { ...existing };
      }
    },
  }
};