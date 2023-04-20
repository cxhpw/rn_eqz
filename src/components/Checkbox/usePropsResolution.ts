import {
  createRestyleComponent,
  SpacingProps,
  spacing,
  BorderProps,
  border,
  LayoutProps,
  layout,
  BackgroundColorProps,
  backgroundColor,
} from '@shopify/restyle';
import { Theme } from '../Theme/theme';
import { TouchableOpacity as RNTouchableOpacity, View } from 'react-native';

export type ComponentProps = {
  children?: JSX.Element;
} & SpacingProps<Theme> &
  BorderProps<Theme> &
  LayoutProps<Theme> &
  BackgroundColorProps<Theme>;
export type TouchableOpacity = SpacingProps<Theme>;
const CheckboxComponent = createRestyleComponent<ComponentProps, Theme>(
  [spacing, border, backgroundColor, layout],
  View,
);
const TouchableOpacity = createRestyleComponent<TouchableOpacity, Theme>(
  [spacing],
  RNTouchableOpacity,
);

export function usePropsResolution(props: any) {
  return {
    CheckboxComponent,
    TouchableOpacity,
  };
}
