import { useLatest, useMemoizedFn, useSafeState } from 'ahooks';
import type { SwitchProps } from './index';

export default function useSwitch({ onChange, value }: SwitchProps) {
  const [initValue, setInitValue] = useSafeState(value);
  const onChangeRef = useLatest(onChange);

  const handeleChange = (val: boolean) => {
    setInitValue(val);
    onChangeRef.current?.(val);
  };
  return {
    initValue,
    onChangeRef,
    _onChange: useMemoizedFn(handeleChange),
  };
}
