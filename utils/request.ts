import { getHttpStatusMessage } from './getHttpStatusMessage';

import type { RequestResponse } from '../types';

export type Request = {
  body?: BodyInit;
  credentials?: RequestCredentials;
  headers?: HeadersInit;
  integrity?: string;
  keepalive?: boolean;
  method?: string;
  mode?: RequestMode;
  referrer?: string;
  signal?: AbortSignal;
  token?: string;
  url: RequestInfo;
};

const bodyRequired: Record<string, boolean> = {
  PATCH: true,
  POST: true,
  PUT: true,
};

export async function request<ResponseData = null>({
  body,
  credentials,
  headers,
  integrity,
  keepalive,
  method = 'GET',
  mode,
  referrer,
  token,
  signal,
  url,
}: Request): Promise<RequestResponse<ResponseData>> {
  try {
    if (bodyRequired[method] && !body) {
      throw new Error(`A body is required for the ${method} method`);
    }

    const newHeaders: Record<string, string> = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(headers as Record<string, string>), // cast headers as Record<string, string>
    };

    if (token?.length) {
      newHeaders.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      body,
      credentials,
      headers: newHeaders,
      integrity,
      keepalive,
      method,
      mode,
      referrer,
      signal,
    });

    if (!response.ok) {
      const result = await response.json();

      return {
        data: null,
        error: {
          code: response.status,
          message: result?.message || getHttpStatusMessage(response.status),
        },
      };
    }

    const data: ResponseData = await response.json();

    return {
      data,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: {
        message: error.message || 'Unknown error',
      },
    };
  }
}
