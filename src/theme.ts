/**
 *
 * 自定义主题
 *
 */
import theme from '@/components/Theme/theme';
import { scale } from './helper/normalize';

export const lightTheme = {
  ...theme.lightTheme,
  colors: {
    ...theme.lightTheme.colors,
    iconBg: 'rgba(255,255,255,0.3)',
    tabActive: '#C6E1FD',
    text: '#000000',
    placeholder: '#bbbbbb',
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
    placeholder: '#bbbbbb',
    gray300: '#ffffff',
    gray500: '#333',
  },
  textVariants: {
    ...theme.darkTheme.textVariants,
    h1: {
      ...theme.darkTheme.textVariants.h1,
      fontSize: scale(20),
    },
  },
};
