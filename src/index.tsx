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
  const [positions, setPositions] = useState<Measure>({
    w: 0,
    h: 0,
    x: 0,
    y: 0,
  });
  const [cornerProps, setCornerProps] = useState<CornerVideoProps>({
    width: 0,
    height: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });

  useEffect(() => {
    ref = viewRef;
  }, []);

  const show = (_pos: Measure, _cornerProps: CornerVideoProps) => {
    setPositions(_pos);
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
      {isVisible && <CornerVideo positions={positions} props={cornerProps} />}
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
