import { Alert, Linking } from 'react-native';
import { useCustomRequest, useToast } from '@/hooks';
import request from '@/request';
import { useContext } from 'react';
import { OrderContext } from '../screens/order/widget/tabView';

export default function useButtonService(id: number) {
  const Context = useContext(OrderContext);
  const { showToast } = useToast();
  const { runAsync } = useCustomRequest(
    async (params: any) => {
      const res = await (
        await request.post('/Include/alipay/data.aspx', {
          apiname: 'operatingorders',
          action: params.action,
          oid: id,
        })
      ).data;
      return res;
    },
    {
      manual: true,
    },
  );
  const { runAsync: freePay, loading } = useCustomRequest(
    async params => {
      console.log('参数', params);
      return await (
        await request({
          url: '/Include/alipay/data.aspx',
          method: 'POST',
          data: {
            apiname: 'alipayfreezepay',
            oid: params,
          },
        })
      ).data;
    },
    {
      manual: true,
    },
  );
  /** 是否取消 */
  const onCancel = () => {
    Alert.alert('提示', '确定取消？', [
      {
        text: '取消',
        style: 'default',
      },
      {
        text: '确定',
        onPress: () => {
          runAsync({
            action: 'cancel',
          }).then(res => {
            console.log(res);
            showToast(res.msg);
            Context?.onRefresh();
          });
        },
      },
    ]);
  };
  /** 是否删除 */
  const onDetele = () => {
    return new Promise(resolve => {
      Alert.alert('提示', '确定删除', [
        {
          text: '取消',
          style: 'default',
        },
        {
          text: '确定',
          onPress: () => {
            runAsync({
              action: 'delete',
            }).then(res => {
              showToast(res.msg);
              resolve(res);
            });
          },
        },
      ]);
    });
  };
  /** 是否签收 */
  const onSign = () => {
    runAsync({
      action: 'sign',
    });
  };
  const onPay = () => {
    freePay(id).then(resp => {
      console.log(123);
      const returnUrl = encodeURIComponent(`rntemplate://order_detail/${id}`);
      Linking.openURL(
        `alipays://platformapi/startApp?appId=60000157&orderStr=${encodeURIComponent(
          resp.myOrderStr,
        )}&return_url=${returnUrl}`,
      );
    });
  };
  return {
    /** 是否取消 */
    onCancel,
    /** 是否删除 */
    onDetele,
    /** 是否签收 */
    onSign,
    /** 去付款 */
    onPay,
  };
}
