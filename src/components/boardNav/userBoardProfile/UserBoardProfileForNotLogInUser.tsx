import { useQuery } from "@apollo/client";
import { RouteProp, useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { SEE_PROFILE } from "../../../gql/manyWriteQuery";
import { BoardTabStackParamsList } from "../../../types/navigation/homeNavStackParamsList";
import { seeProfile, seeProfileVariables } from "../../../__generated__/seeProfile";
import BaseLayout from "./BaseLayout";

type Props = {
  route: RouteProp<BoardTabStackParamsList, 'UserBoardProfile'>,
};

const ProfileForNotLogInUser = ({route}:Props) => {
  const {data:userData,refetch} = useQuery<seeProfile,seeProfileVariables>(SEE_PROFILE,{
    variables:{
      id:route.params.id
    },
    fetchPolicy:"cache-and-network",
    nextFetchPolicy:"cache-first",
  });

  const userName = route.params.userName;
  const navigation = useNavigation();

  // 헤더에 이름 넣음
  useEffect(()=>{
    navigation.setOptions({
      title:`${userName} 님의 프로필`,
    });
  },[]);

  // useEffect(()=>{
  //   refetch();
  // },[]);

  return <BaseLayout userData={userData} />
};

export default ProfileForNotLogInUser;