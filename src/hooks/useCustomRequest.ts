import { useStore } from '@/store';
import { useRequest, useDebounce } from 'ahooks';
import { Service, Options } from 'ahooks/lib/useRequest/src/types';
import toast from '@/components/Toast';
import useDebounceFn from './useDebounceFn';

const queue: any[] = [];
let messages: string[] = [];
let isCall = false;

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
          Promise.resolve().then(() => {
            messages.push(message);
            setTimeout(() => {
              if (!isCall) {
                isCall = true;
                toast.error(message, {
                  onClose() {
                    isCall = false;
                  },
                });
              }
            });
          });
        }
      } catch (err) {
        queue.push(() => {
          toast.error((err as unknown as { message: string })?.message, {
            onClose() {
              isCall = false;
              queue.length = 0;
            },
          });
        });
        Promise.resolve().then(() => {
          setTimeout(() => {
            if (!isCall) {
              isCall = true;
              queue.shift()();
            }
          });
        });
      } finally {
        onError?.(error, params);
      }
    },
    ...restOptions,
  });
  return result;
}
