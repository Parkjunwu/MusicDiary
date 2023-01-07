import { useEffect, useRef } from "react";
import { AppState, NativeEventSubscription } from "react-native";
import useEditDiaryCheckAndNavigate from "./useEditDiaryCheckAndNavigate";
// import useVersionCheckAndCodePushWithEditDiaryCheckAndNavigate from "./useVersionCheckAndCodePushWithEditDiaryCheckAndNavigate";
import versionCheckAndCodePush from "./versionCheckAndCodePush";

const useOnFirstOrBackground30MinuteThenVersionCheckAndCodePush = () => {

  const appState = useRef(AppState.currentState);
  const goToBackgroundTime = useRef<Date>();

  // const versionCheckAndCodePush = useVersionCheckAndCodePushWithEditDiaryCheckAndNavigate(); // 추가. 확인

  const editDiaryCheckAndNavigate = useEditDiaryCheckAndNavigate();
  
  useEffect(() => {

    let subscription: NativeEventSubscription | undefined;

    // if(process.env.NODE_ENV==="production") { // 프로덕션에서만

      versionCheckAndCodePush()
        .then(()=>editDiaryCheckAndNavigate()); // 처음에 받음. 얘는 navigate 까지 함.

      // const subscription = AppState.addEventListener("change", nextAppState => {
      subscription = AppState.addEventListener("change", nextAppState => {
        // console.log("appState.current  : "+ appState.current);
        // console.log("nextAppState  : "+ nextAppState);
        if ( appState.current === "active" && nextAppState === "background" ) {
          goToBackgroundTime.current = new Date();
        }
        if ( appState.current === "background" && nextAppState === "active" ) {
          const comeBackForegroundTime = new Date();
          const backgroundTime = comeBackForegroundTime - goToBackgroundTime.current;
          const isOver30Minutes = backgroundTime > 1800000;
          // console.log("backgroundTime : " + (backgroundTime));
          // console.log("isOver30Minutes : " + (isOver30Minutes));
          if(goToBackgroundTime && isOver30Minutes) {
            // 만약 upload edit 에 있으면 임시저장하는 로직.
            versionCheckAndCodePush();
          }
          goToBackgroundTime.current = undefined;
        }
        if(nextAppState === "background" || nextAppState === "active") {
          appState.current = nextAppState;
        }
      });
    // }

    return () => {
      subscription?.remove();
    };
  }, []);
};


export default useOnFirstOrBackground30MinuteThenVersionCheckAndCodePush;