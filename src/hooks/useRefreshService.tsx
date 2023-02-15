//@ts-nocheck
import { useMemoizedFn, useRequest, useSafeState } from 'ahooks';
import { Service, Options } from 'ahooks/lib/useRequest/src/types';
import { useMemo } from 'react';
import { Alert } from 'react-native';

// import { storageService } from '../services/StorageService';

// 初始化 page
export const INITIAL_PAGE = 1;
export const INITIAL_PAGE_SIZE = 10;

const DEFAULT_PARAMS = [
  {
    page: INITIAL_PAGE,
    pageSize: INITIAL_PAGE_SIZE,
  },
];

export type PageParams = { page: number; pageSize: number } & Record<
  string,
  unknown
>;

export function useRefreshService<
  T,
  R extends Page<T> = Page<T>,
  P extends PageParams[] = any[],
>(service: Service<R, P>, options?: Options<R, P>) {
  // const { signedIn, signOut } = storageService;

  const [data, setData] = useSafeState<T[]>([]);
  const [allLoaded, setAllLoaded] = useSafeState(false);

  const promiseService = async (...args: P) => {
    // if (!signedIn) {
    //   throw new Error(JSON.stringify({ code: '0', message: 'sadasd' }));
    // }
    console.log('fetch');
    return service(...args);
  };

  const { onSuccess, onError, ...restOptions } = options || {};

  const handleError = (err: unknown, params: P) => {
    console.log(err);
    const { code, message } = JSON.parse((err as Error).message);
    if (code) {
      if ([0, 1, 2].includes(code)) {
        // signOut();
      }
    }
    Alert.alert(message);
    onError?.(err as Error, params);
  };

  const {
    runAsync,
    params = DEFAULT_PARAMS,
    data: result,
    loading,
  } = useRequest(promiseService, {
    defaultParams: DEFAULT_PARAMS as P,
    ...restOptions,
    onSuccess(data: R, params: P) {
      console.log('success', data);
      // 对data进行处理
      const { list, page = INITIAL_PAGE, totalPage = 0, total = 0 } = data;
      if (total === 0) {
        setData([] as T[]);
      } else if (page === INITIAL_PAGE) {
        setData(list ?? []);
      } else {
        setData(data => {
          const newData = [...data];
          return newData.concat(list ?? []);
        });
      }

      if (totalPage === 0 || totalPage === page) {
        setAllLoaded(true);
      } else {
        setAllLoaded(false);
      }

      onSuccess?.(data, params);
    },
    onError: handleError,
  });

  /**
   * 从头开始刷新数据
   */
  const onRefresh = async () => {
    try {
      await runAsync({ ...params[0], page: INITIAL_PAGE });
    } catch (error) {
      handleError(error, params as P);
    }
  };

  /**
   * 加载下一页数据
   */
  const onLoadMore = async () => {
    if (loading) return;

    try {
      const { page } = params[0];
      if (allLoaded || page >= (result?.totalPage ?? 0)) return;

      await runAsync({ ...params[0], page: page + 1 });
    } catch (error) {
      handleError(error, params as P);
    }
  };

  const onUpdate = async (params: P) => {
    if (loading) return;

    try {
      await runAsync({ ...params[0], pageSize: 10, page: INITIAL_PAGE });
    } catch (error) {
      handleError(error, params as P);
    }
  };

  const { refreshing, loadingMore } = useMemo(() => {
    if (params.length > 0) {
      const isFirstPage = params[0].page === INITIAL_PAGE;
      if (isFirstPage) {
        return {
          refreshing: loading,
          loadingMore: false,
        };
      }
      return {
        refreshing: false,
        loadingMore: loading,
      };
    }
    return {
      refreshing: loading,
      loadingMore: false,
    };
  }, [loading, params]);

  return {
    refreshing,
    loadingMore,
    allLoaded,
    data,

    onRefresh: useMemoizedFn(onRefresh),
    onLoadMore: useMemoizedFn(onLoadMore),
    onUpdate: useMemoizedFn(onUpdate),
  };
}
