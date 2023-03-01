import { useStore } from '@/store';
import NetInfo, {
  NetInfoState,
  useNetInfo,
} from '@react-native-community/netinfo';
import { useMount, useUpdateEffect } from 'ahooks';

/** 是否联网 */
export default function useNetwork() {
  const setNetwork = useStore(state => state.setNetwork);
  /** 已经包含了网络连接变化情况的监听事件 */
  const netInfo = useNetInfo();
  /**
   * 当连接状态发生改变的时候
   */
  useUpdateEffect(() => {
    setNetwork(!!netInfo.isConnected && !!netInfo?.isInternetReachable);
  }, [netInfo.isConnected, netInfo.isInternetReachable]);
  /**
   * 一上来就先获取网络连接状态
   */
  useMount(() => {
    NetInfo.fetch().then((state: NetInfoState) => {
      setNetwork(state.isConnected as boolean);
    });
  });
  return [netInfo];
}
