import { useMount } from 'ahooks';
import { memo } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';

export interface ErrorTheme {
  primary?: string;
  secondary?: string;
}

const ErrorIcon: React.FC<ErrorTheme> = ({ primary, secondary }) => {
  const progress = useSharedValue(0);
  const IconWrapperAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(progress.value),
      transform: [{ rotate: '45deg' }, { scale: withSpring(progress.value) }],
    };
  });
  const IconAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(progress.value),
    };
  });
  useMount(() => {
    progress.value = 1;
  });
  const styles = StyleSheet.create({
    IconWrapper: {
      width: 20,
      opacity: 0,
      height: 20,
      borderRadius: 9999,
      backgroundColor: primary || '#ff4b4b',
      position: 'relative',
      transform: [{ rotate: '45deg' }, { scale: 0 }],
    },
    Icon: {
      opacity: 0,
      position: 'absolute',
      borderRadius: 3,
      backgroundColor: secondary || '#fff',
      bottom: 9,
      left: 4,
      height: 2,
      width: 12,
    },
    SecIcon: {
      transform: [{ rotate: '90deg' }],
    },
  });
  return (
    <Animated.View style={[styles.IconWrapper, IconWrapperAnimatedStyle]}>
      <Animated.View style={[styles.Icon, IconAnimatedStyle]} />
      <Animated.View style={[styles.Icon, styles.SecIcon, IconAnimatedStyle]} />
    </Animated.View>
  );
};

export default memo(ErrorIcon);
