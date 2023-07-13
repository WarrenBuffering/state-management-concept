import { useUserStore } from '../store';
import { useFetchStatus } from '../../../hooks';
import { getUserDetails } from '../../../services/user';

import type {
  GetUserDetailsParams,
  GetUserDetailsResponse,
  GetUserDetailsResponseData,
} from '../../../services/user';
import type { StoreAction } from '../../../types';

/* ============================================================================
= Helpers
============================================================================ */

/* ============================================================================
= Types
============================================================================ */

type Action = StoreAction<GetUserDetailsParams, GetUserDetailsResponseData>;

/* ============================================================================
= Action Hook
============================================================================ */

export function useGetUserDetails(): Action {
  const updateUser = useUserStore((state) => state.update);
  const status = useFetchStatus();

  async function request(args: GetUserDetailsParams): Promise<GetUserDetailsResponse> {
    const response = await getUserDetails(args);

    if (response.error) {
      status.fail(response.error.message, response.error.code);
      return {
        data: null,
        error: response.error,
      };
    }

    updateUser(response.data);
    status.succeed();

    return {
      data: response.data,
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
