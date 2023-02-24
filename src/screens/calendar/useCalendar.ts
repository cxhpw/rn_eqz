import { Calendar, TDate } from '@/services/CalendarService';
import { useMount, useUnmount } from 'ahooks';
import { useEffect, useState } from 'react';

console.log('外围');
const calendar = new Calendar();
export default function useCalendar(options: any) {
  console.log('执行useCalendar');
  const [data] = useState(() => calendar.dates);
  useMount(() => {
    console.log('挂在');
  });
  useUnmount(() => {
    console.log('卸载');
  });
  useEffect(() => {
    console.log(data === calendar.dates);
  });
  return calendar;
}
