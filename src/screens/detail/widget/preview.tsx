import { Box, Flex } from 'native-base';
import { memo, PropsWithChildren, useState } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import RNCarousel from 'react-native-reanimated-carousel';
import FastImage from 'react-native-fast-image';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '@shopify/restyle';
import { AppTheme } from '@/theme';

type Props = {
  data?: ProductDetail['piclist'];
};

const Dot = memo(({ active }: { active: boolean }) => {
  const theme = useTheme<AppTheme>();
  const bgColor = useAnimatedStyle(() => ({
    width: withTiming(active ? 20 : 5, {
      duration: 500,
    }),
    backgroundColor: withTiming(active ? theme.colors.primary50 : '#999', {
      duration: 500,
    }),
  }));
  return (
    <Animated.View style={[style.line, bgColor]}>
      <View />
    </Animated.View>
  );
});

const Carousel: React.FC<PropsWithChildren<Props>> = ({ data = [] }) => {
  const { width } = Dimensions.get('window');
  const [active, setActive] = useState(0);
  return (
    <Box width="full" style={style.wrapper}>
      <RNCarousel
        loop={false}
        autoPlay={false}
        width={width}
        height={width}
        data={data as ProductDetail['piclist']}
        scrollAnimationDuration={1500}
        renderItem={({ item }) => (
          <FastImage
            source={{
              uri: item.ImgSrc,
            }}
            style={StyleSheet.absoluteFill}
            resizeMode="cover"
          />
        )}
        onSnapToItem={index => {
          setActive(index);
        }}
      />
      <Flex flexDir="row" style={style.indicator} justifyContent="center">
        {data.map((item, i) => (
          <Dot key={item.PicID} active={i === active} />
        ))}
      </Flex>
    </Box>
  );
};

const style = StyleSheet.create({
  wrapper: {
    position: 'relative',
    width: '100%',
  },
  swiperItem: {
    position: 'absolute',
  },
  indicator: {
    position: 'absolute',
    bottom: 15,
    left: 0,
    right: 0,
  },
  line: {
    height: 5,
    width: 20,
    marginHorizontal: 4,
  },
});

export default Carousel;
