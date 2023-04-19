import { Box, Flex, Text, Price } from '@/components';
import { AppTheme } from '@/theme';
import { useTheme } from '@shopify/restyle';
import { memo } from 'react';

type Props = {
  data?: OrderSettlement;
  value?: boolean;
};
const CellList: React.FC<Props> = ({ data, value }) => {
  const theme = useTheme<AppTheme>();
  return (
    <Box
      mb="2.5"
      backgroundColor="primary_background"
      paddingHorizontal="2.5"
      paddingVertical="x4">
      <Flex justifyContent="space-between" marginBottom="x4">
        <Text variant="h3">商品金额</Text>
        <Text variant="h3">
          <Price
            afterText=""
            money={data?.rent}
            color={theme.colors.text}
            //@ts-ignore
            style={theme.textVariants.h3}
          />
        </Text>
      </Flex>
      <Flex justifyContent="space-between" marginBottom="x4">
        <Text color="gray300" variant="p2">
          押金
        </Text>
        <Text color="gray300" variant="p2">
          <Price
            afterText=""
            money={data?.deposit}
            color={theme.colors.gray300}
            style={theme.textVariants.p2}
          />
        </Text>
      </Flex>
      <Flex justifyContent="space-between" marginBottom="x4">
        <Text color="gray300" variant="p2">
          租金
        </Text>
        <Text color="gray300" variant="p2">
          <Price
            afterText=""
            money={data?.rent}
            color={theme.colors.gray300}
            style={theme.textVariants.p2}
          />
        </Text>
      </Flex>
      <Flex justifyContent="space-between" marginBottom="x4">
        <Text color="gray300" variant="p2">
          计费规则
        </Text>
        <Text color="gray300" variant="p2">
          <Price
            afterText="/日"
            beforeText="日均租金："
            money={data!.rent / data!.subdays}
            color={theme.colors.gray300}
            style={theme.textVariants.p2}
          />
        </Text>
      </Flex>
      <Flex justifyContent="space-between" marginBottom="x4">
        <Text color="gray300" variant="p2">
          安心享
        </Text>
        <Text color="gray300" variant="p2">
          <Price
            afterText=""
            money={value ? data!.insurance : 0}
            color={theme.colors.gray300}
            style={theme.textVariants.p2}
          />
        </Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Text color="gray300" variant="p2">
          运费规则
        </Text>
        <Text color="gray300" variant="p2">
          用户承担双程费用
        </Text>
      </Flex>
    </Box>
  );
};

export default memo(CellList);
