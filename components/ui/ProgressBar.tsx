import { View, Animated, StyleSheet } from 'react-native';

export function ProgressBar({ progressValue }: { progressValue: Animated.Value }) {
  const widthPercentage = progressValue.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.fill, { width: widthPercentage }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: 200, height: 6, backgroundColor: '#E0E0E0', borderRadius: 3, overflow: 'hidden' },
  fill: { height: '100%', backgroundColor: '#000000' },
});