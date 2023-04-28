import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import Item from '@/screens/home/widget/Section/Item';
import DisCount from '@/screens/home/widget/Section/Discount';
import { FlashList } from '@shopify/flash-list';
import { Box } from '@/components';

type Props = {
  data?: Goods | null;
};
const RightContent: React.FC<Props> = ({ data }) => {
  return (
    <FlashList
      contentContainerStyle={{
        paddingHorizontal: 5,
        paddingTop: 10,
      }}
      data={data?.ProductList}
      renderItem={({ item }) => (
        <Item
          size={'100%'}
          ItemStyle={{
            paddingHorizontal: 5,
            marginBottom: 20,
            paddingTop: 5,
          }}
          key={item.AutoID}
          {...item}
          hasPrice
          renderIcon={DisCount(item.Discount as any)}
        />
      )}
      numColumns={3}
      estimatedItemSize={150}
      ListHeaderComponent={
        data?.CategoryBanner ? (
          <Box paddingHorizontal="x1">
            <FastImage
              source={{
                uri: data?.CategoryBanner,
              }}
              style={style.Image}
              resizeMode="stretch"
            />
          </Box>
        ) : null
      }
    />
  );
};

const style = StyleSheet.create({
  Image: {
    width: '100%',
    height: 75,
    borderRadius: 6,
  },
});

export default RightContent;
