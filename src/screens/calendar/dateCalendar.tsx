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
  manual?: boolean;
  invalidDates?: string[];
};
const DateCalendar: React.FC<Props> = ({
  onChange,
  paddingBttom,
  start,
  end,
  manual,
  invalidDates,
}) => {
  return (
    <useCaledatService.Provider
      initialState={{
        start,
        end,
        manual,
        onChange: onChange,
        invalidDates,
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
