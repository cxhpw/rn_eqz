/* eslint-disable react-native/no-inline-styles */
import { Text, Price, Box, Center, Flex } from '@/components';
import { AppTheme } from '@/theme';
import { useTheme } from '@shopify/restyle';
import { memo } from 'react';
import { StyleSheet } from 'react-native';

type Props = {
  data: ProductInfo | undefined;
} & Partial<ProductPrice>;
const PricePanel: React.FC<Props> = ({ data }) => {
  const theme = useTheme<AppTheme>();
  console.log('PricePanel render');
  return (
    <Box paddingVertical="x4" paddingHorizontal="2.5">
      <Flex alignItems="center">
        <Box flex={1}>
          <Flex flexDirection="row" alignItems="flex-end">
            <Price
              money={data?.SpecialPrice}
              style={{
                fontSize: 10,
                height: 21,
              }}
              prefixStyle={{
                fontSize: 21,
              }}
              containerStyle={{
                marginTop: 0,
              }}
              afterText="天/起"
            />
            <Price
              style={{
                fontWeight: '400',
                marginLeft: 15,
              }}
              containerStyle={{
                marginTop: 0,
              }}
              color={theme.colors.text}
              beforeText="押金："
              money={data?.MarketPrice}
            />
          </Flex>
          {data?.IsSpecial === 'true' && (
            <Price
              style={{
                color: theme.colors.gray300,
                fontWeight: '400',
                textDecorationLine: 'line-through',
                marginTop: 10,
              }}
              afterText=""
              money={data?.MinSellPrice}
            />
          )}
        </Box>
        <Center
          paddingHorizontal="x4"
          paddingVertical="x1"
          flexDirection="column"
          style={{
            borderRightColor: theme.colors.border,
            borderLeftColor: theme.colors.border,
          }}
          borderLeftWidth={1}
          borderRightWidth={1}>
          <Text variant="p2" mb={'x2'}>
            {data?.Hit}
          </Text>
          <Text variant="p3" color="gray300">
            浏览
          </Text>
        </Center>
        <Center
          paddingHorizontal="x4"
          paddingVertical="x1"
          flexDirection="column">
          <Text variant="p2" mb={'x2'}>
            {data?.Evaluation}
          </Text>
          <Text variant="p3" color="gray300">
            用户口碑
          </Text>
        </Center>
      </Flex>
      <Flex flexDirection="row" marginTop="x4">
        {data?.SpecialSummary.map(item => (
          <Text key={item.Discount} style={style.dis}>
            满{item.Daynum}天打{item.Discount}折
          </Text>
        ))}
      </Flex>
    </Box>
  );
};

const style = StyleSheet.create({
  dis: {
    fontSize: 10,
    backgroundColor: '#FCEDEB',
    paddingHorizontal: 5,
    color: '#333',
    marginRight: 10,
    borderRadius: 4,
    overflow: 'hidden',
  },
});

export default memo(PricePanel);
