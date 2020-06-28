import axios from 'axios';
import store from '../store';
import router from '../router';
// import {
//   getToken
// } from '../libs/auth';
const service = axios.create({
  // 设置超时时间
  timeout: 120000,
  withCredentials: true
});
/**
 * 请求前拦截
 * 用于处理需要在请求前的操作 
 */
service.interceptors.request.use(config => {
  // 可以在请求先展示加载框

  config.headers['Content-Type'] = 'application/json; charset=UTF-8';


  // 请求头带token
  const authToken = store.state.user;
  if (authToken) {
    config.headers['token'] = authToken;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
service.interceptors.response.use(response => {
  // 请求响应后关闭加载框
  const responseCode = response.status;
  const code = response.data.code;
  // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
  // 否则的话抛出错误
  if (responseCode === 200) {
    switch (code) {
      case 207: // 401：未登录
        // 跳转登录页
        setTimeout(() => {
          router.replace({
            path: '/'
          });
        }, 1500);
    }
    return Promise.resolve(response);
  } else {
    return Promise.reject(response);
  }
}, (error) => {
  return Promise.reject(error);
});

// The server-side needs a full url to works
// if (process.server) {
//   service.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 8281}`;
// }
service.baseURL =
  process.env.NODE_ENV === 'production' ? 'http://test11.hctwallet.com' : '/admin';

export default service;
