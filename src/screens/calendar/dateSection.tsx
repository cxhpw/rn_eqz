import { TDate } from '@/services/CalendarService';
import { View, Text, StyleSheet } from 'react-native';

import DateItem from './dateItem';
type Props = {
  title: string;
  data: TDate[];
};
const DateSection: React.FC<Props> = ({ title, data }) => {
  console.log('datesection render');
  return (
    <View style={styles.section}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.dates}>
        {data.map((date, idx) => {
          return <DateItem key={`${date.date}`} data={date} />;
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginTop: 20,
  },
  title: {
    textAlign: 'center',
    color: '#142134',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 10,
  },
  dates: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default DateSection;
