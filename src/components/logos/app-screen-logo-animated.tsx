import { useEffect, type FunctionComponent } from 'react';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { AppScreenLogo } from './app-screen-logo';

const AnimScale = { initial: 0.1, final: 1 };
const AnimTranslate = { initial: 100, final: 0 };
const AnimOpacity = { initial: 0, final: 1 };
const AnimRotation = { degrees: 360 };

export interface AppScreenLogoAnimatedProps {
  screenPercentage?: number;
  durationMs?: number;
}

export const AppScreenLogoAnimated: FunctionComponent<AppScreenLogoAnimatedProps> = ({
  screenPercentage = 0.7,
  durationMs = 2000,
}) => {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(AnimScale.initial);
  const translateY = useSharedValue(AnimTranslate.initial);
  const opacity = useSharedValue(AnimOpacity.initial);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }, { scale: scale.value }, { translateY: translateY.value }],
    opacity: opacity.value,
  }));

  useEffect(() => {
    const animationConfig = { duration: durationMs, easing: Easing.out(Easing.cubic) };

    rotation.value = withTiming(AnimRotation.degrees, animationConfig);
    scale.value = withTiming(AnimScale.final, animationConfig);
    translateY.value = withTiming(AnimTranslate.final, animationConfig);
    opacity.value = withTiming(AnimOpacity.final, { ...animationConfig, duration: durationMs * 5 });
  }, [durationMs]);

  return (
    <Animated.View style={animatedStyle}>
      <AppScreenLogo screenPercentage={screenPercentage} />
    </Animated.View>
  );
};
