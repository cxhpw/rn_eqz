import { memo, forwardRef } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import Flex from '../Flex';
import { IButtonProps } from './types';
import useButton from './usePropsResolution';
import Text from '../Text';
import { useIsPressed } from '../Pressable';

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
    ...redolveProps
  } = useButton(props, {
    isDisabled: isDisabled,
    isPressed: isPressedProp || isPressed,
    variant: variant,
  });
  const boxChildren = (child: any) => {
    return child ? (
      <Text variant="p2" color={colorScheme} style={_text}>
        {child}
      </Text>
    ) : null;
  };
  const spinnerElement = spinner ? (
    spinner
  ) : (
    <ActivityIndicator color={indicatorColor} size={20} />
  );
  return (
    <StylePressable
      disabled={isDisabled || isLoading}
      ref={ref}
      variant={variant}
      onPressIn={composeEventHandlers(onPressIn, pressableProps.onPressIn)}
      onPressOut={composeEventHandlers(onPressOut, pressableProps.onPressOut)}
      {...redolveProps}>
      <Flex>
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
      </Flex>
    </StylePressable>
  );
};

const styles = StyleSheet.create({
  space: {
    width: 6,
  },
});

export default memo(forwardRef(Button));
