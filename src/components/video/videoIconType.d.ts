
export type VideoIconContainerType = {
  top?: number | string | undefined;
  bottom?: number | string | undefined;
  left?: number | string | undefined;
  right?: number | string | undefined;
};

export type VideoIconPositionAbsoluteProp = {
  iconColor?: string | undefined;
  iconSize: number;
} & VideoIconContainerType;

export type VideoIconProp = {
  style?: {
    opacity: number
  };
} & VideoIconPositionAbsoluteProp;
