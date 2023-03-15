import { PropsWithChildren } from 'react';
import {
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewStyle,
  I18nManager,
  Animated,
  StyleSheet,
} from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import SwiperableProvider from './context';
import useSwiperRow from './useSwiperRow';

export interface SwipeAction {
  /** 操作项文本 */
  label: string;
  /** 操作项文本样式 */
  textStyle?: StyleProp<TextStyle>;
  /** 操作项点击事件 */
  onPress: () => void;
  /** 背景色 */
  backgroundColor: string;
  /** 宽度 */
  width?: number;
}

export type Props = PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
  actions?: SwipeAction[];
  actionWidth?: number;
  /** 作为滑动操作互斥的判断依据 */
  id: string | number;
}>;

const Index: React.FC<Props> = ({
  children,
  style,
  actions = [],
  actionWidth = 64,
  id,
}) => {
  const { swipeableRef, changeState } = useSwiperRow({ id });
  const calcWidth = () => {
    return actions.reduce((prev, cur) => {
      const width = cur?.width ?? actionWidth;
      return prev + width;
    }, 0);
  };
  const renderRightAction: React.FC<
    SwipeAction & {
      x: number;
      progress: Animated.AnimatedInterpolation<number>;
    }
  > = ({ label, textStyle, backgroundColor, onPress, x, progress }) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
      extrapolate: 'clamp',
    });
    return (
      <Animated.View
        key={label}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectButton
          style={[styles.rightAction, { backgroundColor: backgroundColor }]}
          onPress={() => {
            onPress();
          }}>
          <Text style={[styles.actionText, textStyle]}>{label}</Text>
        </RectButton>
      </Animated.View>
    );
  };
  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    _dragAnimatedValue: Animated.AnimatedInterpolation<number>,
  ) => {
    return (
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          flex: 1,
          width: actions.length <= 1 ? '100%' : calcWidth(),
          flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
        }}>
        {actions.map((action, index) => {
          const width = action?.width ?? actionWidth;
          const x = (actions.length - index) * width;
          return renderRightAction({ ...action, progress, x });
        })}
      </View>
    );
  };
  return (
    <Swipeable
      ref={swipeableRef}
      friction={1}
      overshootFriction={10}
      enableTrackpadTwoFingerGesture
      rightThreshold={40}
      renderRightActions={renderRightActions}
      onSwipeableOpen={() => changeState(id)}
      containerStyle={style}>
      {children}
    </Swipeable>
  );
};
Index.displayName = 'Swiperable';

const styles = StyleSheet.create({
  actionText: {
    color: '#ffffff',
    textAlign: 'center',
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'red',
  },
});
export default Object.assign(Index, { Provider: SwiperableProvider });
