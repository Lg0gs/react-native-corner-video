import React, { ReactElement, useRef, useState } from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import Video from 'react-native-video';
import type { VideoProperties, OnProgressData } from 'react-native-video';

import { Measure, VideoProvider } from '../index';

export interface CornerVideoProps {
  style?: ViewStyle;
  onPress?: () => void;
  children?: ReactElement;
  cornerProps: {
    width: number;
    height: number;
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  videoProps: VideoProperties;
}

var currentTime: number = 0;

const VideoWrapper = React.forwardRef((props: CornerVideoProps, ref: any) => {
  const cornerRef = useRef(TouchableOpacity.prototype);
  const [pos, setPos] = useState<Measure>({ w: 0, h: 0, x: 0, y: 0 });

  const onLayout = () => {
    cornerRef?.current?.measure((_x, _y, w, h, pageX, pageY) => {
      setPos({ w, h, x: pageX, y: pageY });
    });
  };

  const onProgress = (data: OnProgressData) => {
    currentTime = data.currentTime;
    props.videoProps.onProgress && props.videoProps.onProgress(data);
  };

  const onPress = () => {
    props.onPress && props.onPress();
    // @ts-ignore
    VideoProvider.show(pos, props, currentTime, props.videoProps.source.uri);
  };

  return (
    <TouchableOpacity
      style={props.style}
      onLayout={onLayout}
      ref={cornerRef}
      activeOpacity={1}
      onLongPress={onPress}
    >
      <Video
        style={props.style}
        ref={ref}
        {...props.videoProps}
        onProgress={onProgress}
      />
      {props.children}
    </TouchableOpacity>
  );
});

export default VideoWrapper;
