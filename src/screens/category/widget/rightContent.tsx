import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import Item from '@/screens/home/widget/Section/Item';
import DisCount from '@/screens/home/widget/Section/Discount';
import { FlashList, FlashListRef } from '@shopify/flash-list';
import { Box } from '@/components';
import { useRef, useState } from 'react';

type Props = {
  data?: Goods | null;
  onNextCategory: () => void;
};
const RightContent: React.FC<Props> = ({ data, onNextCategory }) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const threshold = 100; // 超过 60px 算准备切换
  const [canNext, setCanNext] = useState<boolean>(false);
  const ref = useRef<FlashListRef<Product>>(null);
  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'], // 0 → 反转
  });

  return (
    <FlashList
      ref={ref}
      contentContainerStyle={{
        paddingHorizontal: 5,
        paddingTop: 10,
        minHeight: '100%',
      }}
      data={data?.ProductList}
      renderItem={({ item }) => (
        <Item
          size={'100%'}
          ItemStyle={{
            paddingHorizontal: 5,
            marginBottom: 20,
            paddingTop: 5,
          }}
          key={item.AutoID}
          {...item}
          hasPrice
          renderIcon={DisCount(item.Discount as any)}
        />
      )}
      numColumns={3}
      ListHeaderComponent={
        data?.CategoryBanner ? (
          <Box paddingHorizontal="x1">
            <FastImage
              source={{
                uri: data?.CategoryBanner,
              }}
              style={style.Image}
              resizeMode="stretch"
            />
          </Box>
        ) : null
      }
      ListFooterComponent={
        <View style={[style.footer]}>
          <Animated.View style={{ transform: [{ rotate }] }}>
            <Text style={style.arrow}>⬆️</Text>
          </Animated.View>
          <Text style={style.footerText}>
            {canNext ? '松手跳转' : '上拉查看更多'}
          </Text>
        </View>
      }
      scrollEventThrottle={16}
      onScroll={e => {
        const { contentOffset, contentSize, layoutMeasurement } = e.nativeEvent;
        const distanceFromBottom =
          contentSize.height - (contentOffset.y + layoutMeasurement.height);

        if (distanceFromBottom < -threshold) {
          setCanNext(true); // 继续上拉超过阈值
          Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 200,
            easing: Easing.linear,
            useNativeDriver: true,
          }).start();
        } else {
          setCanNext(false);
          Animated.timing(rotateAnim, {
            toValue: 0,
            duration: 200,
            easing: Easing.linear,
            useNativeDriver: true,
          }).start();
        }
      }}
      onScrollEndDrag={() => {
        if (canNext) {
          onNextCategory?.();
          ref.current?.scrollToTop({
            animated: false,
          });
        }
      }}
    />
  );
};

const style = StyleSheet.create({
  Image: {
    width: '100%',
    height: 75,
    borderRadius: 6,
  },
  footer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateY: '100%' }],
  },
  arrow: { fontSize: 24 },
  footerText: { fontSize: 14, color: '#666', marginTop: 4 },
});

export default RightContent;
