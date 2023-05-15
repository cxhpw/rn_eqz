import { Children, createContext, forwardRef, memo } from 'react';
import { View, Text } from 'react-native';
import {
  CheckboxGroupProps,
  CheckboxGroupContext as _CheckboxGroupContext,
} from './type';
import { useCheckboxGroupState } from '@react-stately/checkbox';
import { useCheckboxGroup } from '@react-native-aria/checkbox';

export const CheckboxGroupContext = createContext<null | _CheckboxGroupContext>(
  null,
);

const CheckboxGroup = (
  { size, shape, children, ...props }: CheckboxGroupProps,
  ref: any,
) => {
  let state = useCheckboxGroupState(props);
  const { groupProps, labelProps } = useCheckboxGroup(props, state);
  return (
    <View {...groupProps}>
      {props.label && <Text {...labelProps}>{props.label}</Text>}
      <CheckboxGroupContext.Provider
        value={{
          size,
          shape,
          state,
        }}>
        {children}
      </CheckboxGroupContext.Provider>
    </View>
  );
};

export default memo(forwardRef(CheckboxGroup));
