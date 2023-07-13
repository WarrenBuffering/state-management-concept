import { useCallback, useMemo, useState } from 'react';

import { FetchStatus } from '../enums';

export type UseFetchStatus = {
  errorMessage: string;
  errorCode: number;
  isFetching: boolean;
  isError: boolean;
  isSuccess: boolean;
  isUnfetched: boolean;
  start(): void;
  fail(message: string, code?: number): void;
  succeed(): void;
  reset(): void;
};

export function useFetchStatus(): UseFetchStatus {
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.UNFETCHED);
  const [errorCode, setErrorCode] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const start = useCallback(() => {
    setStatus(FetchStatus.FETCHING);
    setErrorCode(0);
    setErrorMessage('');
  }, []);

  const fail = useCallback((message: string, code?: number) => {
    setStatus(FetchStatus.FAIL);
    setErrorMessage(message);
    setErrorCode(code || 0);
  }, []);

  const succeed = useCallback(() => setStatus(FetchStatus.SUCCESS), []);

  const reset = useCallback(() => setStatus(FetchStatus.UNFETCHED), []);

  const isFetching = useMemo(() => status === FetchStatus.FETCHING, [status]);
  const isError = useMemo(() => status === FetchStatus.FAIL, [status]);
  const isSuccess = useMemo(() => status === FetchStatus.SUCCESS, [status]);
  const isUnfetched = useMemo(() => status === FetchStatus.UNFETCHED, [status]);

  return {
    errorMessage,
    errorCode,
    isFetching,
    isError,
    isSuccess,
    isUnfetched,
    reset,
    start,
    fail,
    succeed,
  };
}
