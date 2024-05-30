import { AxiosRequestConfig } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Storage } from '@/shared/utils';
import TestClient from './httpInterceptorStub.ts';

interface obj {
  [key: string]: string;
}

jest.mock('@/shared/utils', () => {
  return {
    ...jest.requireActual('@/shared/utils'),
    Storage: {
      getLocalStoraged: jest.fn((key: string) => {
        const storage: obj = {
          accessToken: 'accessToken',
        };

        return storage[key] !== undefined ? storage[key] : '';
      }),
      setLocalStoraged: jest.fn((key: string, value: string) => ({ key, value })),
      removeLocalStoraged: jest.fn((key: string) => key),
    },
  };
});

// memberApi mock할당
// 해당 스코프에 있어야지 인식을 한다.
// stub를 생성하여 mock함수 제거할수 있다.

// jest.mock('@/features/member/service', () => {
//   const postRefresh = jest.fn(() => {
//     return new Promise((resolve) => resolve({ data: { accessToken: '123' } }));
//   });

//   return {
//     ...jest.requireActual('@/features/member/service'),
//     memberApi: {
//       ...jest.requireActual('@/features/member/service/handler'),
//       postRefresh,
//     },
//   };
// });

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

    // 토큰이 있을때
    const res = await http.get<AxiosRequestConfig>('/test');
    expect(Storage.getLocalStoraged).toHaveBeenCalledTimes(1);
    expect(res.headers!.Authorization).toBe('Bearer accessToken');
  });

  // stub 존재 이유
  // 재요청을 보내면 끝나질 않는다
  // 항상 에러가 터지기 때문에
  // 이거를 극복하기 위해서는 한번 보내면 에러가 터지지 않도록 설정을 해줘야한다.

  it('axios response interceptor error refresh success', async () => {
    const errorBody = { code: 'COMMON_008' };
    mock.onGet('/test-error').reply((config) => {
      return [500, errorBody, config];
    });

    const res = await http.get<AxiosRequestConfig>('/test-error');
    expect(Storage.setLocalStoraged).toHaveBeenCalledTimes(1);
    expect(res!.headers?.Authorization).toBe(`Bearer 123`);
  });
});
