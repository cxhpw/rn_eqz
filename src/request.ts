import axios from 'axios';
import { Alert } from 'react-native';
import Config from 'react-native-config';

const service = axios.create({
  baseURL: Config.API_URL,
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 60000, // request timeout
});

service.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    return config;
  },
  error => {
    console.log('请求错误', error);
    return Promise.reject(error);
  },
);

service.interceptors.response.use(
  resopnse => {
    if (resopnse.data.ret === 'fail') {
      Alert.alert('提示', resopnse.data.msg, [
        {
          text: '确定',
        },
      ]);
    }
    return resopnse;
  },
  error => {
    console.log('响应错误', error);
    return Promise.reject(error);
  },
);

export default service;
