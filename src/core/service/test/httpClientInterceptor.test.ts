import { AxiosRequestConfig } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Storage } from '@/shared/utils';
import memberApi from './handler.ts';
import TestClient from './httpInterceptorStub.ts';
interface obj {
  [key: string]: string;
}

jest.mock('@/shared/utils', () => {
  const storage: obj = {
    accessToken: 'accessToken',
  };

  return {
    ...jest.requireActual('@/shared/utils'),
    Storage: {
      getLocalStoraged: jest.fn((key: string) => {
        return storage[key] !== undefined ? storage[key] : '';
      }),
      setLocalStoraged: jest.fn((key: string, value: string) => (storage[key] = value)),
      removeLocalStoraged: jest.fn((key: string) => key),
    },
  };
});

describe('axios interceptor에 대한 테스트', () => {
  const http = new TestClient({
    baseURL: 'test',
    timeout: 15000,
    withCredentials: true,
  });

  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(http.getTestInstance());
  });

  afterEach(() => {
    mock.reset();
  });

  it('axios request interceptor success test', async () => {
    mock.onGet('/test').reply((config) => {
      return [200, config, config];
    });

    const res = await http.get<AxiosRequestConfig>('/test');
    expect(Storage.getLocalStoraged).toHaveBeenCalledTimes(1);
    expect(res.headers!.Authorization).toBe(`Bearer ${Storage.getLocalStoraged('accessToken')}`);
  });

  it('axios response interceptor error refresh success', async () => {
    const errorBody = { code: 'COMMON_008' };
    const token = await memberApi.postRefresh();
    mock.onGet('/test-error').reply((config) => {
      return [400, errorBody, config];
    });
    await http.get<AxiosRequestConfig>('/test-error');
    expect(Storage.setLocalStoraged).toHaveBeenCalledTimes(1);
    expect(Storage.getLocalStoraged('accessToken')).toBe(`${token.accessToken}`);
  });
});
