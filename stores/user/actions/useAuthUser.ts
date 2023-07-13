import { useUserStore } from '../store';
import { useFetchStatus } from '../../../hooks';

import type { AuthUserParams } from '../../../services/user';
import type { RequestResponse, StoreAction } from '../../../types';

/* ============================================================================
= Types
============================================================================ */

type ResponseData = {
  id: string;
  accessToken: string;
  refreshToken: string;
};

/* ============================================================================
= Action Hook
============================================================================ */

export function useAuthUser(): StoreAction<AuthUserParams, ResponseData> {
  const updateUser = useUserStore((state) => state.update);
  const status = useFetchStatus();

  async function request(args: AuthUserParams): Promise<RequestResponse<ResponseData>> {
    status.start();
    const response = await authUser(args);

    if (response.error) {
      status.fail(response.error.message, response.error.code);
      return {
        data: null,
        error: {
          code: response.error.code,
          message: response.error.message,
        },
      };
    }

    const data = {
      id: response.data.userId,
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken,
    };

    updateUser(data);
    status.succeed();

    return {
      data,
      error: null,
    };
  }

  return {
    isFetching: status.isFetching,
    isError: status.isError,
    isSuccess: status.isSuccess,
    isUnfetched: status.isUnfetched,
    errorMessage: status.errorMessage,
    errorCode: status.errorCode,
    request,
    reset: status.reset,
  };
}
