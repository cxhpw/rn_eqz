import { useCustomRequest } from '@/hooks';
import { PropsWithChildren } from 'react';
import { Image, ScrollView } from 'react-native';
import request from '@/request';
import Item from './Item';
import DisCount from './Discount';
import { Box, Flex } from '@/components';

type Props = {
  type: string;
  renderTitle: JSX.Element;
  hasPrice?: boolean;
  hasSort?: boolean;
  hasDisCount?: boolean;
};

function IconFn(index: number) {
  switch (index) {
    case 0:
      return (
        <Image
          style={{ width: 14, height: 16 }}
          source={require('@/images/1.png')}
        />
      );
    case 1:
      return (
        <Image
          style={{ width: 14, height: 16 }}
          source={require('@/images/2.png')}
        />
      );
    case 2:
      return (
        <Image
          style={{ width: 14, height: 16 }}
          source={require('@/images/3.png')}
        />
      );
  }
}

const Index: React.FC<PropsWithChildren<Props>> = ({
  type,
  renderTitle,
  hasPrice,
  hasSort,
  hasDisCount,
}) => {
  const { data } = useCustomRequest<Product[]>(
    async () =>
      (
        await request({
          url: 'Include/alipay/data.aspx',
          params: {
            apiname: 'getrecommendproductlist',
            type: type,
          },
        })
      ).data,
  );
  return (
    <Box paddingVertical="x5" paddingHorizontal="2.5">
      <Box marginBottom="x2">{renderTitle}</Box>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Flex>
          {data?.map((item, index) => {
            return (
              <Item
                key={item.AutoID}
                {...item}
                ItemStyle={{
                  marginRight: 10,
                }}
                hasPrice={hasPrice}
                size={185 / 2}
                renderIcon={
                  hasSort
                    ? IconFn(index)
                    : hasDisCount
                      ? DisCount(item.Discount as any)
                      : ''
                }
              />
            );
          })}
        </Flex>
      </ScrollView>
    </Box>
  );
};
export default Index;
