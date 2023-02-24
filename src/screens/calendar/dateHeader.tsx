import { Center, Flex } from 'native-base';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import CalendatContext from './context';

type Props = {
  data?: string[];
};
const DateHeader: React.FC<Props> = ({ data }) => {
  const { weekdays } = useContext(CalendatContext);
  return (
    <Flex style={styles.weekdays} flexDir="row">
      {weekdays.map(item => (
        <Center flex={1}>{item}</Center>
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

export default DateHeader;
