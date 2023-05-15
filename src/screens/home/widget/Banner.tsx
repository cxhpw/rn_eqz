import { memo } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import FastImage from 'react-native-fast-image';
import { useRequest, useSafeState } from 'ahooks';
import request from '@/request';
import { Text, Box, Flex } from '@/components';
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
    <Box marginHorizontal="2.5">
      {!loading ? (
        <Carousel
          loop={data.length > 1}
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
              <FastImage
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
        <Box style={style.swiper}>
          <Text>loading...</Text>
        </Box>
      )}
      <Indicator total={data.length} current={current} />
    </Box>
  );
}

//@ts-ignore
function Indicator({ current, total }) {
  return (
    <Flex
      flexDirection="row"
      padding="x1"
      position="absolute"
      style={{
        borderRadius: 4,
        backgroundColor: 'rgba(0,0,0,.5)',
        right: '4%',
        bottom: '4%',
      }}>
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
    // backgroundColor: '#ffffff',
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
