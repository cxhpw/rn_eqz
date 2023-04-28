import { memo } from 'react';
import { Dimensions, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Box, Flex } from 'native-base';
import Carousel from 'react-native-reanimated-carousel';
import { useRequest, useSafeState } from 'ahooks';
import request from '@/request';
import { Text } from '@/components';
import { transformUrlToParams } from '@/utils/common';
import { navigate } from '@/services/NavigationService';

type Props = {};
type BannerProps = {
  AdLink: string;
  AdMediaPath: string;
  AdName: string;
  AdText: string;
};
function Banner({}: Props) {
  const [current, setCurrent] = useSafeState(1);
  async function fetchBanner(params: number) {
    const res = await request({
      url: '/Include/alipay/data.aspx',
      params: {
        apiname: 'getbanner',
        adid: params,
      },
    });
    return res.data;
  }
  const width = Dimensions.get('window').width - 20;
  const { data = [], loading } = useRequest(fetchBanner, {
    defaultParams: [3],
  });
  return (
    <Box mx="2.5" position="relative">
      {!loading ? (
        <Carousel
          loop
          width={width}
          style={style.swiper}
          autoPlay={true}
          data={data as BannerProps[]}
          autoPlayInterval={3000}
          scrollAnimationDuration={1000}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                const { routeName, params } = transformUrlToParams(item.AdLink);
                navigate(routeName as any, params);
              }}>
              <Image
                source={{
                  uri: item.AdMediaPath,
                }}
                style={style.swiperItem}
                resizeMode="stretch"
              />
            </TouchableOpacity>
          )}
          onScrollBegin={() => {
            setCurrent(oldValue => {
              let len = data.length;
              return oldValue === len ? 1 : oldValue + 1;
            });
          }}
        />
      ) : (
        <Box style={style.swiper}>loading...</Box>
      )}
      <Indicator total={data.length} current={current} />
    </Box>
  );
}

//@ts-ignore
function Indicator({ current, total }) {
  return (
    <Flex
      direction="row"
      padding={1}
      backgroundColor="rgba(0,0,0,.5)"
      position="absolute"
      bottom={1}
      borderRadius="2.5"
      right={1}>
      <Text style={[style.Indicator, { fontSize: 12 }]}>{current}</Text>
      <Text style={style.Indicator}>/</Text>
      <Text style={style.Indicator}>{total}</Text>
    </Flex>
  );
}

const style = StyleSheet.create({
  swiper: {
    borderRadius: 4,
    height: 160,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  swiperItem: {
    width: '100%',
    height: 160,
  },
  Indicator: {
    fontSize: 10,
    lineHeight: 14,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default memo(Banner);
