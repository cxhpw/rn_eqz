import { PropsWithChildren } from 'react';
import { View, Text } from 'react-native';

type Props = {
  name: string;
};
const Category: React.FC<PropsWithChildren<Props>> = () => {
  return (
    <View>
      <Text>category</Text>
    </View>
  );
};

export default Category;
