import type { DebounceOptions } from './useDebounce';
import { useLatest } from 'ahooks';
import debounce from 'lodash-es/debounce';
import { useMemo } from 'react';

type noop = (...args: any[]) => any;
export default function useDebounceFn<T extends noop>(
  fn: T,
  options?: DebounceOptions,
) {
  const fnRef = useLatest(fn);
  const wait = options?.wait ?? 1000;

  const debounced = useMemo(
    () =>
      debounce(
        (...args: Parameters<T>): ReturnType<T> => {
          return fnRef.current(...args);
        },
        wait,
        options,
      ),
    [],
  );
  return {
    run: debounced,
  };
}
