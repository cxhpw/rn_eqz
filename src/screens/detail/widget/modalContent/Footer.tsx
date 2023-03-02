import { Icon, Pressable } from '@/components';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Box } from 'native-base';
import { Text, StyleSheet, View } from 'react-native';
import dayjs from 'dayjs';

type Props = {
  data: ProductInfo | undefined;
  onClick: () => void;
};
const Footer: React.FC<Props> = ({ data, onClick }) => {
  const { params } = useRoute<RouteProp<AppParamList, 'Detail'>>();
  return (
    <Pressable
      scalable={false}
      onPress={() => {
        onClick();
      }}>
      <Box style={styles.wrapper}>
        <Text style={styles.title}>
          租赁日期<Text style={styles.label}>（{data?.MinDays}天起租）</Text>
        </Text>
        {params.startEnd?.length ? (
          // eslint-disable-next-line react-native/no-inline-styles
          <Text style={[styles.label, { fontSize: 14 }]}>
            {dayjs(params.startEnd[0]).format('MM月DD日')}-
            {dayjs(params.startEnd[1]).format('MM月DD日')}
            (共
            {dayjs(params.startEnd[1]).diff(dayjs(params.startEnd[0]), 'day') +
              1}
            天)
          </Text>
        ) : (
          <Text>请选择租赁日期</Text>
        )}
        <View style={styles.icon}>
          <Icon name="right" color="#ccc" />
        </View>
      </Box>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    padding: 15,
    borderTopColor: '#dfdfdf',
    borderTopWidth: 0.5,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 10,
  },
  label: {
    fontSize: 12,
    color: '#999',
    fontWeight: '400',
  },
  icon: {
    position: 'absolute',
    right: 15,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Footer;
