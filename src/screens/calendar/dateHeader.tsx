import { Center, Flex } from '@/components';
import { memo } from 'react';
import { StyleSheet } from 'react-native';
import useCaledatService from './useCaledatService';

type Props = {
  weekdays?: string[];
};
const DateHeader: React.FC<Props> = () => {
  const { weekdays } = useCaledatService.useModel();
  return (
    <Flex style={styles.weekdays} flexDirection="row">
      {weekdays.map(item => (
        <Center key={item} flex={1}>
          {item}
        </Center>
      ))}
    </Flex>
  );
};

const styles = StyleSheet.create({
  weekdays: {
    backgroundColor: '#f7f7f7',
    height: 44,
  },
});

export default memo(DateHeader);
