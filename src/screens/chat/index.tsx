import { StyleSheet, Linking, TouchableOpacity, Alert } from 'react-native';
import React, { memo, PropsWithChildren } from 'react';
import { Container, Text, Box, Center } from '@/components';
import FastImage from 'react-native-fast-image';
import { useStore } from '@/store';
import { useMount } from 'ahooks';

type Props = {
  name: string;
};

//@ts-ignore
const Card = memo<{ title: string; desc: string }>(({ title, desc }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => {
        const url = `tel:${desc}`;
        Linking.canOpenURL(url)
          .then(supported => {
            if (!supported) {
              return Alert.alert('提示', '设备不支持该功能');
            }
            Linking.openURL(url);
          })
          .catch(error => {
            Alert.alert('提示', error.message);
          });
      }}>
      <Box
        paddingVertical="x7"
        paddingHorizontal="x6"
        marginBottom="x4"
        style={style.card}>
        <Box>
          <Text style={style.title} color="black">
            {title}
          </Text>
        </Box>
        <Box>
          <Text style={style.desc}>呼叫: {desc}</Text>
        </Box>
      </Box>
    </TouchableOpacity>
  );
});

const Chat: React.FC<PropsWithChildren<Props>> = () => {
  const { PrTLImg } = useStore(state => state.appConfig);
  const [data, fetchService] = useStore(state => [
    state.serviceInfo,
    state.fetchService,
  ]);
  useMount(() => fetchService());
  return (
    <Container isBttomTabsScreen>
      <Box flex={1} mt="x10">
        <Center>
          <FastImage
            style={style.Image}
            source={{
              uri: PrTLImg,
            }}
            resizeMode="cover"
          />
        </Center>
        <Text padding="x7" color="gray300">
          {data?.ServiceTime}
        </Text>
        <Box paddingHorizontal="x6" flex={1}>
          <Card title="商家电话" desc={`${data?.BusinessPhone}`} />
          <Card title="平台电话" desc={`${data?.PlatformServices}`} />
        </Box>
      </Box>
    </Container>
  );
};

const style = StyleSheet.create({
  Image: {
    width: 75,
    height: 75,
    borderRadius: 75,
    marginVertical: 15,
  },
  title: {
    fontSize: 15,
  },
  desc: {
    fontSize: 12,
    color: '#999999',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
});

export default Chat;
