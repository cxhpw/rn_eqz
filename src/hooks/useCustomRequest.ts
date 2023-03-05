import { useStore } from '@/store';
import { useRequest } from 'ahooks';
import { Service, Options } from 'ahooks/lib/useRequest/src/types';
import { useToast } from '@/hooks';

export default function useCustomRequest<T, P extends any[] = []>(
  service: Service<T, P>,
  options?: Options<T, P>,
) {
  const { showToast } = useToast();
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
  let { refreshDeps = [], onError, ...restOptions } = options || {};
  refreshDeps = refreshDeps.concat(isOnline);
  const result = useRequest(customService, {
    refreshDeps,
    onError: (error: any, params: P) => {
      try {
        const { code, message } = JSON.parse(error.message);
        if ([100].includes(code)) {
          // signOut();
        } else {
          showToast(message);
        }
      } catch (err) {
        showToast((err as unknown as { message: string })?.message);
      } finally {
        onError?.(error, params);
      }
    },
    ...restOptions,
  });
  return result;
}
