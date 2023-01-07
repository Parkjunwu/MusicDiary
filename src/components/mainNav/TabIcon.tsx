import React from "react"
import Ionicons from "react-native-vector-icons/Ionicons";
import { iconName } from "./icon";

// type iconName = "home" | "search" |"camera" | "heart" | "person" 

interface ITabIconProps {
  iconName: iconName;
  color:string;
  focused:boolean;
}

const TabIcon: React.FC<ITabIconProps> = ({iconName,color,focused}) => {
  const focusedIconName: string = `${iconName}-outline`;
  return <Ionicons name={focused?iconName:focusedIconName} color={color} size={25}/>;
};

export default TabIcon;