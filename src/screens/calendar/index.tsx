import { SetStateAction, useRef, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Container } from '@/components';
import DateCalendar from './dateCalendar';
import ActionSubmit from './widget/actionSubmit';
import dayjs from 'dayjs';
import { useCustomRequest } from '@/hooks';
import request from '@/request';
import { navigate, redirect, setParams } from '@/services/NavigationService';
import { storageService } from '@/services/StorageService';
import useStackService from '@/stacks/useStackService';

type Props = {} & NativeStackScreenProps<AppParamList, 'Calendar'>;

/**
 * 是否手动
 * true 时代表为选择固定租期
 * false 时为手动选择租期
 */
let manual = false;
const Index: React.FC<Props> = ({ route }) => {
  useStackService.useModel();
  const { signedIn } = storageService;
  const startEnd = useRef<string[]>([]);
  const [height, setHeight] = useState(0);
  /**
   * 租赁天数
   */
  const [days, setDays] = useState(() => {
    return dayjs(route.params.end).diff(route.params.start);
  });
  /**
   *  固定天数
   */
  const [fixedDays, setFixedDays] = useState<string[]>([]);
  const { data = { unavailabledate: [] } } = useCustomRequest<{
    unavailabledate: string[];
  }>(async () => {
    const res = await request({
      url: '/Include/alipay/data.aspx',
      params: {
        apiname: 'getschedulecalendar',
        pid: route.params.id,
        guige: route.params.spec,
      },
    });
    return res.data;
  });

  const onLayout = (h: SetStateAction<number>) => {
    setHeight(h);
  };
  // 用户选择日期回调
  const onChange = (res: string[], n: number) => {
    console.log('选择日期', res, n);
    startEnd.current = res;
    manual = false;
    setDays(n);
  };
  // 确定回调
  const onSubmit = (id: number) => {
    setParams('Detail', {
      startEnd: startEnd.current,
      isShowModal: true,
    });
    console.log('日期', signedIn);
    if (signedIn) {
      redirect('OrderSubmit', {
        id: id,
        start: startEnd.current[0],
        end: startEnd.current[1],
      });
    } else {
      navigate('Login');
    }
  };
  // 租期回调
  const onRangeDays = (n: any) => {
    console.log('fixedDay', n);
    function run() {
      const start = dayjs().add(3, 'day');
      const end = start.add(n - 1, 'day');
      setFixedDays([start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD')]);
      setDays(n);
      manual = true;
      startEnd.current = [start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD')];
    }
    run();
  };

  return (
    <Container>
      <DateCalendar
        start={fixedDays[0] || route.params.start}
        end={fixedDays[1] || route.params.end}
        boundary={manual}
        onChange={onChange}
        paddingBttom={height}
        invalidDates={data.unavailabledate}
      />
      <ActionSubmit
        onSubmit={onSubmit}
        onLayout={onLayout}
        onRangeDays={onRangeDays}
        min={route.params.minDay}
        boundary={manual}
        startEnd={startEnd.current}
        days={days}
      />
    </Container>
  );
};
Index.displayName = 'Calendar';
export default Index;
