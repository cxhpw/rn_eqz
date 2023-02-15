import { ThemeProvider as ShopifyThemeProvider } from '@shopify/restyle';
import React from 'react';
import { PropsWithChildren } from 'react';
import baseTheme, { type Theme } from './theme';

const { lightTheme } = baseTheme;
type Props = {
  theme: Theme;
};
const ThemeProvider: React.FC<PropsWithChildren<Props>> = ({
  theme = lightTheme,
  children,
}) => {
  return <ShopifyThemeProvider theme={theme}>{children}</ShopifyThemeProvider>;
};

export default ThemeProvider;
