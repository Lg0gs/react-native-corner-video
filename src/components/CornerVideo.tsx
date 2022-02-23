import React from 'react';
import { StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import type { CornerVideoProps } from './VideoWrapper';
import { handler } from '../utils/handler';

interface Props {
  props: CornerVideoProps;
}

const CornerVideo = ({ props }: Props) => {
  const dragX = useSharedValue(0);
  const dragY = useSharedValue(0);
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);

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

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: dragX.value }, { translateY: dragY.value }],
    };
  });

  return (
    <GestureDetector gesture={onGesture}>
      <Animated.View
        style={[
          styles.cornerVideo,
          animatedStyle,
          {
            width: props.width,
            height: props.height,
            top: props.top,
            left: props.left,
          },
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
