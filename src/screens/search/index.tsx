import { Box, Flex, Input, LoadButton, Empty } from '@/components';
import { useRefreshService } from '@/hooks';
import { MasonryFlashList } from '@shopify/flash-list';
import { useEffect, useState } from 'react';
import WaterfallItem from '../my/widget/waterfallItem';
import request from '@/request';
import useDebounce from '@/hooks/useDebounce';
import Hot from './hot';
import { useTheme } from '@shopify/restyle';
import { AppTheme } from '@/theme';

const Index = () => {
  const theme = useTheme<AppTheme>();
  const [isEndDuring, setIsEndDuring] = useState(true);
  const [key, SetKey] = useState('');
  const value = useDebounce(key, { wait: 500 });
  const { data, onLoadMore, refreshing, setData, onUpdate } =
    useRefreshService<Product>(
      async params => {
        console.log('params', params);
        const res = await (
          await request.get('/Include/ajax/AjaxMethod.aspx', {
            params: {
              t: 'getproductlist',
              key: key,
              catid: 0,
              ishot: 0,
              pageindex: params.PageIndex,
              pagesize: params.PageSize,
            },
          })
        ).data;
        res.TotalCount = res.CountInt;
        res.dataList = res.data;
        res.TotalPage = res.Totalpage;
        return res;
      },
      {
        manual: true,
      },
    );
  useEffect(() => {
    if (value !== '') {
      console.log('value', value);
      onUpdate([
        {
          PageIndex: 1,
          PageSize: 10,
        },
      ]);
    } else {
      setIsEndDuring(true);
      setData([]);
    }
  }, [onUpdate, setData, value]);
  return (
    <>
      <Flex
        padding="2.5"
        backgroundColor={`${
          theme.theme === 'dark' ? 'primary_background' : 'white'
        }`}>
        <Input
          value={key}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            borderWidth: 0,
            backgroundColor: theme.theme === 'dark' ? '#000' : '#f6f6f6',
            paddingLeft: 10,
          }}
          allowClear
          placeholder="想体验什么？搜搜看"
          onChange={e => {
            SetKey(e);
          }}
        />
      </Flex>
      <Box flex={1}>
        <MasonryFlashList
          contentContainerStyle={{
            paddingTop: 15,
            paddingHorizontal: 5,
          }}
          data={data}
          numColumns={2}
          estimatedItemSize={250}
          onScrollAnimationEnd={() => {
            console.log(123);
          }}
          renderItem={({ item }: any) => (
            <WaterfallItem
              data={item}
              style={{
                width: '100%',
              }}
            />
          )}
          ListEmptyComponent={
            data.length === 0 && key === '' ? (
              <Hot
                onChange={e => {
                  if (e === key) return;
                  SetKey(e);
                }}
              />
            ) : (
              <Empty style={{ marginTop: 100 }} emptyText="搜索结果为空" />
            )
          }
          ListFooterComponent={
            data.length === 0 ? null : <LoadButton loading={refreshing} />
          }
          onEndReachedThreshold={0.3}
          onEndReached={() => {
            console.log(123);
            if (!isEndDuring) {
              onLoadMore();
              setIsEndDuring(true);
            }
          }}
          onMomentumScrollBegin={() => {
            console.log(1234);
            setIsEndDuring(false);
          }}
        />
      </Box>
    </>
  );
};

Index.displayName = 'Search';

export default Index;
