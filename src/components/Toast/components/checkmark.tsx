import { memo } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
} from 'react-native-reanimated';

export interface CheckmarkTheme {
  primary?: string;
  secondary?: string;
}

const CheckmarkIcon: React.FC<CheckmarkTheme> = () => {
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
  progress.value = 1;
  return (
    <Animated.View style={[styles.IconWrapper, IconWrapperAnimatedStyle]}>
      <Animated.View style={[styles.Icon, IconAnimatedStyle]} />
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  IconWrapper: {
    opacity: 0,
    width: 20,
    height: 20,
    borderRadius: 9999,
    backgroundColor: '#61d345',
    position: 'relative',
    transform: [{ rotate: '45deg' }, { scale: 0 }],
  },
  Icon: {
    opacity: 0,
    position: 'absolute',
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#fff',
    bottom: 6,
    left: 6,
    height: 10,
    width: 6,
  },
});

export default memo(CheckmarkIcon);
