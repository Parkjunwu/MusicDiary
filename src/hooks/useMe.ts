import { QueryResult, useQuery } from "@apollo/client";
import { ME_QUERY } from "../gql/manyWriteQuery";
import { me } from "../__generated__/me";

type MeType = () => QueryResult<me, undefined>

// 그냥 logIn 할때 똑같이 유저 정보를 줘서 me 에 세팅함 autoLogIn 처럼

const useMe: MeType = () => {
  
  const queryResult = useQuery<me,undefined>(ME_QUERY);
  // queryResult 안에 { data, subscribeToMore } 이런거 있음
  
  return queryResult;
};

export default useMe;

// import { ApolloQueryResult, useQuery } from "@apollo/client";
// import { useEffect } from "react";
// import { isLoggedInVar } from "../apollo";
// import { ME_QUERY } from "../gql/forCodeGen";
// import { me_me } from "../__generated__/me";
// import useLogOut from "./useLogOut";

// const useMe: MeType = () => {
//   // 쿼리는 gql/forCodeGen 에 있음
//   const { data, refetch } = useQuery<{me:me_me}>(ME_QUERY,{
//     skip: !isLoggedInVar(),
//     onCompleted:()=>{
//       console.log("me get")
//     }
//   });
  
//   const logOut = useLogOut();

//   const logUserOut = async () => {
//     await logOut();
//   };

//   useEffect(()=>{
//     if(data?.me?.id === null ) {
//       logUserOut();
//       console.log("useMe logUserOut")
//     }
//   },[data]);
  
//   return { data, refetch };
// };