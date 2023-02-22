import { Text, Price } from '@/components';
import { AppTheme } from '@/theme';
import { useTheme } from '@shopify/restyle';
import { Box, Center, Flex, HStack, VStack } from 'native-base';
import { memo } from 'react';
import { StyleSheet } from 'react-native';

type Props = {
  data: ProductInfo | undefined;
} & Partial<ProductPrice>;
const PricePanel: React.FC<Props> = ({
  data,
  weekprice,
  dayprice,
  monthprice,
}) => {
  const theme = useTheme<AppTheme>();
  return (
    <Box py="15px" px={2.5}>
      <HStack alignItems="center">
        <VStack flex={1}>
          <Flex flexDir="row" alignItems="flex-end">
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
        </VStack>
        <Center
          px={4}
          py={1}
          style={{
            borderRightColor: theme.colors.border,
            borderLeftColor: theme.colors.border,
          }}
          borderLeftWidth="1"
          borderRightWidth="1">
          <Text variant="p2" mb={'x2'}>
            {data?.Hit}
          </Text>
          <Text variant="p3" color="gray300">
            浏览
          </Text>
        </Center>
        <Center px={4} py={1}>
          <Text variant="p2" mb={'x2'}>
            {data?.Evaluation}
          </Text>
          <Text variant="p3" color="gray300">
            用户口碑
          </Text>
        </Center>
      </HStack>
      <Flex
        flexDir="row"
        mb={2.5}
        style={{
          backgroundColor:
            theme.theme === 'dark' ? theme.colors.background : '#eee',
          padding: 5,
          marginTop: 15,
        }}>
        <Price
          style={{
            color:
              theme.theme === 'dark'
                ? theme.colors.white
                : theme.colors.gray500,
            fontWeight: '400',
            marginRight: 5,
          }}
          beforeText="起始租金：¥"
          afterText="/日"
          money={dayprice}
        />
        <Price
          style={{
            color:
              theme.theme === 'dark'
                ? theme.colors.white
                : theme.colors.gray500,
            fontWeight: '400',
            marginRight: 5,
          }}
          beforeText="周租金：¥"
          afterText="/日"
          money={weekprice}
        />
        <Price
          style={{
            color:
              theme.theme === 'dark'
                ? theme.colors.white
                : theme.colors.gray500,
            fontWeight: '400',
          }}
          beforeText="月租金：¥"
          afterText="/日"
          money={monthprice}
        />
      </Flex>
      <Flex flexDir="row">
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
