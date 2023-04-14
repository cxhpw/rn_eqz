import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCustomRequest } from '@/hooks';
import request from '@/request';
import { Box, Fallback, FlashList, LoadButton } from '@/components';
import { StyleSheet, View, ImageBackground } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scale } from '@/components/helpers/normalize';
import { useMemo } from 'react';
import Card from './card';

type Item = {
  Url: string;
  Title: string;
  Image: string;
};

const Activity: React.FC<NativeStackScreenProps<AppParamList, 'Activity'>> = ({
  route,
}) => {
  const { top } = useSafeAreaInsets();
  const { data, loading } = useCustomRequest(async () => {
    return await (
      await request.get('/include/alipay/data.aspx', {
        params: {
          apiname: 'gettopicad',
          nid: route.params.id,
        },
      })
    ).data;
  });
  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrapper: {
          flex: 1,
        },
        image: {
          height: scale(175 + top),
        },
        background: {
          flex: 1,
        },
      }),
    [top],
  );
  return (
    <>
      {loading ? (
        <Fallback />
      ) : (
        <View style={[styles.wrapper]}>
          <FastImage
            style={styles.image}
            resizeMode="cover"
            source={{
              uri: data.Banner,
            }}
          />
          <Box flex={1}>
            <ImageBackground
              fadeDuration={10}
              style={[styles.background, StyleSheet.absoluteFill]}
              resizeMode="cover"
              source={{
                uri: data.Background,
              }}
            />
            <FlashList
              contentContainerStyle={{
                paddingHorizontal: 10,
                paddingBottom: 20,
              }}
              data={data.AdList}
              renderItem={({ item }: { item: Item }) => <Card {...item} />}
              onEndReached={function (): Promise<void> {
                throw new Error('Function not implemented.');
              }}
              refreshing={loading}
              onEndReachedThreshold={0}
              loadingMore={false}
              allLoaded={true}
              estimatedItemSize={125}
              renderFooter={() => {
                return <LoadButton loading={false} />;
              }}
            />
          </Box>
        </View>
      )}
    </>
  );
};

export default Activity;
