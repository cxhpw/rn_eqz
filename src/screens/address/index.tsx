import {
  Box,
  Container,
  Swipeable,
  Text,
  Empty,
  Flex,
  Pressable,
  LoadButton,
  Icon,
  CustomRefreshControl,
} from '@/components';
import { useRefreshService, useToast } from '@/hooks';
import { StyleSheet, View } from 'react-native';
import request from '@/request';
import { useEffect, useState } from 'react';
import { FlashList } from '@shopify/flash-list';
import { Radio } from '@/components/Radio';
import { Fab } from 'native-base';
import { navigate } from '@/services/NavigationService';
import { useIsFocused } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

const Index = ({
  route,
  navigation,
}: NativeStackScreenProps<AppParamList, 'Address'>) => {
  const isFocused = useIsFocused();
  const [value, setValue] = useState('');
  const toast = useToast();
  const {
    data = [],
    allLoaded,
    onRefresh,
    onLoadMore,
    refreshing,
  } = useRefreshService<AddressInfo>(
    async params => {
      const res = await request.get<Page<AddressInfo>>(
        '/Include/alipay/data.aspx',
        {
          params: {
            apiname: 'getaddress',
            pageNum: params.PageIndex,
          },
        },
      );
      const result = await res.data;
      const defaultItem = result.dataList?.filter(item => item.IsDefault);
      setValue(defaultItem?.[0]?.AutoID + '');
      return result;
    },
    {
      manual: true,
    },
  );
  useEffect(() => {
    if (isFocused && route.params?.pageIsRefresh) {
      navigation.setParams({
        pageIsRefresh: false,
      });
      onRefresh();
    }
  }, [isFocused, navigation, onRefresh, route.params?.pageIsRefresh]);
  const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
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
  return (
    <Container backgroundColor="#f8f8f8">
      <Flex flex={1}>
        <Radio.Group name="address" value={value}>
          <Swipeable.Provider>
            <FlashList
              refreshControl={
                <CustomRefreshControl
                  onRefresh={onRefresh}
                  refreshing={refreshing}
                />
              }
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
                      style={{
                        paddingLeft: 15,
                      }}>
                      <Radio
                        size="x6"
                        value={item.AutoID + ''}
                        accessibilityLabel="raido"
                        isDisabled
                      />
                      <Box style={styles.wrapper} position="relative">
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
                      <Pressable
                        style={{
                          padding: 10,
                          marginRight: 10,
                        }}
                        onPress={() => {
                          console.log(123);
                          navigate('AddAddress', {
                            id: item.AutoID,
                          });
                        }}>
                        <Icon name="bianji" size={25} color="#333" />
                      </Pressable>
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
              onEndReached={onLoadMore}
              onEndReachedThreshold={0.3}
              ListEmptyComponent={
                data.length === 0 ? <Empty height={500} /> : null
              }
              estimatedItemSize={80}
            />
          </Swipeable.Provider>
        </Radio.Group>
        <Fab
          onPress={() => {
            navigate('AddAddress');
          }}
          renderInPortal={false}
          shadow={2}
          size="lg"
          icon={<Icon color="white" name="add" size={20} />}
        />
      </Flex>
    </Container>
  );
};

Index.displayName = 'Address';
export default Index;
