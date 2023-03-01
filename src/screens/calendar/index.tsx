import { SetStateAction, useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Container } from '@/components';
import DateCalendar from './dateCalendar';
import ActionSubmit from './widget/actionSubmit';
import dayjs from 'dayjs';
import { useStore } from '@/store/z';

type Props = {} & NativeStackScreenProps<AppParamList, 'Calendar'>;

let startEnd: string[] = [];

/**
 * true 时代表为选择固定租期
 * false 时为手动选择租期
 */
let boundary = false;
const Index: React.FC<Props> = ({ route, navigation }) => {
  const [height, setHeight] = useState(0);
  const [days, setDays] = useState(() => {
    return dayjs(route.params.end).diff(route.params.start);
  });
  const [fixedDays, setFixedDays] = useState<string[]>([]);
  useEffect(() => {
    const { fn } = route.params;
    return () => {
      fn(true);
    };
  }, [route.params]);
  const onLayout = (h: SetStateAction<number>) => {
    setHeight(h);
  };
  // 用户选择日期回调
  const onChange = (res: string[], n: number) => {
    console.log('选择日期', res, n, days);
    startEnd = res;
    boundary = false;
    setDays(n);
  };
  // 确定回调
  const onSubmit = () => {
    //@ts-ignore
    navigation.navigate({
      name: 'Detail',
      params: {
        startEnd,
      },
      merge: true,
    });
  };
  // 租期回调
  const onRangeDays = (n: any) => {
    console.log('fixedDay', n);
    function run() {
      const start = dayjs().add(3, 'day');
      const end = start.add(n - 1, 'day');
      setFixedDays([start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD')]);
      setDays(n);
      boundary = true;
      startEnd = [start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD')];
    }
    run();
  };
  return (
    <Container>
      <DateCalendar
        start={fixedDays[0] || route.params.start}
        end={fixedDays[1] || route.params.end}
        boundary={boundary}
        onChange={onChange}
        paddingBttom={height}
      />
      <ActionSubmit
        onSubmit={onSubmit}
        onLayout={onLayout}
        onRangeDays={onRangeDays}
        min={route.params.minDay}
        boundary={boundary}
        startEnd={startEnd}
        days={days}
      />
    </Container>
  );
};

export default Index;
