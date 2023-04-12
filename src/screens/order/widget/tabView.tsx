import { TViewProps } from '@/components/Tabs/type';
import { PropsWithChildren, useEffect } from 'react';
import { Box, Empty, FlashList, LoadButton } from '@/components';
import { useRefreshService } from '@/hooks';
import request from '@/request';
import Item from './item';
import { Select } from 'native-base';

type Props = {
  id: string;
} & TViewProps;

const TabView: React.FC<PropsWithChildren<Props>> = ({ route, ...rest }) => {
  const {
    data = [],
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
    return <LoadButton loading={!allLoaded} />;
  };
  useEffect(() => {
    console.log('加载状态', refreshing);
  }, [refreshing]);
  return (
    <Box backgroundColor="background" flex={1}>
      <FlashList
        data={data}
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{
          paddingHorizontal: 10,
        }}
        renderItem={({ item }) => <Item {...item} />}
        onEndReached={onLoadMore}
        keyExtractor={_item => `${_item.OitemID}`}
        refreshing={refreshing}
        onEndReachedThreshold={100}
        loadingMore={loadingMore}
        allLoaded={allLoaded}
        estimatedItemSize={300}
        renderEmpty={() => (
          <Box style={{ marginTop: '30%' }}>
            <Empty />
          </Box>
        )}
        showsVerticalScrollIndicator={false}
        renderFooter={renderFooter}
      />
    </Box>
  );
};

TabView.displayName = 'TabView';

export default TabView;
