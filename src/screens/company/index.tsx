import { Button, Container, Form, Input, Box } from '@/components';
import { useCustomRequest } from '@/hooks';
import request from '@/request';
import { Alert } from 'react-native';

const { useForm } = Form;
const onFinishFailed = () => {
  console.log(213);
};
const Index = () => {
  const [form] = useForm<{
    cname: string;
    uname: string;
    mobile: number;
    pname: string;
    number: number;
  }>();
  const { data, loading, run } = useCustomRequest(
    (values: any) => {
      console.log('提交', values);
      return request.post('/Include/alipay/data.aspx', {
        apiname: 'addcorporateleasing',
        Company: values.cname,
        Name: values.uname,
        Phone: values.mobile,
        ProductName: values.pname,
        ProductQuantity: values.number,
      });
    },
    {
      manual: true,
    },
  );
  const onFinish = (values: any) => {
    run(values);
  };
  return (
    <Container>
      <Box padding="x4">
        <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.FormItem
            name="cname"
            type="bottom"
            rules={[{ required: true, message: '请输入公司名称' }]}>
            <Input placeholder="请输入" label="公司名称" labelPosition="top" />
          </Form.FormItem>
          <Form.FormItem
            name="uname"
            type="bottom"
            rules={[{ required: true, message: '请输入姓名' }]}>
            <Input placeholder="请输入" label="姓名" labelPosition="top" />
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
              label="电话"
              labelPosition="top"
            />
          </Form.FormItem>
          <Form.FormItem
            name="pname"
            type="bottom"
            rules={[{ required: true, message: '请输入产品名称' }]}>
            <Input placeholder="请输入" label="产品名称" labelPosition="top" />
          </Form.FormItem>
          <Form.FormItem
            name="number"
            type="bottom"
            rules={[{ required: true, message: '请输入产品数量' }]}>
            <Input
              keyboardType="number-pad"
              placeholder="请输入"
              label="产品数量"
              labelPosition="top"
            />
          </Form.FormItem>
          <Button marginTop="x4" title="提交" onPress={form.submit} />
        </Form>
      </Box>
    </Container>
  );
};

Index.displayName = 'Company';

export default Index;
