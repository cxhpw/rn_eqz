import { Box, Flex, Text, HtmlParse } from '@/components';
import { memo } from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { getMonthDate } from '@/utils/common';
import { useTheme } from '@shopify/restyle';
import { AppTheme } from '@/theme';

const Card = ({ data }: { data?: OrderDetail }) => {
  const item = data?.OrderItem?.[0];
  const theme = useTheme<AppTheme>();
  console.log();
  return (
    <Box
      mt="2.5"
      paddingVertical="2.5"
      paddingHorizontal="x3"
      backgroundColor="primary_background">
      <Flex marginBottom="2.5">
        <FastImage
          style={styles.image}
          source={{
            uri: item?.ProImg,
          }}
        />
        <Box flex={1}>
          <Text variant="h3" mb="2.5">
            {item?.ProName}
          </Text>
          <Flex>
            <Text variant="p2" color="gray300">
              {getMonthDate(data?.StartingTime ?? '')}
            </Text>
            <Text variant="p2" color="gray300">
              -
            </Text>
            <Text variant="p2" color="gray300">
              {getMonthDate(data?.EndTime ?? '')}
            </Text>
            <Text variant="p2" color="gray300">
              (共{data?.Days}天)
            </Text>
          </Flex>
        </Box>
      </Flex>
      <HtmlParse
        html={item?.fujian}
        htmlStyle={`p {font-size: 12px; color; color: ${theme.colors.gray300}; background-color: ${theme.colors.primary_background}}`}
      />
    </Box>
  );
};
const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
});
export default memo(Card);
