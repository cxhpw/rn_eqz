import { Center, Flex } from 'native-base';
import { memo } from 'react';
import { StyleSheet } from 'react-native';
import useCaledatService from './useCaledatService';

type Props = {
  weekdays?: string[];
};
const DateHeader: React.FC<Props> = () => {
  const { weekdays } = useCaledatService.useModel();
  console.log('dataHeader render');
  return (
    <Flex style={styles.weekdays} flexDir="row">
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
