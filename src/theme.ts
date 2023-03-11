/**
 *
 * 自定义主题
 *
 */
import theme from '@/components/Theme/theme';
import { scale } from './components/helpers/normalize';

export const lightTheme = {
  ...theme.lightTheme,
  colors: {
    ...theme.lightTheme.colors,
    iconBg: 'rgba(255,255,255,0.3)',
    tabActive: '#C6E1FD',
    text: '#000000',
    primary50: '#38CEB1',
    primary200: '#38CEB1',
    primary_background: '#ffffff',
  },
  textVariants: {
    ...theme.lightTheme.textVariants,
    h1: {
      ...theme.lightTheme.textVariants.h1,
      fontSize: scale(20),
    },
  },
};

export type AppTheme = typeof lightTheme;

export const darkTheme: AppTheme = {
  ...theme.darkTheme,
  colors: {
    ...theme.darkTheme.colors,
    iconBg: 'rgba(255,255,255,0.3)',
    tabActive: '#C6E1FD',
    text: '#ffffff',
    gray300: '#ffffff',
    gray500: '#333',
    primary50: '#38CEB1',
    primary200: '#38CEB1',
    primary_background: '#131C22',
  },
  textVariants: {
    ...theme.darkTheme.textVariants,
    h1: {
      ...theme.darkTheme.textVariants.h1,
      fontSize: scale(20),
    },
  },
};
