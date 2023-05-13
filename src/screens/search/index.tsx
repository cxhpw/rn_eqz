/* eslint-disable react-native/no-inline-styles */
import { Box, Flex, Input, LoadButton, Empty } from '@/components';
import { useRefreshService } from '@/hooks';
import { MasonryFlashList } from '@shopify/flash-list';
import { useCallback, useEffect, useState } from 'react';
import WaterfallItem from '../my/widget/waterfallItem';
import request from '@/request';
import useDebounce from '@/hooks/useDebounce';
import Hot from './hot';
import { useTheme } from '@shopify/restyle';
import { AppTheme } from '@/theme';

const Index = () => {
  const theme = useTheme<AppTheme>();
  const [isEndDuring, setIsEndDuring] = useState(true);
  const [loading, setLoading] = useState(false);
  const [key, SetKey] = useState('');
  const value = useDebounce(key, { wait: 500 });
  const {
    data,
    setData,
    onUpdate,
    allLoaded,
    params: _params,
  } = useRefreshService<Product>(
    async params => {
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
  const memoOnUpdate = useCallback(
    (isFirstPage?: boolean) => {
      const params = [
        {
          PageIndex: 1 + (isFirstPage ? 0 : _params?.[0]?.PageIndex ?? 0),
          PageSize: 10,
        },
      ];
      if (!isFirstPage && allLoaded) {
        return Promise.resolve();
      }
      return onUpdate(params);
    },
    [_params, allLoaded, onUpdate],
  );

  function fetchSearchList(isFirstPage?: boolean) {
    setLoading(true);
    memoOnUpdate(isFirstPage)?.then(res => {
      console.log('then', res);
      setLoading(false);
    });
  }

  useEffect(() => {
    if (value !== '') {
      fetchSearchList(true);
    } else {
      setIsEndDuring(true);
      setData([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const ListEmptyComponent = () => {
    console.log('ListEmptyComponent', key);
    if (loading) {
      return <LoadButton loading={loading} />;
    }
    return key === '' ? (
      <Hot
        onChange={e => {
          if (e === key) {
            return;
          }
          SetKey(e);
          setLoading(true);
        }}
      />
    ) : (
      <Empty style={{ marginTop: 100 }} emptyText="搜索结果为空" />
    );
  };

  console.log('loading', loading);
  return (
    <>
      <Flex
        padding="2.5"
        backgroundColor={`${
          theme.theme === 'dark' ? 'primary_background' : 'white'
        }`}>
        <Input
          value={key}
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
          keyExtractor={item => item.AutoID}
          renderItem={({ item }: any) => (
            <WaterfallItem
              data={item}
              style={{
                width: '100%',
              }}
            />
          )}
          ListEmptyComponent={ListEmptyComponent}
          ListFooterComponent={
            data.length === 0 ? null : <LoadButton loading={loading} />
          }
          onEndReachedThreshold={0.3}
          onEndReached={() => {
            if (!isEndDuring) {
              fetchSearchList();
              setIsEndDuring(true);
            }
          }}
          onMomentumScrollBegin={() => {
            setIsEndDuring(false);
          }}
        />
      </Box>
    </>
  );
};

Index.displayName = 'Search';

export default Index;
