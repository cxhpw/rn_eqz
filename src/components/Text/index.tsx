import { createText, TextProps } from '@shopify/restyle';
import React, { memo } from 'react';
import { TextProps as RNTextProps } from 'react-native';

import { type Theme } from '../Theme/theme';

type Props = TextProps<Theme> &
  RNTextProps & {
    children?: React.ReactNode;
  };

const Text = createText<Theme>();

export default memo(({ children, style, ...props }: Props) => {
  return (
    <Text
      color="text"
      {...props}
      style={[
        // eslint-disable-next-line react-native/no-inline-styles
        {
          includeFontPadding: false,
          textAlignVertical: 'center',
          fontVariant: ['tabular-nums'],
        },
        style,
      ]}>
      {children}
    </Text>
  );
});
