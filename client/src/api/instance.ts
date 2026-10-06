import type { ApiClient, Fetcher, RequestOptions } from '../types/api';

export class ApiError extends Error {
  readonly status: number;
  constructor(status: number) {
    super(`Ошибка запроса (${status}). Попробуйте ещё раз.`);
    this.name = 'ApiError';
    this.status = status;
  }
}

export function createInstance(
  baseUrl = '/api',
  fetcher: Fetcher = (input, init) => fetch(input, init)
): ApiClient {
  return {
    async get<T>(path: string, options: RequestOptions = {}) {
      const response = await fetcher(
        `${baseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`,
        {
          method: 'GET',
          headers: { Accept: 'application/json' },
          signal: options.signal
        }
      );
      if (!response.ok) throw new ApiError(response.status);
      return response.json() as Promise<T>;
    }
  };
}
export const instance = createInstance();
