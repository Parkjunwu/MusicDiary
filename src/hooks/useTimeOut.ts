import { useEffect, useRef } from 'react';

const useTimeout = (callback: Function, delay: number | null) => {
  const savedCallback = useRef<Function>(); // 최근에 들어온 callback을 저장할 ref를 하나 만든다.

  useEffect(() => {
    savedCallback.current = callback; // callback이 바뀔 때마다 ref를 업데이트 해준다.
  }, [callback]);

  useEffect(() => {
    function tick() {
      if(typeof savedCallback.current === "function"){
        savedCallback.current(); // tick이 실행되면 callback 함수를 실행시킨다.
      }
    };

    if (delay !== null) { // 만약 delay가 null이 아니라면 
      let id = setTimeout(tick, delay); // delay에 맞추어 timeout을 새로 실행시킨다.
      return () => {
        console.log("useTimeout END")
        clearInterval(id);
      }; // unmount될 때 clearTimeout을 해준다.
    }
  }, [delay,callback]); // delay가 바뀔 때마다 새로 실행된다.
};

export default useTimeout;