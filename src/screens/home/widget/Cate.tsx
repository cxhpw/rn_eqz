import { Center, HStack } from 'native-base';
import { memo, PropsWithChildren } from 'react';
import request from '@/request';
import { useCustomRequest } from '@/hooks';
import { Image, StyleSheet, Pressable } from 'react-native';
import { navigate } from '@/services/NavigationService';

type Props = {};

async function fetch1() {
  const res = await request.get('/Include/alipay/data.aspx', {
    params: {
      apiname: 'getindexcategory',
    },
  });
  return res.data;
}
const Cate: React.FC<PropsWithChildren<Props>> = ({}) => {
  const { data = [] } = useCustomRequest<
    {
      AutoID: number;
      CategoryImage: string;
    }[]
  >(fetch1);
  const onClick = (id: number) => {
    navigate('Category', { id });
  };
  return (
    <HStack justifyContent="space-around" alignItems="center" mt="6">
      {data?.map(item => (
        <Center key={item.AutoID} size="50px" flexGrow={1}>
          <Pressable onPress={() => onClick(item.AutoID)}>
            <Image
              style={style.Image}
              source={{
                uri: item.CategoryImage,
              }}
            />
          </Pressable>
        </Center>
      ))}
    </HStack>
  );
};

const style = StyleSheet.create({
  Image: {
    width: 50,
    height: 50,
  },
});

export default memo(Cate);
