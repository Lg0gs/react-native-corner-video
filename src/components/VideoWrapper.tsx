import React, { useRef, useState } from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';

import { Measure, Provider } from '../index';

export type CornerVideoProps = {
  style?: ViewStyle;
  width: number;
  height: number;
  top: number;
  right: number;
  bottom: number;
  left: number;
};

const VideoWrapper = (props: CornerVideoProps) => {
  const cornerRef = useRef(TouchableOpacity.prototype);
  const [pos, setPos] = useState<Measure>({ w: 0, h: 0, x: 0, y: 0 });

  const onLayout = () => {
    cornerRef?.current?.measure((_x, _y, w, h, pageX, pageY) => {
      setPos({ w, h, x: pageX, y: pageY });
    });
  };

  const onPress = () => {
    Provider.show(pos, props);
  };

  return (
    <TouchableOpacity
      onLayout={onLayout}
      ref={cornerRef}
      style={props.style}
      activeOpacity={0.7}
      onPress={onPress}
    />
  );
};

export default VideoWrapper;
