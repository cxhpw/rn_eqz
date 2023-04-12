import { ViewStyle } from 'react-native';
import {
  resolveValue,
  ToasterProps,
  ToastPosition,
  ToastWrapperProps,
} from '../core/types';
import { useToast } from '../core/useToast';
import ToastBar from './toastBar';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const DEFAULT_OFFSET = 16;

const ToastWrapper: React.FC<
  ToastWrapperProps & { offset: number; position: ToastPosition }
> = ({ id, onHeightUpdate, children, offset, position, style }) => {
  const progress = useSharedValue(0);
  const positionStyle = getPositionStyle(position, offset);
  const AnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: progress.value }],
    };
  });
  if (
    'transform' in positionStyle &&
    positionStyle.transform?.length &&
    'translateY' in positionStyle.transform[0]
  ) {
    progress.value = withTiming(positionStyle.transform![0].translateY);
  }
  return (
    <Animated.View
      style={[positionStyle, AnimatedStyle, style]}
      onLayout={e => {
        console.log('toaster layout', id);
        onHeightUpdate(id, e.nativeEvent.layout.height);
      }}>
      {children}
    </Animated.View>
  );
};

const getPositionStyle = (
  position: ToastPosition,
  offset: number,
): ViewStyle => {
  const top = position.includes('top');
  const verticalStyle: ViewStyle = top
    ? {
        top: 0,
        marginTop: DEFAULT_OFFSET,
      }
    : {
        bottom: 0,
        marginBottom: DEFAULT_OFFSET,
      };
  const horizontalStyle: ViewStyle = position.includes('center')
    ? {
        alignItems: 'center',
      }
    : position.includes('right')
    ? {
        alignItems: 'flex-end',
        right: 0,
      }
    : {
        alignItems: 'flex-start',
        left: 0,
      };
  return {
    position: 'absolute',
    marginHorizontal: DEFAULT_OFFSET,
    zIndex: 9999,
    transform: [
      {
        translateY: offset * (top ? 1 : -1),
      },
    ],
    ...verticalStyle,
    ...horizontalStyle,
  };
};

export const Toaster: React.FC<ToasterProps> = ({
  reverseOrder,
  position = 'top-center',
  toastOptions,
  gutter,
  children,
  containerStyle,
}) => {
  const { toasts, handlers } = useToast(toastOptions);
  return (
    <>
      {toasts.map(t => {
        const toastPosition = t.position || position;
        const offset = handlers.calculateOffset(t, {
          reverseOrder,
          gutter,
          defaultPosition: position,
        });
        return (
          <ToastWrapper
            id={t.id}
            key={t.id}
            offset={offset}
            onHeightUpdate={handlers.updateHeight}
            style={containerStyle}
            position={toastPosition}>
            {t.type === 'custom' ? (
              resolveValue(t.message, t)
            ) : children ? (
              children(t)
            ) : (
              <ToastBar toast={t} position={toastPosition} />
            )}
          </ToastWrapper>
        );
      })}
    </>
  );
};
Toaster.displayName = 'Toaster';
