import axios from "axios";
import { getToken, removeToken } from "./token";
const request = axios.create({
  // 配置统一URL路径
  baseURL: "http://geek.itheima.net/v1_0/",
  timeout: 5000,
});

// 添加请求拦截器
// 在请求发送之前
request.interceptors.request.use(
  (config) => {
    // 获取到token 携带请求头
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
// 在响应返回客户端之前 做拦截 处理返回的数据
request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.dir(error);
    if (error.response.status === 401) {
      removeToken();
    }
    return Promise.reject(error);
  }
);

export { request };
