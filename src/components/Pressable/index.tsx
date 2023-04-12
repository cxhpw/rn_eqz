/**
 * https://github.com/facebook/react-native/blob/16ea9ba8133a5340ed6751ec7d49bf03a0d4c5ea/Libraries/Pressability/Pressability.js#L347
 * # State Machine
 *
 * ┌───────────────┐ ◀──── RESPONDER_RELEASE
 * │ NOT_RESPONDER │
 * └───┬───────────┘ ◀──── RESPONDER_TERMINATED
 *     │
 *     │ RESPONDER_GRANT (HitRect)
 *     │
 *     ▼
 * ┌─────────────────────┐          ┌───────────────────┐              ┌───────────────────┐
 * │ RESPONDER_INACTIVE_ │  DELAY   │ RESPONDER_ACTIVE_ │  T + DELAY   │ RESPONDER_ACTIVE_ │
 * │ PRESS_IN            ├────────▶ │ PRESS_IN          ├────────────▶ │ LONG_PRESS_IN     │
 * └─┬───────────────────┘          └─┬─────────────────┘              └─┬─────────────────┘
 *   │           ▲                    │           ▲                      │           ▲
 *   │LEAVE_     │                    │LEAVE_     │                      │LEAVE_     │
 *   │PRESS_RECT │ENTER_              │PRESS_RECT │ENTER_                │PRESS_RECT │ENTER_
 *   │           │PRESS_RECT          │           │PRESS_RECT            │           │PRESS_RECT
 *   ▼           │                    ▼           │                      ▼           │
 * ┌─────────────┴───────┐          ┌─────────────┴─────┐              ┌─────────────┴─────┐
 * │ RESPONDER_INACTIVE_ │  DELAY   │ RESPONDER_ACTIVE_ │              │ RESPONDER_ACTIVE_ │
 * │ PRESS_OUT           ├────────▶ │ PRESS_OUT         │              │ LONG_PRESS_OUT    │
 * └─────────────────────┘          └───────────────────┘              └───────────────────┘
 *
 * T + DELAY => LONG_PRESS_DELAY + DELAY
 *
 * Not drawn are the side effects of each transition. The most important side
 * effect is the invocation of `onPress` and `onLongPress` that occur when a
 * responder is release while in the "press in" states.
 */
import { PropsWithChildren, forwardRef, memo, useState } from 'react';
import {
  Pressable as RNPressable,
  PressableProps as RNPressableProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type Rect = {
  bottom: number;
  top: number;
  left: number;
  right: number;
};

export const useIsPressed = () => {
  const [isPressed, setIsPressed] = useState(false);
  return {
    pressableProps: {
      onPressIn: () => setIsPressed(true),
      onPressOut: () => setIsPressed(false),
    },
    isPressed,
  };
};

export interface PressableProps
  extends Pick<
    RNPressableProps,
    'onPress' | 'onLongPress' | 'disabled' | 'delayLongPress'
  > {
  activeOpacity?: number;
  pressOffset?: number | Rect;
  hitOffset?: number | Rect;
  scalable?: boolean;
  style?: StyleProp<ViewStyle>;
}

const Pressable = (
  {
    children,
    activeOpacity = 0.5,
    pressOffset = 20,
    hitOffset,
    delayLongPress = 1000,
    scalable = true,
    style,
    onPress,
    onLongPress,
    disabled,
  }: PropsWithChildren<PressableProps>,
  ref: any,
) => {
  const pressed = useSharedValue(0);

  const handlePressIn = () => {
    pressed.value = withTiming(1, { duration: 50 });
  };

  const handlePressOut = () => {
    pressed.value = withTiming(0, { duration: 50 });
  };

  const animatedStyle = useAnimatedStyle(() => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const style = {
      opacity: pressed.value ? withTiming(activeOpacity) : withTiming(1),
    };
    if (scalable) {
      Object.assign(style, {
        transform: [
          { scale: pressed.value ? withTiming(1.05) : withTiming(1) },
        ],
      });
    }
    return style;
  });

  return (
    <RNPressable
      ref={ref}
      android_disableSound={false}
      android_ripple={null}
      pressRetentionOffset={pressOffset}
      hitSlop={hitOffset}
      disabled={disabled}
      delayLongPress={delayLongPress}
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}>
      <Animated.View style={[animatedStyle, style]}>{children}</Animated.View>
    </RNPressable>
  );
};
Pressable.displayName = 'Pressable';

export default memo(forwardRef(Pressable));
