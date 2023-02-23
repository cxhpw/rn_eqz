import { FlashList } from '@shopify/flash-list';
import Item from '@/screens/home/widget/Section/Item';
import DisCount from '@/screens/home/widget/Section/Discount';
import { Text } from '@/components';
import { Box } from 'native-base';
import { memo } from 'react';

type Props = {
  data: Product[] | undefined;
};
const Recommend: React.FC<Props> = ({ data = [] }) => {
  console.log('Recommend render');
  return (
    <Box px={2.5} pt="15px">
      <Text variant="h2">推荐商品</Text>
      <FlashList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 10,
          paddingBottom: 15,
        }}
        data={data}
        renderItem={({ item }) => (
          <Item
            size={'100%'}
            ItemStyle={{
              marginRight: 5,
              paddingTop: 5,
              width: 92,
            }}
            key={item.AutoID}
            {...item}
            hasPrice
            renderIcon={DisCount(item.Discount as any)}
          />
        )}
        estimatedItemSize={150}
        horizontal
      />
    </Box>
  );
};

export default memo(Recommend);
