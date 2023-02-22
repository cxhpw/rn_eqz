import { useSafeState } from 'ahooks';
import dayjs from 'dayjs';
import { useCallback, useEffect } from 'react';

let i = 0;
type Template<T extends string> =
  T extends `${infer year}-${infer month}-${infer day}`
    ? `${year}-${month}-${day}`
    : T;
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
  useEffect(() => {
    run(number);
  }, [number, run]);
  return {
    date,
    reCalcDate: run,
  };
}
