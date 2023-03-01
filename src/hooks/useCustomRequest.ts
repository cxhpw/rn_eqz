import { useStore } from '@/store/z';
import { useRequest } from 'ahooks';
import { Service, Options } from 'ahooks/lib/useRequest/src/types';

export default function useCustomRequest<T, P extends any[] = []>(
  service: Service<T, P>,
  options?: Options<T, P>,
) {
  const isOnline = useStore(state => state.isOnline);
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
  const {
    refreshDeps = [isOnline, ...(options?.refreshDeps || [])],
    onError,
    ...restOptions
  } = options || {};
  const result = useRequest(customService, {
    refreshDeps,
    onError: (error: any, params: P) => {
      try {
        const { code } = JSON.parse(error.message);
        if ([100].includes(code)) {
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
