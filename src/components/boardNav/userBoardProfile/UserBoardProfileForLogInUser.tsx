import { useQuery } from "@apollo/client";
import { RouteProp } from "@react-navigation/native";
import React from "react";
import { SEE_PROFILE } from "../../../gql/manyWriteQuery";
import { BoardTabStackParamsList } from "../../../types/navigation/homeNavStackParamsList";
import { seeProfile, seeProfileVariables } from "../../../__generated__/seeProfile";
import BaseLayout from "./BaseLayout";

type Props = {
  route:RouteProp<BoardTabStackParamsList, 'UserBoardProfile'>,
};

const ProfileForLogInUser = ({route}:Props) => {
  // console.log("route")
  // console.log(route)
  const userId = route.params.id;
  // const userName = route.params.userName;

  const {data:userData} = useQuery<seeProfile,seeProfileVariables>(SEE_PROFILE,{
    variables:{
      id:userId,
    },
    fetchPolicy:"cache-and-network",
    nextFetchPolicy:"cache-first",
  });

  // useEffect(()=>{
  //   refetch();
  // },[]);
  
  // return <BaseLayout userData={userData} >
  //   <ComponentForLogIn userId={userId} userName={userName} userData={userData} />
  // </BaseLayout>
  return <BaseLayout userData={userData} />
};

export default ProfileForLogInUser;