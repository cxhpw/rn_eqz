import { Text, Pressable } from '@/components';
import { navigate } from '@/services/NavigationService';
import { AppTheme } from '@/theme';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import { Box, Button, Center, Flex } from 'native-base';
import { useState } from 'react';
import { LayoutChangeEvent, StyleSheet, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  min: unknown;
  onLayout: (e: any) => void;
  onSubmit: () => void;
  onRangeDays: (n: any) => void;
};
function getActiveStyle(isActive: boolean): ViewStyle {
  return isActive
    ? {
        backgroundColor: '#38CEB1',
      }
    : {};
}
const ActionSubmit: React.FC<Props> = ({
  min,
  onLayout,
  onSubmit,
  onRangeDays,
}) => {
  const { bottom } = useSafeAreaInsets();
  const { params } = useRoute<RouteProp<AppParamList, 'Calendar'>>();
  const [show, setShow] = useState<boolean>(false);
  const [active, setActive] = useState(-1);
  const theme = useTheme<AppTheme>();
  const onLayoutChange = (e: LayoutChangeEvent) => {
    onLayout(e.nativeEvent.layout.height - bottom);
  };
  return (
    <Box
      onLayout={onLayoutChange}
      style={[
        styles.wrapper,
        {
          paddingBottom: bottom,
        },
      ]}>
      <Box style={styles.infoBox}>
        <Flex flexDir="row" alignItems="center">
          <Text color="gray500">租期：</Text>
          <Flex flexDir="row">
            {params.leaseterm?.map((item, index) => (
              <Pressable
                onPress={() => {
                  setActive(index);
                  onRangeDays(item);
                }}
                key={item}
                style={[styles.cell, getActiveStyle(active === index)]}>
                <Text color={active === index ? 'white' : 'gray500'}>
                  {item}天
                </Text>
              </Pressable>
            ))}
          </Flex>
        </Flex>
        {show && (
          <Box>
            <Text style={styles.info_text}>
              总租金
              <Text style={styles.info_text_price}>￥66.66</Text>
              共7天， 日租金<Text style={styles.info_text_price}>￥66.66</Text>
            </Text>
          </Box>
        )}
      </Box>
      <Flex style={styles.actionSubmit} flexDir="row">
        <Center flex={1}>
          <Text color="gray500">{`此商品至少起租${min}天`}</Text>
        </Center>
        <Button
          onPress={() => onSubmit()}
          style={[
            styles.button,
            {
              backgroundColor: theme.colors.primary50,
            },
          ]}>
          <Text color="white">确定</Text>
        </Button>
      </Flex>
    </Box>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderTopColor: '#dfdfdf',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.1,
    borderRadius: 20,
    shadowRadius: 20,
  },
  infoBox: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  button: {
    width: 150,
    height: 50,
    borderRadius: 0,
  },
  info_text: {
    fontSize: 14,
    marginTop: 10,
    color: '#333',
  },
  info_text_price: {
    color: '#E4393C',
  },
  cell: {
    paddingVertical: 4,
    paddingHorizontal: 15,
    borderColor: '#dfdfdf',
    borderRadius: 4,
    marginRight: 10,
    borderWidth: 1,
  },
  actionSubmit: {
    borderTopWidth: 1,
    borderTopColor: '#dfdfdf',
  },
});

export default ActionSubmit;
