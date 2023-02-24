import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useUpdate } from 'ahooks';
import { TDate } from '@/services/CalendarService';
import CalendarContext from './context';
import { useContext } from 'react';

type Props = {
  data: TDate;
};
const { width } = Dimensions.get('window');
function getDateViewStyle(d: TDate): ViewStyle {
  let style: ViewStyle = {};
  if (d.past || d.disabled) {
    style.opacity = 0.2;
  }
  if (d.outside || d.fade) {
    style.opacity = 0;
  }
  if (d.start || d.end) {
    style.backgroundColor = '#22d7bb';
  }
  if (d.selected) {
    style.backgroundColor = '#a9fff2';
  }
  return style;
}

function getDateTextStyle(d: TDate): TextStyle {
  let style: TextStyle = {};
  if (d.start || d.end) {
    style.color = '#ffffff';
  }
  return style;
}

const DateItem: React.FC<Props> = ({ data }) => {
  const {} = useContext(CalendarContext);
  const update = useUpdate();
  return (
    <Pressable
      onPress={() => {
        console.log(data.start, data.selected, data.end);
      }}>
      <View style={[styles.date, getDateViewStyle(data)]}>
        <Text style={[getDateTextStyle(data)]}>
          {data.today ? '今天' : data.str}
        </Text>
        {data.start && <Text style={styles.text}>起租</Text>}
        {data.end && <Text style={styles.text}>归还</Text>}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  date: {
    width: Math.round((width / 7) * 100) / 100,
    height: Math.round((width / 7) * 100) / 100,
    alignItems: 'center',
    justifyContent: 'center',
    // borderRadius: Math.round((width / 7) * 100) / 100,
  },
  text: {
    fontSize: 12,
    color: '#ffffff',
    marginTop: 4,
  },
});

export default DateItem;
