

// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
import {RequestConfig} from "@@/plugin-request/request";
import {AxiosResponse} from "axios";
import {history} from 'umi';
import {message, notification} from "antd";
const loginPath = '/login';
export async function getInitialState(): Promise<{ name: string }> {
  return { name: '@umijs/max' };
}

const authHeaderInterceptor = (url: string, options: RequestConfig) => {
  const accessToken = sessionStorage.getItem('access_token');
  const  authHeader = {
    Authorization: 'Basic d2ViQXBwOjEyMzQ1Ng=='
  };
  if (accessToken && !url.includes('/api-uaa/oauth/token')) {
    authHeader.Authorization = `Bearer ${accessToken}`;
  }
  const newHeaders = { ...options.headers, ...authHeader };
  return {
    url,
    options: { ...options, interceptors: true, headers: newHeaders },
  };
}

const unauthorizedInterceptor = (response: AxiosResponse) => {
  if (response.status === 401) {
    const { location } = history;
    // 如果没有登录，重定向到 login
    if (location.pathname !== loginPath) {
      history.push(loginPath);
    }
  }
  return response;
}
enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}

interface ResponseStructure {
  success: boolean;
  data: any;
  errorCode?: number;
  errorMessage?: string;
  showType?: ErrorShowType;
}

export const request: RequestConfig = {
  requestInterceptors: [authHeaderInterceptor],
  responseInterceptors: [unauthorizedInterceptor],
  errorConfig: {
    // 错误抛出
    errorThrower: (res) => {
      const { success, data, errorCode, errorMessage, showType } =
        res as unknown as ResponseStructure;
      if (!success) {
        const error: any = new Error(errorMessage);
        error.name = 'BizError';
        error.info = { errorCode, errorMessage, showType, data };
        throw error; // 抛出自制的错误
      }
    },
    // 错误接收及处理
    errorHandler: (error: any, opts: any) => {
      if (opts?.skipErrorHandler) throw error;
      // 我们的 errorThrower 抛出的错误。
      if (error.name === 'BizError') {
        const errorInfo: ResponseStructure | undefined = error.info;
        if (errorInfo) {
          const { errorMessage, errorCode } = errorInfo;
          switch (errorInfo.showType) {
            case ErrorShowType.SILENT:
              // do nothing
              break;
            case ErrorShowType.WARN_MESSAGE:
              message.warning(errorMessage);
              break;
            case ErrorShowType.ERROR_MESSAGE:
              message.error(errorMessage);
              break;
            case ErrorShowType.NOTIFICATION:
              notification.open({
                description: errorMessage,
                message: errorCode,
              });
              break;
            case ErrorShowType.REDIRECT:
              // TODO: redirect
              break;
            default:
              message.error(errorMessage);
          }
        }
      } else if (error.response) {
        // Axios 的错误
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        message.error(`Response status:${error.response.status}`);
      } else if (error.request) {
        // 请求已经成功发起，但没有收到响应
        // \`error.request\` 在浏览器中是 XMLHttpRequest 的实例，
        // 而在node.js中是 http.ClientRequest 的实例
        message.error('None response! Please retry.');
      } else {
        // 发送请求时出了点问题
        message.error('Request error, please retry.');
      }
    },
  },
}

