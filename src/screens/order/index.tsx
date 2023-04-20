import { useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Container, Tabs } from '@/components';
import type { TabsScene } from '@/components/Tabs';
import { EOderStatus } from '@/enum';
import { StyleSheet } from 'react-native';
import { useMemo } from 'react';
import { useTheme } from '@shopify/restyle';
import { AppTheme } from '@/theme';
import TView from './widget/tabView';

const Order = () => {
  const theme = useTheme<AppTheme>();
  const { params } =
    useRoute<NativeStackScreenProps<AppParamList, 'Order'>['route']>();
  const data = useMemo(() => {
    return Object.keys(EOderStatus).map<TabsScene>(
      //@ts-ignore
      (item: keyof typeof EOderStatus) => {
        return {
          title: item,
          key: EOderStatus[item],
          scene: TView,
        };
      },
    );
  }, []);
  const styles = StyleSheet.create({
    tabBarStyle: {
      height: 44,
    },
    textStyle: {
      fontSize: 16,
      paddingHorizontal: 15,
      color: theme.theme === 'dark' ? 'white' : '#000',
    },
    indicatorStyle: {
      backgroundColor: theme.colors.primary50,
    },
  });
  return (
    <Container>
      <Tabs
        lazy
        activeTab={params.code as any}
        scenes={data as unknown as TabsScene[]}
        tabBarStyle={styles.tabBarStyle}
        textStyle={styles.textStyle}
        indicatorStyle={styles.indicatorStyle}
        swipeEnabled={true}
      />
    </Container>
  );
};
Order.displayName = 'Order';

export default Order;
