import { Container, Text, Spacer } from '@/components';
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
import { Box } from '@/components';
import { useStore } from '@/store';

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
  const { WeiXinTopImg, WeiXinTopColor, TagImg, ad1, ad2 } = useStore(
    state => state.appConfig,
  );
  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: WeiXinTopColor,
      },
      headerTitleStyle: {
        color: '#ffffff',
      },
    });
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
export default Index;
