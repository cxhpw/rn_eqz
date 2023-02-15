import { Flex } from 'native-base';
import { View, Text, StyleSheet } from 'react-native';

const Index: React.FC<{ title: string }> = ({ title }) => {
  return (
    <Flex
      position="relative"
      flexDirection="row"
      py={5}
      alignItems="center"
      justifyContent="center">
      <View style={style.line} />
      <Text style={style.title}>{title}</Text>
      <View style={style.line} />
    </Flex>
  );
};

const style = StyleSheet.create({
  line: {
    height: 0.5,
    width: 40,
    backgroundColor: '#999',
  },
  title: {
    fontSize: 12,
    color: '#999',
    paddingHorizontal: 20,
  },
});

export default Index;
