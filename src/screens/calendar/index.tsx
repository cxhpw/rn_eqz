import { SetStateAction, useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Container } from '@/components';
import DateCalendar from './dateCalendar';
import ActionSubmit from './widget/actionSubmit';

type Props = {} & NativeStackScreenProps<AppParamList, 'Calendar'>;

let startEnd: string[] = [];
const Index: React.FC<Props> = ({ route, navigation }) => {
  const [height, setHeight] = useState(0);
  useEffect(() => {
    const { fn } = route.params;
    return () => {
      fn(true);
    };
  }, [route.params]);
  const onChange = (res: any) => {
    console.log('选择日期', res);
    startEnd = res;
  };
  const onLayout = (h: SetStateAction<number>) => {
    setHeight(h);
  };
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
  const onRangeDays = (n: any) => {
    console.log(n);
  };
  return (
    <Container>
      <DateCalendar
        start={route.params.start}
        end={route.params.end}
        onChange={onChange}
        paddingBttom={height}
      />
      <ActionSubmit
        onSubmit={onSubmit}
        onLayout={onLayout}
        onRangeDays={onRangeDays}
        min={route.params.minDay}
      />
    </Container>
  );
};

export default Index;
