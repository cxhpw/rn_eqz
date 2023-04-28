import { forwardRef, ReactNode } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import {
  backgroundColor,
  BackgroundColorProps,
  border,
  BorderProps,
  composeRestyleFunctions,
  layout,
  LayoutProps,
  spacing,
  SpacingProps,
  useRestyle,
  position,
  PositionProps,
} from '@shopify/restyle';

import { Theme } from '../Theme/theme';
import FlexItem from './FlexItem';
const restyleFunctions = composeRestyleFunctions([
  spacing,
  border,
  backgroundColor,
  layout,
  position,
]);

type FlexProps = SpacingProps<Theme> &
  BorderProps<Theme> &
  LayoutProps<Theme> &
  PositionProps<Theme> &
  BackgroundColorProps<Theme> & {
    style?: StyleProp<ViewStyle>;
    children?: ReactNode;
  };

const Flex = forwardRef<View, FlexProps>(({ children, ...restProps }, ref) => {
  const props = useRestyle(restyleFunctions as any, {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    ...restProps,
  });

  return (
    <View ref={ref} {...props}>
      {children}
    </View>
  );
});
Flex.displayName = 'Flex';

export default Object.assign(Flex, { Item: FlexItem });
