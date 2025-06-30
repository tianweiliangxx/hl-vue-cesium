import axios from "axios";
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from "axios";

const service: AxiosInstance = axios.create({
    baseURL: '/mock/api',
})


// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 可在此添加 token 等 header 信息
    return config;
  },
  (error) => {
    // 处理请求错误
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // 可在此统一处理响应数据，如判断状态码
    const { data } = response
    // TODO: 这里可以判断是否报错
    if(data.code === 200) {
      return data.result
    }
  },
  (error) => {
    // 处理响应错误
    return Promise.reject(error);
  }
);

/**
 * 封装 POST 请求
 * @param url 请求地址
 * @param data 请求参数
 * @returns Promise<any>
 */
export function post<T>(url: string, data: any): Promise<T> {
    return service.post(url, data)
}

/**
 * 封装 GET 请求
 * @param url 请求地址
 * @param params 请求参数
 * @returns Promise<any>
 */
export function get<T>(url: string, params?: any): Promise<T> {
  return service.get(url, { ...params });
}