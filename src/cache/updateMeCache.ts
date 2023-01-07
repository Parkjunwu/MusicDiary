import { ApolloCache, gql } from "@apollo/client";
import { ME_QUERY } from "../gql/manyWriteQuery";
import { autoLogin_autoLogin_loggedInUser } from "../__generated__/autoLogin";

// 굳이 안써도 될듯. 나중에 게시판 쓸때나 넣으면 될듯
const ME_TO_USER_FRAGMENT = gql`
  # fragment MeFragment on User {
  fragment MeToUserFragment on User {  # LogInUser 로 바꿔서 User 에도 넣을거면 써.
    id
    userName
    # avatar
    # # 프로필에 들어갈 애들
    # bio
    # totalFollowing
    # totalFollowers
  }
`;


// 이걸 useLogIn 에서도 씀.
const updateMeCache = (cache: ApolloCache<any>, loggedInUserData: autoLogin_autoLogin_loggedInUser | null) => {
  logInUserToUserCache(cache, loggedInUserData);
  updateMeCacheOnRootQuery(cache, loggedInUserData);
};

// 굳이 안써도 될듯. 나중에 게시판 쓸때나 넣으면 될듯
const logInUserToUserCache = (cache: ApolloCache<any>, loggedInUserData: autoLogin_autoLogin_loggedInUser | null) => {
  
  if(!loggedInUserData) return undefined; // 타입 맞추기 위해 넣은거. 로직 차이 없음.

  const {
    id,
    userName,
  } = loggedInUserData;

  const typenameChangedData = {
    "__typename":"User",
    id,
    userName,
  };

  cache.writeFragment({
    id: `User:${id}`,
    fragment: ME_TO_USER_FRAGMENT,
    data: typenameChangedData,
  });
};

const updateMeCacheOnRootQuery = (cache: ApolloCache<any>, loggedInUserData: autoLogin_autoLogin_loggedInUser | null) => (
  // cache.modify({
  //   id:"ROOT_QUERY",
  //   fields:{
  //     me(){
  //       return loggedInUserData;
  //     },
  //   },
  // })
  cache.writeQuery({
    query: ME_QUERY,
    data: {me:loggedInUserData},
  }) // 이래 써야돼. cache.modify 로 쓰면 ref 가 안됨.
);


export default updateMeCache;





// 그냥 User 로 쓰던 경우?

// import { ApolloCache, Reference } from "@apollo/client";
// import { ME_FRAGMENT } from "../gql/fragment";
// import { autoLogin_autoLogin_loggedInUser } from "../__generated__/autoLogin";

// // 이걸 useLogIn 에서도 씀.
// const updateMeCache = (cache: ApolloCache<any>, loggedInUserData: autoLogin_autoLogin_loggedInUser | null) => {
//   const ref = meFragmentWriteAndReturnRef(cache, loggedInUserData);
//   updateMeRefOnRootQuery(cache,ref);
// };

// const meFragmentWriteAndReturnRef = (cache: ApolloCache<any>, loggedInUserData: autoLogin_autoLogin_loggedInUser | null) => {
  
//   if(!loggedInUserData) return undefined; // 타입 맞추기 위해 넣은거. 로직 차이 없음.

//   const userId = loggedInUserData.id;
//   // "__typename" 바꿔줌
//   const typenameChangedData = {...loggedInUserData,"__typename":"User"};
//   const ref = cache.writeFragment({
//     id: `User:${userId}`,
//     fragment: ME_FRAGMENT,
//     data: typenameChangedData,
//   });
//   return ref;
// };

// const updateMeRefOnRootQuery = (cache: ApolloCache<any>, ref: Reference | undefined) => (
//   cache.modify({
//     id:"ROOT_QUERY",
//     fields:{
//       me(){
//         return ref;
//       },
//     },
//   })
// );


// export default updateMeCache;