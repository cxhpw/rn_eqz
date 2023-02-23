import { Icon, Pressable } from '@/components';
import { Box } from 'native-base';
import { Text, StyleSheet, View } from 'react-native';

type Props = {
  data: ProductInfo | undefined;
};
const Footer: React.FC<Props> = ({ data }) => {
  return (
    <Pressable scalable={false}>
      <Box style={styles.wrapper}>
        <Text style={styles.title}>
          租赁日期<Text style={styles.label}>（{data?.MinDays}天起租）</Text>
        </Text>
        <Text>请选择租赁日期</Text>
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
