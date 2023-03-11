import {
  createRestyleComponent,
  createVariant,
  useTheme,
  VariantProps,
} from '@shopify/restyle';
import Svg, { Path } from 'react-native-svg';
import { Theme } from '../Theme/theme';

export const usePropsResolution = (size: keyof Theme['spacing']) => {
  const theme = useTheme<Theme>();
  const themeSize = theme.spacing[size] ?? size;
  const variant = createVariant<Theme>({
    themeKey: 'RadioVariants',
    defaults: {
      alignItems: 'center',
      justifyContent: 'center',
      width: themeSize,
      height: themeSize,
    },
  });
  const RadioWrapper = createRestyleComponent<
    VariantProps<Theme, 'RadioVariants'> & {
      children: JSX.Element | JSX.Element[];
      size: number;
    },
    Theme
  >([variant as any]);

  const CircleIcon = ({ opacity }: any) => {
    return (
      <Svg
        opacity={opacity}
        width={themeSize * 0.5}
        height={themeSize * 0.5}
        viewBox="0 0 24 24">
        <Path
          fill={theme.colors.radio_active}
          d="M0 12C-2.34822e-08 13.5759 0.310389 15.1363 0.913445 16.5922C1.5165 18.0481 2.40042 19.371 3.51472 20.4853C4.62902 21.5996 5.95189 22.4835 7.4078 23.0866C8.86371 23.6896 10.4241 24 12 24C13.5759 24 15.1363 23.6896 16.5922 23.0866C18.0481 22.4835 19.371 21.5996 20.4853 20.4853C21.5996 19.371 22.4835 18.0481 23.0866 16.5922C23.6896 15.1363 24 13.5759 24 12C24 10.4241 23.6896 8.86371 23.0866 7.4078C22.4835 5.95189 21.5996 4.62902 20.4853 3.51472C19.371 2.40042 18.0481 1.5165 16.5922 0.913446C15.1363 0.310389 13.5759 0 12 0C10.4241 0 8.86371 0.310389 7.4078 0.913446C5.95189 1.5165 4.62902 2.40042 3.51472 3.51472C2.40042 4.62902 1.5165 5.95189 0.913445 7.4078C0.310389 8.86371 -2.34822e-08 10.4241 0 12Z"
        />
      </Svg>
    );
  };
  return {
    RadioWrapper,
    CircleIcon,
  };
};
