import {
  Box,
  Button,
  Container,
  Flex,
  Form,
  Input,
  Switch,
  Text,
} from '@/components';
import { useCustomRequest, useToast } from '@/hooks';
import request from '@/request';
import { RouteProp, useRoute } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import PickerRegion from './picker';
import { goBack, setParams } from '@/services/NavigationService';
import { useEffect } from 'react';

const { useForm } = Form;
const Index = () => {
  const { params } = useRoute<RouteProp<AppParamList, 'AddAddress'>>();
  const [form] = useForm();
  const { showToast } = useToast();
  useEffect(() => {
    async function run() {
      const res = await (
        await request('/Include/alipay/data.aspx', {
          params: {
            apiname: 'getaddrdetails',
            adrid: params.id,
          },
        })
      ).data;
      form.setFieldsValue({
        uname: res.Consignee,
        mobile: res.ContactPhone,
        region: [res.Province, res.City, res.County] as unknown as string[],
        address: res.Address,
        code: res.PostCode,
        isDefault: res.IsDefault,
      });
    }
    if (params?.id) {
      run();
    }
  }, [form, params?.id]);
  const { runAsync, loading } = useCustomRequest(
    async values => {
      return (
        await request.post('/Include/alipay/data.aspx', {
          apiname: 'useraddress',
          action: !params?.id ? 'add' : 'modify',
          addrid: params?.id,
          consignee: values.uname,
          area: values.region.join(','),
          address: values.address,
          postcode: values.code,
          contactphone: values.mobile,
          isdefault: values.isDefault ? 1 : 0,
        })
      ).data;
    },
    {
      manual: true,
    },
  );

  const onFinish = (values: any) => {
    runAsync(values).then(res => {
      showToast(res.msg);
      if (res.ret === 'success') {
        setParams('Address', {
          pageIsRefresh: true,
        });
        goBack();
      }
    });
  };

  const onFinishFailed = () => {};
  return (
    <Container>
      <Box flex={1} padding="x4">
        <Box flex={1}>
          <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Form.FormItem
              name="uname"
              type="bottom"
              rules={[{ required: true, message: '请输入姓名' }]}>
              <Input
                labelStyle={styles.label}
                placeholder="请输入"
                label="姓名"
                labelPosition="left"
              />
            </Form.FormItem>
            <Form.FormItem
              name="mobile"
              type="bottom"
              rules={[
                { required: true, message: '请输入电话' },
                { pattern: /^1\d{10}$/, message: '请输入正确手机号码' },
              ]}>
              <Input
                keyboardType="numeric"
                placeholder="请输入"
                label="手机号码"
                labelPosition="left"
                labelStyle={styles.label}
              />
            </Form.FormItem>
            <Form.FormItem
              name="region"
              type="bottom"
              rules={[{ required: true, message: '请选择地区' }]}
              initialValue={[]}>
              <PickerRegion />
            </Form.FormItem>
            <Form.FormItem
              name="address"
              type="bottom"
              rules={[{ required: true, message: '请输入详细地址' }]}>
              <Input
                labelStyle={styles.label}
                placeholder="请输入"
                label="详细地址"
                labelPosition="left"
              />
            </Form.FormItem>
            <Form.FormItem name="code" type="bottom">
              <Input
                labelStyle={styles.label}
                placeholder="请输入"
                label="邮政编码"
                labelPosition="left"
              />
            </Form.FormItem>
            <Flex>
              <Text style={styles.label} variant="p1" color="gray500">
                默认
              </Text>
              <Form.FormItem name="isDefault">
                <Switch />
              </Form.FormItem>
            </Flex>
          </Form>
        </Box>
        <Button
          loading={loading}
          disabled={loading}
          title="提交"
          onPress={form.submit}
        />
      </Box>
    </Container>
  );
};

const styles = StyleSheet.create({
  label: {
    width: 60,
    textAlign: 'right',
    marginRight: 15,
  },
});

Index.displayName = 'AddAddress';

export default Index;
