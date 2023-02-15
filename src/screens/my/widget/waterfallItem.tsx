import { Text } from '@/components';
import { Box, VStack } from 'native-base';
import FastImage from 'react-native-fast-image';
import { Price } from '@/components';
import { StyleSheet } from 'react-native';
type Props = {
  data: Product;
};
const WaterfallItem: React.FC<Props> = ({ data }) => {
  return (
    <Box px="5px" width="1/2" mb="2.5">
      <VStack backgroundColor="white" borderRadius="6px" overflow="hidden">
        <Box style={style.box}>
          <FastImage
            source={{
              uri: data?.ProImg,
            }}
            style={StyleSheet.absoluteFill}
          />
        </Box>
        <Box padding={4}>
          <Text color="gray500" mb="x1" variant="p2" numberOfLines={2}>
            {data?.ProductName}
          </Text>
          <Price
            prefixStyle={{
              fontSize: 14,
            }}
            money={data.SpecialPrice}
          />
        </Box>
      </VStack>
    </Box>
  );
};
const style = StyleSheet.create({
  box: {
    position: 'relative',
    width: '100%',
    paddingBottom: '100%',
  },
});

export default WaterfallItem;
