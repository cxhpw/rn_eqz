import { useMemo } from 'react';

import { useLatest, useSafeState, useUpdateEffect } from 'ahooks';

import Flex from '../Flex';
import helpers from '../helpers';
import Text from '../Text';
import type { TextAreaProps } from './TextArea';

const { scale } = helpers;
export default function useTextArea({
  value = '',
  onChange,
  label,
  required = false,
}: Pick<TextAreaProps, 'value' | 'onChange' | 'label' | 'required'>) {
  const [inputValue, setInputValue] = useSafeState(value);
  const onChangeRef = useLatest(onChange);

  useUpdateEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (val: string) => {
    setInputValue(val);
    onChangeRef.current?.(val);
  };

  const LabelComp = useMemo(() => {
    if (label) {
      if (typeof label === 'string') {
        return (
          <Flex marginRight="x3" height={scale(40)}>
            {required && (
              <Text color="func600" marginRight={'x1'}>
                *
              </Text>
            )}
            <Text variant="p1" color="gray500">
              {label}
            </Text>
          </Flex>
        );
      }
      return (
        <Flex marginRight="x3" height={scale(40)}>
          {required && (
            <Text color="func600" marginRight={'x1'}>
              *
            </Text>
          )}
          {label}
        </Flex>
      );
    }
    return null;
  }, [label, required]);

  return {
    inputValue,
    handleChange,
    LabelComp,
  };
}
