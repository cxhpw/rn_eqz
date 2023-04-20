import { forwardRef, memo } from 'react';
import { View, Text } from 'react-native';
import { CheckboxGroupProps } from './type';

const CheckboxGroup = (
  { defaultValue, onChange }: CheckboxGroupProps,
  ref: any,
) => {
  console.log();
  return (
    <View>
      <Text>CheckboxGroup</Text>
    </View>
  );
};

export default memo(forwardRef(CheckboxGroup));
