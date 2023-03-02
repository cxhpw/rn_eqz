import DateHeader from './dateHeader';
import DateBody from './dateBody';
import { ScrollView } from 'react-native';
import useCaledatService from './useCaledatService';

type Props = {
  onChange: (res: string[], n: number) => void;
  paddingBttom?: any;
  start?: string;
  end?: string;
  fixedDays?: number;
  boundary?: boolean;
  invalidDates?: string[];
};
const DateCalendar: React.FC<Props> = ({
  onChange,
  paddingBttom,
  start,
  end,
  boundary,
  invalidDates,
}) => {
  console.log('Calendar render');
  return (
    <useCaledatService.Provider
      initialState={{
        start,
        end,
        boundary,
        onChange: onChange,
        invalidDates: [
          '2023-03-14',
          '2023-03-15',
          '2023-03-16',
          '2023-03-17',
          '2023-03-18',
          '2023-03-19',
          '2023-03-20',
          '2023-03-25',
          '2023-03-26',
        ],
      }}>
      <ScrollView
        stickyHeaderIndices={[0]}
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: paddingBttom,
        }}>
        <DateHeader />
        <DateBody />
      </ScrollView>
    </useCaledatService.Provider>
  );
};

export default DateCalendar;
