import { useEffect } from "react";
import { BackHandler } from "react-native";
import { isAndroid } from "../../utils";

type useMakeAndroidBackHandlerType = {
  onPressCancel:()=>boolean;
  dependency?: boolean;
};

const useMakeAndroidBackHandler = ({
  onPressCancel,
  dependency,
}: useMakeAndroidBackHandlerType) => {

  useEffect(() => {
    console.log("dependency : "+ dependency);
    const backHandler = isAndroid ?
        BackHandler.addEventListener(
          "hardwareBackPress",
          onPressCancel
        )
      :
        null;

    return () => backHandler?.remove();
  // }, []);  
  }, [dependency]); // undefined 여도 안되지 않을까? 비교하면 똑같으니
};

export default useMakeAndroidBackHandler;