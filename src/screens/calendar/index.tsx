import { useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Container } from '@/components';
import DateCalendar from './dateCalendar';
import { ScrollView } from 'react-native';

type Props = {} & NativeStackScreenProps<AppParamList, 'Calendar'>;
const Index: React.FC<Props> = ({ route }) => {
  useEffect(() => {
    const { fn } = route.params;
    return () => {
      fn(true);
    };
  }, [route.params]);
  const onChange = (res: any) => {
    console.log('选择日期', res);
  };
  console.log('asdas render');
  return (
    <Container>
      <ScrollView>
        <DateCalendar onChange={onChange} />
      </ScrollView>
    </Container>
  );
};

export default Index;
