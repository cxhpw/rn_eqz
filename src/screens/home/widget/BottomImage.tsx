import { Box, Pressable } from '@/components';
import { navigate } from '@/services/NavigationService';
import { transformUrlToParams } from '@/utils/common';
import { memo } from 'react';
import { Image, StyleSheet } from 'react-native';

const BottomImage: React.FC<{
  data?: { image: string; name: string; url: string };
}> = ({ data }) => {
  return (
    <Box
      marginHorizontal="2.5"
      marginBottom="x2"
      flexGrow={1}
      justifyContent="flex-end">
      <Pressable
        scalable={false}
        onPress={() => {
          const { routeName, params } = transformUrlToParams(data!.url);
          navigate(routeName as any, params);
        }}>
        <Image
          style={style.Image}
          source={{
            uri: data?.image,
          }}
          resizeMode="contain"
        />
      </Pressable>
    </Box>
  );
};

const style = StyleSheet.create({
  Image: {
    width: '100%',
    height: 75,
  },
});

export default memo(BottomImage);
