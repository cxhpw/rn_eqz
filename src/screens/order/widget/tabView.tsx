import { TViewProps } from '@/components/Tabs/type';
import { PropsWithChildren, createContext, useEffect } from 'react';
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
}>(null);

const TabView: React.FC<PropsWithChildren<Props>> = ({ route, ...rest }) => {
  const {
    data = [],
    setData,
    allLoaded,
    loadingMore,
    refreshing,
    onLoadMore,
  } = useRefreshService<OrderItem>(
    async params => {
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
    },
    {
      manual: false,
    },
  );
  const renderFooter = () => {
    return data.length === 0 ? null : <LoadButton loading={!allLoaded} />;
  };
  return (
    <Box backgroundColor="background" flex={1}>
      <OrderContext.Provider
        value={{
          data,
          setData,
        }}>
        <FlashList
          data={data}
          // eslint-disable-next-line react-native/no-inline-styles
          contentContainerStyle={{
            paddingHorizontal: 10,
          }}
          renderItem={({ item }) => <Item {...item} />}
          onEndReached={onLoadMore}
          keyExtractor={_item => `${_item.OrderID}`}
          refreshing={refreshing}
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

TabView.displayName = 'TabView';

export default TabView;
