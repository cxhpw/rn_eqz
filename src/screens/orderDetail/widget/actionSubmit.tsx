/* eslint-disable react-native/no-inline-styles */
import { SButton, Flex, Box, Text } from '@/components';
import { AppTheme } from '@/theme';
import { useTheme } from '@shopify/restyle';
import dayjs from 'dayjs';
import { memo } from 'react';
import { StyleSheet } from 'react-native';
import { useOrderService } from '@/hooks/useOrder';
import { goBack } from '@/services/NavigationService';

const { Provider } = useOrderService;

const Button = memo(({ children, ...props }: any) => {
  const theme = useTheme<AppTheme>();
  return (
    <SButton
      style={[
        {
          fontSize: 10,
          borderRadius: 0,
          marginLeft: 10,
          paddingVertical: 5,
          minWidth: 80,
          borderColor: theme.colors.text,
        },
        { ...props.style },
      ]}
      colorScheme="text"
      variant="Outline"
      {...props}>
      {children}
    </SButton>
  );
});

const ButtonFilter = memo(({ data }: { data?: OrderDetail }) => {
  const { onPay, onDetele, onCancel, onSign } = useOrderService();
  const theme = useTheme<AppTheme>();
  let btn = <></>;
  if (data?.OrderStatus === 101) {
    btn = (
      <Button
        onPress={() => {
          onDetele().then(() => {
            console.log('回退');
            goBack();
          });
        }}>
        删除订单
      </Button>
    );
  } else if (data?.OrderStatus === 11) {
    btn = (
      <Button
        onPress={() => {
          onSign();
        }}>
        确认收货
      </Button>
    );
  } else if (data?.OrderStatus === 12) {
    btn = <Button>归还</Button>;
  } else if (data?.OrderStatus === 1 || data?.OrderStatus === 0) {
    btn = (
      <>
        <Button
          onPress={() => {
            onCancel();
          }}>
          取消订单
        </Button>
        <Button
          style={{
            fontSize: 10,
            borderRadius: 0,
            marginLeft: 10,
            paddingVertical: 5,
            minWidth: 80,
            borderColor: theme.colors.primary50,
          }}
          onPress={onPay}
          colorScheme="primary50">
          付款
        </Button>
      </>
    );
  } else if (data?.OrderStatus === 17) {
    btn = <Button>取消退款申请</Button>;
  } else if (data?.OrderStatus === 10) {
    btn = <Button>退款</Button>;
  }
  return btn;
  // eslint-disable-next-line react-hooks/exhaustive-deps
});

const ActionSubmit = ({
  data,
  onRefresh,
}: {
  data?: OrderDetail;
  onRefresh?: () => void;
}) => {
  return (
    <Provider
      value={{
        id: data?.AutoID,
        onSuccess(message) {
          if (message?.type !== 'Delete') {
            /** 统一处理，当订单状态改变，重新获取订单数据 */
            onRefresh?.();
          }
        },
      }}>
      <Flex
        backgroundColor="primary_background"
        justifyContent="space-between"
        alignItems="center"
        height={50}
        borderTopWidth={StyleSheet.hairlineWidth}
        borderTopColor="gray100"
        paddingHorizontal="x5">
        <Box>
          {data?.OrderStatus === 1 || data?.OrderStatus === 0 ? (
            <Text variant="p2" color="gray300">
              请在{dayjs(data?.Expiretime).format('MM月DD日HH:mm')}之前支付
            </Text>
          ) : null}
        </Box>
        <Flex>
          <ButtonFilter data={data} />
        </Flex>
      </Flex>
    </Provider>
  );
};

export default ActionSubmit;
