import axios from 'axios';
import { Alert } from 'react-native';
import Config from 'react-native-config';
import { storageService, type StorageToken } from '@/services/StorageService';

const service = axios.create({
  baseURL: Config.API_URL,
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 60000, // request timeout
});

service.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    if (config.method === 'post') {
      config.data.customrdsession =
        'BE0FF6F7ACE5718ABE8D1401A9B01F282F3FD9E39E0292BA88E467A1ADC3FADAB4801C23E609322F6CB0CFFC2227B5BD10DFEBA69C4A88E2';
    } else {
      config.params.customrdsession =
        'BE0FF6F7ACE5718ABE8D1401A9B01F282F3FD9E39E0292BA88E467A1ADC3FADAB4801C23E609322F6CB0CFFC2227B5BD10DFEBA69C4A88E2';
    }
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
      // Alert.alert('提示', resopnse.data.msg, [
      //   {
      //     text: '确定',
      //   },
      // ]);
    }
    return resopnse;
  },
  error => {
    console.log('响应错误', error);
    return Promise.reject(error);
  },
);

export default service;
