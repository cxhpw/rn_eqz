import { forwardRef } from 'react';
import { Switch, SwitchProps as RNSwitchProps } from 'react-native';
import useSwitch from './useSwitch';

export type SwitchProps = Omit<RNSwitchProps, 'onChange'> & {
  onChange?: (val: boolean) => void;
  value?: boolean;
};
const Index: React.ForwardRefRenderFunction<Switch, SwitchProps> = (
  { onChange, value = false, ...rest },
  ref,
) => {
  const { _onChange, initValue } = useSwitch({
    onChange,
    value,
  });
  return (
    <Switch onValueChange={_onChange} value={initValue} {...rest} ref={ref} />
  );
};

Index.displayName = 'Switch';
export default forwardRef(Index);
