/* eslint-disable react-native/no-inline-styles */
import {
  Box,
  Container,
  Form,
  Input,
  Icon,
  Text,
  Button,
  Checkbox,
  Flex,
  Sms,
} from '@/components';
import { AppTheme } from '@/theme';
import { useTheme } from '@shopify/restyle';
import { ImageBackground, StyleSheet } from 'react-native';
import { scale } from '@/components/helpers/normalize';
import { useState } from 'react';
import toast from '@/components/Toast';

const { useForm } = Form;
const Index = () => {
  const [form] = useForm();
  const [isAgress, setIsAgress] = useState(false);
  const theme = useTheme<AppTheme>();
  const onFinish = (value: any) => {
    console.log(value);
    if (!isAgress) {
      toast.error('请同意用户协议');
    }
  };
  const onChange = (value: any) => {
    setIsAgress(true);
    console.log(value);
  };
  return (
    <Container hasHeader={false}>
      <ImageBackground
        style={styles.topBg}
        source={require('@/images/topbg.png')}
        resizeMode="stretch"
      />
      <ImageBackground
        style={styles.bottomBg}
        source={require('@/images/bottombg.png')}
        resizeMode="stretch"
      />
      <Box
        flex={1}
        alignItems="center"
        justifyContent="center"
        mb="x10"
        zIndex="19">
        <Box width={300}>
          <Text fontSize={45} fontWeight="bold" mb="x6">
            登陆
          </Text>
          <Form form={form} onFinish={onFinish}>
            <Box mb="2.5">
              <Form.FormItem
                name="phoneNumber"
                type="bottom"
                rules={[
                  { required: true, message: '请输入电话' },
                  { pattern: /^1\d{10}$/, message: '请输入正确手机号码' },
                ]}>
                <Input
                  inputType="input"
                  placeholder="请输入手机号码"
                  placeholderTextColor="#fff"
                  inputStyle={{
                    height: 50,
                  }}
                  style={{
                    borderColor: '#000',
                    borderBottomWidth: 1,
                    borderRadius: 0,
                  }}
                  leftIcon={
                    <Icon name="phone" size={20} color={theme.colors.text} />
                  }
                />
              </Form.FormItem>
            </Box>
            <Box mb="2.5">
              <Form.FormItem
                type="bottom"
                name="password"
                rules={[{ required: true, message: '请输入验证码' }]}>
                <Input
                  keyboardType="number-pad"
                  placeholder="请输入验证码"
                  placeholderTextColor="#fff"
                  inputStyle={{
                    height: 50,
                  }}
                  style={{
                    borderColor: '#000',
                    borderBottomWidth: 1,
                    borderRadius: 0,
                  }}
                  leftIcon={
                    <Icon
                      name="yirenzheng"
                      size={20}
                      color={theme.colors.text}
                    />
                  }
                  rightIcon={
                    <Sms
                      color="#fff"
                      disabledColor="#999"
                      onSend={() => {
                        console.log('发送验证码');
                      }}
                      onEnd={() => {
                        console.log('倒计时结束');
                      }}
                    />
                  }
                />
              </Form.FormItem>
            </Box>
            <Flex alignItems="center">
              <Checkbox
                value="cxh"
                size={16}
                defaultChecked={isAgress}
                checked={isAgress}
                accessibilityLabel="是否同意用户协议"
                onChange={onChange}>
                <Text color="white" ml="x2" variant="p2">
                  我同意
                </Text>
                <Text color="white" variant="p2">
                  《用户租赁与服务协议》
                </Text>
              </Checkbox>
            </Flex>
          </Form>
          <Button marginTop="x10" title="提交" onPress={form.submit} />
        </Box>
      </Box>
    </Container>
  );
};

Index.displayName = 'Login';

const styles = StyleSheet.create({
  topBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: scale(370),
    height: scale(598),
  },
  bottomBg: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: scale(230),
    height: scale(90),
  },
});

export default Index;
