import { Box, Flex, Text } from '@/components';

const Message = ({ message }: { message?: string }) => {
  return (
    <Box
      mt="2.5"
      backgroundColor="primary_background"
      paddingHorizontal="x3"
      minHeight={100}
      paddingVertical="2.5">
      <Flex alignItems="flex-start">
        <Text mr="x4">留言</Text>
        <Box flex={1}>
          <Text variant="p2" color="gray300" lineHeight={20}>
            {!message ? '没有留言信息' : message}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Message;
