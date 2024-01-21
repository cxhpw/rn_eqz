import { useCustomRequest } from '@/hooks';
import request from '@/request';
import WaterfallItem from './waterfallItem';
import { LoadButton, Text, Box, Center, Flex } from '@/components';
import { StyleSheet } from 'react-native';

const Waterfall = () => {
  const { data, loading } = useCustomRequest(
    async () =>
      (
        await request<Product[]>('/Include/alipay/data.aspx', {
          params: {
            apiname: 'getrecommendproductlist',
            type: 'recommend',
          },
        })
      ).data,
  );
  return (
    <Box>
      <Center flexDirection="row" marginVertical="x5">
        <Text style={style.line} />
        <Text variant="h2" paddingHorizontal="x4">
          为您推荐
        </Text>
        <Text style={style.line} />
      </Center>
      <Flex flexWrap="wrap" flexDirection="row" marginHorizontal="x1">
        {data?.map(item => <WaterfallItem data={item} key={item.AutoID} />)}
      </Flex>
      <LoadButton loading={loading} title="本租赁服务由e奇租提供" />
    </Box>
  );
};

const style = StyleSheet.create({
  line: {
    height: 1,
    width: 50,
    backgroundColor: '#eee',
  },
});

export default Waterfall;
