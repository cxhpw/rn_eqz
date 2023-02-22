import { ScrollView, StyleSheet, Dimensions } from 'react-native';
import React, { useEffect } from 'react';
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
} from './widget';
import { useCustomRequest } from '@/hooks';
import request from '@/request';
import useSpecService from './useSpecService';
import useDateRange from '@/hooks/useDateRange';

type Props = {} & NativeStackScreenProps<AppParamList, 'Detail'>;

const { width } = Dimensions.get('window');
const Detail: React.FC<Props> = () => {
  const { params } = useRoute<RouteProp<AppParamList, 'Detail'>>();
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
  const { spec, defaultValue, onChange } = useSpecService(data?.guige);
  const { date, reCalcDate } = useDateRange(1);
  const { data: priceParameter, run } = useCustomRequest<ProductPrice>(
    async () =>
      (
        await request({
          url: '/Include/alipay/data.aspx',
          params: {
            apiname: 'getproductprice',
            start: date[0],
            end: date[1],
            pid: 766,
            guige: defaultValue,
          },
        })
      ).data,
    {
      refreshDeps: [defaultValue],
      manual: true,
    },
  );
  useEffect(() => {
    if (defaultValue !== undefined) {
      run();
    }
    reCalcDate(5);
  }, [defaultValue, reCalcDate, run]);
  return (
    <Container>
      <ScrollView style={{ flex: 1 }}>
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
          <PricePanel data={data?.productdata} {...priceParameter} />
          <Spacer />
          <Recommend data={data?.prolist} />
          <Spacer />
          <Desc />
        </Skeleton>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({});

export default Detail;
