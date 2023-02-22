import { Pressable, Text } from '@/components';
import { Center } from 'native-base';
import { memo } from 'react';
import { GestureResponderEvent, StyleSheet } from 'react-native';

type Props = {
  data: Goods;
  onPress: (e: IGestureResponderEvent) => void;
  active: boolean;
  activeTintColor?: string;
  unActiveTintColor?: string;
};
export interface IGestureResponderEvent extends GestureResponderEvent {
  dataset: {
    index?: number;
    id: number;
  };
}
const Item: React.FC<Props> = ({
  data: item,
  onPress,
  activeTintColor,
  active,
  unActiveTintColor,
}) => {
  console.log('Item', item.AutoID, active);
  return (
    <Pressable
      scalable={false}
      onPress={evt => {
        let event = evt as IGestureResponderEvent;
        event.dataset = {
          id: item.AutoID,
        };
        onPress(event);
      }}>
      <Center
        style={[
          style.menuItem,
          { backgroundColor: active ? activeTintColor : unActiveTintColor },
        ]}
        key={item.AutoID}>
        <Text
          numberOfLines={2}
          variant={item.CategoryName.length > 4 ? 'p3' : 'p2'}>
          {item.CategoryName}
        </Text>
      </Center>
    </Pressable>
  );
};

const style = StyleSheet.create({
  menuItem: {
    height: 44,
    fontSize: 10,
    paddingHorizontal: 5,
  },
});

export default memo(Item, (prev, cur) => {
  return prev.active === cur.active;
});
