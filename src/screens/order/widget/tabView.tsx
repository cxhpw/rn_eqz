import { TViewProps } from '@/components/Tabs/type';
import { PropsWithChildren, createContext, useState } from 'react';
import { Box, Empty, FlashList, LoadButton } from '@/components';
import { useRefreshService } from '@/hooks';
import request from '@/request';
import Item from './item';

type Props = {
  id: string;
} & TViewProps;
type noop = (n: OrderItem[]) => OrderItem[];
export const OrderContext = createContext<null | {
  data: OrderItem[];
  setData: (fn: noop) => void;
  onRefresh: () => void;
}>(null);
const TabView: React.FC<PropsWithChildren<Props>> = ({ route, ...rest }) => {
  const [isEndDuring, setIsEndDuring] = useState(true);
  const {
    data = [],
    setData,
    allLoaded,
    loadingMore,
    refreshing,
    onRefresh,
    onLoadMore,
  } = useRefreshService<OrderItem>(async params => {
    const res = await (
      await request<Page<OrderItem>>({
        url: '/Include/alipay/data.aspx',
        params: {
          apiname: 'getorders',
          status: route.key,
          pageNum: params.PageIndex,
        },
      })
    ).data;
    return res;
  });
  const renderFooter = () => {
    return data.length === 0 ? null : <LoadButton loading={!allLoaded} />;
  };
  return (
    <Box backgroundColor="background" flex={1}>
      <OrderContext.Provider
        value={{
          data,
          setData,
          onRefresh,
        }}>
        <FlashList
          data={data}
          // eslint-disable-next-line react-native/no-inline-styles
          contentContainerStyle={{
            paddingHorizontal: 10,
          }}
          refreshing={refreshing}
          onRefresh={onRefresh}
          renderItem={({ item }) => <Item {...item} />}
          onEndReached={async () => {
            if (!isEndDuring) {
              console.log('初始化');
              setIsEndDuring(true);
              onLoadMore();
            }
          }}
          onMomentumScrollBegin={() => {
            setIsEndDuring(false);
          }}
          keyExtractor={_item => `${_item.OrderID}`}
          onEndReachedThreshold={100}
          loadingMore={loadingMore}
          allLoaded={allLoaded}
          estimatedItemSize={300}
          renderEmpty={() =>
            refreshing || data.length !== 0 ? null : (
              <Box style={{ marginTop: '30%' }}>
                <Empty />
              </Box>
            )
          }
          showsVerticalScrollIndicator={false}
          renderFooter={renderFooter}
        />
      </OrderContext.Provider>
    </Box>
  );
};

TabView.displayName = 'TabScene';

export default TabView;
