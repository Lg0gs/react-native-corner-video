/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import CornerVideo from './components/CornerVideo';
import type { CornerVideoProps } from './components/VideoWrapper';

export type Measure = {
  w: number;
  h: number;
  x: number;
  y: number;
};

var ref: any = null;

export const Provider = (props: any) => {
  const viewRef = useRef();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [cornerProps, setCornerProps] = useState<CornerVideoProps>({
    width: 150,
    height: 100,
    top: 50,
    right: 7,
    bottom: 50,
    left: 7,
  });

  useEffect(() => {
    ref = viewRef;
  }, []);

  const show = (_pos: Measure, _cornerProps: CornerVideoProps) => {
    setCornerProps(_cornerProps);
    setIsVisible(true);
  };

  React.useImperativeHandle(
    viewRef,
    React.useCallback(
      () => ({
        show,
      }),
      [show]
    )
  );

  return (
    <View ref={ref} style={styles.container}>
      {props.children}
      {isVisible && <CornerVideo props={cornerProps} />}
    </View>
  );
};

Provider.show = (pos: Measure, cornerProps: CornerVideoProps) => {
  ref?.current?.show(pos, cornerProps);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export { default } from './components/VideoWrapper';
