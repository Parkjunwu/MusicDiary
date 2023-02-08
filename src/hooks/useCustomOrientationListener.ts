// import { useRef, useEffect } from 'react';
// import Orientation, { OrientationType } from "react-native-orientation-locker";

// type callbackType = (ori:OrientationType)=>any;

// export const useCustomOrientationListener = (callback:callbackType) => {
//   const savedCallback = useRef<callbackType>();

//   useEffect(() => {
//     savedCallback.current = callback;
//   }, [callback]);

//   useEffect(() => {
//     const listener = (ori:OrientationType) => {
//       savedCallback.current(ori);
//     };

//     Orientation.getDeviceOrientation(initial=>listener(initial));
    
//     Orientation.addDeviceOrientationListener(listener);

//     return () => {
//       Orientation.removeDeviceOrientationListener(listener);
//     };
//   }, []);
// };

// export default useCustomOrientationListener;

import { useEffect, useState } from 'react';
import Orientation, { OrientationType } from "react-native-orientation-locker";

const orientationAndSimpleChain:{[key:OrientationType]:string} = {
  "PORTRAIT": "PORTRAIT",
  "PORTRAIT-UPSIDEDOWN": "PORTRAIT",
  "LANDSCAPE-LEFT": "LANDSCAPE",
  "LANDSCAPE-RIGHT": "LANDSCAPE",
};

export const useCustomOrientationListener = () => {

  const [viewOrientation,setViewOrientation] = useState<"PORTRAIT"|"LANDSCAPE">("PORTRAIT");

  useEffect(() => {
    // const setOrientation = (orientation:OrientationType) => setViewOrientation(orientation === "PORTRAIT" ? "PORTRAIT" : "LANDSCAPE");
    // 패드라서 이렇게 했는데 만약에 폰에서는 안할거면 그것도 따로 처리해줘야할듯
    const setOrientation = (orientation:OrientationType) => setViewOrientation(orientationAndSimpleChain[orientation]);
    // const setOrientation = (orientation:OrientationType) => {
    //   setViewOrientation(orientation === "PORTRAIT" ? "PORTRAIT" : "LANDSCAPE");
    //   // console.log("orientation : "+ orientation);
    // };

    // Orientation.getDeviceOrientation(initial=>setOrientation(initial));
    Orientation.getOrientation(initial=>setOrientation(initial));
    
    // Orientation.addDeviceOrientationListener(setOrientation);
    Orientation.addOrientationListener(setOrientation);

    return () => {
      // Orientation.removeDeviceOrientationListener(setOrientation);
      Orientation.removeOrientationListener(setOrientation);
    };
  }, []);

  return viewOrientation;
};

export default useCustomOrientationListener;