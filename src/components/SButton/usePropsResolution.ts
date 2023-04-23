import {
  useTheme,
  createRestyleComponent,
  VariantProps,
  createVariant,
  spacing,
} from '@shopify/restyle';
import { Theme } from '../Theme/theme';
import { Pressable, PressableProps, StyleProp, ViewProps } from 'react-native';
import { IButtonProps } from './types';
import { useMemo } from 'react';

type Props = VariantProps<Theme, 'ButtonVariants'> & {
  children?: JSX.Element | JSX.Element[];
  style: StyleProp<ViewProps>;
} & Pick<PressableProps, 'onPress' | 'onPressIn' | 'onPressOut' | 'disabled'>;

type State = IButtonProps;

// 分离ViewStyle，TextStyle
const textStyle = [
  'color',
  'fontSize',
  'fontStyle',
  'fontWeight',
  'lineHeight',
  'textAlign',
  'textDecorationLine',
  'textShadowColor',
  'fontFamily',
  'textShadowRadius',
  'includeFontPadding',
  'textAlignVertical',
  'fontVariant',
  'letterSpacing',
];
function _text(style: Object = {}) {
  let result: any = {};
  if (Array.isArray(style)) {
    style = style.reduce((prev, cur) => {
      return {
        ...prev,
        ...cur,
      };
    }, {});
  }
  for (const [key, value] of Object.entries(style)) {
    if (textStyle.indexOf(key) !== -1) {
      result[key] = value;
    }
  }
  return result;
}

export default function usePropsResolution(
  props: any,
  { isDisabled, ...state }: State,
) {
  const theme = useTheme<Theme>();
  const variant = useMemo(
    () =>
      createVariant<Theme>({
        themeKey: 'ButtonVariants',
        defaults: {
          borderColor: 'border',
          borderWidth: 1,
          paddingVertical: '2.5',
          paddingHorizontal: 'x3',
          borderRadius: 'x1',
          opacity: isDisabled ? 0.5 : 1,
          alignItems: 'center',
          justifyContent: 'center',
        },
      }),
    [isDisabled],
  );
  const StylePressable = useMemo(
    () =>
      createRestyleComponent<Props, Theme>(
        [variant as any, spacing],
        Pressable,
      ),
    [variant],
  );
  return {
    StylePressable,
    indicatorColor: theme.colors.primary100,
    colorScheme:
      props.colorScheme ||
      //@ts-ignore
      theme.ButtonVariants[state.variant || 'Solid'].color ||
      'text',
    _text: _text(props.style),
    ...props,
  };
}
