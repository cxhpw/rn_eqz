import { Container, Text, Spacer, Box } from '@/components';
import { ScrollView } from 'react-native';
import {
  SearchBar,
  BgImage,
  Banner,
  MidImage,
  Cate,
  BottomImage,
  Promo,
  Section,
  Waterfall,
} from './widget';
import React, { PropsWithChildren, useEffect } from 'react';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useStore } from '@/store';
import useCheckNetworkError from '@/hooks/useCheckNetworkError';

type Props = {} & BottomTabScreenProps<AppParamList>;

function Title({ children }: PropsWithChildren) {
  return (
    <Box marginBottom="x2">
      <Text variant="h1">{children}</Text>
    </Box>
  );
}
function Summary({ children }: PropsWithChildren) {
  return (
    <Box marginBottom="2.5">
      <Text variant="p2" color="gray300">
        {children}
      </Text>
    </Box>
  );
}
const Index: React.FC<Props> = ({ navigation }) => {
  useCheckNetworkError();
  const { WeiXinTopImg, WeiXinTopColor, TagImg, ad1, ad2 } = useStore(
    state => state.appConfig,
  );
  useEffect(() => {
    console.log('执行');
    navigation.setOptions({
      headerStyle: {
        backgroundColor: WeiXinTopColor,
      },
      headerTitleStyle: {
        color: '#ffffff',
      },
    });
    // if (isOnline) {
    //   navigation.setOptions({
    //     headerStyle: {
    //       backgroundColor: WeiXinTopColor,
    //     },
    //     headerTitleStyle: {
    //       color: '#ffffff',
    //     },
    //   });
    // } else {
    //   throw new Error(JSON.stringify({ type: 'network' }));
    // }
  }, [WeiXinTopColor, navigation]);
  return (
    <Container isBttomTabsScreen>
      <ScrollView style={{ flex: 1 }}>
        <BgImage url={WeiXinTopImg}>
          <SearchBar />
          <Banner />
          <MidImage url={TagImg} />
          <Cate />
          <BottomImage data={ad1?.adlist[0]} />
        </BgImage>
        <Spacer backgroundColor="#f8f8f8" />
        <Promo urls={ad2?.adlist}>
          <Title>{ad2?.adname}</Title>
          <Summary>{ad2?.addesc}</Summary>
        </Promo>
        <Spacer backgroundColor="#f8f8f8" />
        <Section type="top" hasSort renderTitle={<Title>人气数码</Title>} />
        <Spacer backgroundColor="#f8f8f8" />
        <Section
          type="new"
          hasPrice
          hasDisCount
          renderTitle={<Title>新奇好物</Title>}
        />
        <Spacer />
        <Waterfall>
          <Title>新奇好物</Title>
        </Waterfall>
      </ScrollView>
    </Container>
  );
};
Index.displayName = 'Home';
export default Index;
