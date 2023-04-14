import { Flex, SButton } from '@/components';
import { AppTheme } from '@/theme';
import { useTheme } from '@shopify/restyle';
import { StyleSheet } from 'react-native';
import useButtonService from './useButtonService';
import { OrderContext } from './tabView';
import { useContext } from 'react';

const Footer = ({ status, id }: any) => {
  const Context = useContext(OrderContext);
  const theme = useTheme<AppTheme>();
  const { onCancel, onDetele, onPay } = useButtonService(id);
  const styles = StyleSheet.create({
    btn: {
      fontSize: 10,
      borderColor: '#000',
      borderRadius: 0,
      paddingVertical: 5,
      marginLeft: 10,
    },
    primary: {
      borderColor: theme.colors.primary50,
    },
  });
  const renderOrderButton = (OrderStatus: any) => {
    let button = null;
    if (OrderStatus === 101 || OrderStatus === 99) {
      button = (
        <SButton
          variant="Outline"
          colorScheme="text"
          style={styles.btn}
          onPress={() => {
            onDetele().then(() => {
              console.log(231);
              Context?.setData(oldData => {
                const res = oldData.filter(item => item.OrderID !== id);
                return [...res];
              });
            });
          }}>
          删除订单
        </SButton>
      );
    } else if (OrderStatus === 11) {
      button = (
        <SButton
          variant="Outline"
          colorScheme="primary50"
          style={[styles.btn, styles.primary]}>
          确认收货
        </SButton>
      );
    } else if (OrderStatus === 12) {
      button = (
        <SButton
          variant="Outline"
          colorScheme="primary50"
          style={[styles.btn, styles.primary]}>
          归还
        </SButton>
      );
    } else if (OrderStatus === 1 || OrderStatus === 0) {
      button = (
        <>
          <SButton
            variant="Outline"
            colorScheme="text"
            style={styles.btn}
            onPress={onCancel}>
            取消订单
          </SButton>
          <SButton
            onPress={onPay}
            variant="Outline"
            colorScheme="primary50"
            style={[styles.btn, styles.primary]}>
            去付款
          </SButton>
        </>
      );
    } else if (OrderStatus === 10) {
      button = (
        <SButton
          variant="Outline"
          colorScheme="primary50"
          style={[styles.btn, styles.primary]}>
          退款
        </SButton>
      );
    } else if (
      OrderStatus === 13 ||
      OrderStatus === 14 ||
      OrderStatus === 15 ||
      OrderStatus === 16 ||
      OrderStatus === 18
    ) {
      button = <SButton>查看详情</SButton>;
    } else if (OrderStatus === 17) {
      button = <SButton>取消退款申请</SButton>;
    }
    return button;
  };
  return (
    <Flex
      paddingVertical="2.5"
      marginTop="2.5"
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: theme.colors.border,
        justifyContent: 'flex-end',
      }}>
      {renderOrderButton(status)}
    </Flex>
  );
};

Footer.displayName = 'OrderItemFooter';

export default Footer;
