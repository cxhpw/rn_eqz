import { Box, Flex, Text } from '@/components';
import { AppTheme } from '@/theme';
import { useTheme } from '@shopify/restyle';
import { memo } from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { getDays, getMonthDate } from '@/utils/common';
import Footer from './footer';

const StatusTag = memo(({ children, status = 'fail' }: any) => {
  const theme = useTheme<AppTheme>();
  const backgroundColor =
    status === 'fail' ? '#919191' : theme.colors.primary50;
  const _styles = StyleSheet.create({
    tag: {
      position: 'absolute',
      height: 30,
      top: -15,
      left: 16,
      backgroundColor,
    },
  });
  return (
    <Box
      style={_styles.tag}
      alignItems="center"
      justifyContent="center"
      minWidth={80}>
      <Text color="white" variant="p2">
        {children}
      </Text>
    </Box>
  );
});

const statusText = (status: any) => {
  let text = '';
  if (status === 1 || status === 0) {
    text = '待付款';
  } else if (status === 10 || status === 18) {
    text = '待发货';
  } else if (status === 11) {
    text = '待收货';
  } else if (status === 12) {
    text = '租用中';
  } else if (status === 13 || status === 15 || status === 16) {
    text = '退还中';
  } else if (status === 14 || status === 17) {
    text = '待退款';
  } else if (status === 99) {
    text = '已完成';
  } else if (status === 101) {
    text = '已关闭';
  }
  return text;
};

const Item: React.FC<OrderItem> = ({
  ContentImage,
  Quantity,
  ProName,
  OrderStatus,
  OrderTotalAmount,
  OtherFee,
  EndTime,
  StartingTime,
  OrderID,
}) => {
  const theme = useTheme<AppTheme>();
  return (
    <Box
      mt="x10"
      style={{
        backgroundColor: `${
          theme.theme === 'dark' ? 'rgba(0,0,0,1)' : 'white'
        }`,
      }}
      paddingHorizontal="x4"
      pt="x6"
      shadowColor="black"
      shadowOpacity={0.05}
      shadowOffset={{
        width: 1,
        height: 1,
      }}
      shadowRadius={4}
      borderRadius="x1">
      <StatusTag status={OrderStatus === 101 ? 'fail' : ''}>
        {statusText(OrderStatus)}
      </StatusTag>
      <Flex>
        <Box flex={1}>
          <Box marginBottom="2.5">
            <Text fontWeight="bold">
              {OrderID}
              {ProName}
            </Text>
          </Box>
          <Box>
            <Text color="gray300" variant="p2">
              {getMonthDate(StartingTime)} - {getMonthDate(EndTime)}（共{' '}
              {getDays(StartingTime, EndTime)}天）
            </Text>
          </Box>
        </Box>
        <Box>
          <FastImage
            style={styles.image}
            source={{
              uri: ContentImage,
            }}
          />
        </Box>
      </Flex>
      <Flex marginTop="2.5">
        <Box flex={1}>
          <Text variant="p2" color="gray300">
            实际支付：¥{OrderTotalAmount}（含可退押金¥{OtherFee}）
          </Text>
        </Box>
        <Text variant="p2" color="gray300">
          x{Quantity}
        </Text>
      </Flex>
      <Footer status={OrderStatus} id={OrderID} />
    </Box>
  );
};
const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
  },
});
export default memo(Item);
