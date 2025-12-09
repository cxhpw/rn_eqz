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
    if (config.method === 'post') {
      config.data.customrdsession =
        'B61CEE5B4F88C57353F8F0F9CB689177C03A29E5E9261234DD35250BD39FD9D9409D73A11ED0151F4A8C765762CA30C31009EE87EDBB4C19';
    } else {
      config.params.customrdsession =
        'B61CEE5B4F88C57353F8F0F9CB689177C03A29E5E9261234DD35250BD39FD9D9409D73A11ED0151F4A8C765762CA30C31009EE87EDBB4C19';
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
    console.error('响应错误', error);
    return Promise.reject(error);
  },
);

export default service;
