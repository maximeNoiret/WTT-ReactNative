import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

interface TimerProps {
  duration: number;
  onTimeUp: () => void;
  keyProp: number;
}

export function Timer({ duration, onTimeUp, keyProp }: TimerProps) {
  const widthAnim = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    widthAnim.setValue(100);
    const anim = Animated.timing(widthAnim, {
      toValue: 0,
      duration: duration * 1000,
      useNativeDriver: false,
    });
    
    anim.start(({ finished }) => {
      if (finished) onTimeUp();
    });

    return () => anim.stop();
  }, [keyProp]);

  const widthInterpolate = widthAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.bar, { width: widthInterpolate }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '90%', height: 12, backgroundColor: '#E0E0E0', borderRadius: 6, overflow: 'hidden', alignSelf: 'center' },
  bar: { height: '100%', backgroundColor: '#E21B3C' }
});