import { helpers } from '@/components';
import { Box, Center, HStack, VStack } from 'native-base';
import { PropsWithChildren } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { transformUrlToParams } from '@/utils/common';
import { navigate } from '@/services/NavigationService';

type Props = {
  urls: { image: string; name: string; url: string }[];
};
const { scale } = helpers;
const Promo: React.FC<PropsWithChildren<Props>> = ({ children, urls = [] }) => {
  return (
    <Box py={5} px={2.5}>
      <Box>{children}</Box>
      {urls.length > 0 && (
        <HStack space={2.5}>
          <Center flex={1} position="relative">
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                const { routeName, params } = transformUrlToParams(urls[0].url);
                navigate(routeName as any, {
                  ...params,
                });
              }}
              style={{
                width: '100%',
              }}>
              <FastImage
                style={style.leftImage}
                source={{
                  uri: urls[0].image,
                }}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </Center>
          <Center flex={1}>
            <VStack
              space={2.5}
              style={{
                width: '100%',
              }}>
              <Center flex={1}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    const { routeName, params } = transformUrlToParams(
                      urls[1].url,
                    );
                    navigate(routeName as any, {
                      ...params,
                    });
                  }}
                  style={{
                    width: '100%',
                  }}>
                  <FastImage
                    style={style.rightImage}
                    source={{
                      uri: urls[1].image,
                    }}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              </Center>
              <Center>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    const { routeName, params } = transformUrlToParams(
                      urls[2].url,
                    );
                    navigate(routeName as any, {
                      ...params,
                    });
                  }}
                  style={{
                    width: '100%',
                  }}>
                  <FastImage
                    style={style.rightImage}
                    source={{
                      uri: urls[2].image,
                    }}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              </Center>
            </VStack>
          </Center>
        </HStack>
      )}
    </Box>
  );
};

const style = StyleSheet.create({
  leftImage: {
    width: '100%',
    height: scale(160),
    borderRadius: 6,
  },
  rightImage: {
    height: scale(75),
    width: '100%',
    borderRadius: 6,
  },
});

export default Promo;
