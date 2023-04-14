import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { TabBarIndicatorProps } from './type';

export default function TabBarIndicator({
  measures = [],
  currentIndex = 0,
  indicatorStyle,
}: TabBarIndicatorProps & { x: number }) {
  const animatedStyle = useAnimatedStyle(() => {
    const _width = measures[currentIndex].width;
    const _left = measures[currentIndex].left;
    return {
      width: withTiming(_width),
      left: withSpring(_left),
    };
  });
  /**
   * x, width, left
   */
  return (
    <Animated.View
      style={[
        // eslint-disable-next-line react-native/no-inline-styles
        {
          height: 4,
          backgroundColor: '#000',
          borderRadius: 2,
          position: 'absolute',
          bottom: 0,
        },
        indicatorStyle,
        animatedStyle,
      ]}
    />
  );
}
