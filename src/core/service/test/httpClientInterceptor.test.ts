import { AxiosRequestConfig } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import testClient from './httpInterceptorStub.ts';

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

describe('axios interceptor에 대한 테스트', () => {
  let http: typeof testClient;
  let mock: MockAdapter;

  beforeAll(() => {
    http = testClient;
    mock = new MockAdapter(http.test.getTestInstance());
  });

  afterAll(() => {
    mock.reset();
  });

  it('axios request interceptor success test', async () => {
    mock.onGet('/test').reply((config) => {
      return [200, config, config];
    });

    // 토큰이 있을때
    const res = await http.test.get<AxiosRequestConfig>('/test');
    expect(res.headers!.Authorization).toBe('Bearer accessToken');
  });
});
