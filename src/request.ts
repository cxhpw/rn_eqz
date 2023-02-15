import axios from 'axios';
import Config from 'react-native-config';

const service = axios.create({
  baseURL: Config.API_URL,
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 60000, // request timeout
});

export default service;
