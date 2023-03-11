import { View } from 'react-native';
import {
  composeRestyleFunctions,
  layout,
  LayoutProps,
  useRestyle,
  border,
  BorderProps,
} from '@shopify/restyle';
import { PropsWithChildren } from 'react';
import { Theme } from '../Theme/theme';
import Text from '../Text';

type CenterProps = LayoutProps<Theme> & BorderProps<Theme>;

const restyleFunctions = composeRestyleFunctions([layout, border]);

const Center = ({ children, ...rest }: PropsWithChildren<CenterProps>) => {
  const props = useRestyle(restyleFunctions as any, {
    alignItems: 'center',
    justifyContent: 'center',
    ...rest,
  });
  return (
    //@ts-ignore
    <View {...props}>
      <Text>{children}</Text>
    </View>
  );
};

export default Center;
