import { Box, Flex, Text, Price, HtmlParse } from '@/components';
import FastImage from 'react-native-fast-image';
import { getMonthDate } from '@/utils/common';
import { StyleSheet } from 'react-native';
import { memo } from 'react';
import { useTheme } from '@shopify/restyle';
import { AppTheme } from '@/theme';

const Description: React.FC<{ data?: OrderSettlement }> = ({ data }) => {
  const theme = useTheme<AppTheme>();
  return (
    <Box
      padding="2.5"
      paddingVertical="x4"
      backgroundColor="primary_background"
      mb="2.5">
      <Flex>
        <Flex alignItems="flex-start" flex={1}>
          <FastImage
            style={styles.image}
            source={{
              uri: data?.primg,
            }}
          />
          <Box flex={1}>
            <Text numberOfLines={2} fontWeight="bold" variant="p1" mb="x1">
              {data?.title}
            </Text>
            <Text variant="p2" color="gray300">{`${getMonthDate(
              data!.startime,
            )}(共${data!.subdays}天)${getMonthDate(data!.endtime)}`}</Text>
          </Box>
        </Flex>
        <Box mb="x1">
          <Text color="func100">
            <Price
              color="#999"
              money={data?.deposit}
              beforeText="押金："
              afterText=""
            />
          </Text>
        </Box>
      </Flex>
      <Box mt="x4">
        <HtmlParse
          html={data?.fitting}
          htmlStyle={`p {color: #7B7B7B; font-size: 12px;background-color: ${theme.colors.primary_background};color: ${theme.colors.gray300}}`}
        />
      </Box>
    </Box>
  );
};
const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  title: {},
});

export default memo(Description);
