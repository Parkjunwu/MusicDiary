import { useEffect, useRef } from 'react';

const useRefInterval = (callback:Function, delay:number) => {
  const savedCallback = useRef<Function>(); // 최근에 들어온 callback을 저장할 ref를 하나 만든다.

  const intervalFn = useRef<NodeJS.Timer>(); // 최근에 들어온 callback을 저장할 ref를 하나 만든다.

  function tick() {
    if(typeof savedCallback.current === "function"){
      savedCallback.current(); // tick이 실행되면 callback 함수를 실행시킨다.
    }
  }

  useEffect(() => {
    clearInterval(intervalFn.current);
    savedCallback.current = callback; // callback이 바뀔 때마다 ref를 업데이트 해준다.
    // intervalFn.current = setInterval(tick, delay); // delay에 맞추어 interval을 새로 실행시킨다.
    // return () => clearInterval(intervalFn.current); // 
  }, [callback]);

  useEffect(() => {
    clearInterval(intervalFn.current);
    
    if (delay !== null) { // 만약 delay가 null이 아니라면 
      intervalFn.current = setInterval(tick, delay); // delay에 맞추어 interval을 새로 실행시킨다.
      return () => clearInterval(intervalFn.current); // unmount될 때 clearInterval을 해준다.
    }
  }, [delay,callback]); // delay가 바뀔 때마다 새로 실행된다.
};

export default useRefInterval;