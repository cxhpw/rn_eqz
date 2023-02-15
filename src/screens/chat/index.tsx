import { StyleSheet, Linking, TouchableOpacity, Alert } from 'react-native';
import React, { PropsWithChildren } from 'react';
import { Container, Text } from '@/components';
import { Box, Center } from 'native-base';
import { useAppSelector } from '@/hooks';
import FastImage from 'react-native-fast-image';

type Props = {
  name: string;
};

//@ts-ignore
function Card({ title, desc }) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        const url = `tel:13590101067`;
        Linking.canOpenURL(url)
          .then(supported => {
            if (!supported) {
              return Alert.alert('提示', '设备不支持该功能');
            }
            Linking.openURL(url);
          })
          .catch(error => {
            console.log(error);
            Alert.alert('提示', error.message);
          });
      }}>
      <Box py={7} px={6} mb={4} style={style.card}>
        <Box>
          <Text style={style.title}>{title}</Text>
        </Box>
        <Box>
          <Text style={style.desc}>{desc}</Text>
        </Box>
      </Box>
    </TouchableOpacity>
  );
}

const Chat: React.FC<PropsWithChildren<Props>> = () => {
  const { PrTLImg } = useAppSelector(state => state.appConfig);
  return (
    <Container isBttomTabsScreen>
      <Center>
        <FastImage
          style={style.Image}
          source={{
            uri: PrTLImg,
          }}
          resizeMode="cover"
        />
        <Text padding="x7" color="gray300">
          工作日9:00-21:30 非工作日9:00-18:00
        </Text>
        <Box px={6} width="full">
          <Card title="商家电话" desc="呼叫" />
          <Card title="平台电话" desc="呼叫" />
        </Box>
      </Center>
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
