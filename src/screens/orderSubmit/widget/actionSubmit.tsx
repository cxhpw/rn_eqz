/* eslint-disable react-native/no-inline-styles */
import { Center, Flex, Price, SButton, Text } from '@/components';
import { useCustomRequest } from '@/hooks';
import request from '@/request';
import { AppTheme } from '@/theme';
import { useTheme } from '@shopify/restyle';
import { memo } from 'react';
import { Alert, Linking } from 'react-native';

type Props = {
  total: number | string;
  onSubmit: () => Promise<any>;
  onSuccess: (d: any) => void;
};
const ActionSubmit: React.FC<Props> = ({ total, onSubmit, onSuccess }) => {
  const theme = useTheme<AppTheme>();
  const { runAsync, loading } = useCustomRequest(
    async () => {
      const res = await (await onSubmit()).data;
      return res;
    },
    {
      manual: true,
    },
  );
  const { runAsync: freePay } = useCustomRequest(
    async params => {
      console.log('参数', params);
      return await (
        await request({
          url: '/Include/alipay/data.aspx',
          method: 'POST',
          data: {
            apiname: 'alipayfreezepay',
            oid: params,
          },
        })
      ).data;
    },
    {
      manual: true,
    },
  );
  return (
    <Flex height={50} backgroundColor="primary_background">
      <Center
        flex={1}
        height="100%"
        justifyContent="flex-start"
        paddingLeft="x5">
        {total === '计算中' ? (
          <Text variant="h3" color="primary50">
            价格计算中
          </Text>
        ) : (
          <Price
            color={theme.colors.primary50}
            beforeText="合计："
            beforeStyle={{
              color: theme.theme === 'dark' ? 'white' : '#3D3D3D',
              fontSize: 12,
            }}
            style={{
              fontSize: 18,
            }}
            afterText=""
            money={total}
          />
        )}
      </Center>
      <SButton
        indicatorColor="#fff"
        isDisabled={total === '计算中'}
        onPress={() => {
          runAsync().then(res => {
            onSuccess(res);
            if (res.ret === 'success') {
              freePay(res.oid).then(resp => {
                Linking.canOpenURL('alipays://platformapi/startApp').then(
                  support => {
                    if (support) {
                      Linking.openURL(
                        `alipays://platformapi/startApp?appId=60000157&orderStr=${encodeURIComponent(
                          resp.myOrderStr,
                        )}&scheme=rntemplate://order_detail/${
                          res.oid
                        }&return_url=rntemplate://order_detail/${res.oid}`,
                      );
                    } else {
                      Alert.alert('请安装支付宝');
                    }
                  },
                );
              });
            }
          });
        }}
        isLoading={loading}
        isLoadingText="提交中"
        style={{
          height: '100%',
          borderRadius: 0,
          width: '100%',
          flex: 1,
          paddingHorizontal: 0,
          flexGrow: 0.7,
          fontSize: 14,
          lineHeight: 20,
          fontWeight: 'bold',
        }}>
        确认支付
      </SButton>
    </Flex>
  );
};

export default memo(ActionSubmit);
