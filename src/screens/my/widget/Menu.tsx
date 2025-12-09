import { Flex } from '@/components';
import type { StyleProp, ViewStyle } from 'react-native';

type TMenuItem = { [T: string]: any; label: string; url: string };
type Props = {
  data: TMenuItem[];
  cols?: number;
  children?: React.ReactNode | ((n: TMenuItem) => any);
  style?: StyleProp<ViewStyle>;
};
const Menu: React.FC<Props> = ({ data = [], cols = 5, children, style }) => {
  return (
    <Flex style={[style]}>
      {data.map(item =>
        (item.cols = cols) && typeof children === 'function'
          ? children(item)
          : children,
      )}
    </Flex>
  );
};

export default Menu;
