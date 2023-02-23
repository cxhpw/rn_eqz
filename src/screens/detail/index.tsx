import { ScrollView, StyleSheet, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useRoute, RouteProp } from '@react-navigation/native';
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
const Detail: React.FC<Props> = () => {
  const { params } = useRoute<RouteProp<AppParamList, 'Detail'>>();
  const [priceParameter, setPriceParameter] = useState(null);
  const { data, loading } = useCustomRequest<ProductDetail>(
    async () =>
      (
        await request({
          url: '/Include/alipay/data.aspx',
          params: {
            apiname: 'getproduct',
            pid: params.id,
          },
        })
      ).data,
  );
  const onMount = (d: any) => {
    console.log('onMount', d);
    setPriceParameter(d);
  };
  console.log('detail render');
  return (
    <Container>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 60 }}>
        <Skeleton
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
              height: 64,
              marginTop: 20,
              marginHorizontal: 10,
            },
          ]}
          loading={loading}
          animationDirection="horizontalRight">
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
      <ActionSubmit data={data} onMount={onMount} />
    </Container>
  );
};

const styles = StyleSheet.create({});

export default Detail;
