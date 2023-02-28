import { Box, Button, Center, Flex, HStack } from 'native-base';
import {
  Image,
  StyleSheet,
  Linking,
  Alert,
  InteractionManager,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { AppTheme } from '@/theme';
import { useTheme } from '@shopify/restyle';
import { scale } from '@/helper/normalize';
import { Text, Pressable } from '@/components';
import { navigate } from '@/services/NavigationService';
import Modal from 'react-native-modal';
import { useEffect, useState } from 'react';
import Header from './modalContent/header';
import Body from './modalContent/Body';
import Footer from './modalContent/Footer';
import { useCustomRequest } from '@/hooks';
import request from '@/request';
import useSpecService from '../useSpecService';
import { RouteProp, useRoute } from '@react-navigation/native';

type Props = {
  data: ProductDetail | undefined;
  onMount?: (e: any) => void;
};
const ActionSubmit: React.FC<Props> = ({ data, onMount }) => {
  const { params } = useRoute<RouteProp<AppParamList, 'Detail'>>();
  const theme = useTheme<AppTheme>();
  const { bottom } = useSafeAreaInsets();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { spec, defaultValue, onChange } = useSpecService(data?.guige);
  // 获取规格商品价格
  const { data: priceParameter, run } = useCustomRequest<ProductPrice>(
    async () =>
      (
        await request({
          url: '/Include/alipay/data.aspx',
          params: {
            apiname: 'getproductprice',
            start: params.startEnd ? params.startEnd[0] : '',
            end: params.startEnd ? params.startEnd[1] : '',
            pid: params.id,
            guige: defaultValue,
          },
        })
      ).data,
    {
      refreshDeps: [defaultValue],
      manual: true,
    },
  );

  useEffect(() => {
    console.log('重新获取规格商品价格');
    if (params.startEnd?.length || defaultValue !== undefined) {
      run();
    }
  }, [defaultValue, params.startEnd, run]);

  return (
    <>
      <HStack
        style={[
          style.wrapper,
          {
            bottom: bottom,
            backgroundColor: theme.theme === 'dark' ? '#232121' : '#fff',
          },
        ]}
        alignItems="center">
        <Flex flex={1} flexDir="row">
          <Center flex={1}>
            <Pressable
              onPress={() => {
                navigate('Home');
              }}>
              <Center height="full" flex={1}>
                <Image
                  style={style.icon}
                  source={require('@/images/index.png')}
                />
                <Text variant="p3">首页</Text>
              </Center>
            </Pressable>
          </Center>
          <Center flex={1}>
            <Pressable
              onPress={() => {
                navigate('Chat');
              }}>
              <Center height="full" flex={1}>
                <Image
                  style={style.icon}
                  source={require('@/images/chat.png')}
                />
                <Text variant="p3">客服</Text>
              </Center>
            </Pressable>
          </Center>
        </Flex>
        <Flex ml={2.5}>
          <Button
            onPress={() => setIsModalVisible(true)}
            style={[
              style.button,
              {
                backgroundColor: theme.colors.primary50,
              },
            ]}>
            选择租赁日期
          </Button>
        </Flex>
      </HStack>
      <Modal
        style={style.modal}
        testID={'modal'}
        isVisible={isModalVisible}
        onSwipeComplete={() => setIsModalVisible(false)}
        useNativeDriverForBackdrop
        onBackdropPress={() => setIsModalVisible(false)}
        propagateSwipe={true}
        swipeDirection={['down']}>
        <Box style={[style.content, { paddingBottom: bottom }]}>
          <Header data={{ ...data, ...priceParameter }} />
          <Body data={spec} onChange={onChange} />
          <Footer
            data={data?.productdata}
            onClick={() => {
              setIsModalVisible(false);
              InteractionManager.runAfterInteractions(() => {
                navigate('Calendar', {
                  // 警告：函数值无法被序列化，但是功能能用
                  fn: (n: boolean) => setIsModalVisible(n),
                  start: params.startEnd ? params.startEnd[0] : '',
                  end: params.startEnd ? params.startEnd[1] : '',
                  minDay: data?.productdata.MinDays,
                  leaseterm: data?.leaseterm,
                  id: params.id,
                  spec: defaultValue,
                });
              });
            }}
          />
          <Button
            onPress={() => {
              console.log('点击确定');
              Linking.canOpenURL('alipays').then(support => {
                if (support) {
                  Linking.openURL(
                    'alipays://platformapi/startApp?appId=2018100561582465&url=/pages/recommendation/recommendation',
                  );
                } else {
                  Alert.alert('请安装支付宝');
                }
              });
              // alipays://platformapi/startApp?appId=60000157
            }}
            style={[style.submit, { backgroundColor: theme.colors.primary50 }]}>
            确定
          </Button>
        </Box>
      </Modal>
    </>
  );
};

const style = StyleSheet.create({
  wrapper: {
    height: scale(50),
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopColor: '#dfdfdf',
    borderTopWidth: 1,
  },
  button: {
    height: 45,
    borderRadius: 45,
    width: 250,
    fontSize: 15,
    fontWeight: '500',
  },
  icon: {
    width: 25,
    height: 25,
    marginBottom: 5,
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    height: '70%',
    width: '100%',
    margin: 0,
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
  submit: {
    borderRadius: 0,
    height: 45,
  },
});

export default ActionSubmit;
