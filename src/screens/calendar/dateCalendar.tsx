import DateHeader from './dateHeader';
import DateBody from './dateBody';
import { ScrollView } from 'react-native';
import useCaledatService from './useCaledatService';

type Props = {
  onChange: (res: any) => void;
  paddingBttom?: any;
  start?: string;
  end?: string;
};
const DateCalendar: React.FC<Props> = ({
  onChange,
  paddingBttom,
  start,
  end,
}) => {
  return (
    <useCaledatService.Provider
      initialState={{
        start,
        end,
        onChange: onChange,
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
