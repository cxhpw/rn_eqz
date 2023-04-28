import { memo, PropsWithChildren } from 'react';
import request from '@/request';
import { useCustomRequest } from '@/hooks';
import { Image, StyleSheet, Pressable } from 'react-native';
import { navigate } from '@/services/NavigationService';
import { Flex, Center } from '@/components';

type Props = {};

async function fetch() {
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
  >(fetch);
  const onClick = (id: number) => {
    navigate('Category', { id });
  };
  return (
    <Flex justifyContent="space-around" alignItems="center" marginTop="x6">
      {data?.map(item => (
        <Center key={item.AutoID} width={50} height={50} flexGrow={1}>
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
    </Flex>
  );
};

const style = StyleSheet.create({
  Image: {
    width: 50,
    height: 50,
  },
});

export default memo(Cate);
