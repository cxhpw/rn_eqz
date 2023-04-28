import { memo, PropsWithChildren } from 'react';
import { Box } from '@/components';
import { ImageBackground, StyleSheet } from 'react-native';

const BgWrap: React.FC<PropsWithChildren<{ url: string }>> = ({
  children,
  url,
}) => {
  return (
    <Box height={430}>
      <ImageBackground
        style={style.ImageBackground}
        source={{
          uri: url,
        }}>
        {children}
      </ImageBackground>
    </Box>
  );
};

const style = StyleSheet.create({
  ImageBackground: {
    height: '100%',
  },
});

export default memo(BgWrap);
