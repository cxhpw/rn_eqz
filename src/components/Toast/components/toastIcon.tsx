import { View, Text } from 'react-native';

import { Toast } from '../core/types';
import ErrorIcon from './error';
import LoaderIcon from './loader';
import CheckmarkIcon from './checkmark';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { memo } from 'react';

export const AnimatedIconWrapper = ({ children }: any) => {
  const progress = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      transform: [{ scale: progress.value }],
    };
  });
  progress.value = withTiming(1);
  return (
    <Animated.View
      style={[
        {
          position: 'relative',
          transform: [
            {
              scale: 0.6,
            },
          ],
          opacity: 0.4,
          minWidth: 20,
        },
        animatedStyle,
      ]}>
      <Text>{children}</Text>
    </Animated.View>
  );
};

const IndicatorWrapper = ({ children }: any) => {
  return (
    <View
      style={{
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 20,
        minHeight: 20,
      }}>
      {children}
    </View>
  );
};

const ToastIcon: React.FC<{ toast: Toast }> = ({ toast }) => {
  const { icon, type, iconTheme } = toast;
  if (icon !== undefined) {
    if (typeof icon === 'string') {
      return <AnimatedIconWrapper>{icon}</AnimatedIconWrapper>;
    } else {
      return icon;
    }
  }
  if (type === 'blank') {
    return null;
  }
  return (
    <IndicatorWrapper>
      <LoaderIcon {...iconTheme} />
      {type !== 'loading' && (
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            position: 'absolute',
          }}>
          {type === 'error' ? (
            <ErrorIcon {...iconTheme} />
          ) : (
            <CheckmarkIcon {...iconTheme} />
          )}
        </View>
      )}
    </IndicatorWrapper>
  );
};

export default memo(ToastIcon);
