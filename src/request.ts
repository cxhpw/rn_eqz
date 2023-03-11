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
        '9E5A87B5CAB704B31F6BAD3D4871D5FBD6418F81B2262F26204B67894E59F0F77AC0BAA72122B6E418932A8DDD2E2EC2B1503B92BF2960BD';
    } else {
      config.params.customrdsession =
        '9E5A87B5CAB704B31F6BAD3D4871D5FBD6418F81B2262F26204B67894E59F0F77AC0BAA72122B6E418932A8DDD2E2EC2B1503B92BF2960BD';
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
