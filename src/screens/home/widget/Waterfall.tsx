import { useCustomRequest } from '@/hooks';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import request from '@/request';
import { Box, Center, HStack } from 'native-base';
import FastImage from 'react-native-fast-image';
import { Text, LoadButton, Price } from '@/components';
import { FC, PropsWithChildren } from 'react';
import { navigate } from '@/services/NavigationService';

type Props = {};
const Waterfall: FC<PropsWithChildren<Props>> = ({ children }) => {
  const { data } = useCustomRequest<Product[]>(
    async () =>
      (
        await request({
          url: '/Include/alipay/data.aspx',
          params: {
            apiname: 'getrecommendproductlist',
            type: 'show',
          },
        })
      ).data,
  );
  return (
    <Box px={2.5} py={5}>
      <Box>{children}</Box>
      <Box>
        {data?.map((item, index) => {
          return (
            <TouchableOpacity
              key={item.AutoID}
              onPress={() => {
                navigate('Detail', { id: item.AutoID });
              }}>
              <HStack space={2} py={2.5}>
                <Center>
                  <FastImage
                    source={{
                      uri: item.ProImg,
                    }}
                    style={style.FastImage}
                  />
                </Center>
                <Center
                  flex={1}
                  alignItems="flex-start"
                  position="relative"
                  justifyContent="flex-start">
                  <Text
                    variant="h2"
                    style={{
                      marginBottom: 'auto',
                    }}>
                    {item.ProductName}
                  </Text>
                  <Box flexDirection="row">
                    {item.ProductTag?.map(tag => {
                      return (
                        <Box
                          key={tag}
                          style={style.tag}
                          borderRadius="4px"
                          overflow="hidden"
                          mb={1}
                          mr={1}>
                          <Text fontSize={10} lineHeight={16} color="white">
                            {tag}
                          </Text>
                        </Box>
                      );
                    })}
                  </Box>
                  <Price
                    money={item.MinSellPrice}
                    style={{
                      fontSize: 16,
                    }}
                    beforeStyle={{
                      fontSize: 12,
                    }}
                  />
                  <Box mt={1.5}>
                    <Text style={style.hit}>{item.Hit}浏览</Text>
                  </Box>
                  <View
                    style={[
                      style.line,
                      { display: data.length - 1 === index ? 'none' : 'flex' },
                    ]}
                  />
                </Center>
              </HStack>
            </TouchableOpacity>
          );
        })}
      </Box>
      <LoadButton title="本租赁服务由e奇租提供" />
    </Box>
  );
};
const style = StyleSheet.create({
  FastImage: {
    width: 155,
    height: 155,
    borderRadius: 6,
  },
  line: {
    position: 'absolute',
    right: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#dfdfdf',
    bottom: -10,
    height: 1,
    width: '100%',
  },
  tag: {
    paddingHorizontal: 5,
    backgroundColor: '#EF775E',
    borderRadius: 4,
  },
  hit: {
    color: '#999',
    fontSize: 12,
  },
});

export default Waterfall;
