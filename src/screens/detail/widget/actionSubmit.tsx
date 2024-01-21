import {
  Image,
  StyleSheet,
  InteractionManager,
  Linking,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { AppTheme } from '@/theme';
import { useTheme } from '@shopify/restyle';
import {
  Text,
  Pressable,
  helpers,
  Box,
  SButton as Button,
  Center,
  Flex,
} from '@/components';
import { navigate } from '@/services/NavigationService';
import Modal from 'react-native-modal';
import { memo, useEffect, useRef, useState } from 'react';
import Header from './modalContent/header';
import Body from './modalContent/Body';
import Footer from './modalContent/Footer';
import { useCustomRequest } from '@/hooks';
import request from '@/request';
import useSpecService from '../useSpecService';
import { RouteProp, useRoute } from '@react-navigation/native';
import { storageService } from '@/services/StorageService';
import useStackService from '@/stacks/useStackService';

type Props = {
  data: ProductDetail | undefined;
  onMount?: (e: any) => void;
};

const { scale } = helpers;
const ActionSubmit: React.FC<Props> = ({ data }) => {
  useStackService.useModel();
  const { signedIn } = storageService;
  const ref = useRef<Modal>();
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
    if (params.startEnd?.length || defaultValue !== undefined) {
      run();
    }
  }, [defaultValue, params.startEnd, run]);
  const navToCale = (name?: 'calendar') => {
    setIsModalVisible(false);
    // 安排一个任务在交互和动画完成之后执行
    InteractionManager.runAfterInteractions(() => {
      console.log('InteractionManager');
      if (name === 'calendar') {
        navigate('Calendar', {
          // 警告：函数值无法被序列化，但是功能能用
          // fn: (n: boolean) => setIsModalVisible(n),
          start: params.startEnd ? params.startEnd[0] : '',
          end: params.startEnd ? params.startEnd[1] : '',
          minDay: data?.productdata.MinDays,
          leaseterm: data?.leaseterm,
          id: params.id,
          spec: defaultValue,
        });
      } else {
        if (+!!params?.startEnd?.length === 0) {
          navToCale('calendar');
          return;
        }
        if (signedIn) {
          navigate('OrderSubmit', {
            id: priceParameter!.autoid,
            start: params?.startEnd?.[0] ?? '',
            end: params?.startEnd?.[1] ?? '',
          });
        } else {
          navigate('Login');
        }
      }
    });
  };
  return (
    <>
      <Flex
        style={[
          style.wrapper,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            bottom: bottom,
            backgroundColor: theme.theme === 'dark' ? '#232121' : '#fff',
          },
        ]}
        alignItems="center">
        <Flex flex={1} flexDirection="row">
          <Center flex={1}>
            <Pressable
              onPress={() => {
                navigate('Home');
              }}>
              <Center height="100%" flexDirection="column">
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
              <Center height="100%" flexDirection="column">
                <Image
                  style={style.icon}
                  source={require('@/images/chat.png')}
                />
                <Text variant="p3">客服</Text>
              </Center>
            </Pressable>
          </Center>
        </Flex>
        <Flex marginLeft="2.5">
          <Button
            onPress={() => setIsModalVisible(true)}
            // onPress={() => {
            //   Linking.canOpenURL('alipays://platformapi/startApp').then(
            //     support => {
            //       if (support) {
            //         const query = encodeURIComponent(`id=${params.id}`);
            //         Linking.openURL(
            //           `alipays://platformapi/startApp?appId=2018100561582465&page=/pages/detail/detail&query=${query}`,
            //         );
            //       } else {
            //         Alert.alert('请安装支付宝');
            //       }
            //     },
            //   );
            // }}
            style={[
              style.button,
              {
                backgroundColor: theme.colors.primary50,
              },
            ]}>
            选择租赁日期
          </Button>
        </Flex>
      </Flex>
      <Modal
        style={style.modal}
        testID={'modal'}
        ref={ref as any}
        isVisible={isModalVisible}
        onSwipeComplete={() => setIsModalVisible(false)}
        useNativeDriverForBackdrop
        onBackdropPress={() => setIsModalVisible(false)}
        hasBackdrop
        propagateSwipe={true}
        swipeDirection={['down']}>
        <Box style={[style.content, { paddingBottom: bottom }]}>
          <Header data={{ ...data, ...priceParameter }} />
          <Body data={spec} onChange={onChange} />
          <Footer
            data={data?.productdata}
            onClick={() => navToCale('calendar')}
          />
          <Button
            onPress={() => {
              navToCale();
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

export default memo(ActionSubmit);
