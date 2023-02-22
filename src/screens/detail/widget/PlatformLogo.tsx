import { useAppSelector } from '@/hooks';
import { memo } from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

const PlatformLogo = () => {
  const { alipayadimg } = useAppSelector(state => state.appConfig);
  return (
    <FastImage
      style={style.Image}
      source={{
        uri: alipayadimg,
      }}
    />
  );
};

const style = StyleSheet.create({
  Image: {
    height: 50,
    width: '100%',
  },
});

export default memo(PlatformLogo);
