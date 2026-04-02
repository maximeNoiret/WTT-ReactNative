import { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';
import { useRouter } from 'expo-router';

export function useSplashAnimation() {
  const router = useRouter();
  const [phase, setPhase] = useState<'studio' | 'game'>('studio');

  const opacityStudio = useRef(new Animated.Value(0)).current;
  const opacityGame = useRef(new Animated.Value(0)).current;
  const progressWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Séquence 1 : Animation du Studio
    Animated.sequence([
      Animated.timing(opacityStudio, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.delay(1500),
      Animated.timing(opacityStudio, { toValue: 0, duration: 800, useNativeDriver: true }),
    ]).start(() => {
      setPhase('game');

      // Séquence 2 : Animation du Jeu et de la barre
      Animated.timing(opacityGame, { toValue: 1, duration: 800, useNativeDriver: true }).start(() => {
        Animated.timing(progressWidth, {
          toValue: 100,
          duration: 2000,
          useNativeDriver: false,
        }).start(() => {
          router.replace('/(tabs)');
        });
      });
    });
  }, [opacityGame, opacityStudio, progressWidth, router]);

  return { phase, opacityStudio, opacityGame, progressWidth };
}