import { Box } from 'native-base';
import useCalendar from './useCalendar';

import DateHeader from './dateHeader';
import DateBody from './dateBody';
import { useEffect } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import CalendarContext from './context';
import { Calendar } from '@/services/CalendarService';

type Props = {
  onChange: (res: any) => void;
};
const DateCalendar: React.FC<Props> = ({ onChange }) => {
  const { params } = useRoute<RouteProp<AppParamList, 'Calendar'>>();
  /* 初始化日历，缺少跟踪 */
  // const { dates, months, years, weekdays } = useCalendar({
  //   onChange: onChange,
  //   start: params.start || '2023-03-01',
  //   end: params.end || '2023-03-05',
  // });
  return (
    <CalendarContext.Provider value={new Calendar()}>
      <Box>
        <DateHeader />
        <DateBody />
      </Box>
    </CalendarContext.Provider>
  );
};

export default DateCalendar;
