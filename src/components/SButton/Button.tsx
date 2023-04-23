/* eslint-disable react-native/no-inline-styles */
import { memo, forwardRef } from 'react';
import { StyleSheet } from 'react-native';
import { IButtonProps } from './types';
import usePropsResolution from './usePropsResolution';
import Text from '../Text';
import { useIsPressed } from '../Pressable';
import Center from '../Center';
import UIActivityIndicator from '../Indicator/UIActivityIndicator';

function composeEventHandlers<E>(
  originalEventHandler?: null | ((event: E) => void),
  ourEventHandler?: (event: E) => void,
) {
  return function handleEvent(event: E) {
    originalEventHandler?.(event);
    ourEventHandler?.(event);
  };
}
const Button = (
  {
    children,
    leftIcon,
    rightIcon,
    variant = 'Solid',
    isLoading,
    isLoadingText,
    spinnerPlacement = 'start',
    spinner,
    isDisabled,
    isPressed: isPressedProp,
    ...props
  }: IButtonProps,
  ref: any,
) => {
  const { pressableProps, isPressed } = useIsPressed();
  const {
    StylePressable,
    indicatorColor,
    onPressIn,
    onPressOut,
    colorScheme,
    _text,
    style,
    ...redolveProps
  } = usePropsResolution(props, {
    isDisabled: isDisabled || isLoading,
    isPressed: isPressedProp || isPressed,
    variant: variant,
  });
  const boxChildren = (child: any) => {
    return child ? (
      <Text variant="p2" color={colorScheme} style={[_text]}>
        {child}
      </Text>
    ) : null;
  };
  const spinnerElement = spinner ? (
    spinner
  ) : (
    <UIActivityIndicator
      color={indicatorColor}
      size={14}
      style={{
        marginStart: spinnerPlacement === 'start' ? 10 : 0,
        marginLeft: spinnerPlacement === 'end' ? 10 : 0,
      }}
    />
  );
  return (
    <StylePressable
      disabled={isDisabled || isLoading}
      ref={ref}
      variant={variant}
      style={[style]}
      onPressIn={composeEventHandlers(onPressIn, pressableProps.onPressIn)}
      onPressOut={composeEventHandlers(onPressOut, pressableProps.onPressOut)}
      {...redolveProps}>
      <Center>
        {isLoading && spinnerPlacement === 'start' ? spinnerElement : null}
        {leftIcon && !isLoading ? leftIcon : null}
        {(isLoading || leftIcon) && <Text style={styles.space} />}
        {isLoading
          ? isLoadingText
            ? boxChildren(isLoadingText)
            : null
          : boxChildren(children)}
        {(isLoading || rightIcon) && <Text style={styles.space} />}
        {rightIcon && !isLoading ? rightIcon : null}
        {isLoading && spinnerPlacement === 'end' ? spinnerElement : null}
      </Center>
    </StylePressable>
  );
};

const styles = StyleSheet.create({
  space: {
    width: 6,
  },
});

export default memo(forwardRef(Button));
