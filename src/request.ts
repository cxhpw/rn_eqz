import axios from 'axios';
import { Alert } from 'react-native';
import Config from 'react-native-config';
import { storageService, type StorageToken } from '@/services/StorageService';
import { toast } from './components';

const messageQueue: any[] = [];
let isCall = false;

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
        'FB649CF78CECF35E22C0153783BA2DF1B83C57019EBF3D112E312EC3B3EAFB505A9F0328059B89B8DAE7EAF6FD65571058CD452C0C963CA6';
    } else {
      config.params.customrdsession =
        'FB649CF78CECF35E22C0153783BA2DF1B83C57019EBF3D112E312EC3B3EAFB505A9F0328059B89B8DAE7EAF6FD65571058CD452C0C963CA6';
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
    messageQueue.push(() => {
      toast.error(error.message, {
        onClose() {
          isCall = false;
          messageQueue.length = 0;
        },
      });
    });
    Promise.resolve().then(() => {
      setTimeout(() => {
        if (!isCall) {
          isCall = true;
          messageQueue.shift()();
        }
      });
    });
    return Promise.reject(error.message);
  },
);

export default service;
