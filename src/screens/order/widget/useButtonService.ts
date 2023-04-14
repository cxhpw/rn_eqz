import { Alert } from 'react-native';
import { useCustomRequest, useToast } from '@/hooks';
import request from '@/request';

export default function useButtonService(id: number) {
  const { showToast } = useToast();
  const { loading, runAsync } = useCustomRequest(
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
              console.log(res);
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
  const onPay = () => {};
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
