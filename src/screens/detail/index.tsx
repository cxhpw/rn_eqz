import { View, Text } from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {} & NativeStackScreenProps<AppParamList, 'Detail'>;

const Detail: React.FC<Props> = () => {
  const { top, bottom } = useSafeAreaInsets();
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: bottom,
          paddingTop: top,
        }}>
        <Text>This is top text.</Text>
        <Text>This is bottom text.</Text>
      </View>
    </View>
  );
};

export default Detail;
