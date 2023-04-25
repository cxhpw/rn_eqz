import { View, TouchableOpacity } from 'react-native';
import Text from '../Text';
import { useCountDown } from 'ahooks';
import { useState } from 'react';

type Props = {
  color?: string;
  disabledColor?: string;
  onSend?: () => void;
  onEnd?: () => void;
};

const Index = ({ onSend, onEnd }: Props) => {
  const [targetDate, setTargetDate] = useState<number>();
  const [countdown] = useCountDown({
    targetDate,
    onEnd: () => {
      onEnd?.();
    },
  });
  return (
    <TouchableOpacity
      disabled={countdown !== 0}
      onPress={() => {
        setTargetDate(Date.now() + 60000);
        onSend?.();
      }}>
      <Text variant="p2" color="white" opacity={countdown !== 0 ? 0.6 : 1}>
        {countdown === 0
          ? '发送验证码'
          : `重新发送(${Math.round(countdown / 1000)}s)`}
      </Text>
    </TouchableOpacity>
  );
};
Index.displayName = 'Sms';

export default Index;
