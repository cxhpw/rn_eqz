import { Text, Pressable, HtmlParse } from '@/components';
import { Box, Center, Flex } from 'native-base';
import { memo, useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';

type Props = {
  data?: ProductInfo;
};
const Desc: React.FC<Props> = ({ data }) => {
  const [active, setActive] = useState<number>(0);
  const tabs = [
    {
      title: '商品详情',
    },
    {
      title: '规格参数',
    },
  ];
  console.log('desc render');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return (
    <Box>
      <Flex flexDir="row">
        {tabs.map((item, i) => (
          <Box key={item.title} flex={1}>
            <Pressable style={style.tabBarItem} onPress={() => setActive(i)}>
              <Center flex={1}>
                <Text
                  style={[
                    style.text,
                    { color: active === i ? 'red' : '#333' },
                  ]}>
                  {item.title}
                </Text>
              </Center>
            </Pressable>
          </Box>
        ))}
      </Flex>
      {active === 0 ? (
        <HtmlParse html={data!.ProDetail} />
      ) : (
        <HtmlParse html={data!.Leaserule} />
      )}
    </Box>
  );
};

const style = StyleSheet.create({
  tabBarItem: {
    height: 50,
    flex: 1,
  },
  text: {
    fontSize: 15,
    fontWeight: '500',
  },
});

export default memo(Desc);
