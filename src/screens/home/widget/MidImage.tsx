import { Box } from 'native-base';
import { memo } from 'react';
import { Image, StyleSheet } from 'react-native';

const MidImage = ({ url }: { url: string }) => {
  return (
    <Box mx="2.5" mt={2.5}>
      <Image
        style={style.Image}
        source={{
          uri: url,
        }}
      />
    </Box>
  );
};

const style = StyleSheet.create({
  Image: {
    width: '100%',
    height: 20,
  },
});

export default memo(MidImage);
