import { forwardRef, memo, useRef } from 'react';
import { CheckboxProps } from './type';
import { useCheckbox } from '@react-native-aria/checkbox';
import { useToggleState } from '@react-stately/toggle';
import Flex from '../Flex';
import Box from '../Box';
import { usePropsResolution } from './usePropsResolution';
import Text from '../Text';
// import { CheckboxGroupContext } from './CheckboxGroup';
import { SvgXml } from 'react-native-svg';

function Icon({ size = 20, color = '#fff' }: { size: number; color: string }) {
  const svg = `
  <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M6 12L10 16L18 8" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
  `;
  return <SvgXml xml={svg} />;
}

const Checkbox = (
  {
    disabled = false,
    value,
    onChange,
    checked,
    defaultChecked = false,
    indeterminate = false,
    children,
    size = 16,
    shape = 'square',
    ...props
  }: CheckboxProps,
  ref: any,
) => {
  const inputRef = useRef(null);
  const state = useToggleState({
    onChange,
    value: value,
    defaultSelected: defaultChecked,
    isSelected: undefined,
  });
  const { inputProps } = useCheckbox(
    {
      isDisabled: disabled,
      isIndeterminate: indeterminate,
      isSelected: checked,
      defaultSelected: defaultChecked,
      onChange,
      value: value,
      'aria-label': props.accessibilityLabel || 'checkbox',
      children,
    },
    state,
    inputRef,
  );
  const { CheckboxComponent, TouchableOpacity } =
    usePropsResolution(inputProps);

  const boxChildren = (child?: string | JSX.Element | JSX.Element[]) => {
    if (!child) {
      return null;
    }
    return typeof child === 'string' ? (
      <Text variant="p2">{child}</Text>
    ) : (
      child
    );
  };
  return (
    <TouchableOpacity {...inputProps} {...props} ref={ref}>
      <Flex>
        <CheckboxComponent
          width={size}
          height={size}
          backgroundColor={`${inputProps.checked ? 'primary50' : 'white'}`}
          alignItems="center"
          justifyContent="center"
          borderWidth={1}
          borderRadius={shape === 'square' ? 'x1' : 'full'}
          borderColor={`${inputProps.checked ? 'primary50' : 'gray200'}`}>
          <Icon
            size={size * 0.8}
            color={inputProps.checked ? '#fff' : 'rgba(0,0,0,.2)'}
          />
        </CheckboxComponent>
        {boxChildren(children)}
      </Flex>
    </TouchableOpacity>
  );
};
Checkbox.displayName = 'Checkbox';

export default memo(forwardRef(Checkbox));
