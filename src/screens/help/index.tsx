import { Container, Tabs } from '@/components';
import { TabsScene } from '@/components/Tabs';
import { useCustomRequest } from '@/hooks';
import request from '@/request';
import TabView from './tabView';
import { StyleSheet } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { AppTheme } from '@/theme';

type Props = {};

const Help: React.FC<Props> = () => {
  const theme = useTheme<AppTheme>();
  const { data = [], loading } = useCustomRequest(async () => {
    const res: [] = (
      await request.get('/Include/alipay/data.aspx', {
        params: {
          apiname: 'getarticlerecommend',
          nid: 2,
        },
      })
    ).data;
    return res.map((item: any) => {
      return {
        title: item.NodeName,
        key: item.NID,
        scene: TabView,
        props: item.ContentList,
      };
    });
  });
  const styles = StyleSheet.create({
    tabBarStyle: {
      height: 50,
    },
    textStyle: {
      fontSize: 16,
      paddingHorizontal: 0,
      color: theme.theme === 'dark' ? 'white' : '#000',
    },
    indicatorStyle: {
      backgroundColor: theme.colors.primary50,
    },
  });
  return (
    <Container>
      {data.length > 0 ? (
        <Tabs
          lazy
          tabBarStyle={styles.tabBarStyle}
          textStyle={styles.textStyle}
          swipeEnabled={false}
          scenes={data as unknown as TabsScene[]}
        />
      ) : null}
    </Container>
  );
};

export default Help;
