import { AxiosRequestConfig, AxiosError, isAxiosError } from 'axios';
import { ERRORCODE, TOKEN_KEY } from '@/shared/constants';
import { Storage } from '@/shared/utils';
import axiosClient from '../axiosClient';
import type { ResponseData } from '../types';
import memberApi from '@/core/service/test/handler';

export default class TestClient extends axiosClient {
  constructor(client: AxiosRequestConfig) {
    super(client);
    this.setRequestInterceptors();
    this.setResponseInterceptors();
  }

  private setRequestInterceptors() {
    this.getTestInstance().interceptors.request.use(
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

  private setResponseInterceptors() {
    this.getTestInstance().interceptors.response.use(
      (response) => response,
      async (error: AxiosError<ResponseData>) => {
        if (!isAxiosError(error)) {
          return Promise.reject(error);
        }

        const { code } = error.response!.data;

        const { config } = error;

        switch (code) {
          case ERRORCODE.COMMON_008: {
            const data = await memberApi.postRefresh();

            if (data !== null && data.accessToken) {
              config?.headers.set('Authorization', `Bearer ${data.accessToken}`);
              Storage.setLocalStoraged(TOKEN_KEY, data.accessToken);
            }

            return config;
          }
        }

        return Promise.reject(error.response);
      }
    );
  }
}
