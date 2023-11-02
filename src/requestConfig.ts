import type { RequestOptions } from '@@/plugin-request/request';
// @ts-ignore
import type { RequestConfig } from '@umijs/max';
// 与后端约定的响应数据格式
interface ResponseStructure {
  success: boolean;
  data: any;
  errorCode?: number;
  errorMessage?: string;
}
// @ts-ignore
export const requestConfig: RequestConfig = {
  baseURL: 'http://localhost:8084',
  withCredentials: true,
  // 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      // 拦截请求配置，进行个性化处理。
      // const url = config?.url?.concat('?token = 123');
      // return { ...config, url };
      return config;
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    (response) => {
      // 拦截响应数据，进行个性化处理
      const { data } = response as unknown as ResponseStructure;

      if (data?.code !== 0) {
        throw new Error(data.message);
      }
      return response;
    },
  ],
};
