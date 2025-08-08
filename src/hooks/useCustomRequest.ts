import { useStore } from '@/store';
import { useRequest } from 'ahooks';
import { Service, Options } from 'ahooks/lib/useRequest/src/types';
import toast from '@/components/Toast';

const queue: any[] = [];
let messages: string[] = [];
let isCall = false;

export default function useCustomRequest<T, P extends any[] = []>(
  service: Service<T, P>,
  options?: Options<T, P>,
) {
  const isOnline = useStore(state => state.isOnline);
  let { refreshDeps = [], onError, ...restOptions } = options || {};
  refreshDeps = refreshDeps.concat(isOnline);
  const result = useRequest(service, {
    refreshDeps,
    onError: (error, params) => {
      console.log('useCustomRequest', error);
      const { code, message } = JSON.parse(error?.message);
      if ([100].includes(code)) {
        // signOut();
      } else {
        toast.error(message);
      }
      onError?.(error, params);
    },
    ...restOptions,
  });
  return result;
}
