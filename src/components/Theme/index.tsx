import { ThemeProvider as ShopifyThemeProvider } from '@shopify/restyle';
import React from 'react';
import { PropsWithChildren } from 'react';
import baseTheme, { type Theme } from './theme';
import { Portal } from '@/components';
import { Toaster } from '../Toast';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { lightTheme } = baseTheme;
type Props = {
  theme: Theme;
};
const ThemeProvider: React.FC<PropsWithChildren<Props>> = ({
  theme = lightTheme,
  children,
}) => {
  const contentInset = useSafeAreaInsets();
  return (
    <ShopifyThemeProvider theme={theme}>
      <Portal.Host>
        {children}
        <Toaster contentInset={contentInset} />
      </Portal.Host>
    </ShopifyThemeProvider>
  );
};

export default ThemeProvider;
