import { Price } from '@/components';
import { Box, Flex, VStack } from 'native-base';
import { Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
type Props = {
  data: Partial<ProductDetail> & Partial<ProductPrice>;
};
const Header: React.FC<Props> = ({ data }) => {
  return (
    <Box style={styles.header}>
      <Flex alignItems="center" flexDir="row">
        <FastImage
          source={{
            uri: data.productdata?.ProImg,
          }}
          style={styles.image}
        />
        <VStack>
          <Box mb={2.5}>
            <Price
              style={{
                fontSize: 20,
              }}
              color="#38CEB1"
              afterText="/日"
              afterStyle={{
                fontSize: 12,
                color: '#5C5C5C',
              }}
              money={data.dayprice}
            />
          </Box>
          <Box>
            <Price
              color="#999"
              beforeText="押金:￥"
              afterText=""
              style={{
                fontWeight: '400',
              }}
              money={data.productdata?.MarketPrice}
            />
          </Box>
        </VStack>
      </Flex>
      <Flex flexDir="row" my="15px">
        {data?.productdata?.SpecialSummary.map(item => (
          <Text key={item.Discount} style={styles.tag}>
            满{item.Daynum}天打{item.Discount}折
          </Text>
        ))}
      </Flex>
    </Box>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 15,
    paddingBottom: 0,
    borderBottomColor: '#dfdfdf',
    borderBottomWidth: 0.5,
  },
  image: {
    width: 75,
    height: 75,
    marginRight: 10,
  },
  tag: {
    fontSize: 10,
    backgroundColor: '#FCEDEB',
    paddingHorizontal: 5,
    paddingVertical: 2,
    color: '#333',
    marginRight: 10,
    borderRadius: 4,
    overflow: 'hidden',
  },
});

export default Header;
