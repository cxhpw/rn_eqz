import { View } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { Spacing, Theme } from '../Theme/theme';
import { memo } from 'react';

export type Props = {
  size?: Spacing;
  backgroundColor?: string;
};
const Spacer: React.FC<Props> = ({ size = 'x3', backgroundColor }) => {
  const theme = useTheme<Theme>();
  return (
    <View
      style={{
        height: theme.spacing[size],
        backgroundColor:
          theme.theme === 'light'
            ? backgroundColor || theme.colors.spacerColor
            : theme.colors.spacerColor,
      }}
    />
  );
};

export default memo(Spacer);
