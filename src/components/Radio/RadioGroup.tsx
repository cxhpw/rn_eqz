import React, { memo, forwardRef } from 'react';
import type { IRadioContext, IRadioGroupProps } from './types';
import { useRadioGroupState } from '@react-stately/radio';
import { useRadioGroup } from '@react-native-aria/radio';
import Box from '../Box';
import { ViewProps } from 'react-native';

export const RadioGroupContext = React.createContext<IRadioContext>(
  {} as IRadioContext,
);
const RadioWrapper = memo((props: any) => {
  return (
    <Box flex={1} {...props}>
      {props.children}
    </Box>
  );
});
const RadioGroup = (
  { size, children, ...props }: IRadioGroupProps & ViewProps,
  ref?: any,
) => {
  const state = useRadioGroupState(props);
  const radioGroupState = useRadioGroup(
    { ...props, 'aria-label': props.accessibilityLabel },
    state,
  );
  const radioGroupProps = React.useMemo(
    () => radioGroupState.radioGroupProps,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const contextValue: any = React.useMemo(() => {
    return {
      size,
      state,
    };
  }, [size, state]);

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <RadioWrapper {...radioGroupProps} ref={ref}>
        {children}
      </RadioWrapper>
    </RadioGroupContext.Provider>
  );
};

RadioWrapper.displayName = 'RadioWrapper';
RadioGroup.displayName = 'RadioGroup';
export default memo(forwardRef(RadioGroup));
