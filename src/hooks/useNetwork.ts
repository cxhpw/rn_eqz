import NetInfo, {
  NetInfoState,
  useNetInfo,
} from '@react-native-community/netinfo';
import { useMount, useUpdateEffect } from 'ahooks';
import { setNetwork } from '@/reducers/modules/utils';
import type { Store } from '@reduxjs/toolkit';
/** 是否联网 */
export default function useNetwork(store: Store) {
  /** 已经包含了网络连接变化情况的监听事件 */
  const netInfo = useNetInfo();
  /**
   * 当连接状态发生改变的时候
   */
  useUpdateEffect(() => {}, [netInfo.isConnected, netInfo.isInternetReachable]);
  /**
   * 一上来就先获取网络连接状态
   */
  useMount(() => {
    NetInfo.fetch().then((state: NetInfoState) => {
      store.dispatch(setNetwork(state.isConnected as boolean));
    });
  });
  return [netInfo];
}
