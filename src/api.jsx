import { useState, useEffect } from "react";
import axios from "axios";

// 创建axios实例
const api = axios.create({});
// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // 添加认证token
    config.headers.Authorization = "Bearer fake-token";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    // 直接返回响应数据
    return response.data;
  },
  (error) => {
    alert(error)
    return Promise.reject(error);
  }
);


export default api;
