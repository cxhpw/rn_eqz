import { Container } from '@/components';
import { PropsWithChildren } from 'react';
import { Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

type Props = {
  name: string;
};
const Category: React.FC<PropsWithChildren<Props>> = () => {
  const { params } = useRoute();
  return (
    <Container>
      <Text>category{JSON.stringify(params)}</Text>
    </Container>
  );
};

export default Category;
