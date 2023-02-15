import { useRequest } from 'ahooks';
import { Service, Options } from 'ahooks/lib/useRequest/src/types';
import useAppSelector from './useAppSelector';

export default function useCustomRequest<T, P extends any[] = []>(
  service: Service<T, P>,
  options?: Options<T, P>,
) {
  const isOnline = useAppSelector(state => state.isOnline);
  const customService = async (...args: P) => {
    if (!isOnline) {
      throw new Error(
        JSON.stringify({
          success: false,
          message: '网络连接异常',
        }),
      );
    }
    return service(...args);
  };
  const { refreshDeps = [isOnline], onError, ...restOptions } = options || {};
  const result = useRequest(customService, {
    refreshDeps,
    onError: (error: any, params: P) => {
      try {
        const { code, message } = JSON.parse(error.message);
        if ([].includes(code)) {
          // signOut();
        } else {
          // toastFail(message);
        }
      } catch (err) {
        // toastFail((err as { message: string })?.message);
      } finally {
        onError?.(error, params);
      }
    },
    ...restOptions,
  });
  return result;
}
