import Animated, {
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { StaticBoneProps } from './type';

const StaticBone: React.FC<StaticBoneProps> = ({
  boneStyle,
  animationType,
  boneColor,
  highlightColor,
  animation,
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        animation.value,
        [0, 1],
        [boneColor!, highlightColor!],
      ),
    };
  });
  const styles =
    animationType === 'none' ? [animatedStyle] : [boneStyle, animatedStyle];
  return <Animated.View style={styles} />;
};

export default StaticBone;
