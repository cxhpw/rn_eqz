import { TDate } from '@/services/CalendarService';
import { View, Text, StyleSheet } from 'react-native';

import DateItem from './dateItem';
type Props = {
  title: string;
  dates: TDate[];
};
const DateSection: React.FC<Props> = ({ title, dates }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.dates}>
        {dates.map(date => {
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
