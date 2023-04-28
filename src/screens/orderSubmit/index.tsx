/* eslint-disable react-native/no-inline-styles */
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Container, Skeleton, Box } from '@/components';
import { ScrollView } from 'react-native';
import { useCustomRequest } from '@/hooks';
import request from '@/request';
import AddressControl, { Address } from './widget/addressControl';
import { useMemo, useState } from 'react';
import Description from './widget/description';
import PayMethodCard from './widget/payMethodCard';
import CellList from './widget/cellList';
import Guarantee from './widget/guarantee';
import Agreement from './widget/agreement';
import ActionSubmit from './widget/actionSubmit';
import { AppTheme } from '@/theme';
import { useTheme } from '@shopify/restyle';
import { isEmpty } from 'lodash-es';
import { toast } from '@/components/Toast';

const Index: React.FC<NativeStackScreenProps<AppParamList, 'OrderSubmit'>> = ({
  route,
}) => {
  const theme = useTheme<AppTheme>();
  const [isAgree, setIsAgree] = useState(false);
  const [isGuarantee, setIsGuarantee] = useState(false);
  const [isOpenDeposit, setIsOpenDeposit] = useState<boolean>(true);
  const [address, setAddress] = useState<Address | null>(null);
  const { data, loading } = useCustomRequest(
    async () => {
      let resp = await Promise.all([
        (
          await request<OrderSettlement>('/Include/alipay/data.aspx', {
            params: {
              apiname: 'getsettlement',
              autoid: route.params.id,
              type: 1,
              startime: route.params.start,
              endtime: route.params.end,
            },
          })
        ).data,
      ]);
      setAddress({
        id: resp[0].addrid,
        name: resp[0].consignee,
        phone: resp[0].phone,
        province: resp[0].province,
        city: resp[0].city,
        county: resp[0].county,
        address: resp[0].address,
      });
      return resp[0];
    },
    {
      manual: false,
    },
  );
  const total = useMemo(() => {
    if (!isEmpty(data)) {
      return data.deposit + data.rent + (isGuarantee ? data.insurance : 0);
    }
    return '计算中';
  }, [data, isGuarantee]);
  return (
    <Container>
      <Box
        flex={1}
        style={{
          backgroundColor: theme.theme === 'dark' ? 'black' : '#f9f9f9',
        }}>
        <ScrollView
          contentContainerStyle={{
            padding: 10,
            minHeight: '100%',
          }}>
          <Skeleton
            containerStyle={{
              flex: 1,
            }}
            styles={[
              {
                width: '100%',
                height: 90,
                marginBottom: 10,
              },
              {
                flexDirection: 'row',
                display: 'flex',
                marginBottom: 10,
                styles: [
                  {
                    width: 50,
                    height: 50,
                    marginRight: 10,
                  },
                  {
                    flex: 1,
                    height: '100%',
                  },
                ],
              },
              {
                width: '100%',
                height: 40,
                marginBottom: 10,
              },
              {
                width: '100%',
                height: 120,
                marginBottom: 10,
              },
              {
                width: '100%',
                flex: 1,
              },
            ]}
            loading={loading}>
            <AddressControl
              value={address}
              onChange={value => {
                setAddress(value);
              }}
            />
            <Description data={data} />
            <PayMethodCard
              value={isOpenDeposit}
              onChange={value => {
                setIsOpenDeposit(value);
              }}
            />
            <CellList data={data} value={isGuarantee} />
            <Guarantee
              article={data?.proinsuranceremark}
              value={isGuarantee}
              onChange={value => {
                setIsGuarantee(value);
              }}
            />
            <Agreement
              value={isAgree}
              article={[data?.delegationremark ?? '', data?.regagreement ?? '']}
              onChange={value => {
                setIsAgree(value);
              }}
            />
          </Skeleton>
        </ScrollView>
      </Box>
      <ActionSubmit
        total={total}
        onSubmit={() => {
          toast.loading('提交订单中');
          return request.post('/Include/alipay/data.aspx', {
            prid: data?.prid,
            startime: route.params.start,
            endtime: route.params.end,
            isinsurance: +isGuarantee,
            isyajin: +isOpenDeposit,
            isagree: +isAgree,
            deviceid: route.params.id,
            remark: '',
            apiname: 'zhimaorderconfirm',
            addrid: address?.id,
          });
        }}
        onSuccess={res => {
          toast.remove();
          if (res.ret === 'success') {
            toast.success(res.msg, {
              position: 'top-center',
            });
          } else {
            toast.error(res.msg, {
              position: 'top-center',
            });
          }
        }}
      />
      {/* <Toaster /> */}
    </Container>
  );
};
export default Index;
