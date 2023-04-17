import { SetStateAction, useEffect, useState } from 'react';
import {
  NativeStackScreenProps,
  NativeStackView,
} from '@react-navigation/native-stack';
import { useNavigationContainerRef } from '@react-navigation/native';
import { Container } from '@/components';
import DateCalendar from './dateCalendar';
import ActionSubmit from './widget/actionSubmit';
import dayjs from 'dayjs';
import { useCustomRequest } from '@/hooks';
import request from '@/request';
import { redirect } from '@/services/NavigationService';

type Props = {} & NativeStackScreenProps<AppParamList, 'Calendar'>;

let startEnd: string[] = [];

/**
 * 是否手动
 * true 时代表为选择固定租期
 * false 时为手动选择租期
 */
let manual = false;
const Index: React.FC<Props> = ({ route, navigation }) => {
  const [height, setHeight] = useState(0);
  const navigationRef = useNavigationContainerRef();
  console.log(navigationRef.getCurrentRoute());
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
  /**
   * 回退到商品详情时，重新打开Modal
   */
  useEffect(() => {
    const { fn } = route.params;
    return () => {
      fn?.(true);
    };
  }, [route.params]);

  const onLayout = (h: SetStateAction<number>) => {
    setHeight(h);
  };
  // 用户选择日期回调
  const onChange = (res: string[], n: number) => {
    console.log('选择日期', res, n);
    startEnd = res;
    manual = false;
    setDays(n);
  };
  // 确定回调
  const onSubmit = () => {
    // navigation.navigate({
    //   name: 'Detail',
    //   params: {
    //     startEnd,
    //   },
    //   merge: true,
    // });
    // redirect('OrderSubmit', {
    //   id: route.params.id as number,
    //   start: startEnd[0],
    //   end: startEnd[1],
    // });
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
      startEnd = [start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD')];
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
        startEnd={startEnd}
        days={days}
      />
    </Container>
  );
};

export default Index;
