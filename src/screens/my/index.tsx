import {
  Container,
  Text,
  Pressable,
  Box,
  Center,
  confirm,
  SButton as Button,
  Flex,
} from '@/components';
import { BgWrap, Menu, MenuItem } from './widget';
import Image from 'react-native-fast-image';
import { storageService } from '@/services/StorageService';
import { ScrollView, StyleSheet, View } from 'react-native';
import { EOderStatus } from '@/enum';
import { navigate } from '@/services/NavigationService';
import { Waterfall } from './widget';
import useStackService from '@/stacks/useStackService';

type Props = {};

const ORDER_LIST = [
  {
    label: '待付款',
    url: require('@/images/order-1.png'),
    code: EOderStatus.待付款,
  },
  {
    label: '待发货',
    url: require('@/images/order-2.png'),
    code: EOderStatus.待发货,
  },
  {
    label: '待收货',
    url: require('@/images/order-3.png'),
    code: EOderStatus.待收货,
  },
  {
    label: '租用中',
    url: require('@/images/order-4.png'),
    code: EOderStatus.租用中,
  },
  {
    label: '待退款',
    url: require('@/images/order-5.png'),
    code: EOderStatus.待退款,
  },
];
const SERVICES_LIST = [
  {
    label: '续租买断',
    url: require('@/images/icon_1.png'),
    routeName: 'Chat',
  },
  // {
  //   label: '分销中心',
  //   url: require('@/images/icon_2.png'),
  //   routeName: '',
  // },
  {
    label: '地址管理',
    url: require('@/images/icon_3.png'),
    routeName: 'Address',
    params: {
      pageIsRefresh: true,
    },
  },
  {
    label: '投诉&建议',
    url: require('@/images/icon_4.png'),
    routeName: 'Complaint',
  },
  {
    label: '企业租赁',
    url: require('@/images/icon_5.png'),
    routeName: 'Company',
  },
  {
    label: '使用帮忙',
    url: require('@/images/icon_6.png'),
    routeName: 'Help',
  },
];

const My: React.FC<Props> = () => {
  const { signOut, signedIn, userInfo } = storageService;
  const { update } = useStackService.useModel();
  const avator = require('@/images/avator.png');
  return (
    <Container isBttomTabsScreen backgroundColor="#f8f8f8">
      <ScrollView style={{ flex: 1 }}>
        <BgWrap>
          <Box paddingHorizontal="2.5">
            <Pressable
              onPress={async () => {
                if (!signedIn) {
                  navigate('Login');
                }
              }}
              scalable={false}
              activeOpacity={1}>
              <Box flexDirection="row" paddingTop="x5" alignItems="center">
                <Flex flex={1}>
                  {signedIn ? (
                    <Image
                      style={style.avator}
                      source={{ uri: userInfo.HeaderPhoto }}
                    />
                  ) : (
                    <Image style={style.avator} source={avator} />
                  )}
                  <Box>
                    <Text color="white" variant="h1">
                      {signedIn ? userInfo.NickName : '登陆/注册'}
                    </Text>
                  </Box>
                </Flex>
                {signedIn ? (
                  <Box>
                    <Button
                      variant="Link"
                      colorScheme="white"
                      onPress={async () => {
                        try {
                          await confirm('是否退出登录');
                          signOut().then(() => {
                            update();
                          });
                        } catch (error) {
                          console.log('不退出');
                        }
                      }}>
                      退出登录
                    </Button>
                  </Box>
                ) : null}
              </Box>
            </Pressable>
            <Box flexDirection="row" marginTop="x5">
              <Center flex={1} flexDirection="column">
                <Text color="white" style={style.common}>
                  {(userInfo?.Amount ?? 0).toFixed(2)}
                </Text>
                <Text style={style.label} color="white">
                  余额(元)
                </Text>
              </Center>
              <Center flex={1} flexDirection="column">
                <Text color="white" style={style.common}>
                  {userInfo?.PingJiaNum ?? 0}
                </Text>
                <Text style={style.label} color="white">
                  商品评价
                </Text>
              </Center>
              <Center flex={1}>
                <Pressable>
                  <Center flexDirection="column">
                    <Image
                      style={[style.icon]}
                      source={require('@/images/kefu.png')}
                    />
                    <Text style={style.label} color="white">
                      在线客服
                    </Text>
                  </Center>
                </Pressable>
              </Center>
            </Box>
          </Box>
        </BgWrap>
        <Box style={style.card} marginTop="x4">
          <View>
            <Text style={style.title} color="black">
              我的订单
            </Text>
          </View>
          <Menu cols={5} data={ORDER_LIST}>
            {props => (
              <MenuItem
                onPress={e => {
                  navigate('Order', {
                    code: e.dataset.code,
                  });
                }}
                data={props}
                paddingVertical="x4"
                key={props.label}
                {...props}
              />
            )}
          </Menu>
        </Box>
        <Box style={style.card}>
          <View>
            <Text style={style.title} color="black">
              我的服务
            </Text>
          </View>
          <Menu data={SERVICES_LIST} cols={4}>
            {props => (
              <MenuItem
                onPress={e => {
                  const { routeName, label, params = {} } = e.dataset;
                  switch (label) {
                    default:
                      navigate(routeName, { ...params });
                  }
                }}
                data={props}
                paddingVertical="x4"
                key={props.label}
                {...props}
              />
            )}
          </Menu>
        </Box>
        <Waterfall />
      </ScrollView>
    </Container>
  );
};
const style = StyleSheet.create({
  avator: {
    width: 55,
    height: 55,
    borderRadius: 55,
    backgroundColor: '#ffffff',
    marginRight: 10,
  },
  common: {
    lineHeight: 25,
    fontWeight: 'bold',
    fontSize: 18,
  },
  icon: {
    width: 25,
    height: 25,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingTop: 15,
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    borderRadius: 6,
    marginBottom: 15,
  },
});
export default My;
