import { Animated, Easing, StyleProp, View, ViewStyle } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components/native";
import { FontAppliedBaseTextNeedFontSize } from "../../styled-components/FontAppliedComponents";

const ShowedText = styled(FontAppliedBaseTextNeedFontSize)`

`;

type Props = {
  force?: boolean;
  debug?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  // style?: StyleProp<TextStyle>;
  // startDelay?: number;
  // delay?: number;
  durationMsPerWidth?: number;
  children?: React.ReactNode;
};

// https://github.com/bang9/react-native-rolling-text/blob/main/src/index.tsx
// 이거 보고 참고

const RollingText: React.FC<Props> = ({
  children,
  force,
  containerStyle,
  // style,
  durationMsPerWidth = 20,
}) => {
  const [width, setWidth] = useState(0);
  const [textWidth, setTextWidth] = useState(0);
  const animation = useRef(new Animated.Value(0)).current;

  const animationCondition = width*80/100 < textWidth;

  useEffect(() => {
    if (width === 0 || textWidth === 0) return;

    let marquee:Animated.CompositeAnimation;
    let timeout:NodeJS.Timeout;

    if (force || animationCondition) {
      const durationPerRange = durationMsPerWidth;
      const translateRange = width + textWidth;
      const duration = Math.round(translateRange * durationPerRange);

      const rollingAnimation = Animated.timing(animation, {
        useNativeDriver: true,
        duration,
        toValue: -translateRange,
        easing: Easing.linear
      });

      marquee = Animated.loop(rollingAnimation);

      rollingAnimation.start(({ finished }) => {
        if (finished) {
          timeout = setTimeout(() => {
            // animation.setValue(width);
            // 살짝 딜레이 생기게
            animation.setValue(50);
            marquee && marquee.start();
          }, 0);
        }
      });
    }

    return () => {
      animation.setValue(0);
      marquee && marquee.stop();
      timeout && clearTimeout(timeout);
    };
  }, [animation, width, textWidth]);

  return (
    <View
      style={{
        overflow:'hidden',
        flexDirection:"row",
        width: "100%",
      }}
      onLayout={e => {
        setWidth(e.nativeEvent.layout.width)
      }}
    >
      {/* 80% 이상인 경우. 그냥 Text 는 numberOfLines={1} 안하면 아래줄로 넘어가고 쓰면 ... 생겨서 길이 측정이 안됨. 그래서 걍 이렇게 계산함. */}
      {animationCondition ?
        <>
          <View
            style={{
              width: width,
            }}
          />
          <Animated.View
            style={[
              containerStyle,
              {
                transform: [{ translateX: animation }],
                flexWrap: "wrap",
                width: "100%",
              }
            ]}
          >
            {/* <Text
              numberOfLines={1}
              onLayout={e => setTextWidth(e.nativeEvent.layout.width)}
              style={[
                style,
                {
                  color: isDarkMode ? "white" : "black",
                }
              ]}
            > */}
            <ShowedText
              numberOfLines={1}
              onLayout={e => setTextWidth(e.nativeEvent.layout.width)}
            >
              {children}
            </ShowedText>
          </Animated.View>
        </>
      :  
        <View
          style={[
            containerStyle,
            {
              width: width,
              alignItems:"center",
            }
          ]}
        >
          {/* <Text
            numberOfLines={1}
            onLayout={e => setTextWidth(e.nativeEvent.layout.width)}
            style={[
              style,
              {
                color: isDarkMode ? "white" : "black",
              }
            ]}
          > */}
          <ShowedText
            numberOfLines={1}
            onLayout={e => setTextWidth(e.nativeEvent.layout.width)}
          >
            {children}
          </ShowedText>
        </View>
    }
    </View>
  );
};

export default RollingText;