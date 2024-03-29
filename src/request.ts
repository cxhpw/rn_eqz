import axios from 'axios';
import Config from 'react-native-config';

const service = axios.create({
  baseURL: Config.API_URL,
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 60000, // request timeout
});

service.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    // if (config.method === 'post') {
    //   config.data.customrdsession =
    //     '034CEF83515F7A1108C5244A3F35714F8B33F7CBD449A0BBF921DC791B0251FCC9CC066866B20E258ECCB034EC98B7DB17D3660453D035D0';
    // } else {
    //   config.params.customrdsession =
    //     '034CEF83515F7A1108C5244A3F35714F8B33F7CBD449A0BBF921DC791B0251FCC9CC066866B20E258ECCB034EC98B7DB17D3660453D035D0';
    // }
    return config;
  },
  error => {
    console.log('请求错误', error);
    return Promise.reject(error);
  },
);

service.interceptors.response.use(
  resopnse => {
    // if (resopnse.data.ret === 'fail') {
    //   Alert.alert('提示', resopnse.data.msg, [
    //     {
    //       text: '确定',
    //     },
    //   ]);
    // }
    return resopnse;
  },
  error => {
    console.error('axios', error);
    // messageQueue.push(() => {
    //   toast.error(`[${error.name}:${error.message}]`, {
    //     onClose() {
    //       isCall = false;
    //       messageQueue.length = 0;
    //     },
    //   });
    // });
    // Promise.resolve().then(() => {
    //   setTimeout(() => {
    //     if (!isCall) {
    //       isCall = true;
    //       messageQueue.shift()();
    //     }
    //   });
    // });
    return Promise.reject(error.message);
  },
);

export default service;
