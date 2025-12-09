import { useState, useTransition } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  ViewProps,
  requireNativeComponent,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { RefreshControl } from '@byron-react-native/refresh-control';

const dummyData = Array(100).fill(1);

const NonUrgentUI = ({ value, isPending }: any) => {
  const backgroundStyle = {
    backgroundColor: value % 2 === 0 ? 'red' : 'green',
  };
  return (
    <View>
      <Text>Non urgent update value: {isPending ? 'PENDING' : value}</Text>
      <View style={[styles.container, backgroundStyle]}>
        {dummyData.map((_, index) => (
          <View key={index} style={styles.item}>
            <Text>{_}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const ConcurrentStartTransition = () => {
  const [value, setValue] = useState(1);
  const [nonUrgentValue, setNonUrgentValue] = useState(1);
  const [isPending, startTransition] = useTransition();
  const handleClick = () => {
    const newValue = value + 1;
    setValue(newValue);
    startTransition(() => {
      setNonUrgentValue(newValue);
    });
  };
  return (
    <View>
      <Button testID="testBtn" onPress={handleClick} title="Increment value" />
      <Text testID="testContext">Value: {value}</Text>
      <NonUrgentUI value={nonUrgentValue} isPending={isPending} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {},
});

const RNTMap = requireNativeComponent<
  ViewProps & {
    /** 是否显示罗盘 */
    showsCompass?: boolean;
    /** 是否显示缩放信息 */
    showsScale?: boolean;
    /** 是否禁止缩放 */
    zoomEnabled?: boolean;
    /** 是否显示用户位置 */
    showsUserLocation?: boolean;
    region: {
      /**
       * 地图中心点的坐标。
       */
      latitude: number;
      longitude: number;
      /**
       * 最小/最大经、纬度间的距离。
       *
       */
      latitudeDelta: number;
      longitudeDelta: number;
    };
    onRegionChange?: (e: any) => void;
    /** 生命周期 */
    onMapReady?: (e: any) => void;
    /** 点击地图 */
    onPress?: (e: any) => void;
  }
>('RNTMap');

const Index = () => {
  const [region, setRegion] = useState({
    latitude: 22.58,
    longitude: 113.9,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);

    // @ts-ignore
    await new Promise(res => setTimeout(res, 5000));

    setRefreshing(false);
  };

  return (
    <FlashList
      style={{ backgroundColor: '#f5f5f5', flex: 1 }}
      data={[1, 2, 3, 4, 5, 6]}
      // eslint-disable-next-line react-native/no-inline-styles
      contentContainerStyle={{
        // paddingHorizontal: 10,
        // backgroundColor: "green",
        // marginTop: -70,
        flex: 1,
      }}
      renderItem={({ item, index }) => (
        <Text key={item}>
          {item}: {refreshing ? '刷新中' : '刷新结束'}
        </Text>
      )}
      keyExtractor={_item => `${_item}`}
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl onRefresh={onRefresh} />}
      onEndReached={null}
    />
    // <ScrollView >
    //   {
    //     dummyData.map((value, index) => {
    //       return <Text key={index} style={{height: 50}}>{index}</Text>
    //     })
    //   }
    // </ScrollView>
  );
};

export default Index;
