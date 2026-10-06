export type Fetcher = typeof fetch;
export interface RequestOptions {
  signal?: AbortSignal;
}
export interface ApiClient {
  get<T>(path: string, options?: RequestOptions): Promise<T>;
}
