import { Box, Flex, Price, Text } from '@/components';
import { AppTheme } from '@/theme';
import { useTheme } from '@shopify/restyle';
import { StyleSheet } from 'react-native';

const OrderInfo = ({ data }: { data?: OrderDetail }) => {
  const theme = useTheme<AppTheme>();
  return (
    <Box
      backgroundColor="primary_background"
      mt="2.5"
      paddingVertical="2.5"
      paddingHorizontal="x3">
      <Flex
        marginBottom="x1"
        alignItems="center"
        justifyContent="space-between">
        <Text variant="p2" color="gray300">
          合计租金
        </Text>
        <Price
          afterText=""
          style={{ fontWeight: '400' }}
          color={theme.colors.gray300}
          money={(data?.GoodsTotalAmout ?? 0) + (data?.Insurance ?? 0)}
        />
      </Flex>
      <Flex
        marginBottom="x1"
        alignItems="center"
        justifyContent="space-between">
        <Text variant="p2" color="gray300">
          租金
        </Text>
        <Price
          style={{ fontWeight: '400' }}
          color={theme.colors.gray300}
          money={data?.GoodsTotalAmout}
          afterText=""
        />
      </Flex>
      <Flex
        marginBottom="x5"
        alignItems="center"
        justifyContent="space-between">
        <Text variant="p2" color="gray300">
          安心享
        </Text>
        <Price
          style={{ fontWeight: '400' }}
          color={theme.colors.gray300}
          money={data?.InsuranceFee}
          afterText=""
        />
      </Flex>
      <Flex alignItems="center" justifyContent="space-between">
        <Text fontWeight="500">押金</Text>
        <Price color={theme.colors.text} money={data?.OtherFee} afterText="" />
      </Flex>
      <Flex marginBottom="x5">
        <Text variant="p2" color="gray300">
          押金将在租赁结束后退还
        </Text>
      </Flex>
      <Box>
        <Text variant="p2">计费规则</Text>
        <Price
          style={{ fontWeight: '400' }}
          color={theme.colors.gray300}
          beforeText="日均租金："
          money={(data?.GoodsTotalAmout ?? 0) / (data?.Days ?? 0)}
        />
      </Box>
      <Box
        paddingTop="x4"
        marginTop="x4"
        borderTopWidth={StyleSheet.hairlineWidth}
        borderTopColor="border">
        <Text variant="p2" color="gray300" mb="x1">
          订单编号：{data?.OrderNo}
        </Text>
        <Text variant="p2" color="gray300">
          下单时间：{data?.OrderAddTime}
        </Text>
      </Box>
    </Box>
  );
};

export default OrderInfo;
