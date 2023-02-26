import DateHeader from './dateHeader';
import DateBody from './dateBody';
import CalendarContext, { useCalendar } from './context';
import { Calendar } from '@/services/CalendarService';
import { useEffect, useState } from 'react';
import { useUpdate } from 'ahooks';
import { ScrollView } from 'react-native';

type Props = {
  onChange: (res: any) => void;
  paddingBttom?: any;
  start?: string;
  end?: string;
};
const DateCalendar: React.FC<Props> = ({
  onChange,
  paddingBttom,
  start: s,
  end: e,
}) => {
  const update = useUpdate();
  let [calendar] = useState<Calendar | null>(
    () =>
      new Calendar({
        start: s,
        end: e,
      }),
  );
  const { start, end } = useCalendar(calendar);
  useEffect(() => {
    if (start && end) {
      onChange([start, end]);
    }
  }, [calendar, e, end, onChange, s, start, update]);
  return (
    <CalendarContext.Provider
      value={{
        dates: calendar?.dates,
        update,
      }}>
      <ScrollView
        stickyHeaderIndices={[0]}
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: paddingBttom,
        }}>
        <DateHeader weekdays={calendar?.weekdays} />
        <DateBody months={calendar?.months} years={calendar?.years} />
      </ScrollView>
    </CalendarContext.Provider>
  );
};

export default DateCalendar;
