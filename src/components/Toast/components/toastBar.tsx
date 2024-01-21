import { ViewStyle, View, Text } from 'react-native';
import { Toast, ToastPosition, Renderable, resolveValue } from '../core/types';
import Animated, { Keyframe } from 'react-native-reanimated';
import { memo, useState } from 'react';
import ToastIcon from './toastIcon';
import type { ReanimatedKeyframe } from 'react-native-reanimated/lib/typescript/reanimated2/layoutReanimation/animationBuilder/Keyframe';

interface ToastBarProps {
  toast: Toast;
  position?: ToastPosition;
  style?: ViewStyle;
  children?: (components: {
    icon: Renderable;
    message: Renderable;
  }) => Renderable;
}

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
  enterAnimation: (factor: number) => ReanimatedKeyframe,
  exitAnimation: (factor: number) => ReanimatedKeyframe,
) => {
  const top = position.includes('top');
  const factor = top ? 1 : -1;
  return {
    enter: enterAnimation(factor),
    exit: exitAnimation(factor),
  };
};

const ToastBar: React.FC<ToastBarProps> = ({
  toast,
  position,
  style,
  children,
}) => {
  const [toastSize, setToastSize] = useState({
    height: 48,
    width: 0,
  });
  const enterAnimation = (factor: number) => {
    return new Keyframe({
      0: {
        opacity: 0,
        transform: [
          { scale: 0.6 },
          { translateY: factor * -(toastSize.height * 2) },
        ],
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
    }).duration(250);
  };
  const exitAnimation = (factor: number) => {
    return new Keyframe({
      0: {
        opacity: 1,
        transform: [{ scale: 1 }, { translateY: 0 }],
      },
      100: {
        opacity: 0,
        transform: [
          { scale: 0.6 },
          { translateY: factor * -(toastSize.height * 1.5) },
        ],
      },
    }).duration(300);
  };
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
        setToastSize({
          width: e.nativeEvent.layout.width,
          height: e.nativeEvent.layout.height,
        });
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
