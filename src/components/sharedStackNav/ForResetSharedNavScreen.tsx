import { useReactiveVar } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { isLoggedInVar } from "../../apollo";
import useTimeout from "../../hooks/useTimeOut";
import BaseContainer from "../shared/BaseContainer";

// 로그인 로그아웃 시에 이전의 화면에 머물러 있는 걸 리셋 시키기 위함. 지금은 NewPetLogList 에만 쓰는데 다른데도 쓰일듯?
const ForResetSharedNavScreen = ({children}:{children:React.ReactNode}) => {

  const isLoggedIn = useReactiveVar(isLoggedInVar);

  const [resetScreen,setResetScreen] = useState(false);

  useTimeout(()=>{
    setResetScreen(false);
  },resetScreen ? 1 : null);

  useEffect(()=>{
    setResetScreen(true);
  },[isLoggedIn]);

  return (
    <BaseContainer>
      {resetScreen ? null : children}
    </BaseContainer>
  );
};

export default ForResetSharedNavScreen;