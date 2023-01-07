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

export const useCustomOrientationListener = () => {

  const [viewOrientation,setViewOrientation] = useState<"PORTRAIT"|"LANDSCAPE">("PORTRAIT");

  useEffect(() => {
    const setOrientation = (orientation:OrientationType) => setViewOrientation(orientation === "PORTRAIT" ? "PORTRAIT" : "LANDSCAPE");
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