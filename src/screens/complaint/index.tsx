import { Box, Button, Container, Form, Input, toast } from '@/components';
import { useCustomRequest } from '@/hooks';
import request from '@/request';

const { useForm } = Form;
const Index = () => {
  const [form] = useForm();
  const { runAsync, loading } = useCustomRequest(
    async values => {
      return (
        await request.post('/Include/alipay/data.aspx', {
          apiname: 'savefeedback',
          name: values.uname,
          mobile: values.mobile,
          orderno: values.orderNumber,
          content: values.content,
        })
      ).data;
    },
    {
      manual: true,
    },
  );
  const onFinish = (values: any) => {
    console.log(values);
    runAsync(values).then(res => {
      toast(res.msg);
    });
  };
  const onFinishFailed = () => {};
  return (
    <Container>
      <Box padding="x4">
        <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
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
            name="orderNumber"
            type="bottom"
            rules={[{ required: true, message: '请输入订单号' }]}>
            <Input placeholder="请输入" label="订单号" labelPosition="top" />
          </Form.FormItem>
          <Form.FormItem
            name="content"
            rules={[{ required: true, message: '问题或建议' }]}>
            <Input.TextArea
              limit={100}
              placeholder="请输入问题或建议"
              label="问题或建议"
            />
          </Form.FormItem>
          <Button
            loading={loading}
            disabled={loading}
            marginTop="x4"
            title="提交"
            onPress={form.submit}
          />
        </Form>
      </Box>
    </Container>
  );
};

export default Index;
