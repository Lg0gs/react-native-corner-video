/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import type { CornerVideoProps } from './VideoWrapper';
import type { Measure } from 'react-native-corner-video';
import { handler } from '../utils/handler';

interface Props {
  props: CornerVideoProps;
  positions: Measure;
}

const CornerVideo = ({ props, positions }: Props) => {
  const width = useSharedValue(positions.w);
  const height = useSharedValue(positions.h);
  const top = useSharedValue(positions.y);
  const left = useSharedValue(positions.x);
  const dragX = useSharedValue(0);
  const dragY = useSharedValue(0);
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);

  useEffect(() => {
    animate();
  }, []);

  const animate = () => {
    width.value = withSpring(props.width, { damping: 15 });
    height.value = withSpring(props.height, { damping: 15 });
    top.value = withSpring(props.top, { damping: 15 });
    left.value = withSpring(props.left, { damping: 15 });
  };

  const onGesture = Gesture.Pan()
    .onUpdate((e) => {
      dragX.value = offsetX.value + e.translationX;
      dragY.value = offsetY.value + e.translationY;
    })
    .onEnd((e) => {
      const { x, y } = handler({
        e,
        props: {
          width: props.width,
          height: props.height,
          top: props.top,
          right: props.right,
          bottom: props.bottom,
          left: props.left,
        },
      });
      offsetX.value = x;
      offsetY.value = y;
      dragX.value = withSpring(x, { damping: 15 });
      dragY.value = withSpring(y, { damping: 15 });
    });

  const dragStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: dragX.value }, { translateY: dragY.value }],
    };
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: width.value,
      height: height.value,
      top: top.value,
      left: left.value,
    };
  });

  return (
    <GestureDetector gesture={onGesture}>
      <Animated.View
        style={[
          styles.cornerVideo,
          {
            width: positions.w,
            height: positions.h,
            top: positions.y,
            left: positions.x,
          },
          dragStyle,
          animatedStyle,
        ]}
      />
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  cornerVideo: {
    width: 150,
    height: 100,
    position: 'absolute',
    top: 50,
    left: 7,
    borderRadius: 10,
    backgroundColor: 'red',
  },
});

export default CornerVideo;
