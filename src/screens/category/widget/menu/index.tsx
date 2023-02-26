import { ScrollView } from 'react-native';
import MenuItem, { type IGestureResponderEvent } from './item';
import { forwardRef } from 'react';
import { useTheme } from '@shopify/restyle';
import { AppTheme } from '@/theme';

type Props = {
  data?: Goods[];
  activeIndex?: number;
  onPress?: (e: IGestureResponderEvent) => void;
  onLayout?: (height: number) => void;
};
// 映射栏目id和索引下标
let cache: { [T: number]: any } = {};
const Menu = (
  { data = [], activeIndex = 0, onPress, onLayout }: Props,
  ref: any,
) => {
  const { theme, colors } = useTheme<AppTheme>();
  return (
    <ScrollView
      ref={ref}
      onLayout={e => {
        const { height } = e.nativeEvent.layout;
        onLayout?.(height);
      }}
      style={{
        flex: 1,
        backgroundColor: theme === 'dark' ? colors.black : '#f7f5f6',
      }}
      showsVerticalScrollIndicator={false}>
      {data?.map((item, idx) => (
        <MenuItem
          active={activeIndex === idx}
          activeTintColor="#ffffff"
          unActiveTintColor="#f7f5f6"
          onPress={evt => {
            let index = 0;
            if (cache[evt.dataset.id]) {
              index = cache[evt.dataset.id];
            } else {
              index = data.map(cell => cell.AutoID).indexOf(evt.dataset.id);
              cache[evt.dataset.id] = index;
            }
            evt.dataset.index = index;
            onPress?.(evt);
          }}
          key={item.AutoID}
          data={item}
        />
      ))}
    </ScrollView>
  );
};
export default forwardRef(Menu);
