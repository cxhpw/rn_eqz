import { forwardRef } from 'react';
import { Switch, SwitchProps as RNSwitchProps } from 'react-native';

export type SwitchProps = Omit<RNSwitchProps, 'onChange'> & {
  onChange?: (val: boolean) => void;
  value?: boolean;
};
const Index: React.ForwardRefRenderFunction<Switch, SwitchProps> = (
  { onChange, value = false, ...rest },
  ref,
) => {
  return <Switch onValueChange={onChange} value={value} {...rest} ref={ref} />;
};

Index.displayName = 'Switch';
export default forwardRef(Index);
