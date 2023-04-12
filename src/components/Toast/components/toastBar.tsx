import { ViewStyle, View, Text } from 'react-native';
import { Toast, ToastPosition, Renderable, resolveValue } from '../core/types';
import { prefersReducedMotion } from '../core/utils';
import Animated, { Keyframe } from 'react-native-reanimated';
import { memo, useMemo, useState } from 'react';
import ToastIcon from './toastIcon';

interface ToastBarProps {
  toast: Toast;
  position?: ToastPosition;
  style?: ViewStyle;
  children?: (components: {
    icon: Renderable;
    message: Renderable;
  }) => Renderable;
}

const fadeInAnimation = new Keyframe({
  0: {
    opacity: 0,
  },
  100: {
    opacity: 1,
  },
});

const fadeOutAnimation = new Keyframe({
  0: {
    opacity: 1,
  },
  100: {
    opacity: 0,
  },
});

const ToastBarBase = ({ children, style }: any) => {
  return (
    <View
      style={[
        // eslint-disable-next-line react-native/no-inline-styles
        {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#ffffff',
          shadowColor: '#000000',
          shadowOpacity: 0.1,
          shadowOffset: {
            width: 1,
            height: 1,
          },
          elevation: 1,
          maxWidth: 320,
          paddingVertical: 10,
          paddingHorizontal: 15,
          borderRadius: 8,
        },
        style,
      ]}>
      {children}
    </View>
  );
};
const Message = ({ children }: any) => {
  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        justifyContent: 'center',
        marginVertical: 4,
        marginLeft: 10,
      }}>
      <Text>{children}</Text>
    </View>
  );
};
const getAnimationStyle = (
  position: ToastPosition,
  _enter: any,
  _exit: any,
) => {
  const top = position.includes('top');
  const factor = top ? 1 : -1;
  const [enter, exit] = prefersReducedMotion()
    ? [fadeInAnimation, fadeOutAnimation]
    : [_enter(factor), _exit(factor)];
  return {
    enter,
    exit,
  };
};

const ToastBar: React.FC<ToastBarProps> = ({
  toast,
  position,
  style,
  children,
}) => {
  const [height, setHeight] = useState(48);
  const enterAnimation = useMemo(
    () => (_factor: number) => {
      return new Keyframe({
        0: {
          opacity: 0,
          transform: [{ scale: 0.6 }, { translateY: _factor * -(height * 2) }],
        },
        100: {
          opacity: 1,
          transform: [
            { scale: 1 },
            {
              translateY: 0,
            },
          ],
        },
      }).duration(200);
    },
    [height],
  );
  const exitAnimation = useMemo(
    () => (factor: number) =>
      new Keyframe({
        0: {
          opacity: 1,
          transform: [{ scale: 1 }, { translateY: 0 }],
        },
        100: {
          opacity: 0,
          transform: [{ scale: 0.6 }, { translateY: factor * -(height * 1.5) }],
        },
      }).duration(250),
    [height],
  );
  const { enter, exit } = getAnimationStyle(
    toast.position || position || 'top-center',
    enterAnimation,
    exitAnimation,
  );
  const icon = <ToastIcon toast={toast} />;
  const message = <Message>{resolveValue(toast.message, toast)}</Message>;
  return (
    <Animated.View
      entering={enter}
      exiting={exit}
      onLayout={e => {
        if (height === 0) {
          setHeight(e.nativeEvent.layout.height);
        }
      }}>
      <ToastBarBase style={style}>
        {typeof children === 'function' ? (
          children({
            icon,
            message,
          })
        ) : (
          <>
            {icon}
            {message}
          </>
        )}
      </ToastBarBase>
    </Animated.View>
  );
};

export default memo(ToastBar);
