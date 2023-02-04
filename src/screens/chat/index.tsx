import { StyleSheet, Text, View } from 'react-native';
import React, { PropsWithChildren } from 'react';

type Props = {
  name: string;
};
const Chat: React.FC<PropsWithChildren<Props>> = () => {
  return (
    <View>
      <Text>chat</Text>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({});
