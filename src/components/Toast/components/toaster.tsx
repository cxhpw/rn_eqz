import { ViewStyle } from 'react-native';
import {
  ContentInset,
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
  withSpring,
} from 'react-native-reanimated';

const DEFAULT_OFFSET = 16;

const ToastWrapper: React.FC<
  ToastWrapperProps & { offset: number; position: ToastPosition }
> = ({
  id,
  onHeightUpdate,
  children,
  offset,
  position,
  style,
  contentInset,
}) => {
  const progress = useSharedValue(0);
  const positionStyle = getPositionStyle(position, offset, contentInset);
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
    progress.value = withSpring(positionStyle.transform![0].translateY);
  }
  return (
    <Animated.View
      style={[positionStyle, AnimatedStyle, style]}
      onLayout={e => {
        console.log('toast id', id);
        onHeightUpdate(id, e.nativeEvent.layout.height);
      }}>
      {children}
    </Animated.View>
  );
};
/** toast位置函数 */
const getPositionStyle = (
  position: ToastPosition,
  offset: number,
  contentInset?: ContentInset,
): ViewStyle => {
  const top = position.includes('top');
  const verticalStyle: ViewStyle = top
    ? {
        top: contentInset?.top || 0,
        marginTop: DEFAULT_OFFSET,
      }
    : {
        bottom: contentInset?.bottom || 0,
        marginBottom: DEFAULT_OFFSET,
      };
  const horizontalStyle: ViewStyle = position.includes('center')
    ? {
        alignItems: 'center',
      }
    : position.includes('right')
    ? {
        alignItems: 'flex-end',
        right: contentInset?.right || DEFAULT_OFFSET,
      }
    : {
        alignItems: 'flex-start',
        left: contentInset?.left || DEFAULT_OFFSET,
      };
  return {
    position: 'absolute',
    // marginHorizontal: DEFAULT_OFFSET,
    zIndex: 9999,
    width: '100%',
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
            contentInset={t.contentInset}
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
