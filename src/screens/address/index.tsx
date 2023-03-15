import {
  Box,
  Container,
  Swipeable,
  Text,
  Empty,
  Flex,
  Pressable,
  LoadButton,
} from '@/components';
import { useRefreshService, useToast } from '@/hooks';
import { StyleSheet, View } from 'react-native';
import request from '@/request';
import { useState } from 'react';
import { FlashList } from '@shopify/flash-list';
import { Radio } from '@/components/Radio';
const Index = () => {
  const toast = useToast();
  const { data, loadingMore, allLoaded, onRefresh, refreshing } =
    useRefreshService<AddressInfo>(async params => {
      console.log('默认参数', params);
      const res = await request.get<Page<AddressInfo>>(
        '/Include/alipay/data.aspx',
        {
          params: {
            apiname: 'getaddress',
            size: params.PageSize,
            pageNum: params.PageIndex,
          },
        },
      );
      return res.data;
    });
  const styles = StyleSheet.create({
    wrapper: {
      // backgroundColor: theme.colors.primary_background,
      paddingHorizontal: 15,
      justifyContent: 'center',
      width: '100%',
      height: 80,
    },
    title: {
      marginBottom: 10,
    },
    separator: {
      backgroundColor: 'rgb(200, 199, 204)',
      height: StyleSheet.hairlineWidth,
    },
  });
  const onDelete = async (id: any) => {
    const res = (
      await request.post('/Include/alipay/data.aspx', {
        apiname: 'opaddress',
        adrid: id,
        action: 'delete',
      })
    ).data;
    if (res) {
      console.log(res);
      toast.showToast(res.msg);
      onRefresh();
    }
  };
  const onEndReached = () => {
    // if (data && data.NextPage === data.PageIndex) {
    //   setPage(value => value + 1);
    // }
  };
  const [value, setValue] = useState('');
  return (
    <Container backgroundColor="#f8f8f8">
      <Radio.Group name="address" value={value}>
        <Swipeable.Provider>
          <FlashList
            refreshing={refreshing}
            data={data}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={({ item }) => (
              <Swipeable
                id={item.AutoID}
                actions={[
                  {
                    label: '删除',
                    onPress() {
                      onDelete(item.AutoID);
                    },
                    backgroundColor: '#dd2c00',
                  },
                ]}>
                <Pressable
                  activeOpacity={1}
                  scalable={false}
                  onPress={() => {
                    setValue(item.AutoID + '');
                    console.log(item.AutoID);
                  }}>
                  <Flex
                    backgroundColor="primary_background"
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{
                      paddingLeft: 15,
                    }}>
                    <Radio
                      size="x6"
                      value={item.AutoID + ''}
                      accessibilityLabel="raido"
                      isDisabled
                    />
                    <Box style={styles.wrapper}>
                      <Flex style={styles.title}>
                        <Text fontWeight="bold">
                          {item.Consignee}
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </Text>
                        <Text fontWeight="bold">{item.ContactPhone}</Text>
                      </Flex>
                      <Flex>
                        <Text variant="p2">{item.Province} &nbsp;&nbsp;</Text>
                        <Text variant="p2">{item.City}&nbsp;&nbsp;</Text>
                        <Text variant="p2">{item.Country}</Text>
                      </Flex>
                    </Box>
                  </Flex>
                </Pressable>
              </Swipeable>
            )}
            keyExtractor={_item => `${_item.AutoID}`}
            ListFooterComponent={
              data.length !== 0 && allLoaded ? (
                <LoadButton loading={!allLoaded} />
              ) : null
            }
            onEndReached={onEndReached}
            onEndReachedThreshold={0.1}
            ListEmptyComponent={
              data.length === 0 ? <Empty height={500} /> : null
            }
            estimatedItemSize={80}
          />
        </Swipeable.Provider>
      </Radio.Group>
    </Container>
  );
};

Index.displayName = 'Address';
export default Index;
