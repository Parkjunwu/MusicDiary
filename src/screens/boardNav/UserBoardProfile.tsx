import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { isLoggedInVar } from "../../apollo";
import UserBoardProfileForLogInUser from "../../components/boardNav/userBoardProfile/UserBoardProfileForLogInUser";
import UserBoardProfileForNotLogInUser from "../../components/boardNav/userBoardProfile/UserBoardProfileForNotLogInUser";
import { BoardTabStackParamsList } from "../../types/navigation/homeNavStackParamsList";

type UserBoardProfileProps = NativeStackScreenProps<BoardTabStackParamsList, 'UserBoardProfile'>;

const UserBoardProfile = ({route}:UserBoardProfileProps) => {

  const isLoggedIn = isLoggedInVar();

  return (
    isLoggedIn ?
      <UserBoardProfileForLogInUser route={route} />
    :
      <UserBoardProfileForNotLogInUser route={route} />
  )
}
export default UserBoardProfile;