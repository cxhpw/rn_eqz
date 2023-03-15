import { Flex } from 'native-base';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const Index: React.FC<{ title?: string; loading?: boolean }> = ({
  title = '没有更多数据',
  loading = false,
}) => {
  return (
    <Flex
      position="relative"
      flexDirection="row"
      py={5}
      alignItems="center"
      justifyContent="center">
      {loading ? (
        <>
          <ActivityIndicator size="small" color="#999" />
          <Text style={[style.title, { paddingLeft: 5 }]}>加载中...</Text>
        </>
      ) : (
        <>
          <View style={style.line} />
          <Text style={style.title}>{title}</Text>
          <View style={style.line} />
        </>
      )}
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
