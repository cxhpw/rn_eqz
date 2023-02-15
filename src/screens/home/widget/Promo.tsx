import { scale } from '@/helper/normalize';
import { Box, Center, HStack, VStack } from 'native-base';
import { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
type Props = {
  urls: { image: string; name: string; url: string }[];
};
const Promo: React.FC<PropsWithChildren<Props>> = ({ children, urls = [] }) => {
  return (
    <Box py={5} px={2.5}>
      <Box>{children}</Box>
      {urls.length && (
        <HStack space={2.5}>
          <Center flex={1} backgroundColor="amber.100">
            <FastImage
              style={style.leftImage}
              source={{
                uri: urls[0].image,
              }}
              resizeMode="cover"
            />
          </Center>
          <Center flex={1}>
            <VStack
              space={2.5}
              style={{
                width: '100%',
              }}>
              <Center flex={1}>
                <FastImage
                  style={style.rightImage}
                  source={{
                    uri: urls[1].image,
                  }}
                  resizeMode="cover"
                />
              </Center>
              <Center>
                <FastImage
                  style={style.rightImage}
                  source={{
                    uri: urls[2].image,
                  }}
                  resizeMode="cover"
                />
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
