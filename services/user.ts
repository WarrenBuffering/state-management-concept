import Config from 'react-native-config';
import { request } from '../utils/request';

import type { RequestResponse, User } from '../types';

/* ============================================================================
= Config
============================================================================ */

const BASE_URL = `${Config.ROOT_URL}/api/v1/user`;

/* ============================================================================
= Services
============================================================================ */

/** =======================================================
 * @function: authUser
 ======================================================= */

export type AuthUserParams = { username: string; password: string };
export type AuthUserResponseData = User;
export type AuthUserResponse = RequestResponse<User>;

export async function authUser(params: AuthUserParams): Promise<AuthUserResponse> {
  const response = await request<AuthUserResponseData>({
    body: JSON.stringify(params),
    method: 'POST',
    url: `${BASE_URL}/authenticate`,
  });

  return response;
}

/** ===================================
 * @func getUserDetails
 =================================== */

export type GetUserDetailsParams = { id: string };
export type GetUserDetailsResponseData = User;
export type GetUserDetailsResponse = RequestResponse<User>;

export async function getUserDetails({
  id,
}: GetUserDetailsParams): Promise<GetUserDetailsResponse> {
  const response = await request<User>({
    url: `${BASE_URL}/${id}`,
    method: 'GET',
  });

  return response;
}
