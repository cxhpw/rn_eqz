import { View, Text, StyleSheet } from 'react-native';

//@ts-ignore
const DisCount = d => {
  // eslint-disable-next-line eqeqeq
  if (d == 0) {
    return;
  }
  return (
    <View style={style.wrapper}>
      <Text style={style.Text}>{d}折</Text>
    </View>
  );
};

const style = StyleSheet.create({
  wrapper: {
    backgroundColor: '#E4393C',
    marginTop: 6,
    paddingVertical: 4,
    paddingHorizontal: 5,
    borderRadius: 4,
    minWidth: 26,
    textAlign: 'center',
  },
  Text: {
    color: '#fff',
    fontSize: 8,
    fontWeight: '500',
  },
});

export default DisCount;
