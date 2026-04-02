import { View, Text, StyleSheet, Animated } from 'react-native';
import { useSplashAnimation } from '../hooks/useSplashAnimation';
import { ProgressBar } from '../components/ui/ProgressBar';

export default function SplashScreen() {
  const { phase, opacityStudio, opacityGame, progressWidth } = useSplashAnimation();

  return (
    <View style={styles.container}>
      {phase === 'studio' && (
        <Animated.View style={[styles.center, { opacity: opacityStudio }]}>
          <Text style={styles.studioLogo}>EchoPlay</Text>
          <Text style={styles.studioSub}>STUDIO</Text>
        </Animated.View>
      )}

      {phase === 'game' && (
        <Animated.View style={[styles.center, { opacity: opacityGame }]}>
          <Text style={styles.gameLogo}>WTT</Text>
          <Text style={styles.gameSub}>What's The Track</Text>
          <ProgressBar progressValue={progressWidth} />
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' },
  center: { alignItems: 'center' },
  studioLogo: { fontSize: 48, fontWeight: '900', color: '#000000', letterSpacing: 2 },
  studioSub: { fontSize: 16, fontWeight: '600', color: '#666666', letterSpacing: 6, marginTop: 5 },
  gameLogo: { fontSize: 64, fontWeight: '900', color: '#000000' },
  gameSub: { fontSize: 18, color: '#333333', marginBottom: 40 },
});