import { useState } from 'react';
import { ViewProps, requireNativeComponent } from 'react-native';

const RNTMap = requireNativeComponent<
  ViewProps & {
    /** 是否显示罗盘 */
    showsCompass?: boolean;
    /** 是否显示缩放信息 */
    showsScale?: boolean;
    /** 是否禁止缩放 */
    zoomEnabled?: boolean;
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
    latitude: 22.566147,
    longitude: 113.900594,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });
  return (
    <>
      <RNTMap
        region={region}
        zoomEnabled={false}
        showsCompass={true}
        style={{ flex: 1 }}
        onMapReady={e => {
          console.log('地图初始化中', e.nativeEvent.cxh);
        }}
        onRegionChange={e => {
          console.log('onRegionChange', e.nativeEvent.region);
        }}
        onPress={e => {
          console.log('点击回调', e.nativeEvent);
          setRegion({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          });
        }}
      />
    </>
  );
};

export default Index;
