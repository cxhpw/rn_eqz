import { Box, Button, Center, Flex, HStack } from 'native-base';
import { Image, StyleSheet } from 'react-native';
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
import useDateRange from '@/hooks/useDateRange';
import request from '@/request';
import useSpecService from '../useSpecService';
import { RouteProp, useRoute } from '@react-navigation/native';

type Props = {
  data: ProductDetail | undefined;
  onMount: (e: any) => void;
};
const ActionSubmit: React.FC<Props> = ({ data, onMount }) => {
  const { params } = useRoute<RouteProp<AppParamList, 'Detail'>>();
  const theme = useTheme<AppTheme>();
  const { bottom } = useSafeAreaInsets();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { spec, defaultValue, onChange } = useSpecService(data?.guige);
  const { date, reCalcDate } = useDateRange(1);
  // 价格
  const { data: priceParameter, run } = useCustomRequest<ProductPrice>(
    async () =>
      (
        await request({
          url: '/Include/alipay/data.aspx',
          params: {
            apiname: 'getproductprice',
            start: date[0],
            end: date[1],
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
    if (defaultValue !== undefined) {
      run();
    }
  }, [defaultValue, reCalcDate, run]);

  console.log('ActionSubmit render');
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
          <Footer data={data?.productdata} />
          <Button
            onPress={() => {
              console.log('点击确定');
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
