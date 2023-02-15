import { Box } from 'native-base';
import { memo } from 'react';
import { Image, StyleSheet } from 'react-native';

const BottomImage: React.FC<{ url: string }> = ({ url }) => {
  return (
    <Box mx={2.5} mb={2} flexGrow={1} justifyContent="flex-end">
      <Image
        style={style.Image}
        source={{
          uri: url,
        }}
        resizeMode="contain"
      />
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
