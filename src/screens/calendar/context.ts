import { Calendar, TDate } from '@/services/CalendarService';
import { createContext } from 'react';

//@ts-ignore
// export default createContext<{
//   dates: TDate[][];
//   setDates: React.Dispatch<React.SetStateAction<TDate[][]>>;
// }>();

export default createContext<
  Partial<Pick<Calendar, 'dates'>> & {
    update: any;
  }
>();

export function useCalendar(calendar: Calendar | null) {
  return {
    start: calendar?.start,
    end: calendar?.end,
  };
}
