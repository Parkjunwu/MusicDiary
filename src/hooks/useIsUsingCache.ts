import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "../apollo";

// 이럼 되지 않나? 안헷갈리고 나중에 걍 useIsUsingCache 만 삭제해도 됨.
// useReactiveVar 니까 자동 업데이트 같이 될라나?

const useIsUsingCache = () => {
  const isLoggedInMeanUsingCache = useReactiveVar(isLoggedInVar);
  return isLoggedInMeanUsingCache;
};

export default useIsUsingCache;