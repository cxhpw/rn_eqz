/* eslint-disable react-native/no-inline-styles */
import {
  ScrollView,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useHeaderHeight } from '@react-navigation/elements';
import { Container, Skeleton, Spacer } from '@/components';
import {
  Carousel,
  Desc,
  PlatformLogo,
  PricePanel,
  ProductPanel,
  Recommend,
  ActionSubmit,
} from './widget';
import { useCustomRequest } from '@/hooks';
import request from '@/request';

type Props = {} & NativeStackScreenProps<AppParamList, 'Detail'>;
const { width } = Dimensions.get('window');
const Detail: React.FC<Props> = ({ route, navigation }) => {
  const { params } = route;
  const { data, loading } = useCustomRequest<ProductDetail>(async () => {
    const res = await request({
      url: '/Include/alipay/data.aspx',
      params: {
        apiname: 'getproduct',
        pid: params.id,
      },
    });
    return res.data;
  });
  const height = useHeaderHeight();
  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetTop = e.nativeEvent.contentOffset.y;
    const opacity = Math.min(offsetTop, height) / height;
    if (opacity <= 1) {
      navigation.setOptions({
        headerStyle: {
          backgroundColor: `rgba(255,255,255,${opacity})`,
        },
        headerTitleStyle: {
          color: `rgba(0,0,0,${opacity})`,
        },
      });
    }
  };
  return (
    <Container>
      <ScrollView
        style={{ flex: 1 }}
        onScroll={onScroll}
        scrollEventThrottle={1}
        contentContainerStyle={{ paddingBottom: 60, minHeight: '100%' }}>
        <Skeleton
          containerStyle={{
            flex: 1,
          }}
          styles={[
            {
              width: width,
              height: width,
            },
            {
              width: '100%',
              height: 50,
            },
            {
              width: width * 0.8,
              height: 30,
              marginTop: 10,
              marginHorizontal: 10,
            },
            {
              marginHorizontal: 10,
              marginTop: 20,
              styles: [
                {
                  width: 50,
                  height: 15,
                  marginRight: 10,
                },
                {
                  width: 50,
                  height: 15,
                },
              ],
            },
            {
              width: width - 20,
              height: 70,
              marginTop: 20,
              marginHorizontal: 10,
              marginBottom: 10,
            },
            {
              width: '100%',
              flex: 1,
              marginHorizontal: 10,
            },
          ]}
          loading={loading}>
          <Carousel data={data?.piclist} />
          <PlatformLogo />
          <ProductPanel data={data?.productdata} />
          <PricePanel data={data?.productdata} />
          <Spacer />
          <Recommend data={data?.prolist} />
          <Spacer />
          <Desc data={data?.productdata} />
        </Skeleton>
      </ScrollView>
      <ActionSubmit data={data} />
    </Container>
  );
};

export default Detail;
