import { Box, Pressable } from '@/components';
import { scale } from '@/components/helpers/normalize';
import { navigate } from '@/services/NavigationService';
import { transformUrlToParams } from '@/utils/common';
import { ImageBackground, StyleSheet } from 'react-native';

type Item = {
  Url: string;
  Title: string;
  Image: string;
};
const Card = ({ Image, Title, Url }: Item) => {
  return (
    <Box
      height={scale(125)}
      width="100%"
      borderRadius="x1"
      overflow="hidden"
      mt="x5">
      <Pressable
        scalable={false}
        onPress={() => {
          const { routeName, params } = transformUrlToParams(Url);
          navigate(routeName as any, params);
        }}
        style={{
          height: '100%',
        }}>
        <ImageBackground
          style={[StyleSheet.absoluteFill]}
          resizeMode="cover"
          source={{
            uri: Image,
          }}
        />
      </Pressable>
    </Box>
  );
};

export default Card;
