import { memo, PropsWithChildren } from 'react';
import { Box } from '@/components';
import { ImageBackground, StyleSheet } from 'react-native';

const BgWrap: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <Box height={164}>
      <ImageBackground
        style={style.ImageBackground}
        resizeMode="stretch"
        source={{
          uri: 'http://f.wxjmei.com/2020/06/202006169238617.jpg',
        }}>
        {children}
      </ImageBackground>
    </Box>
  );
};

const style = StyleSheet.create({
  ImageBackground: {
    height: '100%',
    backgroundColor: 'transparent',
  },
});

export default memo(BgWrap);
