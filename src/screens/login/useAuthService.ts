import { useCustomRequest } from '@/hooks';
import request from '@/request';
import { storageService, StorageToken } from '@/services/StorageService';
import { Keyboard } from 'react-native';
import useStackService from '@/stacks/useStackService';
import { useSafeState } from 'ahooks';

export function useAuthService() {
  const { update } = useStackService.useModel();
  const { updateStorage } = storageService;
  const [load, setLoad] = useSafeState(false);
  const { loading, runAsync: fetchUserInfo } = useCustomRequest(
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
  const { runAsync: _login } = useCustomRequest(
    async (params: any) => {
      return await (
        await request.post('/user/login', {
          _loginmobile: params.name,
          _loginpwd: params.password,
          _logintype: 'verificationlogin',
        })
      ).data;
    },
    { manual: true },
  );
  const {} = useCustomRequest;
  /** 获取登录凭证 */
  const fetchToken = async (values: any) => {
    _login(values).then(res => {
      console.log(res);
    });
  };

  /** 验证码登录 */
  const smslogin = async (values: object) => {
    try {
      console.log(12312, values);
      const res: any = await fetchToken(values);
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
    await smslogin(values);
  };
  return {
    loading,
    handleFinish,
  };
}
