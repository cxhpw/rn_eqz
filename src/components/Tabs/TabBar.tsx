import useScrollToCenterDistance from '@/hooks/useScrollToCenter';
import { useEffect, useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';
import Animated from 'react-native-reanimated';

import TabBarIndicator from './TabBarIndicator';
import TabBarItem from './TabBarItem';
import { Measure, TabBarItemProps, TabBarProps } from './type';

export default function TabBar(props: TabBarProps) {
  const scrollViewRef = useRef<Animated.ScrollView | ScrollView>(null);
  const [measures, setMeasures] = useState<Measure[]>([]);
  useEffect(() => {
    setTimeout(() => {
      const m: Measure[] = [];
      props.navigationState.routes.forEach((route, _, array) => {
        route.ref.current?.measureLayout(
          scrollViewRef.current as any,
          (left, top, width, height) => {
            m.push({ left, top, width, height });
            if (m.length === array.length) {
              setMeasures(m);
            }
          },
          () => {},
        );
      });
    }, 0);
  }, [props.navigationState.routes, setMeasures]);

  const x = useScrollToCenterDistance({
    ref: props.navigationState.routes[props.navigationState.index].ref,
    wrapperRef: scrollViewRef,
    idx: props.navigationState.index,
  });
  scrollViewRef.current?.scrollTo({
    x,
  });
  let tabBarWidth = 0;
  if (measures.length === 0) {
    tabBarWidth = 0;
  } else {
    const { left, width } = measures[measures.length - 1];
    tabBarWidth = left + width;
  }

  return (
    <View>
      <Animated.ScrollView
        ref={scrollViewRef as any}
        horizontal
        accessibilityRole="tablist"
        keyboardShouldPersistTaps="handled"
        scrollEnabled={true} // <- TODO 尝试作为props传进来，目前问题是在滚动时怎么让Indicator也跟着滚动
        bounces={props.bounces}
        alwaysBounceHorizontal={false}
        scrollsToTop={false}
        showsHorizontalScrollIndicator={false}
        automaticallyAdjustContentInsets={false}
        overScrollMode="never"
        contentContainerStyle={[
          // eslint-disable-next-line react-native/no-inline-styles
          {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexWrap: 'nowrap',
            height: 40,
            minWidth: '100%',
          },
          props.tabBarStyle,
        ]}
        scrollEventThrottle={16}>
        {props.navigationState.routes.map((route, idx) => {
          const { key, ...otherProps } = route;
          const itemProps: TabBarItemProps = {
            ...otherProps,
            navigationState: props.navigationState,
            showIcon: props.showIcon,
            textStyle: props.textStyle,
            active: props.navigationState.index === idx,
            onPress: () => {
              const event = {
                route,
                defaultPrevented: false,
                preventDefault: () => {
                  event.defaultPrevented = true;
                },
              };
              props.onTabPress?.(event);
              if (event.defaultPrevented) {
                return;
              }
              props.jumpTo(key);
            },
          };
          return <TabBarItem key={key} {...itemProps} />;
        })}

        {/* 指示器 */}
        {props.showIndicator && (
          <View
            style={[{ position: 'absolute', width: tabBarWidth, bottom: 0 }]}>
            {measures.length > 0 && (
              <TabBarIndicator
                x={x}
                measures={measures}
                currentIndex={props.navigationState.index}
                indicatorStyle={props.indicatorStyle}
              />
            )}
          </View>
        )}
      </Animated.ScrollView>
    </View>
  );
}
