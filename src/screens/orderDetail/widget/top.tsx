import { Flex, Icon, Box, Text } from '@/components';
import { AppTheme } from '@/theme';
import { useTheme } from '@shopify/restyle';
import { memo } from 'react';

const Top = ({ data }: any) => {
  const theme = useTheme<AppTheme>();
  return (
    <Box
      backgroundColor="primary_background"
      paddingHorizontal="x3"
      paddingVertical="x5">
      <Box>
        <Flex marginBottom="2.5">
          <Icon name="kuaidi" color={theme.colors.text} />
          <Text ml="x1" variant="p2" fontWeight="500">
            配送方式
          </Text>
        </Flex>
        <Box>
          <Text variant="p2" color="gray300">
            顺丰快递
          </Text>
        </Box>
      </Box>
      <Box mt="x5">
        <Flex marginBottom="2.5">
          <Icon name="didian" color={theme.colors.text} />
          <Text ml="x1" variant="p2" fontWeight="500">
            地点
          </Text>
        </Flex>
        <Box>
          <Flex marginBottom="x1">
            <Text variant="p2" color="gray300">
              {data?.Consignee}
            </Text>
            <Text variant="p2" color="gray300">
              {data?.Phone}
            </Text>
          </Flex>
          <Flex>
            <Text variant="p2" color="gray300">
              {data?.Province}
            </Text>
            <Text variant="p2" color="gray300">
              {data?.City}
            </Text>
            <Text variant="p2" color="gray300">
              {data?.County}
            </Text>
            <Text variant="p2" color="gray300">
              {data?.Address}
            </Text>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default memo(Top);
