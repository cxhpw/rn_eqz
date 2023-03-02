import { Container, Button, Box } from '@/components';
import { Flex, Text } from 'native-base';
import { TextInput } from 'react-native';
import Form, { Field } from 'rc-field-form';

const Index = () => {
  const [form] = Form.useForm();
  return (
    <Container>
      <Form
        form={form}
        onFinish={() => {
          console.log('提交');
        }}>
        <Box padding="2.5" paddingTop="x10">
          <Flex mb={4}>
            <Text style={{ marginRight: 15, minWidth: 40 }}>企业名称</Text>
            <Field name="username">
              <TextInput
                keyboardType="numeric"
                style={{
                  height: 50,
                  fontSize: 16,
                  borderBottomColor: '#dfdfdf',
                  borderBottomWidth: 1,
                }}
                placeholder="请输入"
              />
            </Field>
          </Flex>
          {/* <Flex mb={4}>
            <Text style={{ marginRight: 15, minWidth: 40 }}>姓名</Text>
            <TextInput
              textContentType="password"
              style={{
                height: 50,
                fontSize: 16,
                borderBottomColor: '#dfdfdf',
                borderBottomWidth: 1,
              }}
              placeholder="请输入"
            />
          </Flex>
          <Flex mb={4}>
            <Text style={{ marginRight: 15, minWidth: 40 }}>电话</Text>
            <TextInput
              textContentType="password"
              style={{
                height: 50,
                fontSize: 16,
                borderBottomColor: '#dfdfdf',
                borderBottomWidth: 1,
              }}
              placeholder="请输入"
            />
          </Flex>
          <Flex mb={4}>
            <Text style={{ marginRight: 15, minWidth: 40 }}>产品名称</Text>
            <TextInput
              textContentType="password"
              style={{
                height: 50,
                fontSize: 16,
                borderBottomColor: '#dfdfdf',
                borderBottomWidth: 1,
              }}
              placeholder="请输入"
            />
          </Flex>
          <Flex mb={10}>
            <Text style={{ marginRight: 15, minWidth: 40 }}>产品数量</Text>
            <TextInput
              textContentType="password"
              style={{
                height: 50,
                fontSize: 16,
                borderBottomColor: '#dfdfdf',
                borderBottomWidth: 1,
              }}
              placeholder="请输入"
            />
          </Flex> */}
          <Button
            title="提交"
            onPress={() => {
              console.log(12);
            }}
          />
        </Box>
      </Form>
    </Container>
  );
};

export default Index;
