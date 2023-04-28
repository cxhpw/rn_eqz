import {
  Text,
  Pressable,
  Box,
  SButton as Button,
  Center,
  Flex,
  toast,
} from '@/components';
import { AppTheme } from '@/theme';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import { useEffect, useState } from 'react';
import { LayoutChangeEvent, StyleSheet, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import request from '@/request';
import { useCustomRequest } from '@/hooks';

type Props = {
  min: any;
  days: number;
  onLayout: (e: any) => void;
  onSubmit: (id: number) => void;
  onRangeDays: (n: any) => void;
  boundary?: boolean;
  startEnd?: string[];
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
  days,
  onLayout,
  onSubmit,
  onRangeDays,
  boundary = false,
  startEnd,
}) => {
  const [disabled, setDisabled] = useState<boolean>(true);
  const [show, setShow] = useState<boolean>(false);
  const { bottom } = useSafeAreaInsets();
  const { params } = useRoute<RouteProp<AppParamList, 'Calendar'>>();
  const [active, setActive] = useState(-1);
  const theme = useTheme<AppTheme>();
  const onLayoutChange = (e: LayoutChangeEvent) => {
    onLayout(e.nativeEvent.layout.height - bottom);
  };
  // 获取规格商品价格
  const { data, run } = useCustomRequest<ProductPrice>(
    async () =>
      (
        await request({
          url: '/Include/alipay/data.aspx',
          params: {
            apiname: 'getproductprice',
            start: startEnd ? startEnd[0] : '',
            end: startEnd ? startEnd[1] : '',
            pid: params.id,
            guige: params.spec,
          },
        })
      ).data,
    {
      refreshDeps: [startEnd],
      manual: true,
      onSuccess: () => {
        setShow(true);
      },
      onFinally: () => {
        console.log('完成');
      },
    },
  );
  useEffect(() => {
    if (days > 0) {
      setDisabled(days < min);
      if (days < min) {
        toast.error(`此商品至少起租${min}天`);
        setShow(false);
      } else {
        console.log('发生请求');
        run();
      }
    } else {
      setShow(false);
      setDisabled(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days, min]);

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
        <Flex flexDirection="row" alignItems="center">
          <Text color="gray500">租期：</Text>
          <Flex flexDirection="row">
            {params.leaseterm?.map((item, index) => (
              <Pressable
                onPress={() => {
                  setActive(index);
                  onRangeDays(item);
                }}
                key={item}
                style={[
                  styles.cell,
                  getActiveStyle(active === index && boundary),
                ]}>
                <Text
                  color={active === index && boundary ? 'white' : 'gray500'}>
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
              <Text style={styles.info_text_price}>
                ￥{data?.rentprice.toFixed(2)}
              </Text>
              共{data?.rentdays}天， 日租金
              <Text style={styles.info_text_price}>
                ￥{data?.dayprice.toFixed(2)}
              </Text>
            </Text>
          </Box>
        )}
      </Box>
      <Flex style={styles.actionSubmit} flexDirection="row">
        <Center flex={1}>
          <Text color="gray500">{`此商品至少起租${min}天`}</Text>
        </Center>
        <Button
          isDisabled={disabled}
          onPress={() => onSubmit(data!.autoid)}
          style={[
            styles.button,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              backgroundColor: disabled ? '#999' : theme.colors.primary50,
              borderColor: disabled ? '#999' : theme.colors.primary50,
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
