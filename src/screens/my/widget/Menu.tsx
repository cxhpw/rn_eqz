import { HStack } from 'native-base';

type TMenuItem = { [T: string]: any; label: string; url: string };
type Props = {
  data: TMenuItem[];
  cols?: number;
  children?: React.ReactNode | ((n: TMenuItem) => any);
};
const Menu: React.FC<Props> = ({ data = [], cols = 5, children }) => {
  return (
    <HStack flexWrap="wrap">
      {data.map(item =>
        (item.cols = cols) && typeof children === 'function'
          ? children(item)
          : children,
      )}
    </HStack>
  );
};

export default Menu;
