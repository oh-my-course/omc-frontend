import { AxiosRequestConfig, AxiosError } from 'axios';
// import { ERRORCODE, TOKEN_KEY, USER_INFO_KEY } from '@/shared/constants';
import { TOKEN_KEY } from '@/shared/constants';
import { Storage } from '@/shared/utils';
import axiosClient from '../axiosClient';
// import type { ResponseData } from '../types';
// import { memberApi } from '@/features/member/service';

class TestClient {
  public test: axiosClient;

  constructor(client: AxiosRequestConfig) {
    this.test = new axiosClient(client);
    this.setRequestInterceptors();
    // this.setResponseInterceptors();
  }

  private setRequestInterceptors() {
    this.test.getTestInstance().interceptors.request.use(
      (config) => {
        const token = Storage.getLocalStoraged(TOKEN_KEY);

        if (token?.trim().length) {
          config.headers.set('Authorization', `Bearer ${token}`);
        }

        return config;
      },
      (error: AxiosError) => Promise.reject(error.response)
    );
  }

  // private setResponseInterceptors() {
  //   this.test.getTestInstance().interceptors.response.use(
  //     (response) => response,
  //     async (error: AxiosError<ResponseData>) => {
  //       if (!isAxiosError(error)) {
  //         return Promise.reject(error);
  //       }

  //       const { code } = error.response!.data;

  //       const { config } = error;

  //       switch (code) {
  //         case ERRORCODE.COMMON_008: {
  //           try {
  //             const data = await memberApi.postRefresh();

  //             if (data !== null && data.accessToken) {
  //               config?.headers.set('Authorization', `Bearer ${data.accessToken}`);
  //               Storage.setLocalStoraged(TOKEN_KEY, data.accessToken);
  //             }

  //             return this.test.getTestInstance()(config!);
  //           } catch (error) {
  //             Storage.removeLocalStoraged(TOKEN_KEY);
  //             Storage.removeLocalStoraged(USER_INFO_KEY);
  //             window.location.href = '/login';
  //           }
  //           break;
  //         }
  //         case ERRORCODE.COMMON_012:
  //         case ERRORCODE.COMMON_013: {
  //           Storage.removeLocalStoraged(TOKEN_KEY);
  //           Storage.removeLocalStoraged(USER_INFO_KEY);
  //           window.location.href = '/login';
  //           break;
  //         }
  //       }

  //       return Promise.reject(error.response);
  //     }
  //   );
  // }
}

export default new TestClient({
  baseURL: 'test',
  timeout: 15000,
  withCredentials: true,
});
