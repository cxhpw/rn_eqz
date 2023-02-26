import { useSafeState } from 'ahooks';
import dayjs from 'dayjs';
import { useCallback, useEffect } from 'react';

let i = 0;
const dayjsInstanceh = dayjs();
/**
 * 获取today～today+number的日期范围
 * @param number
 */
export default function useDateRange(number: number = 1) {
  console.log(++i);
  const [date, setDate] = useSafeState<string[]>([]);
  const run = useCallback(
    (n: number) => {
      setDate([
        dayjsInstanceh.format('YYYY-MM-DD'),
        dayjsInstanceh.add(n, 'day').format('YYYY-MM-DD'),
      ]);
    },
    [setDate],
  );
  const update = (startEnd?: string[]) => {
    if (startEnd) {
      setDate(startEnd);
    }
  };
  useEffect(() => {
    run(number);
  }, [number, run]);
  return {
    date,
    reCalcDate: run,
    update,
  };
}
