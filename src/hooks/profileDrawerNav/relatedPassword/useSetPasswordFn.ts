import { useCallback } from "react";

const useSetPasswordFn = (setPassword: (value: React.SetStateAction<number[]>) => void) => {
  const writePassword = useCallback(
    (nowNumber:number) => setPassword(prev=>prev.length === 6 ? [...prev] : [...prev,nowNumber])
    ,[]
  );

  const deletePassword = useCallback(
    () => setPassword(prev=>{
      const newArr = [...prev];
      newArr.pop();
      return newArr;
    })
    ,[]
  );

  return {
    writePassword,
    deletePassword,
  };
};

export default useSetPasswordFn;