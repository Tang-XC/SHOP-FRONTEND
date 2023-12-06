import axios,{AxiosResponse,InternalAxiosRequestConfig,AxiosInstance,AxiosError} from 'axios';
import { message } from 'antd';
interface ResponseData {
  code: number;
  data: any;
  message: string;
}
const baseUrl:string = import.meta.env.VITE_BASE_URL;
const service:AxiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});
service.interceptors.request.use(
  (config:InternalAxiosRequestConfig) => {
    return config;
  },
  (error:AxiosError) => {
    return Promise.reject(error);
  }
);
service.interceptors.response.use(
  (response:AxiosResponse) => {
    return response.data;
  },
  (error:AxiosError) => {
    handleNetworkError(error);
    return Promise.reject(error);
  }
);
const handleNetworkError = (error:AxiosError):void => {
  let errMessage:string = '未知错误';
  let response:AxiosResponse | undefined = error.response;
  let resMessage:ResponseData | undefined = undefined;
  if(response){
    resMessage = response.data
  }
  if (error.response) {
    const errStatus:number = error.response.status;
    if (errStatus) {
      switch (errStatus) {
        case 400:
          errMessage = '错误的请求';
          break;
        case 401:
          errMessage = '未授权，请重新登录';
          break;
        case 403:
          errMessage = '拒绝访问';
          break;
        case 404:
          errMessage = '请求错误,未找到该资源';
          break;
        case 405:
          errMessage = '请求方法未允许';
          break;
        case 408:
          errMessage = '请求超时';
          break;
        case 500:
          errMessage = '服务器端出错';
          break;
        case 501:
          errMessage = '网络未实现';
          break;
        case 502:
          errMessage = '网络错误';
          break;
        case 503:
          errMessage = '服务不可用';
          break;
        case 504:
          errMessage = '网络超时';
          break;
        case 505:
          errMessage = 'http版本不支持该请求';
          break;
        default:
          errMessage = `其他连接错误 --${errStatus}`;
      }
    } else {
      errMessage = '网络错误';
    }
  } else {
    switch (error.code) {
      case 'ECONNABORTED':
        errMessage = '请求超时';
        break;
      default:
        errMessage = `其他连接错误 --${error.code}`;
    }
  }
  message.error(resMessage === undefined ? errMessage : resMessage.message);
};
export default service;