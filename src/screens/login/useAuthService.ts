import { useCustomRequest } from '@/hooks';
import request from '@/request';
import { storageService, StorageToken } from '@/services/StorageService';
import { Keyboard } from 'react-native';
import useStackService from '@/stacks/useStackService';

export function useAuthService() {
  const { update } = useStackService.useModel();
  const { updateStorage } = storageService;
  const { loading, runAsync } = useCustomRequest(
    async (params: object) => {
      return await (
        await request('/Include/alipay/data.aspx', {
          params: {
            apiname: 'getuserinfo',
            ...params,
          },
        })
      ).data;
    },
    {
      manual: true,
    },
  );
  const login = async (values: object) => {
    try {
      console.log(12312);
      const res = await runAsync(values);
      if (res) {
        updateStorage(StorageToken.UserInfo, res);
        updateStorage(StorageToken.SignedIn, true);
        update();
      } else {
        throw new Error('登录错误');
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  const handleFinish = async (values: object) => {
    Keyboard.dismiss();
    await login(values);
  };
  return {
    loading,
    handleFinish,
  };
}
