import { Alert, Linking } from 'react-native';
import { useCustomRequest } from '@/hooks';
import request from '@/request';
import { createContext, useContext } from 'react';
import { toast } from '@/components/Toast';
import { confirm } from '@/components';

type OrderContext = {
  /** 订单ID */
  id?: number;
  /** 成功回调 */
  onSuccess?: (message?: Message) => void;
  /** 失败回调 */
  onFail?: (err: any) => void;
};

type Message = {
  message?: string;
  type: keyof typeof ActionType;
};

export enum ActionType {
  Cancel,
  Delete,
  Sign,
}

const OrderServiceContext = createContext<OrderContext | null>(null);

const onSuccessWrapper = (
  service: () => Promise<any>,
  callback?: (message?: Message) => void,
  message?: Message,
) => {
  return async () => {
    await service();
    setTimeout(() => {
      callback?.(message);
    });
  };
};
export function useOrderService() {
  const Context = useContext(OrderServiceContext);
  const { runAsync } = useCustomRequest(
    async (params: any) => {
      const res = await (
        await request.post('/Include/alipay/data.aspx', {
          apiname: 'operatingorders',
          action: params.action,
          oid: Context?.id,
        })
      ).data;
      return res;
    },
    {
      manual: true,
    },
  );
  const { runAsync: freePay } = useCustomRequest(
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
  const onCancel = async () => {
    await confirm('确定取消？');
    await runAsync({
      action: 'cancel',
    });
    toast.success('取消成功');
  };
  /** 是否删除 */
  const onDetele = async () => {
    await confirm('确定删除');
    await runAsync({
      action: 'delete',
    });
    toast.success('删除成功');
  };
  /** 是否签收 */
  const onSign = async () => {
    await confirm('请确保已收到商品');
    const res = await runAsync({
      action: 'sign',
    });
    return res;
  };
  const onPay = () => {
    console.log(Context?.id);
    freePay(Context?.id).then(resp => {
      console.log(123);
      const returnUrl = encodeURIComponent(
        `rntemplate://order_detail/${Context?.id}`,
      );
      Linking.canOpenURL('alipays://platformapi/startApp').then(support => {
        if (support) {
          Linking.openURL(
            `alipays://platformapi/startApp?appId=60000157&orderStr=${encodeURIComponent(
              resp.myOrderStr,
            )}&return_url=${returnUrl}`,
          );
        } else {
          Alert.alert('请安装支付宝');
        }
      });
    });
  };
  return {
    /** 是否取消 */
    onCancel: onSuccessWrapper(onCancel, Context?.onSuccess, {
      type: 'Cancel',
    }),
    /** 是否删除 */
    onDetele: onSuccessWrapper(onDetele, Context?.onSuccess, {
      type: 'Delete',
      message: '',
    }),
    /** 是否签收 */
    onSign,
    /** 去付款 */
    onPay,
  };
}

useOrderService.Provider = OrderServiceContext.Provider;
useOrderService.Consumer = OrderServiceContext.Consumer;
