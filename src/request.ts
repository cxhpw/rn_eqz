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
        '2E630E7DD01CCC1AEB3C3F69599BCAAAA61BBFD6A44D9A660F7B603144BFC07F1DDC0C939B6A6327051C3E9C6FF1ECE437B041C338C6EDAB';
    } else {
      config.params.customrdsession =
        '2E630E7DD01CCC1AEB3C3F69599BCAAAA61BBFD6A44D9A660F7B603144BFC07F1DDC0C939B6A6327051C3E9C6FF1ECE437B041C338C6EDAB';
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
