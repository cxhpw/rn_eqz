import { Box, Text } from '@/components';

type Props = {
  status?: number;
};

const statusText = (status: any) => {
  let text = '';
  if (status === 1 || status === 0) {
    text = '待付款';
  } else if (status === 10 || status === 18) {
    text = '待发货';
  } else if (status === 11) {
    text = '待收货';
  } else if (status === 12) {
    text = '租用中';
  } else if (status === 13 || status === 15 || status === 16) {
    text = '退还中';
  } else if (status === 14 || status === 17) {
    text = '待退款';
  } else if (status === 99) {
    text = '已完成';
  } else if (status === 101) {
    text = '已关闭';
  }
  return text;
};
const Status = ({ status }: Props) => {
  return (
    <Box backgroundColor="black" padding="x3">
      <Text color="white">{statusText(status)}</Text>
    </Box>
  );
};

export default Status;
