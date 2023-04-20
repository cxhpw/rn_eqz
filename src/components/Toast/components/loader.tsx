import { memo } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withRepeat,
  Easing,
} from 'react-native-reanimated';

export interface LoaderTheme {
  primary?: string;
  secondary?: string;
}

const LoaderIcon: React.FC<LoaderTheme> = ({ primary, secondary }) => {
  const progress = useSharedValue(0);
  const styles = StyleSheet.create({
    IconWrapper: {
      width: 20,
      height: 20,
      borderWidth: 3,
      borderRadius: 99,
      borderRightColor: secondary || '#616161',
      borderStyle: 'solid',
      borderTopColor: primary || '#e0e0e0',
      borderLeftColor: primary || '#e0e0e0',
      borderBottomColor: primary || '#e0e0e0',
      transform: [{ rotate: '0deg' }],
    },
  });
  const IconAnimateStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: progress.value + 'deg',
        },
      ],
    };
  });
  progress.value = withRepeat(
    withTiming(360, {
      duration: 750,
      easing: Easing.linear,
    }),
    -1,
    false,
  );
  return <Animated.View style={[styles.IconWrapper, IconAnimateStyle]} />;
};

export default memo(LoaderIcon);

LoaderIcon.displayName = 'LoaderIcon';
