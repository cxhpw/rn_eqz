import { useEffect, useState } from 'react';
import useDebounceFn from './useDebounceFn';

export type DebounceOptions = {
  wait?: number;
  leading?: boolean;
  trailing?: boolean;
  maxWait?: number;
};
function useDebounce<T>(value: T, options?: DebounceOptions) {
  const [debounced, setDebounced] = useState(value);
  const { run } = useDebounceFn(() => {
    setDebounced(value);
  }, options);
  useEffect(() => {
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return debounced;
}

export default useDebounce;
