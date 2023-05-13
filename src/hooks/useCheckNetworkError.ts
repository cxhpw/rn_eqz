import { useStore } from '@/store';
import { useEffect } from 'react';

export default function useCheckNetworkError() {
  const isOnline = useStore(state => state.isOnline);
  useEffect(() => {
    if (!isOnline) {
      throw new Error(JSON.stringify({ type: 'network' }));
    }
  }, [isOnline]);
  return isOnline;
}
