import axios, { AxiosRequestConfig } from 'axios';

export default class axiosClient {
  private http;

  constructor(axiosClient: AxiosRequestConfig) {
    this.http = axios.create({
      ...axiosClient,
    });
  }

  public getTestInstance() {
    return this.http;
  }

  public async get<T>(url: string, config?: AxiosRequestConfig) {
    const response = await this.http.get<T>(url, config);

    return response.data || response;
  }

  public async post<T, P = null>(url: string, body?: P, config?: AxiosRequestConfig) {
    const response = await this.http.post<T>(url, body, config);

    return response.data;
  }

  public async put<T, P = null>(url: string, body?: P, config?: AxiosRequestConfig) {
    const response = await this.http.put<T>(url, body, config);

    return response.data;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig) {
    const response = await this.http.delete<T>(url, config);

    return response.data;
  }
}
