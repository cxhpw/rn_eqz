/* eslint-disable react-native/no-inline-styles */
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Box, Container } from '@/components';
import { useCustomRequest } from '@/hooks';
import { ScrollView } from 'react-native-gesture-handler';
import request from '@/request';
import Status from './widget/status';
import { useTheme } from '@shopify/restyle';
import { AppTheme } from '@/theme';
import Top from './widget/top';
import Card from './widget/Card';
import Message from './widget/message';
import OrderInfo from './widget/orderInfo';
import ActionSubmit from './widget/actionSubmit';

const Index: React.FC<NativeStackScreenProps<AppParamList, 'OrderDetail'>> = ({
  route,
}) => {
  const theme = useTheme<AppTheme>();
  const { data, loading, runAsync } = useCustomRequest<OrderDetail>(
    async () => {
      return await (
        await request('/Include/alipay/data.aspx', {
          params: {
            apiname: 'getordersdetails',
            oid: route.params.id,
          },
        })
      ).data;
    },
  );
  return (
    <Container>
      <Box
        flex={1}
        style={{
          backgroundColor: theme.theme === 'dark' ? 'black' : '#f9f9f9',
        }}>
        <ScrollView
          contentContainerStyle={{
            paddingVertical: 10,
            paddingHorizontal: 15,
          }}
          // refreshControl={
          //   <CustomRefreshControl refreshing={loading} onRefresh={runAsync} />
          // }
        >
          <Status status={data?.OrderStatus} />
          <Top data={data} />
          <Card data={data} />
          <Message message={data?.Remark} />
          <OrderInfo data={data} />
        </ScrollView>
        <ActionSubmit data={data} onRefresh={runAsync} />
      </Box>
    </Container>
  );
};

Index.displayName = 'OrderDetail';

export default Index;
