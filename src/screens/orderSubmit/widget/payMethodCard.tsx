import { Box, Flex, Switch, Text } from '@/components';
import { memo } from 'react';

type Props = {
  value: boolean;
  onChange: (b: boolean) => void;
};

const PayMethodCard: React.FC<Props> = ({ onChange, value }) => {
  return (
    <Box
      backgroundColor="primary_background"
      paddingHorizontal="2.5"
      mb="2.5"
      paddingVertical="x4">
      <Text variant="h2" mb="2.5">
        押金方式
      </Text>
      <Text variant="p2" fontWeight="bold" mb="x1">
        免押金方式
      </Text>
      <Flex justifyContent="space-between">
        <Text color="gray300" variant="p2">
          凭芝麻信用最高可全免
        </Text>
        <Text>1500</Text>
        {/* <Switch disabled value={value} onChange={onChange} /> */}
      </Flex>
    </Box>
  );
};

export default memo(PayMethodCard);
