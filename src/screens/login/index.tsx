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
import { ScrollView, StyleSheet } from 'react-native';
import { useState } from 'react';
import toast from '@/components/Toast';
import { goBack } from '@/services/NavigationService';
import { useAuthService } from './useAuthService';
import FastImage from 'react-native-fast-image';
import { KeyboardInsetsView } from '@sdcx/keyboard-insets';
import request from '@/request';

const { useForm } = Form;
const Index = () => {
  const { loading, handleFinish } = useAuthService();
  const [form] = useForm();
  const [isAgress, setIsAgress] = useState(false);
  const theme = useTheme<AppTheme>();
  const onFinish = async (values: any) => {
    if (!isAgress) {
      toast.error('请同意用户协议');
      return;
    }
    try {
      await handleFinish(values);
      // goBack();
    } catch (error) {
      console.log('登录错误消息', error);
    }
  };
  const onChange = (value: any) => {
    setIsAgress(value);
  };
  return (
    <Container isBttomTabsScreen>
      <KeyboardInsetsView style={{ flex: 1 }}>
        <FastImage
          style={styles.topBg}
          source={require('@/images/topbg.png')}
          resizeMode="stretch"
        />
        <FastImage
          style={styles.bottomBg}
          source={require('@/images/bottombg.png')}
          resizeMode="stretch"
        />
        <ScrollView
          scrollEnabled={false}
          keyboardDismissMode="on-drag"
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}>
          <Box width={300}>
            <Text fontSize={45} fontWeight="bold" mb="x6">
              登陆
            </Text>
            <Form form={form} onFinish={onFinish}>
              <Box mb="2.5">
                <Form.FormItem
                  name="name"
                  type="bottom"
                  rules={[
                    { required: true, message: '请输入电话' },
                    // { pattern: /^1\d{10}$/, message: '请输入正确手机号码' },
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
                        onBeforeSend={async () => {
                          try {
                            await form.validateFields(['name']);
                            return true;
                          } catch (error) {
                            console.error((error as any).errorFields[0].errors);
                          }
                          return false;
                        }}
                        onSend={() => {
                          request('/include/ajax/ajaxmethod', {
                            params: {
                              t: 'getfindpwdcode',
                              type: 'bymobile',
                              paramval: form.getFieldValue('name'),
                              temp: Math.random(),
                            },
                          });
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
                  size={16}
                  defaultChecked={isAgress}
                  checked={isAgress}
                  accessibilityLabel="是否同意用户协议"
                  onChange={onChange}
                  value={''}>
                  <Text color="white" ml="x2" variant="p2">
                    我同意
                  </Text>
                  <Text color="white" variant="p2">
                    《用户租赁与服务协议》
                  </Text>
                </Checkbox>
              </Flex>
            </Form>
            <Button
              marginTop="x10"
              title="提交"
              onPress={form.submit}
              loading={loading}
              disabled={loading}
            />
          </Box>
        </ScrollView>
      </KeyboardInsetsView>
    </Container>
  );
};

Index.displayName = 'Login';

const styles = StyleSheet.create({
  topBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 370,
    height: 598,
  },
  bottomBg: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 230,
    height: 90,
  },
});

export default Index;
