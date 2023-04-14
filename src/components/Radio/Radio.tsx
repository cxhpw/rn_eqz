import { useRadio } from '@react-native-aria/radio';
import React, { forwardRef, memo } from 'react';
import isEmpty from 'lodash-es/isEmpty';
//@ts-ignore
import stableHash from 'stable-hash';
import { mergeRefs } from '../utils';
import { combineContextAndProps } from '../utils';
import { RadioGroupContext } from './RadioGroup';
import type { IRadioProps } from './types';
import Pressable from '../Pressable';

import Text from '../Text';
import { usePropsResolution } from './usePropsResolution';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../Theme/theme';

const RadioComponent = memo(
  forwardRef(
    (
      { icon, inputProps, combinedProps, size, children, wrapperRef }: any,
      ref: any,
    ) => {
      const theme = useTheme<Theme>();
      const { isReadOnly } = combinedProps;
      const { disabled: isDisabled, checked: isChecked } = inputProps;
      const sizedIcon = () => {
        return React.cloneElement(icon, {});
      };
      const { RadioWrapper, CircleIcon } = usePropsResolution(size);
      return (
        <Pressable
          style={{
            height: theme.spacing[size as keyof Theme['spacing']] ?? size,
          }}
          {...inputProps}
          disabled={isDisabled}
          ref={mergeRefs([ref, wrapperRef])}>
          {/* radio */}
          <RadioWrapper
            size={size}
            variant={
              isChecked
                ? 'checked'
                : isDisabled || isReadOnly
                ? 'disabled'
                : undefined
            }>
            {icon && isChecked ? (
              sizedIcon()
            ) : (
              <CircleIcon opacity={isChecked ? 1 : 0} />
            )}
          </RadioWrapper>
          {/* Label */}
          <Text>{children}</Text>
        </Pressable>
      );
    },
  ),
);

const Radio = (
  { icon, children, size = 'x8', wrapperRef, ...props }: IRadioProps,
  ref: any,
) => {
  const contextState = React.useContext(RadioGroupContext);
  const combinedProps = combineContextAndProps({ ...contextState }, props);
  const inputRef = React.useRef(null);
  const radioState = useRadio(
    {
      ...combinedProps,
      'aria-label': props.accessibilityLabel,
      children,
    },
    contextState.state ?? {},
    inputRef,
  );

  const inputProps = React.useMemo(
    () => radioState.inputProps,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [radioState.inputProps.checked, radioState.inputProps.disabled],
  );

  const contextCombinedProps = React.useMemo(() => {
    return { ...combinedProps };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stableHash(combinedProps)]);
  if (isEmpty(contextState)) {
    console.error('Error: Radio must be wrapped inside a Radio.Group');
    return <></>;
  }
  return (
    <RadioComponent
      inputProps={inputProps}
      combinedProps={contextCombinedProps}
      children={children}
      size={size}
      ref={ref}
      icon={icon}
      wrapperRef={wrapperRef}
    />
  );
};
Radio.displayName = 'Radio';
export default memo(forwardRef(Radio));
