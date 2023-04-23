import { View } from 'react-native';
import {
  composeRestyleFunctions,
  spacing,
  SpacingProps,
  layout,
  LayoutProps,
  useRestyle,
  border,
  BorderProps,
} from '@shopify/restyle';
import { PropsWithChildren } from 'react';
import { Theme } from '../Theme/theme';
import Text from '../Text';

// type Props = React.ComponentProps<typeof CenterBase> & LayoutProps<Theme>;
// const CenterBase = createBox<Theme, ViewProps>(View);
// const Center = ({ children, ...rest }: PropsWithChildren<Props>) => {
//   return (
//     <CenterBase {...rest} alignItems="center" justifyContent="center">
//       <Text>{children}</Text>
//     </CenterBase>
//   );
// };

type CenterProps = LayoutProps<Theme> &
  BorderProps<Theme> &
  SpacingProps<Theme>;

const restyleFunctions = composeRestyleFunctions([layout, border, spacing]);

const Center = ({ children, ...rest }: PropsWithChildren<CenterProps>) => {
  const boxChildren = (child: unknown) => {
    return typeof child === 'string' ? <Text>{child}</Text> : child;
  };
  const props = useRestyle(restyleFunctions as any, {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    ...rest,
  });
  return (
    //@ts-ignore
    <View {...props}>{boxChildren(children)}</View>
  );
};

export default Center;
